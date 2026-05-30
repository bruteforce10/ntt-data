import { NextResponse } from "next/server";

const POCKETBASE_URL =
  process.env.POCKETBASE_URL || "https://pb.ntt-startupchallenge.com";

type RegistrationPayload = {
  full_name?: string;
  email?: string;
  phone_number?: number;
  job_title?: string;
  startup_name?: string;
  website?: string;
  business_mode?: string;
  country?: string;
  city?: string;
  company_address?: string;
  problem_statement?: string;
  did_you_hear_about_us?: string;
};

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

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationPayload;
    const payload: RegistrationPayload = {};
    const fullName = cleanString(body.full_name);
    const email = cleanString(body.email);
    const jobTitle = cleanString(body.job_title);
    const startupName = cleanString(body.startup_name);
    const website = cleanString(body.website);
    const businessMode = cleanString(body.business_mode);
    const country = cleanString(body.country);
    const city = cleanString(body.city);
    const companyAddress = cleanString(body.company_address);
    const problemStatement = cleanString(body.problem_statement);
    const hearAboutUs = cleanString(body.did_you_hear_about_us);

    if (fullName) payload.full_name = fullName;
    if (email) payload.email = email;
    if (jobTitle) payload.job_title = jobTitle;
    if (startupName) payload.startup_name = startupName;
    if (website) payload.website = website;
    if (businessMode) payload.business_mode = businessMode;
    if (country) payload.country = country;
    if (city) payload.city = city;
    if (companyAddress) payload.company_address = companyAddress;
    if (problemStatement) payload.problem_statement = problemStatement;
    if (hearAboutUs) payload.did_you_hear_about_us = hearAboutUs;

    if (typeof body.phone_number === "number" && !Number.isNaN(body.phone_number)) {
      payload.phone_number = body.phone_number;
    }

    const errors: Record<string, string> = {};

    if (email && !isValidEmail(email)) {
      errors.email = "Use a valid email address.";
    }
    if (website && !isValidUrl(website)) {
      errors.website = "Use a valid URL.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Please check the highlighted fields.", errors },
        { status: 400 }
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
        { status: 500 }
      );
    }

    const recordResponse = await fetch(
      `${POCKETBASE_URL}/api/collections/ntt_data/records`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await recordResponse.json().catch(() => null);

    if (!recordResponse.ok) {
      return NextResponse.json(
        {
          message:
            result?.message || "PocketBase rejected the registration request.",
          details: result,
        },
        { status: recordResponse.status }
      );
    }

    return NextResponse.json({ record: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit registration. Please try again." },
      { status: 500 }
    );
  }
}
