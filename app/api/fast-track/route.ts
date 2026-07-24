import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { transporter, buildDeckSubmissionEmail } from "@/lib/mailer";
import { PROBLEM_DECKS, type ProblemDeck } from "@/lib/problem-decks";

// Files are staged in Vercel Blob and streamed into PocketBase here, so allow
// headroom over the default 10s for multi-deck submissions.
export const maxDuration = 60;

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || "https://pb.ntt-startupchallenge.com";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

const ACCEPTED_MIME_PREFIXES = ["image/"];
const ACCEPTED_MIME_EXACT = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const ACCEPTED_EXTENSIONS = [".pdf", ".ppt", ".pptx"];

/**
 * Only fetch files we staged ourselves. Guards against SSRF: a caller could
 * otherwise hand us an arbitrary URL for the server to fetch.
 */
function isValidBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAcceptedFile(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (ACCEPTED_MIME_PREFIXES.some((prefix) => type.startsWith(prefix))) {
    return true;
  }
  if (ACCEPTED_MIME_EXACT.includes(type)) return true;
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function getToken(): string | null {
  return (
    process.env.POCKETBASE_SUPERUSER_TOKEN ||
    process.env.POCKETBASE_TOKEN ||
    null
  );
}

/**
 * Returns true when an ntt_data record already uses this email, false when
 * none does, and null when the lookup itself failed (caller should abort).
 */
async function emailExists(
  email: string,
  token: string,
): Promise<boolean | null> {
  const filter = encodeURIComponent(`email='${email.replace(/'/g, "\\'")}'`);
  const response = await fetch(
    `${POCKETBASE_URL}/api/collections/ntt_data/records?filter=${filter}&perPage=1`,
    { headers: { Authorization: token }, cache: "no-store" },
  );
  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  return Boolean(data?.items?.[0]?.id);
}

/**
 * POST /api/fast-track
 * Registration-lite: creates a NEW ntt_data record from just an email plus the
 * selected problem statements and their pitch-deck files. The files are staged
 * in Vercel Blob by the client (browser -> Blob bypasses Vercel's 4.5 MB
 * request-body cap); we receive only their URLs here. Emails that are already
 * registered are rejected so we never create duplicate records.
 */
export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => null)) as {
      email?: unknown;
      problems?: unknown;
      uploads?: unknown;
    } | null;

    const email = String(payload?.email ?? "").trim();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "A valid email is required." },
        { status: 400 },
      );
    }

    // Selected problem deck fields (PO_xx).
    const selectedFields = Array.isArray(payload?.problems)
      ? payload.problems.map(String)
      : [];
    const selected = PROBLEM_DECKS.filter((deck) =>
      selectedFields.includes(deck.field),
    );

    if (selected.length === 0) {
      return NextResponse.json(
        { message: "Please select at least one problem statement." },
        { status: 400 },
      );
    }

    // Each entry points at a file already staged in Vercel Blob by the client.
    // A file for a problem the user did not select is a client bug, so reject it.
    const selectedSet = new Set(selected.map((deck) => deck.field));
    const rawUploads = Array.isArray(payload?.uploads) ? payload.uploads : [];
    const uploads: { deck: ProblemDeck; url: string; name: string }[] = [];
    for (const raw of rawUploads) {
      const field = String((raw as { field?: unknown })?.field ?? "");
      const url = String((raw as { url?: unknown })?.url ?? "");
      const name =
        String((raw as { name?: unknown })?.name ?? "").trim() || "pitch-deck";
      const deck = PROBLEM_DECKS.find((d) => d.field === field);
      if (!deck) continue;
      if (!selectedSet.has(deck.field)) {
        return NextResponse.json(
          {
            message: `"${deck.title}": upload a deck only for a problem statement you selected.`,
          },
          { status: 400 },
        );
      }
      if (!isValidBlobUrl(url)) {
        return NextResponse.json(
          { message: "Invalid upload reference. Please re-select your file." },
          { status: 400 },
        );
      }
      uploads.push({ deck, url, name });
    }

    if (uploads.length === 0) {
      return NextResponse.json(
        { message: "Please attach at least one pitch deck file." },
        { status: 400 },
      );
    }

    const token = getToken();
    if (!token) {
      return NextResponse.json(
        {
          message:
            "PocketBase token is missing. Set POCKETBASE_SUPERUSER_TOKEN in the environment.",
        },
        { status: 500 },
      );
    }

    const exists = await emailExists(email, token);
    if (exists === null) {
      return NextResponse.json(
        { message: "Unable to verify your email. Please try again." },
        { status: 502 },
      );
    }
    if (exists) {
      return NextResponse.json(
        {
          message:
            "This email is already registered. Please use the pitch deck submission link from your confirmation email instead.",
        },
        { status: 409 },
      );
    }

    // problem_statement stores the selected titles joined with ", " so that
    // matchProblemDecks() can recover the selection later.
    const problemStatement = selected.map((deck) => deck.title).join(", ");

    const pbForm = new FormData();
    pbForm.append("email", email);
    pbForm.append("problem_statement", problemStatement);

    // Pull each staged file out of Blob (public URL) and attach it. The
    // response body is NOT subject to Vercel's 4.5 MB request cap.
    for (const { deck, url, name } of uploads) {
      const fileResponse = await fetch(url, { cache: "no-store" });
      if (!fileResponse.ok) {
        return NextResponse.json(
          {
            message: `"${deck.title}": we couldn't retrieve the uploaded file. Please try again.`,
          },
          { status: 502 },
        );
      }
      const blob = await fileResponse.blob();
      if (blob.size === 0) {
        return NextResponse.json(
          { message: `"${deck.title}": the uploaded file was empty.` },
          { status: 400 },
        );
      }
      if (blob.size > MAX_SIZE_BYTES) {
        return NextResponse.json(
          { message: `"${deck.title}": file exceeds the 8 MB limit.` },
          { status: 400 },
        );
      }
      const file = new File([blob], name, {
        type: fileResponse.headers.get("content-type") || blob.type,
      });
      if (!isAcceptedFile(file)) {
        return NextResponse.json(
          {
            message: `"${deck.title}": unsupported file format. Use an image, PDF, or PPT/PPTX.`,
          },
          { status: 400 },
        );
      }
      pbForm.append(deck.field, file, name);
    }

    const recordResponse = await fetch(
      `${POCKETBASE_URL}/api/collections/ntt_data/records`,
      {
        method: "POST",
        headers: { Authorization: token },
        body: pbForm,
        cache: "no-store",
      },
    );

    if (!recordResponse.ok) {
      const failure = await recordResponse.json().catch(() => null);
      return NextResponse.json(
        {
          message: failure?.message || "PocketBase rejected the submission.",
          details: failure,
        },
        { status: recordResponse.status },
      );
    }

    const result = await recordResponse.json().catch(() => null);

    // Staging blobs are one-shot; drop them once PocketBase has the files.
    await del(uploads.map((u) => u.url)).catch(() => {});

    // Confirmation email (non-blocking failure).
    try {
      const { html, text } = buildDeckSubmissionEmail({ name: "Participant" });
      await transporter.sendMail({
        from: `"Open Innovation Program" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject:
          "Thank You for Submitting Your Pitch Deck - Open Innovation Program",
        text,
        html,
        headers: {
          "X-Mailer": "NTT-OpenInnovation-Mailer",
          Precedence: "bulk",
          "List-Unsubscribe": `<mailto:${process.env.SMTP_FROM || process.env.SMTP_USER}?subject=unsubscribe>`,
        },
      });
    } catch (mailError) {
      console.error("Fast-track email failed:", mailError);
    }

    return NextResponse.json({ record: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit. Please try again." },
      { status: 500 },
    );
  }
}
