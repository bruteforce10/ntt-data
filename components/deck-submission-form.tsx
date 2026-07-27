"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROBLEM_DECKS, type ProblemDeck } from "@/lib/problem-decks";
import { normalizeLinkUrl, prefillLinks } from "@/lib/ntt-data/deck-links";
import { LinkTip } from "@/components/deck-link-tip";
import { upload } from "@vercel/blob/client";
import {
  AlertCircle,
  CheckCircle2,
  Link2,
  Loader2,
  LoaderCircle,
  X,
} from "lucide-react";

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const ACCEPTED = "image/*,.pdf,.ppt,.pptx";
const SUPPORT_EMAIL = "openinnovation@ntt-startupchallenge.com";
const NOT_FOUND_MESSAGE =
  "We couldn't find a registration for that email. Please make sure you're using the same email you registered with.";

type Status = "idle" | "checking" | "ready" | "error";

interface DeckProblem {
  deck: ProblemDeck;
  uploaded: boolean;
  filename: string;
  /** Previously submitted fallback link (PO_xx_link), for prefilling. */
  link: string;
}

interface PendingReplace {
  id: string;
  title: string;
  oldName: string;
  file: File;
}

/** Error carrying the HTTP status so callers can special-case not-found. */
class LoadError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Loads the registrant's selected problem decks. Shared by both entry paths:
 * the email-link flow (query param, on mount) and the manual Check flow.
 */
async function fetchProblems(email: string): Promise<DeckProblem[]> {
  const res = await fetch(
    `/api/deck-submission?email=${encodeURIComponent(email)}`,
  );
  if (!res.ok) {
    const failure = await res.json().catch(() => null);
    throw new LoadError(
      failure?.message ?? "Unable to load your registration.",
      res.status,
    );
  }
  const data = await res.json().catch(() => null);
  return (
    (data?.problems ?? []) as {
      id?: string;
      uploaded?: boolean;
      filename?: string;
      link?: string;
    }[]
  )
    .map((p) => ({
      deck: PROBLEM_DECKS.find((d) => d.id === p.id),
      uploaded: Boolean(p.uploaded),
      filename: typeof p.filename === "string" ? p.filename : "",
      link: typeof p.link === "string" ? p.link : "",
    }))
    .filter((p): p is DeckProblem => Boolean(p.deck));
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
  const emailFromQuery = (searchParams.get("email") ?? "").trim();

  // With a query email (email-link flow) we auto-load; otherwise the user
  // types their email and gates it behind the Check button.
  const [status, setStatus] = React.useState<Status>(
    emailFromQuery ? "checking" : "idle",
  );
  const [activeEmail, setActiveEmail] = React.useState(emailFromQuery);
  const [emailInput, setEmailInput] = React.useState("");
  const [gateError, setGateError] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [problems, setProblems] = React.useState<DeckProblem[]>([]);
  const [files, setFiles] = React.useState<Record<string, File | null>>({});
  // Fallback links (keyed by deck.id), revealed after a submit error so a
  // failed upload can still be delivered as a Drive/OneDrive/Dropbox link.
  const [links, setLinks] = React.useState<Record<string, string>>({});
  const [linkFallbackOpen, setLinkFallbackOpen] = React.useState(false);
  const [pendingReplace, setPendingReplace] =
    React.useState<PendingReplace | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Email-link flow: load the moment we have a query email.
  React.useEffect(() => {
    if (!emailFromQuery) return;

    let cancelled = false;
    (async () => {
      try {
        const items = await fetchProblems(emailFromQuery);
        if (cancelled) return;
        const prefilled = prefillLinks(items);
        setProblems(items);
        setLinks(prefilled);
        // Reveal any link already on file so it's visible/editable rather than
        // silently enabling submit while its input stays hidden.
        if (Object.keys(prefilled).length > 0) setLinkFallbackOpen(true);
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
    })();

    return () => {
      cancelled = true;
    };
  }, [emailFromQuery]);

  const successDialogRef = React.useRef<HTMLDialogElement>(null);

  // Native <dialog> provides Escape handling, focus trapping, and the
  // ::backdrop; this effect keeps it in sync with `submitted` state.
  React.useEffect(() => {
    const dialog = successDialogRef.current;
    if (!dialog) return;
    if (submitted && !dialog.open) {
      dialog.showModal();
    } else if (!submitted && dialog.open) {
      dialog.close();
    }
  }, [submitted]);

  async function handleCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) {
      setGateError("Please enter your email address.");
      return;
    }

    setGateError(null);
    setStatus("checking");
    try {
      const items = await fetchProblems(email);
      const prefilled = prefillLinks(items);
      setActiveEmail(email);
      setProblems(items);
      setLinks(prefilled);
      // Reveal any link already on file so it's visible/editable rather than
      // silently enabling submit while its input stays hidden.
      if (Object.keys(prefilled).length > 0) setLinkFallbackOpen(true);
      setStatus("ready");
    } catch (err) {
      // Back to the gate so the user can correct the email and retry.
      setStatus("idle");
      if (err instanceof LoadError && err.status === 404) {
        setGateError(NOT_FOUND_MESSAGE);
      } else {
        setGateError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    }
  }

  function handleFileChange(
    problem: DeckProblem,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const picked = e.target.files?.[0] ?? null;
    // Reset so re-picking the same file after Cancel still fires onChange.
    e.target.value = "";
    setSubmitError(null);
    if (!picked) return;

    // Replacing an already-uploaded deck needs an explicit confirmation.
    if (problem.uploaded) {
      setPendingReplace({
        id: problem.deck.id,
        title: problem.deck.title,
        oldName: problem.filename,
        file: picked,
      });
      return;
    }

    setFiles((prev) => ({ ...prev, [problem.deck.id]: picked }));
  }

  function confirmReplace() {
    if (!pendingReplace) return;
    setFiles((prev) => ({ ...prev, [pendingReplace.id]: pendingReplace.file }));
    setPendingReplace(null);
  }

  function handleLinkChange(id: string, value: string) {
    setSubmitError(null);
    setLinks((prev) => ({ ...prev, [id]: value }));
  }

  const hasLink = (id: string) => (links[id] ?? "").trim().length > 0;
  const oversizedDeckIds = new Set(
    problems.flatMap((p) =>
      // A fallback link overrides the file for its problem, so an oversized
      // file being replaced by a link no longer blocks submit.
      !hasLink(p.deck.id) && (files[p.deck.id]?.size ?? 0) > MAX_SIZE_BYTES
        ? [p.deck.id]
        : [],
    ),
  );
  const pickedCount = problems.filter((p) => files[p.deck.id]).length;
  const linkCount = problems.filter((p) => hasLink(p.deck.id)).length;
  const allUploaded =
    problems.length > 0 && problems.every((p) => p.uploaded);
  const canSubmit =
    !isSubmitting &&
    (pickedCount > 0 || linkCount > 0) &&
    oversizedDeckIds.size === 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload each file straight to Vercel Blob first. Client uploads go
      // browser -> Blob directly, bypassing Vercel's 4.5 MB serverless body
      // cap, so large decks (up to 8 MB) no longer trigger a 413. A problem
      // with a fallback link skips the upload — the link wins.
      const uploads: { field: string; url: string; name: string }[] = [];
      for (const problem of problems) {
        if (hasLink(problem.deck.id)) continue;
        const file = files[problem.deck.id];
        if (!file) continue;
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/deck-blob",
          multipart: true,
          clientPayload: JSON.stringify({
            email: activeEmail,
            field: problem.deck.field,
          }),
        });
        uploads.push({
          field: problem.deck.field,
          url: blob.url,
          name: file.name,
        });
      }

      // Fallback links stand in for a failed/oversized upload, one per problem.
      const linkPayload = problems.flatMap((problem) => {
        const url = normalizeLinkUrl(links[problem.deck.id] ?? "");
        return url ? [{ field: problem.deck.field, url }] : [];
      });

      const res = await fetch("/api/deck-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: activeEmail,
          uploads,
          links: linkPayload,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message ?? "Submission failed. Please try again.",
        );
      }
      setProblems((prev) =>
        prev.map((p) =>
          files[p.deck.id] || hasLink(p.deck.id)
            ? {
                ...p,
                uploaded: true,
                filename: files[p.deck.id]?.name ?? p.filename,
              }
            : p,
        ),
      );
      setFiles({});
      setLinks({});
      setSubmitted(true);
    } catch (err) {
      // On failure nothing was persisted, so clear the picked files: the user
      // starts clean — re-pick a fresh file or deliver the deck via the link
      // fallback we reveal here instead of retrying the same failed upload.
      setFiles({});
      setLinkFallbackOpen(true);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "checking") {
    return (
      <div className="mx-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-white p-10 text-sm text-gray-600 shadow-sm ring-1 ring-gray-100">
        <Loader2 className="size-4 animate-spin text-[#0070C0]" />
        Checking your registration…
      </div>
    );
  }

  if (status === "idle") {
    return (
      <div className="mx-auto w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <form
          onSubmit={handleCheck}
          noValidate
          className="grid gap-4"
          aria-label="Check registration email"
        >
          <div>
            <Label
              htmlFor="check-email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <p className="mt-1 text-sm text-gray-600">
              Enter the email you used during registration to load your
              pitch-deck submission.
            </p>
            <Input
              id="check-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setGateError(null);
              }}
              className="mt-2"
            />
          </div>

          {gateError && (
            <p className="flex items-start gap-2 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {gateError}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#3176E4] text-sm hover:bg-[#0070C0]"
            >
              Check Email
            </Button>
          </div>

          <p className="text-sm text-gray-600">
            Need any help? Feel free to contact us at: <SupportLink />
          </p>
        </form>
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

  const replaceTitle = pendingReplace
    ? `Replace file for “${pendingReplace.title}”?`
    : "";
  const replaceMessage = pendingReplace
    ? pendingReplace.oldName
      ? `“${pendingReplace.oldName}” will be replaced with “${pendingReplace.file.name}” when you submit.`
      : `“${pendingReplace.file.name}” will replace the current file when you submit.`
    : "";

  return (
    <>
      <dialog
        ref={successDialogRef}
        aria-labelledby="deck-success-title"
        onClose={() => setSubmitted(false)}
        onClick={(e) => {
          // Clicks on the ::backdrop target the <dialog> element itself.
          if (e.target === e.currentTarget) setSubmitted(false);
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md bg-transparent p-0 backdrop:bg-black/60"
      >
          <div className="relative rounded-2xl bg-white px-10 py-12 text-center shadow-2xl">
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

            <h2
              id="deck-success-title"
              className="mb-4 text-xl font-bold text-gray-900"
            >
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
      </dialog>

      <Dialog
        open={!!pendingReplace}
        onOpenChange={(open) => {
          if (!open) setPendingReplace(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#154284]">{replaceTitle}</DialogTitle>
            <DialogDescription className="break-all">
              {replaceMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingReplace(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#154284] text-white hover:bg-[#0d2d6b]"
              onClick={confirmReplace}
            >
              Replace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full"
        aria-label="Deck submission form"
      >
        {/* Full-screen guard: blocks every interaction while the deck
            upload (browser -> Blob -> server) is in flight. */}
        {isSubmitting && (
          <div
            role="status"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#154284]/70 backdrop-blur-sm"
          >
            <LoaderCircle
              className="size-12 animate-spin text-white"
              aria-hidden
            />
            <p className="text-sm font-bold uppercase tracking-widest text-white">
              Uploading your pitch deck…
            </p>
          </div>
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
                value={activeEmail}
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

            {linkFallbackOpen && <LinkTip />}

            {allUploaded && (
              <p className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                All your pitch decks have been received. Choose a file below
                only if you want to replace one.
              </p>
            )}

            {problems.map((problem) => {
              const { deck, uploaded, filename } = problem;
              const inputId = `deck-file-${deck.id}`;
              const file = files[deck.id] ?? null;
              const isOversized = oversizedDeckIds.has(deck.id);

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
                    onChange={(e) => handleFileChange(problem, e)}
                  />

                  {uploaded && !file && (
                    <p className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                      <span>
                        Already uploaded
                        {filename ? (
                          <>
                            {": "}
                            <span className="font-semibold break-all">
                              {filename}
                            </span>
                          </>
                        ) : null}
                        {" — choose a file only if you want to replace it."}
                      </span>
                    </p>
                  )}

                  {isOversized && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      File exceeds 8 MB. Please choose a smaller file.
                    </p>
                  )}

                  {linkFallbackOpen && (
                    <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                      <Label
                        htmlFor={`deck-link-${deck.id}`}
                        className="flex items-start gap-1.5 text-xs font-medium text-gray-600"
                      >
                        <Link2 className="mt-0.5 size-3.5 shrink-0 text-[#0070C0]" />
                        Trouble uploading? Paste a link to your deck instead
                        (Google Drive, OneDrive, Dropbox…).
                      </Label>
                      <Input
                        id={`deck-link-${deck.id}`}
                        type="url"
                        inputMode="url"
                        autoComplete="off"
                        placeholder="https://drive.google.com/…"
                        value={links[deck.id] ?? ""}
                        onChange={(e) =>
                          handleLinkChange(deck.id, e.target.value)
                        }
                        className="mt-1.5"
                      />
                      <p className="mt-1 text-[11px] text-gray-400">
                        Make sure the link is set to “Anyone with the link can
                        view.”
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {submitError && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>{submitError}</p>
            {linkFallbackOpen && (
              <p className="mt-1.5 text-red-600">
                Can&apos;t get the upload to work? Paste a link to your deck
                under any problem above instead — we&apos;ll take it from there.
              </p>
            )}
          </div>
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
