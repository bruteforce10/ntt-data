"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { upload } from "@vercel/blob/client";
import { Link2, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PROBLEM_DECKS } from "@/lib/problem-decks";
import { normalizeLinkUrl } from "@/lib/ntt-data/deck-links";
import { LinkTip } from "@/components/deck-link-tip";

const FILE_ACCEPT = "image/*,.pdf,.ppt,.pptx,application/pdf";

type Status = "idle" | "submitting" | "success";

export default function FastTrackForm() {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<Record<string, File | null>>({});
  // Fallback links (keyed by deck.field), revealed after a submit error so a
  // failed upload can still be delivered as a Drive/OneDrive/Dropbox link.
  const [links, setLinks] = useState<Record<string, string>>({});
  const [linkFallbackOpen, setLinkFallbackOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // Re-entry guard for the async submit — a ref updates synchronously, so a
  // double-click can't slip through before React re-renders.
  const isSubmittingRef = useRef(false);

  // Keep canonical PO_01..PO_10 order regardless of click order.
  const selectedDecks = PROBLEM_DECKS.filter((deck) => selected.has(deck.field));

  const toggleProblem = (field: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(field);
      else next.delete(field);
      return next;
    });
    // Drop any staged file/link when its problem is deselected.
    if (!checked) {
      setFiles((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setLinks((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (
    field: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleLinkChange = (field: string, value: string) => {
    setError(null);
    setLinks((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    const chosen = selectedDecks.map((deck) => deck.field);
    if (chosen.length === 0) {
      setError("Please select at least one problem statement.");
      return;
    }
    const hasLink = (field: string) => (links[field] ?? "").trim().length > 0;
    const hasAnyFile = chosen.some((field) => files[field]);
    const hasAnyLink = chosen.some((field) => hasLink(field));
    if (!hasAnyFile && !hasAnyLink) {
      setError(
        linkFallbackOpen
          ? "Please attach at least one pitch deck file or paste a link."
          : "Please attach at least one pitch deck file.",
      );
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");
    try {
      // Upload each deck straight to Vercel Blob first (browser -> Blob),
      // bypassing Vercel's 4.5 MB serverless request cap, then send only the
      // resulting URLs to our API. A deck with a fallback link skips the
      // upload — the link wins.
      const uploads: { field: string; url: string; name: string }[] = [];
      for (const field of chosen) {
        if (hasLink(field)) continue;
        const file = files[field];
        if (!file) continue;
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/fast-track-blob",
          multipart: true,
          clientPayload: JSON.stringify({ email: trimmedEmail, field }),
        });
        uploads.push({ field, url: blob.url, name: file.name });
      }

      // Fallback links stand in for a failed upload, one per problem.
      const linkPayload = chosen.flatMap((field) => {
        const url = normalizeLinkUrl(links[field] ?? "");
        return url ? [{ field, url }] : [];
      });

      const response = await fetch("/api/fast-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          problems: chosen,
          uploads,
          links: linkPayload,
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        // Reveal the link fallback so a failed upload can be sent as a link.
        setLinkFallbackOpen(true);
        setError(data?.message || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch (err) {
      setLinkFallbackOpen(true);
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
      setStatus("idle");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-green-800">
          Submission received
        </h2>
        <p className="text-sm text-green-700">
          Thank you! We&apos;ve recorded your fast-track registration and pitch
          deck. A confirmation email is on its way to{" "}
          <span className="font-medium">{email.trim()}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-2">
        <label
          htmlFor="ft-email"
          className="block text-sm font-semibold text-[#154284]"
        >
          Email address
        </label>
        <input
          id="ft-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#3176E4] focus:ring-2 focus:ring-[#3176E4]/20"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-1 text-sm font-semibold text-[#154284]">
          Select your problem statement(s)
        </legend>
        <div className="grid gap-2.5">
          {PROBLEM_DECKS.map((deck) => {
            const checked = selected.has(deck.field);
            return (
              <label
                key={deck.field}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                  checked
                    ? "border-[#3176E4] bg-[#3176E4]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) =>
                    toggleProblem(deck.field, value === true)
                  }
                  aria-label={deck.title}
                  className="mt-0.5"
                />
                <span className="leading-snug text-gray-700">{deck.title}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {selectedDecks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#154284]">
            Upload your pitch deck
          </h2>
          <p className="text-xs text-gray-500">
            Attach a deck for each problem statement you selected (at least one
            required). Accepted: image, PDF, or PPT/PPTX, up to 8&nbsp;MB.
          </p>
          {linkFallbackOpen && <LinkTip />}
          <div className="space-y-4">
            {selectedDecks.map((deck) => (
              <div key={deck.field} className="space-y-1.5">
                <label
                  htmlFor={`ft-file-${deck.field}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  {deck.title}
                </label>
                <input
                  id={`ft-file-${deck.field}`}
                  type="file"
                  accept={FILE_ACCEPT}
                  onChange={(event) => handleFileChange(deck.field, event)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#3176E4]/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#3176E4] hover:file:bg-[#3176E4]/20"
                />
                {files[deck.field] && (
                  <p className="text-xs text-gray-500">
                    Selected: {files[deck.field]?.name}
                  </p>
                )}

                {linkFallbackOpen && (
                  <div className="mt-2 border-t border-dashed border-gray-200 pt-2">
                    <label
                      htmlFor={`ft-link-${deck.field}`}
                      className="flex items-start gap-1.5 text-xs font-medium text-gray-600"
                    >
                      <Link2 className="mt-0.5 size-3.5 shrink-0 text-[#0070C0]" />
                      Trouble uploading? Paste a link instead (Google Drive,
                      OneDrive, Dropbox…).
                    </label>
                    <input
                      id={`ft-link-${deck.field}`}
                      type="url"
                      inputMode="url"
                      autoComplete="off"
                      placeholder="https://drive.google.com/…"
                      value={links[deck.field] ?? ""}
                      onChange={(event) =>
                        handleLinkChange(deck.field, event.target.value)
                      }
                      className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#3176E4] focus:ring-2 focus:ring-[#3176E4]/20"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="space-y-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
        >
          <p>{error}</p>
          {linkFallbackOpen && (
            <p className="text-red-600">
              Can&apos;t get the upload to work? Paste a link to your deck under
              any problem above instead.
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#3176E4] text-white hover:bg-[#154284]"
      >
        {status === "submitting"
          ? "Submitting…"
          : "Submit registration & deck"}
      </Button>

      {/* Full-screen guard: blocks every interaction while the submit
          (with its Blob uploads) is in flight. */}
      {status === "submitting" && (
        <div
          role="status"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#154284]/70 backdrop-blur-sm"
        >
          <LoaderCircle
            className="size-12 animate-spin text-white"
            aria-hidden
          />
          <p className="text-sm font-bold uppercase tracking-widest text-white">
            Submitting your registration…
          </p>
        </div>
      )}
    </form>
  );
}
