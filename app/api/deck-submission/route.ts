import { NextResponse } from "next/server";
import { transporter, buildDeckSubmissionEmail } from "@/lib/mailer";

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
  // Fallback to extension when the browser omits/garbles the MIME type.
  if (name.startsWith("image/")) return true;
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const file = form.get("pick_deck");

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "A valid email is required." },
        { status: 400 },
      );
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "Please attach your pitch deck file." },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { message: "File exceeds the 8 MB limit." },
        { status: 400 },
      );
    }

    if (!isAcceptedFile(file)) {
      return NextResponse.json(
        { message: "Unsupported file format. Use an image, PDF, or PPT/PPTX." },
        { status: 400 },
      );
    }

    const token =
      process.env.POCKETBASE_SUPERUSER_TOKEN || process.env.POCKETBASE_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          message:
            "PocketBase token is missing. Set POCKETBASE_SUPERUSER_TOKEN in the environment.",
        },
        { status: 500 },
      );
    }

    // Find the registration record by email.
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
      return NextResponse.json(
        {
          message: lookup?.message || "Unable to look up your registration.",
          details: lookup,
        },
        { status: lookupResponse.status },
      );
    }

    const record = lookup?.items?.[0];

    if (!record?.id) {
      return NextResponse.json(
        {
          message:
            "No registration was found for this email. Please use the link from your registration confirmation.",
        },
        { status: 404 },
      );
    }

    // PATCH the record with the uploaded file (multipart/form-data).
    const updateForm = new FormData();
    updateForm.append("pick_deck", file, file.name);

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
