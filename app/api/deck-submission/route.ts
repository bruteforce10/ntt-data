import { NextResponse } from "next/server";
import { transporter, buildDeckSubmissionEmail } from "@/lib/mailer";
import {
  PROBLEM_DECKS,
  matchProblemDecks,
  type ProblemDeck,
} from "@/lib/problem-decks";

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

const SUPPORT_EMAIL = "openinnovation@ntt-startupchallenge.com";

type PbRecord = { id: string } & Record<string, unknown>;

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
  const filter = encodeURIComponent(`email='${email.replace(/'/g, "\\'")}'`);
  const lookupResponse = await fetch(
    `${POCKETBASE_URL}/api/collections/ntt_data/records?filter=${filter}&perPage=1`,
    {
      headers: { Authorization: token },
      cache: "no-store",
    },
  );

  const lookup = await lookupResponse.json().catch(() => null);

  if (!lookupResponse.ok) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          message: lookup?.message || "Unable to look up your registration.",
          details: lookup,
        },
        { status: lookupResponse.status },
      ),
    };
  }

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

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "A valid email is required." },
        { status: 400 },
      );
    }

    const token = getToken();
    if (!token) return MISSING_TOKEN_RESPONSE();

    const lookup = await lookupRegistration(email, token);
    if (!lookup.ok) return lookup.response;

    const problems = selectedDecksOf(lookup.record).map((deck) => {
      const value = lookup.record[deck.field];
      return {
        id: deck.id,
        uploaded: Boolean(value),
        // PocketBase stores the persisted file name (may carry a random
        // suffix); "" when nothing has been uploaded for this deck yet.
        filename: typeof value === "string" ? value : "",
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
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "A valid email is required." },
        { status: 400 },
      );
    }

    // Collect one optional file per problem-overview deck field (PO_01..PO_10).
    const uploads: { deck: ProblemDeck; file: File }[] = [];
    for (const deck of PROBLEM_DECKS) {
      const value = form.get(deck.field);
      if (value instanceof File && value.size > 0) {
        uploads.push({ deck, file: value });
      }
    }

    if (uploads.length === 0) {
      return NextResponse.json(
        { message: "Please attach your pitch deck file." },
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

    // Decks are optional per problem: registrants may submit any subset now
    // and add or replace the rest later via the same link.

    // PATCH the record with every uploaded file (multipart/form-data).
    const updateForm = new FormData();
    for (const { deck, file } of uploads) {
      updateForm.append(deck.field, file, file.name);
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

    const updated = await updateResponse.json().catch(() => null);

    if (!updateResponse.ok) {
      return NextResponse.json(
        {
          message: updated?.message || "Unable to upload your pitch deck.",
          details: updated,
        },
        { status: updateResponse.status },
      );
    }

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
