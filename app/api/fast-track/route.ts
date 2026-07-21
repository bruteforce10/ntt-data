import { NextResponse } from "next/server";
import { transporter, buildDeckSubmissionEmail } from "@/lib/mailer";
import { PROBLEM_DECKS, type ProblemDeck } from "@/lib/problem-decks";

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
 * selected problem statements and their pitch-deck files. Emails that are
 * already registered are rejected so we never create duplicate records.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "A valid email is required." },
        { status: 400 },
      );
    }

    // Selected problem deck fields arrive as repeated "problems" entries (PO_xx).
    const selectedFields = form.getAll("problems").map(String);
    const selected = PROBLEM_DECKS.filter((deck) =>
      selectedFields.includes(deck.field),
    );

    if (selected.length === 0) {
      return NextResponse.json(
        { message: "Please select at least one problem statement." },
        { status: 400 },
      );
    }

    // Collect one optional file per SELECTED deck field; a file for a problem
    // the user did not select is a client bug, so reject it.
    const selectedSet = new Set(selected.map((deck) => deck.field));
    const uploads: { deck: ProblemDeck; file: File }[] = [];
    for (const deck of PROBLEM_DECKS) {
      const value = form.get(deck.field);
      if (value instanceof File && value.size > 0) {
        if (!selectedSet.has(deck.field)) {
          return NextResponse.json(
            {
              message: `"${deck.title}": upload a deck only for a problem statement you selected.`,
            },
            { status: 400 },
          );
        }
        uploads.push({ deck, file: value });
      }
    }

    if (uploads.length === 0) {
      return NextResponse.json(
        { message: "Please attach at least one pitch deck file." },
        { status: 400 },
      );
    }

    for (const { deck, file } of uploads) {
      if (file.size > MAX_SIZE_BYTES) {
        return NextResponse.json(
          { message: `"${deck.title}": file exceeds the 8 MB limit.` },
          { status: 400 },
        );
      }
      if (!isAcceptedFile(file)) {
        return NextResponse.json(
          {
            message: `"${deck.title}": unsupported file format. Use an image, PDF, or PPT/PPTX.`,
          },
          { status: 400 },
        );
      }
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
    for (const { deck, file } of uploads) {
      pbForm.append(deck.field, file, file.name);
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

    const result = await recordResponse.json().catch(() => null);

    if (!recordResponse.ok) {
      return NextResponse.json(
        {
          message: result?.message || "PocketBase rejected the submission.",
          details: result,
        },
        { status: recordResponse.status },
      );
    }

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
