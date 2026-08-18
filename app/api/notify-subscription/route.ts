import { NextResponse } from "next/server";

import { transporter } from "@/lib/mailer";
import { isValidEmail, normalizeEmail } from "@/lib/email-validation";
import { buildNotifySubscriptionEmail } from "@/lib/notify/notify-email";
import { consumeRateLimit } from "@/lib/notify/rate-limit";

const INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";
const RATE_LIMITED_MESSAGE =
  "Too many requests. Please try again in a few minutes.";
const SEND_FAILED_MESSAGE = "Something went wrong. Please try again.";

interface NotifyPayload {
  email?: unknown;
  website?: unknown;
}

/**
 * Behind Vercel the client IP arrives in `x-forwarded-for` as a comma-separated
 * chain; the first entry is the original client. Requests with neither header
 * share one bucket rather than being blocked, so a proxy-less environment still
 * works.
 */
function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: NotifyPayload;
  try {
    payload = (await request.json()) as NotifyPayload;
  } catch {
    return NextResponse.json(
      { message: INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  // Honeypot: a hidden field only automated clients fill in. Answer 200 so the
  // bot cannot tell it was detected, but send nothing.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const rawEmail = typeof payload.email === "string" ? payload.email : "";
  const email = normalizeEmail(rawEmail);

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  if (!consumeRateLimit(getRateLimitKey(request))) {
    return NextResponse.json({ message: RATE_LIMITED_MESSAGE }, { status: 429 });
  }

  const mail = buildNotifySubscriptionEmail({ email, submittedAt: new Date() });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  } catch (error: unknown) {
    // SMTP errors carry host names and credentials — log them server-side and
    // hand the caller a generic message.
    console.error("notify-subscription: failed to send", error);
    return NextResponse.json({ message: SEND_FAILED_MESSAGE }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
