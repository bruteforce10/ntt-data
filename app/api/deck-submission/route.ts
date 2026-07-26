import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { transporter, buildDeckSubmissionEmail } from "@/lib/mailer";
import { buildEmailLookupFilter } from "@/lib/ntt-data/email-filter";
import {
  PROBLEM_DECKS,
  matchProblemDecks,
  type ProblemDeck,
} from "@/lib/problem-decks";
import { collectDeckLinks } from "@/lib/ntt-data/deck-links";

// Files are staged in Vercel Blob and streamed into PocketBase here, so allow
// headroom over the default 10s for multi-deck submissions.
export const maxDuration = 60;

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || "https://pb.ntt-startupchallenge.com";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

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

const ACCEPTED_MIME_PREFIXES = ["image/"];
const ACCEPTED_MIME_EXACT = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const ACCEPTED_EXTENSIONS = [".pdf", ".ppt", ".pptx"];

const SUPPORT_EMAIL = "openinnovation@ntt-startupchallenge.com";

type PbRecord = { id: string } & Record<string, unknown>;

function isAcceptedFile(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (ACCEPTED_MIME_PREFIXES.some((prefix) => type.startsWith(prefix))) {
    return true;
  }
  if (ACCEPTED_MIME_EXACT.includes(type)) return true;
  // Fallback to extension when the browser omits/garbles the MIME type.
  if (name.startsWith("image/")) return true;
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function getToken(): string | null {
  return (
    process.env.POCKETBASE_SUPERUSER_TOKEN ||
    process.env.POCKETBASE_TOKEN ||
    null
  );
}

const MISSING_TOKEN_RESPONSE = () =>
  NextResponse.json(
    {
      message:
        "PocketBase token is missing. Set POCKETBASE_SUPERUSER_TOKEN in the environment.",
    },
    { status: 500 },
  );

type Lookup =
  | { ok: true; record: PbRecord }
  | { ok: false; response: NextResponse };

async function lookupRegistration(
  email: string,
  token: string,
): Promise<Lookup> {
  // Case-insensitive match: registrants may type their email in a different
  // case than they registered with (PocketBase `=` is case-sensitive).
  const filter = encodeURIComponent(buildEmailLookupFilter(email));
  const lookupResponse = await fetch(
    `${POCKETBASE_URL}/api/collections/ntt_data/records?filter=${filter}&perPage=1`,
    {
      headers: { Authorization: token },
      cache: "no-store",
    },
  );

  if (!lookupResponse.ok) {
    const failure = await lookupResponse.json().catch(() => null);
    return {
      ok: false,
      response: NextResponse.json(
        {
          message: failure?.message || "Unable to look up your registration.",
          details: failure,
        },
        { status: lookupResponse.status },
      ),
    };
  }

  const lookup = await lookupResponse.json().catch(() => null);
  const record = lookup?.items?.[0];

  if (!record?.id) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          message:
            "No registration was found for this email. Please use the link from your registration confirmation.",
        },
        { status: 404 },
      ),
    };
  }

  return { ok: true, record };
}

function selectedDecksOf(record: PbRecord): readonly ProblemDeck[] {
  const statement =
    typeof record.problem_statement === "string"
      ? record.problem_statement
      : "";
  return matchProblemDecks(statement);
}

/**
 * GET /api/deck-submission?email=...
 * Returns the problem statements the registrant selected, so the form can
 * render one pitch-deck upload input per selection.
 */
export async function GET(request: Request) {
  try {
    const email = (
      new URL(request.url).searchParams.get("email") ?? ""
    ).trim();

    if (!email) {
      return NextResponse.json(
        { message: "An email is required." },
        { status: 400 },
      );
    }

    const token = getToken();
    if (!token) return MISSING_TOKEN_RESPONSE();

    const lookup = await lookupRegistration(email, token);
    if (!lookup.ok) return lookup.response;

    const problems = selectedDecksOf(lookup.record).map((deck) => {
      const value = lookup.record[deck.field];
      const linkValue = lookup.record[deck.linkField];
      return {
        id: deck.id,
        uploaded: Boolean(value),
        // PocketBase stores the persisted file name (may carry a random
        // suffix); "" when nothing has been uploaded for this deck yet.
        filename: typeof value === "string" ? value : "",
        // Previously submitted fallback link (PO_xx_link), so the form can
        // prefill it for editing; "" when none was submitted.
        link: typeof linkValue === "string" ? linkValue : "",
      };
    });

    return NextResponse.json({ problems });
  } catch {
    return NextResponse.json(
      { message: "Unable to load your registration. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => null)) as {
      email?: unknown;
      uploads?: unknown;
      links?: unknown;
    } | null;

    const email = String(payload?.email ?? "").trim();

    if (!email) {
      return NextResponse.json(
        { message: "An email is required." },
        { status: 400 },
      );
    }

    // Each entry points at a file already staged in Vercel Blob by the client
    // (browser -> Blob bypasses Vercel's 4.5 MB request-body cap).
    const rawUploads = Array.isArray(payload?.uploads) ? payload.uploads : [];
    const uploads: { deck: ProblemDeck; url: string; name: string }[] = [];
    for (const raw of rawUploads) {
      const field = String((raw as { field?: unknown })?.field ?? "");
      const url = String((raw as { url?: unknown })?.url ?? "");
      const name =
        String((raw as { name?: unknown })?.name ?? "").trim() || "pitch-deck";
      const deck = PROBLEM_DECKS.find((d) => d.field === field);
      if (!deck) continue;
      if (!isValidBlobUrl(url)) {
        return NextResponse.json(
          { message: "Invalid upload reference. Please re-select your file." },
          { status: 400 },
        );
      }
      uploads.push({ deck, url, name });
    }

    // Fallback links (Drive/OneDrive/etc.) stand in for a file when the upload
    // failed on the client; validated against the selection after lookup below.
    const rawLinks = Array.isArray(payload?.links) ? payload.links : [];
    const rawLinkCount = rawLinks.filter(
      (l) => String((l as { url?: unknown })?.url ?? "").trim().length > 0,
    ).length;

    if (uploads.length === 0 && rawLinkCount === 0) {
      return NextResponse.json(
        { message: "Please attach your pitch deck file or paste a link." },
        { status: 400 },
      );
    }

    const token = getToken();
    if (!token) return MISSING_TOKEN_RESPONSE();

    const lookup = await lookupRegistration(email, token);
    if (!lookup.ok) return lookup.response;
    const record = lookup.record;

    const selected = selectedDecksOf(record);

    if (selected.length === 0) {
      return NextResponse.json(
        {
          message: `We couldn't match your registration to the current problem statements. Please contact ${SUPPORT_EMAIL}.`,
        },
        { status: 409 },
      );
    }

    const selectedFields = new Set(selected.map((deck) => deck.field));
    const invalid = uploads.filter(
      ({ deck }) => !selectedFields.has(deck.field),
    );
    if (invalid.length > 0) {
      return NextResponse.json(
        {
          message: `Your registration doesn't include: ${invalid
            .map(({ deck }) => `"${deck.title}"`)
            .join(", ")}. Please upload decks only for your selected problem statements.`,
        },
        { status: 400 },
      );
    }

    const linkResult = collectDeckLinks(rawLinks, selectedFields);
    if (!linkResult.ok) {
      return NextResponse.json({ message: linkResult.message }, { status: 400 });
    }
    const links = linkResult.links;

    // Decks are optional per problem: registrants may submit any subset now
    // and add or replace the rest later via the same link.

    // Pull each staged file out of Blob and build the PocketBase PATCH body.
    // The blobs are public, so a plain fetch of the URL streams the bytes; that
    // response body is NOT subject to Vercel's 4.5 MB request cap.
    const updateForm = new FormData();
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
      updateForm.append(deck.field, file, name);
    }

    // Persist each fallback link as a PocketBase text field (PO_xx_link).
    for (const { deck, url } of links) {
      updateForm.append(deck.linkField, url);
    }

    const updateResponse = await fetch(
      `${POCKETBASE_URL}/api/collections/ntt_data/records/${record.id}`,
      {
        method: "PATCH",
        headers: { Authorization: token },
        body: updateForm,
        cache: "no-store",
      },
    );

    if (!updateResponse.ok) {
      const failure = await updateResponse.json().catch(() => null);
      return NextResponse.json(
        {
          message: failure?.message || "Unable to upload your pitch deck.",
          details: failure,
        },
        { status: updateResponse.status },
      );
    }

    const updated = await updateResponse.json().catch(() => null);

    // Staging blobs are one-shot; drop them once PocketBase has the files.
    await del(uploads.map((u) => u.url)).catch(() => {});

    // Send the confirmation email (non-blocking failure).
    const name =
      (typeof record.full_name === "string" && record.full_name.trim()) ||
      "Participant";

    try {
      const { html, text } = buildDeckSubmissionEmail({ name });
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
      console.error("Deck submission email failed:", mailError);
    }

    return NextResponse.json({ record: updated }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your pitch deck. Please try again." },
      { status: 500 },
    );
  }
}
