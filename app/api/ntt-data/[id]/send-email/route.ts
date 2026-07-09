import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { transporter, buildRegistrationEmail } from "@/lib/mailer";
import { getRecord } from "@/lib/ntt-data/pocketbase";
import type { NttDataRecord } from "@/lib/ntt-data/types";

type Params = { id: string };

export async function POST(_req: Request, ctx: { params: Promise<Params> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await ctx.params;

  let record: NttDataRecord;
  try {
    record = await getRecord(id);
  } catch {
    return NextResponse.json(
      { success: false, error: "Record not found" },
      { status: 404 },
    );
  }

  const { email, full_name, startup_name, problem_statement } = record;
  if (!email || !full_name || !startup_name || !problem_statement) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Record is missing email, full name, startup name, or problem statement.",
      },
      { status: 422 },
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://ntt-startupchallenge.com";
  const { html, text } = buildRegistrationEmail({
    name: full_name,
    startupName: startup_name,
    problemStatement: problem_statement,
    email,
    baseUrl,
  });

  try {
    await transporter.sendMail({
      from: `"NTT Open Innovation Program" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject:
        "Registration Confirmed: Submit your Pitch Deck for Open Innovation Program",
      text,
      html,
      headers: {
        "X-Mailer": "NTT-OpenInnovation-Mailer",
        Precedence: "bulk",
        "List-Unsubscribe": `<mailto:${process.env.SMTP_FROM || process.env.SMTP_USER}?subject=unsubscribe>`,
      },
    });
  } catch (mailErr) {
    console.error("[ntt-data] manual sendMail failed:", mailErr);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Check SMTP settings." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
