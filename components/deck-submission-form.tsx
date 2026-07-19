"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROBLEM_DECKS, type ProblemDeck } from "@/lib/problem-decks";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const ACCEPTED = "image/*,.pdf,.ppt,.pptx";
const SUPPORT_EMAIL = "openinnovation@ntt-startupchallenge.com";

interface DeckProblem {
  deck: ProblemDeck;
  uploaded: boolean;
}

function SupportLink() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="font-medium text-[#0070C0] underline underline-offset-2"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

export default function DeckSubmissionForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    emailFromQuery ? "loading" : "error",
  );
  const [loadError, setLoadError] = React.useState<string | null>(
    emailFromQuery
      ? null
      : "Open this page using the pitch-deck link from your registration confirmation email.",
  );
  const [problems, setProblems] = React.useState<DeckProblem[]>([]);
  const [files, setFiles] = React.useState<Record<string, File | null>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!emailFromQuery) return;

    let cancelled = false;

    async function loadProblems() {
      try {
        const res = await fetch(
          `/api/deck-submission?email=${encodeURIComponent(emailFromQuery)}`,
        );
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.message ?? "Unable to load your registration.",
          );
        }
        if (cancelled) return;

        const items: DeckProblem[] = (
          (data?.problems ?? []) as { id?: string; uploaded?: boolean }[]
        )
          .map((p) => ({
            deck: PROBLEM_DECKS.find((d) => d.id === p.id),
            uploaded: Boolean(p.uploaded),
          }))
          .filter((p): p is DeckProblem => Boolean(p.deck));

        setProblems(items);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setLoadError(
          err instanceof Error
            ? err.message
            : "Unable to load your registration.",
        );
        setStatus("error");
      }
    }

    loadProblems();
    return () => {
      cancelled = true;
    };
  }, [emailFromQuery]);

  React.useEffect(() => {
    if (!submitted) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSubmitted(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [submitted]);

  function handleFileChange(
    problemId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const picked = e.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [problemId]: picked }));
    setSubmitError(null);
  }

  const oversizedIds = problems
    .filter((p) => (files[p.deck.id]?.size ?? 0) > MAX_SIZE_BYTES)
    .map((p) => p.deck.id);
  const pickedCount = problems.filter((p) => files[p.deck.id]).length;
  const allUploaded =
    problems.length > 0 && problems.every((p) => p.uploaded);
  const canSubmit =
    !isSubmitting && pickedCount > 0 && oversizedIds.length === 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData();
      fd.append("email", emailFromQuery);
      for (const problem of problems) {
        const file = files[problem.deck.id];
        if (file) fd.append(problem.deck.field, file);
      }

      const res = await fetch("/api/deck-submission", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message ?? "Submission failed. Please try again.",
        );
      }
      setProblems((prev) =>
        prev.map((p) =>
          files[p.deck.id] ? { ...p, uploaded: true } : p,
        ),
      );
      setFiles({});
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-white p-10 text-sm text-gray-600 shadow-sm ring-1 ring-gray-100">
        <Loader2 className="size-4 animate-spin text-[#0070C0]" />
        Loading your registration…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <p className="flex items-start gap-2 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {loadError}
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Need any help? Feel free to contact us at: <SupportLink />
        </p>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="mx-auto w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <p className="flex items-start gap-2 text-sm font-medium text-amber-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          We couldn&apos;t find any selected problem statements for your
          registration.
        </p>
        <p className="mt-3 text-sm text-gray-600">
          Please contact us at <SupportLink /> so we can help you submit your
          pitch deck.
        </p>
      </div>
    );
  }

  return (
    <>
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSubmitted(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white px-10 py-12 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3176E4]"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-[#0070C0]">
              <Image
                src="/Logo/Open Innovation Week.png"
                alt="Open Innovation Week"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Thank You for Submitting!
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">
              We have successfully received your pitch deck.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">
              Our team at NTT DATA and our network of industry experts will now
              review your submission. If your startup is shortlisted, we will
              reach out to you directly with the next steps.
            </p>
            <p className="mb-6 text-sm text-gray-700">
              Need any help? Feel free to contact us at: <SupportLink />
            </p>
            <Button
              type="button"
              className="w-full bg-[#3176E4] text-sm hover:bg-[#0070C0]"
              onClick={() => setSubmitted(false)}
            >
              Close
            </Button>
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
              <p className="text-sm font-medium text-gray-700">
                Upload your pitch deck for the problem statements you selected
                during registration. You can submit some now and add or
                replace the rest later through this same link.
              </p>
              <div className="mt-2 flex flex-col gap-1">
                <p className="flex items-start gap-1.5 text-xs text-amber-600">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  Accepted formats: Images (JPG, PNG, etc.), PDF, PPT / PPTX
                </p>
                <p className="flex items-start gap-1.5 text-xs text-amber-600">
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  Maximum file size per deck:{" "}
                  <strong className="font-semibold">8 MB</strong>
                </p>
              </div>
            </div>

            {allUploaded && (
              <p className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                All your pitch decks have been received. Choose a file below
                only if you want to replace one.
              </p>
            )}

            {problems.map(({ deck, uploaded }) => {
              const inputId = `deck-file-${deck.id}`;
              const file = files[deck.id] ?? null;
              const isOversized = oversizedIds.includes(deck.id);

              return (
                <div
                  key={deck.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <Label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                  >
                    <span className="font-bold text-[#154284]">
                      {deck.title}
                    </span>
                  </Label>
                  {deck.logoLabel && (
                    <p className="mt-0.5 text-xs italic text-gray-500">
                      {deck.logoLabel}
                    </p>
                  )}
                  <label
                    htmlFor={inputId}
                    className="mt-2 flex h-8 cursor-pointer items-center rounded-lg border border-input bg-transparent px-2.5 text-base transition-colors outline-none hover:border-[#3176E4] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 md:text-sm"
                  >
                    <span className="min-w-0 truncate">
                      <span className="mr-2 font-medium text-gray-900">
                        Choose File
                      </span>
                      <span className="text-muted-foreground">
                        {file?.name ?? "No file chosen"}
                      </span>
                    </span>
                  </label>
                  <input
                    id={inputId}
                    name={deck.field}
                    type="file"
                    accept={ACCEPTED}
                    className="sr-only"
                    onChange={(e) => handleFileChange(deck.id, e)}
                  />

                  {uploaded && !file && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="size-3.5 shrink-0" />
                      Already uploaded — choose a file only if you want to
                      replace it.
                    </p>
                  )}

                  {isOversized && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      File exceeds 8 MB. Please choose a smaller file.
                    </p>
                  )}
                </div>
              );
            })}
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
            disabled={!canSubmit}
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
