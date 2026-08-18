"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidEmail, normalizeEmail } from "@/lib/email-validation";

type Status = "idle" | "submitting" | "success" | "error";

const INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export default function NotifyForm({ onDone }: { onDone?: () => void }) {
  const [email, setEmail] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const successRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setStatus("error");
      setErrorMessage(INVALID_EMAIL_MESSAGE);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/notify-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, website: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        // Keep the typed email: nothing was recorded, so the user retries.
        setStatus("error");
        setErrorMessage(data?.message ?? GENERIC_ERROR_MESSAGE);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(GENERIC_ERROR_MESSAGE);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle2 className="size-10 text-[#0070C0]" aria-hidden="true" />
        <p
          ref={successRef}
          tabIndex={-1}
          className="text-base font-semibold text-[#154284] outline-none"
        >
          You&apos;re on the list
        </p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll email you as soon as the next program opens.
        </p>
        {/* Not "Close": the dialog's own X already exposes that accessible
            name, and two identically-named controls in one dialog are
            ambiguous for screen reader users. */}
        <Button type="button" variant="outline" onClick={onDone}>
          Done
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  const hasError = status === "error";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notify-email">Email</Label>
        <Input
          id="notify-email"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          placeholder="you@company.com"
          value={email}
          disabled={isSubmitting}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? "notify-error" : undefined}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11"
        />
      </div>

      {/* Honeypot: hidden from users, filled in by bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="notify-website">Website</label>
        <input
          id="notify-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {hasError && (
        <p id="notify-error" role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 bg-[#3176E4] text-white hover:bg-[#2560c8]"
      >
        {isSubmitting ? "Sending…" : "Notify Me"}
      </Button>
    </form>
  );
}
