import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isProblemDeckField } from "@/lib/problem-decks";

// Must match the fast-track client/server cap. Enforced by Vercel Blob at token
// time, so a tampered client cannot upload anything larger.
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

/**
 * POST /api/fast-track-blob
 * Client-upload handshake for the fast-track (registration-lite) flow. The
 * browser uploads the pitch deck straight to Vercel Blob (bypassing Vercel's
 * 4.5 MB serverless body cap); this route only mints a short-lived, size-capped
 * token. Unlike /api/deck-blob it does NOT require an existing registration,
 * because fast-track creates a brand-new record. The file is later moved into
 * PocketBase by /api/fast-track.
 */
export async function POST(request: Request): Promise<Response> {
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Surface the most common misconfig clearly instead of a vague
  // "Failed to retrieve the client token" on the browser.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Blob storage is not configured: BLOB_READ_WRITE_TOKEN is missing. Connect the Vercel Blob store to this project (Production) and redeploy.",
      },
      { status: 500 },
    );
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let email = "";
        let field = "";
        try {
          const parsed = JSON.parse(clientPayload ?? "{}");
          email = String(parsed?.email ?? "").trim();
          field = String(parsed?.field ?? "");
        } catch {
          throw new Error("Invalid upload payload.");
        }

        if (!email.trim()) {
          throw new Error("An email is required.");
        }
        if (!isProblemDeckField(field)) {
          throw new Error("Invalid deck field.");
        }

        return {
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          tokenPayload: JSON.stringify({ email, field }),
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload authorization failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
