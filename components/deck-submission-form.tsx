"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const ACCEPTED = "image/*,.pdf,.ppt,.pptx";

export default function DeckSubmissionForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const [fileName, setFileName] = React.useState("No file chosen");
  const [file, setFile] = React.useState<File | null>(null);
  const [sizeError, setSizeError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    setFileName(picked?.name ?? "No file chosen");
    setSizeError(picked ? picked.size > MAX_SIZE_BYTES : false);
    setSubmitError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || sizeError) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData();
      fd.append("email", emailFromQuery);
      fd.append("pick_deck", file);

      const res = await fetch("/api/deck-submission", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white px-10 py-12 text-center shadow-2xl">
            <h2 className="mb-5 text-base font-bold uppercase tracking-widest text-gray-900">
              Thank You for Submitting
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              We have successfully received your submission. Please check your
              email for a detailed guide on the next steps. If you do not see it
              within a few minutes, kindly check your spam or junk folder.
            </p>
            <p className="text-sm text-gray-700">
              For further assistance, please reach out to us at{" "}
              <a
                href="mailto:oiw@ntt-startupchallenge.com"
                className="font-medium text-[#0070C0] underline underline-offset-2"
              >
                oiw@ntt-startupchallenge.com
              </a>
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full"
        aria-label="Deck submission form"
      >
        {isSubmitting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70" />
        )}

        <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-5">
            <div>
              <Label
                htmlFor="deck-email"
                className="text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deck-email"
                name="email"
                type="email"
                value={emailFromQuery}
                disabled
                readOnly
                className="mt-1.5 cursor-not-allowed bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <Label
                htmlFor="deck-file"
                className="text-sm font-medium text-gray-700"
              >
                Pitch Deck File <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="deck-file"
                className="mt-1.5 flex h-8 cursor-pointer items-center rounded-lg border border-input bg-transparent px-2.5 text-base transition-colors outline-none hover:border-[#3176E4] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 md:text-sm"
              >
                <span className="min-w-0 truncate">
                  <span className="mr-2 font-medium text-gray-900">
                    Choose File
                  </span>
                  <span className="text-muted-foreground">{fileName}</span>
                </span>
              </label>
              <input
                id="deck-file"
                name="deckFile"
                type="file"
                accept={ACCEPTED}
                required
                className="sr-only"
                onChange={handleFileChange}
              />

              <div className="mt-2 flex flex-col gap-1">
                <p className="flex items-start gap-1.5 text-xs text-amber-600">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  Accepted formats: Images (JPG, PNG, etc.), PDF, PPT / PPTX
                </p>
                <p className="flex items-start gap-1.5 text-xs text-amber-600">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  Maximum file size:{" "}
                  <strong className="font-semibold">8 MB</strong>
                </p>
              </div>

              {sizeError && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  File exceeds 8 MB. Please choose a smaller file.
                </p>
              )}
            </div>
          </div>
        </div>

        {submitError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <div className="mt-8 flex justify-end pb-4">
          <Button
            type="submit"
            disabled={isSubmitting || sizeError || !file}
            className="rounded-xl bg-[#154284] px-10 py-6 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
