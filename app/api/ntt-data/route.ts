import { NextResponse } from "next/server";
import { transporter, buildRegistrationEmail } from "@/lib/mailer";

import { auth } from "@/auth";
import { fetchAllRecords } from "@/lib/ntt-data/pocketbase";
import { flattenPocketBaseFieldErrors } from "@/lib/ntt-data/registration-errors";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await fetchAllRecords();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || "https://pb.ntt-startupchallenge.com";

// Mirrors the client-side limit in startup-registration-form.tsx: 4.5 MB
// minus 64 KB headroom so the whole multipart body fits Vercel's 4.5 MB cap.
const MAX_DESCRIPTION_FILE_BYTES = 4.5 * 1024 * 1024 - 64 * 1024;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isPdfFile(file: File) {
  return (
    file.type.toLowerCase() === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

export async function POST(request: Request) {
  try {
    let form: FormData;
    try {
      form = await request.formData();
    } catch (parseErr) {
      console.error("[ntt-data] unreadable form data:", parseErr);
      return NextResponse.json(
        {
          message:
            "We couldn't read the submitted form data — the upload may have been interrupted. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }
    const getValue = (name: string) => String(form.get(name) ?? "").trim();

    const fullName = getValue("full_name");
    const email = getValue("email");
    const phoneNumber = getValue("phone_number");
    const jobTitle = getValue("job_title");
    const startupName = getValue("startup_name");
    const website = getValue("website");
    const businessMode = getValue("business_mode");
    const country = getValue("country");
    const city = getValue("city");
    const companyAddress = getValue("company_address");
    const problemStatement = getValue("problem_statement");
    const hearAboutUs = getValue("did_you_hear_about_us");
    const fundingStage = getValue("funding_stage");
    const companyDescription = getValue("company_description");

    const descriptionPdf = form.get("company_description_pdf");
    const hasDescriptionPdf =
      descriptionPdf instanceof File && descriptionPdf.size > 0;

    const errors: Record<string, string> = {};

    if (email && !isValidEmail(email)) {
      errors.email = "Use a valid email address.";
    }
    if (website && !isValidUrl(website)) {
      errors.website = "Use a valid URL.";
    }
    if (hasDescriptionPdf) {
      const pdf = descriptionPdf as File;
      if (pdf.size > MAX_DESCRIPTION_FILE_BYTES) {
        errors.company_description_pdf = "The PDF exceeds the 4.5 MB limit.";
      } else if (!isPdfFile(pdf)) {
        errors.company_description_pdf =
          "Company description must be a PDF file.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Please check the highlighted fields.", errors },
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

    // PocketBase requires multipart/form-data whenever a file is uploaded.
    const pbForm = new FormData();
    const appendIfPresent = (key: string, value: string) => {
      if (value) pbForm.append(key, value);
    };

    appendIfPresent("full_name", fullName);
    appendIfPresent("email", email);
    if (phoneNumber) {
      const digits = phoneNumber.replace(/[^\d]/g, "");
      if (digits) pbForm.append("phone_number", digits);
    }
    appendIfPresent("job_title", jobTitle);
    appendIfPresent("startup_name", startupName);
    appendIfPresent("website", website);
    appendIfPresent("business_mode", businessMode);
    appendIfPresent("country", country);
    appendIfPresent("city", city);
    appendIfPresent("company_address", companyAddress);
    appendIfPresent("problem_statement", problemStatement);
    appendIfPresent("did_you_hear_about_us", hearAboutUs);
    appendIfPresent("funding_stage", fundingStage);

    // Company description is EITHER an uploaded PDF or typed text (mutually
    // exclusive in the form), mapped to two distinct PocketBase fields.
    if (hasDescriptionPdf) {
      const pdf = descriptionPdf as File;
      pbForm.append("company_description_pdf", pdf, pdf.name);
    } else {
      appendIfPresent("company_description", companyDescription);
    }

    let recordResponse: Response;
    try {
      recordResponse = await fetch(
        `${POCKETBASE_URL}/api/collections/ntt_data/records`,
        {
          method: "POST",
          headers: { Authorization: token },
          body: pbForm,
          cache: "no-store",
        },
      );
    } catch (fetchErr) {
      console.error("[ntt-data] PocketBase unreachable:", fetchErr);
      return NextResponse.json(
        {
          message:
            "Our registration database is unreachable right now, so nothing was saved. Please try again in a few minutes.",
        },
        { status: 502 },
      );
    }

    if (!recordResponse.ok) {
      const failure = await recordResponse.json().catch(() => null);
      // PocketBase nests per-field failures under `data`; surface them so the
      // client can explain WHICH field was rejected and why.
      const fieldErrors = flattenPocketBaseFieldErrors(failure?.data);
      const hasFieldErrors = Object.keys(fieldErrors).length > 0;
      const isAuthFailure =
        recordResponse.status === 401 || recordResponse.status === 403;
      return NextResponse.json(
        {
          message: isAuthFailure
            ? "The server's database credentials were rejected, so the registration could not be saved. Please contact the site administrator."
            : failure?.message ||
              `The registration database rejected the request (status ${recordResponse.status}).`,
          ...(hasFieldErrors && { errors: fieldErrors }),
          details: failure,
        },
        { status: recordResponse.status },
      );
    }

    const result = await recordResponse.json().catch(() => null);

    if (email && fullName && startupName && problemStatement) {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://ntt-startupchallenge.com";
      const { html, text } = buildRegistrationEmail({
        name: fullName,
        startupName,
        problemStatement,
        email,
        baseUrl,
      });
      try {
        await transporter.sendMail({
          from: `"NTT Open Innovation Program" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          replyTo: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: "Registration Confirmed: Submit your Pitch Deck for Open Innovation Program",
          text,
          html,
          headers: {
            "X-Mailer": "NTT-OpenInnovation-Mailer",
            Precedence: "bulk",
            "List-Unsubscribe": `<mailto:${process.env.SMTP_FROM || process.env.SMTP_USER}?subject=unsubscribe>`,
          },
        });
      } catch (mailErr) {
        console.error("[ntt-data] sendMail failed:", mailErr);
      }
    }

    return NextResponse.json({ record: result }, { status: 201 });
  } catch (err) {
    console.error("[ntt-data] POST error:", err);
    return NextResponse.json(
      {
        message:
          "Something unexpected went wrong on our server while saving your registration, so it was NOT saved. Please try again, or contact openinnovation@ntt-startupchallenge.com if it keeps failing.",
        ...(process.env.NODE_ENV === "development" && {
          debug: err instanceof Error ? err.message : String(err),
        }),
      },
      { status: 500 },
    );
  }
}
