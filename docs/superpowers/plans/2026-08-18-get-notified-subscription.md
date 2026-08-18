# Get Notified for Next Program — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ganti setiap CTA "Register" dengan tombol "Get Notified for Next Program" yang membuka dialog subscription email ke `openinnovation@ntt-startupchallenge.com`, dan nonaktifkan `/startup-registration` sementara lewat redirect 307.

**Architecture:** Satu route handler Next.js (`POST /api/notify-subscription`) memvalidasi email, menerapkan honeypot + rate limit per IP, lalu mengirim satu email internal via `transporter` nodemailer yang sudah ada di `lib/mailer.ts`. Di sisi UI, satu komponen form (`NotifyForm`) dibungkus dua cara: `NotifyCta` yang self-contained untuk hero/about/floating-dock, dan `NotifyDialog` terkontrol untuk `problem-overview.tsx` yang sudah punya `<Dialog>` sendiri. Tidak ada penyimpanan database dan tidak ada auto-reply.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui di atas registry Base UI (`@base-ui/react/*`), nodemailer, Vitest + Testing Library (jsdom).

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-08-18-get-notified-subscription-design.md`
- **Penerima email:** `openinnovation@ntt-startupchallenge.com` — persis, tanpa variasi.
- **Konvensi respons API:** error = `NextResponse.json({ message }, { status })`, sukses = `NextResponse.json({ ok: true })`. Ini konvensi codebase (`app/api/deck-submission/route.ts:272`), **bukan** envelope `{ success, data, error }` dari global rules.
- **Impor UI:** komponen shadcn dari `@/components/ui/...`. Registry proyek ini berbasis Base UI, jadi `Dialog` memakai prop `open` / `onOpenChange` (lihat `components/problem-overview.tsx:113-116`).
- **Warna brand:** `#3176E4` (CTA/button), `#0070C0` (aksen), `#154284` (heading/kontras gelap). Tidak ada magic color baru.
- **Tidak ada env baru.** Semua SMTP sudah ada: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- **Tidak ada `console.log`** di kode produksi. `console.error` untuk logging server-side kegagalan SMTP diperbolehkan.
- **Tidak ada dependensi produksi baru.** Satu devDependency test (`@testing-library/user-event`) ditambahkan di Task 5 bila belum terpasang.
- **Label CTA:** "Get Notified for Next Program" di hero (uppercase), about, dan problem-overview. Floating dock memakai "GET NOTIFIED" dengan `aria-label` teks penuh.
- **Jangan hapus** `app/startup-registration/`, `components/startup-registration-form.tsx`, atau `app/api/ntt-data/`. Hanya dibuat tidak terjangkau.
- **Perintah verifikasi:** `npm test`, `npm run build`, `npm run lint`.

---

## File Structure

**Dibuat:**

| File | Tanggung jawab |
|---|---|
| `lib/email-validation.ts` | `normalizeEmail()`, `isValidEmail()` — murni, dipakai client & server |
| `lib/notify/notify-email.ts` | `NOTIFY_RECIPIENT`, `buildNotifySubscriptionEmail()` — merakit payload email, tanpa I/O |
| `lib/notify/rate-limit.ts` | `consumeRateLimit()`, `resetRateLimit()` — counter in-memory per key |
| `app/api/notify-subscription/route.ts` | Route handler POST: validasi → honeypot → rate limit → kirim |
| `components/notify/notify-form.tsx` | Field email + state machine submission (client) |
| `components/notify/notify-dialog.tsx` | Dialog terkontrol yang membungkus `NotifyForm` |
| `components/notify/notify-cta.tsx` | Tombol + state `open` sendiri |
| `tests/notify/email-validation.test.ts` | Unit test validator |
| `tests/notify/notify-email.test.ts` | Unit test perakitan email |
| `tests/notify/rate-limit.test.ts` | Unit test rate limiter |
| `tests/notify/notify-subscription-route.test.ts` | Test route dengan SMTP di-mock |
| `tests/notify/notify-form.test.tsx` | Test komponen dengan `fetch` di-mock |

**Dimodifikasi:**

| File | Perubahan |
|---|---|
| `components/startup-registration-form.tsx:105-107` | Hapus `isValidEmail` lokal, impor dari `lib/email-validation` |
| `lib/site-content.ts:10, 170-177, 210` | Label CTA |
| `components/hero.tsx:58-67` | `<Link>` → `<NotifyCta>` |
| `components/about.tsx:26-33` | `<Link>` → `<NotifyCta>` |
| `components/floating-dock.tsx:49-52` | `<a href>` → `<NotifyCta>` |
| `components/problem-overview.tsx:51-61, 143-152` | `router.push()` → buka `NotifyDialog` |
| `next.config.ts` | Tambah `redirects()` |
| `app/sitemap.ts:14-19` | Hapus entri `/startup-registration` |

---

## Task 1: Validator email bersama

Mengekstrak `isValidEmail` yang saat ini terkubur di komponen form agar bisa dipakai route handler dan komponen baru.

**Files:**
- Create: `lib/email-validation.ts`
- Create: `tests/notify/email-validation.test.ts`
- Modify: `components/startup-registration-form.tsx:105-107`

**Interfaces:**
- Consumes: tidak ada.
- Produces:
  - `normalizeEmail(value: string): string` — trim + lowercase
  - `isValidEmail(value: string): boolean` — **tidak** melakukan trim, agar perilaku form lama tidak berubah

- [ ] **Step 1: Tulis test yang gagal**

Buat `tests/notify/email-validation.test.ts`:

```ts
import { describe, it, expect } from "vitest";

import { isValidEmail, normalizeEmail } from "@/lib/email-validation";

describe("isValidEmail", () => {
  it("accepts a conventional address", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts subdomains and plus-addressing", () => {
    expect(isValidEmail("user+tag@mail.example.co.id")).toBe(true);
  });

  it("rejects an address with no @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("rejects an address with no domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("rejects an address with no dot in the domain", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("rejects an address containing whitespace", () => {
    expect(isValidEmail("us er@example.com")).toBe(false);
  });

  it("rejects an untrimmed address, leaving trimming to the caller", () => {
    // startup-registration-form.tsx has always validated the raw input.
    // Callers normalize first; this keeps that behaviour identical.
    expect(isValidEmail(" user@example.com ")).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("trims surrounding whitespace", () => {
    expect(normalizeEmail("  user@example.com  ")).toBe("user@example.com");
  });

  it("lowercases the address", () => {
    expect(normalizeEmail("User.Name@Example.COM")).toBe(
      "user.name@example.com",
    );
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/notify/email-validation.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/email-validation"`

- [ ] **Step 3: Tulis implementasi minimal**

Buat `lib/email-validation.ts`:

```ts
/**
 * Shared by the public notify-subscription endpoint and the registration form.
 * Deliberately permissive: the goal is to catch typos, not to enforce RFC 5322.
 * Real deliverability is proven only by a message actually being delivered.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trims and lowercases so the same address never varies by case or padding. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Does not trim — callers normalize first. Keeping this strict preserves the
 * exact behaviour startup-registration-form.tsx had before extraction.
 */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npx vitest run tests/notify/email-validation.test.ts`
Expected: PASS — 9 test

- [ ] **Step 5: Hapus duplikat di form registrasi**

Di `components/startup-registration-form.tsx`, hapus blok ini (baris 105-107):

```ts
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
```

lalu tambahkan impor di bagian atas file, dikelompokkan bersama impor `@/lib/...` yang sudah ada:

```ts
import { isValidEmail } from "@/lib/email-validation";
```

- [ ] **Step 6: Verifikasi tidak ada regresi**

Run: `npm test && npx tsc --noEmit`
Expected: seluruh test lulus, tidak ada error TypeScript. Pemanggilan di baris ~266 (`} else if (!isValidEmail(email)) {`) tetap bekerja dengan signature yang identik.

- [ ] **Step 7: Commit**

```bash
git add lib/email-validation.ts tests/notify/email-validation.test.ts components/startup-registration-form.tsx
git commit -m "refactor: extract shared email validation helpers"
```

---

## Task 2: Perakitan email notifikasi

Modul murni tanpa I/O yang merakit payload email. Dipisah dari route agar isi email bisa diuji tanpa menyentuh SMTP.

**Files:**
- Create: `lib/notify/notify-email.ts`
- Create: `tests/notify/notify-email.test.ts`

**Interfaces:**
- Consumes: tidak ada.
- Produces:
  - `NOTIFY_RECIPIENT: string` — `"openinnovation@ntt-startupchallenge.com"`
  - `interface NotifySubscriptionEmail { to: string; replyTo: string; subject: string; text: string; html: string }`
  - `buildNotifySubscriptionEmail(opts: { email: string; submittedAt: Date }): NotifySubscriptionEmail`

- [ ] **Step 1: Tulis test yang gagal**

Buat `tests/notify/notify-email.test.ts`:

```ts
import { describe, it, expect } from "vitest";

import {
  NOTIFY_RECIPIENT,
  buildNotifySubscriptionEmail,
} from "@/lib/notify/notify-email";

const SUBMITTED_AT = new Date("2026-08-18T09:30:00.000Z");

describe("buildNotifySubscriptionEmail", () => {
  it("addresses the internal open-innovation inbox", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.to).toBe(NOTIFY_RECIPIENT);
    expect(NOTIFY_RECIPIENT).toBe("openinnovation@ntt-startupchallenge.com");
  });

  it("sets reply-to to the subscriber so the inbox can answer directly", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.replyTo).toBe("founder@startup.io");
  });

  it("puts the subscriber address in the subject for inbox scanning", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.subject).toContain("founder@startup.io");
  });

  it("includes the address and an ISO timestamp in both bodies", () => {
    const mail = buildNotifySubscriptionEmail({
      email: "founder@startup.io",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.text).toContain("founder@startup.io");
    expect(mail.text).toContain("2026-08-18T09:30:00.000Z");
    expect(mail.html).toContain("founder@startup.io");
    expect(mail.html).toContain("2026-08-18T09:30:00.000Z");
  });

  it("escapes HTML so a crafted address cannot inject markup", () => {
    // The validation regex only forbids whitespace and extra @, so angle
    // brackets survive it. Escaping keeps the internal inbox safe.
    const mail = buildNotifySubscriptionEmail({
      email: "a<img/onerror=x>b@evil.com",
      submittedAt: SUBMITTED_AT,
    });

    expect(mail.html).not.toContain("<img");
    expect(mail.html).toContain("&lt;img/onerror=x&gt;");
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/notify/notify-email.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/notify/notify-email"`

- [ ] **Step 3: Tulis implementasi minimal**

Buat `lib/notify/notify-email.ts`:

```ts
/** The open-innovation inbox that receives every "Notify Me" submission. */
export const NOTIFY_RECIPIENT = "openinnovation@ntt-startupchallenge.com";

export interface NotifySubscriptionEmail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * The address passed our validation regex, which forbids whitespace and a
 * second `@` but permits angle brackets. Escape before interpolating so a
 * crafted address cannot inject markup into the internal inbox.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildNotifySubscriptionEmail(opts: {
  email: string;
  submittedAt: Date;
}): NotifySubscriptionEmail {
  const { email, submittedAt } = opts;
  const timestamp = submittedAt.toISOString();
  const safeEmail = escapeHtml(email);

  const text = [
    "New subscriber for the next Open Innovation Program.",
    "",
    `Email:        ${email}`,
    `Submitted at: ${timestamp}`,
    "",
    "Reply to this message to reach the subscriber directly.",
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-size:14px;line-height:1.6;">
  <p style="margin:0 0 16px;font-size:16px;font-weight:bold;color:#154284;">New "Notify Me" subscriber</p>
  <table style="border-collapse:collapse;">
    <tr>
      <td style="padding:5px 16px 5px 0;color:#6b7280;font-size:13px;">Email</td>
      <td style="padding:5px 0;font-size:13px;font-weight:bold;">${safeEmail}</td>
    </tr>
    <tr>
      <td style="padding:5px 16px 5px 0;color:#6b7280;font-size:13px;">Submitted at</td>
      <td style="padding:5px 0;font-size:13px;">${timestamp}</td>
    </tr>
  </table>
  <p style="margin:16px 0 0;color:#374151;font-size:13px;">Reply to this message to reach the subscriber directly.</p>
</div>`;

  return {
    to: NOTIFY_RECIPIENT,
    replyTo: email,
    subject: `New "Notify Me" subscriber — ${email}`,
    text,
    html,
  };
}
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npx vitest run tests/notify/notify-email.test.ts`
Expected: PASS — 5 test

- [ ] **Step 5: Commit**

```bash
git add lib/notify/notify-email.ts tests/notify/notify-email.test.ts
git commit -m "feat: build notify-subscription email payload"
```

---

## Task 3: Rate limiter in-memory

Endpoint ini publik dan mengirim email, jadi tanpa penjaga ia menjadi corong spam. Modul terpisah agar bisa diuji dengan waktu yang dikendalikan, tanpa `vi.useFakeTimers` di test route.

**Files:**
- Create: `lib/notify/rate-limit.ts`
- Create: `tests/notify/rate-limit.test.ts`

**Interfaces:**
- Consumes: tidak ada.
- Produces:
  - `RATE_LIMIT_MAX_REQUESTS: number` — `5`
  - `RATE_LIMIT_WINDOW_MS: number` — `600_000`
  - `consumeRateLimit(key: string, now?: number): boolean` — `true` bila request diizinkan, `false` bila melewati batas
  - `resetRateLimit(): void` — hanya untuk isolasi test

- [ ] **Step 1: Tulis test yang gagal**

Buat `tests/notify/rate-limit.test.ts`:

```ts
import { describe, it, expect, beforeEach } from "vitest";

import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
  consumeRateLimit,
  resetRateLimit,
} from "@/lib/notify/rate-limit";

const START = 1_000_000;

describe("consumeRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("allows requests up to the limit", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      expect(consumeRateLimit("1.2.3.4", START)).toBe(true);
    }
  });

  it("blocks the request past the limit within the window", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("1.2.3.4", START + 1)).toBe(false);
  });

  it("tracks each key independently", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("5.6.7.8", START)).toBe(true);
  });

  it("allows again once the window has elapsed", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("1.2.3.4", START + RATE_LIMIT_WINDOW_MS + 1)).toBe(
      true,
    );
  });

  it("drops expired buckets so the map cannot grow without bound", () => {
    consumeRateLimit("stale", START);
    consumeRateLimit("fresh", START + RATE_LIMIT_WINDOW_MS + 1);

    // "stale" was swept, so its budget starts over rather than continuing.
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      expect(consumeRateLimit("stale", START + RATE_LIMIT_WINDOW_MS + 2)).toBe(
        true,
      );
    }
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/notify/rate-limit.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/notify/rate-limit"`

- [ ] **Step 3: Tulis implementasi minimal**

Buat `lib/notify/rate-limit.ts`:

```ts
export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

interface Bucket {
  count: number;
  expiresAt: number;
}

/**
 * Per-instance and reset by cold starts on serverless, so this is a speed bump
 * against crude abuse rather than a guarantee. Accepted deliberately: a real
 * limiter would mean a Redis dependency this project does not otherwise need.
 */
const buckets = new Map<string, Bucket>();

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.expiresAt <= now) buckets.delete(key);
  }
}

/** Returns true when the request is allowed, false when the key is over budget. */
export function consumeRateLimit(
  key: string,
  now: number = Date.now(),
): boolean {
  sweepExpired(now);

  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  buckets.set(key, { ...bucket, count: bucket.count + 1 });
  return true;
}

/** Test-only: clears all buckets so cases stay isolated. */
export function resetRateLimit(): void {
  buckets.clear();
}
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npx vitest run tests/notify/rate-limit.test.ts`
Expected: PASS — 5 test

- [ ] **Step 5: Commit**

```bash
git add lib/notify/rate-limit.ts tests/notify/rate-limit.test.ts
git commit -m "feat: add in-memory rate limiter for public endpoints"
```

---

## Task 4: Route handler POST /api/notify-subscription

**Files:**
- Create: `app/api/notify-subscription/route.ts`
- Create: `tests/notify/notify-subscription-route.test.ts`

**Interfaces:**
- Consumes:
  - `isValidEmail`, `normalizeEmail` dari `@/lib/email-validation` (Task 1)
  - `buildNotifySubscriptionEmail` dari `@/lib/notify/notify-email` (Task 2)
  - `consumeRateLimit` dari `@/lib/notify/rate-limit` (Task 3)
  - `transporter` dari `@/lib/mailer` (sudah ada)
- Produces: `POST(request: Request): Promise<Response>`
  - `200 { ok: true }` — terkirim, atau honeypot terpicu
  - `400 { message }` — email tidak valid atau body bukan JSON
  - `429 { message }` — melewati rate limit
  - `500 { message }` — SMTP gagal

- [ ] **Step 1: Tulis test yang gagal**

Buat `tests/notify/notify-subscription-route.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from "vitest";

const sendMail = vi.fn();

// lib/mailer.ts builds a real nodemailer transport at module load; mock the
// whole module so importing the route never opens an SMTP connection.
vi.mock("@/lib/mailer", () => ({
  transporter: { sendMail: (...args: unknown[]) => sendMail(...args) },
}));

import { POST } from "@/app/api/notify-subscription/route";
import { resetRateLimit } from "@/lib/notify/rate-limit";

function postRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/notify-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/notify-subscription", () => {
  beforeEach(() => {
    sendMail.mockReset();
    sendMail.mockResolvedValue({ messageId: "test" });
    resetRateLimit();
  });

  it("sends one email and returns 200 for a valid address", async () => {
    const res = await POST(postRequest({ email: "founder@startup.io" }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("normalizes the address before sending", async () => {
    await POST(postRequest({ email: "  Founder@Startup.IO  " }));

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: "founder@startup.io" }),
    );
  });

  it("rejects an invalid address with 400 and sends nothing", async () => {
    const res = await POST(postRequest({ email: "not-an-email" }));

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects a missing address with 400", async () => {
    const res = await POST(postRequest({}));

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without sending", async () => {
    // Answering 200 keeps the bot from learning it was detected.
    const res = await POST(
      postRequest({ email: "bot@spam.io", website: "http://spam.example" }),
    );

    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 429 once one IP exceeds the window budget", async () => {
    for (let i = 0; i < 5; i += 1) {
      await POST(postRequest({ email: "founder@startup.io" }, "198.51.100.7"));
    }

    const res = await POST(
      postRequest({ email: "founder@startup.io" }, "198.51.100.7"),
    );

    expect(res.status).toBe(429);
    expect(sendMail).toHaveBeenCalledTimes(5);
  });

  it("returns 500 without leaking SMTP details when sending fails", async () => {
    sendMail.mockRejectedValue(
      new Error("535 5.7.8 smtp.example.com auth failed for user svc-mailer"),
    );

    const res = await POST(postRequest({ email: "founder@startup.io" }));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).not.toContain("smtp.example.com");
    expect(body.message).not.toContain("svc-mailer");
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(
      new Request("http://localhost/api/notify-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ not json",
      }),
    );

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/notify/notify-subscription-route.test.ts`
Expected: FAIL — `Failed to resolve import "@/app/api/notify-subscription/route"`

- [ ] **Step 3: Tulis implementasi minimal**

Buat `app/api/notify-subscription/route.ts`:

```ts
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
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npx vitest run tests/notify/notify-subscription-route.test.ts`
Expected: PASS — 8 test

- [ ] **Step 5: Commit**

```bash
git add app/api/notify-subscription/route.ts tests/notify/notify-subscription-route.test.ts
git commit -m "feat: add notify-subscription API route"
```

---

## Task 5: Komponen NotifyForm

Inti UI: satu field email dengan state machine `idle → submitting → success | error`.

**Files:**
- Create: `components/notify/notify-form.tsx`
- Create: `tests/notify/notify-form.test.tsx`
- Modify: `package.json` (devDependency test, bila belum ada)

**Interfaces:**
- Consumes: `isValidEmail`, `normalizeEmail` dari `@/lib/email-validation` (Task 1); `POST /api/notify-subscription` (Task 4)
- Produces: `NotifyForm(props: { onDone?: () => void }): JSX.Element` — default export
  - `onDone` dipanggil saat user menekan "Close" di panel sukses; dipakai `NotifyDialog` (Task 6) untuk menutup dialog

- [ ] **Step 1: Pasang `@testing-library/user-event` bila belum ada**

Run: `node -e "console.log(require('./package.json').devDependencies['@testing-library/user-event'] ?? 'MISSING')"`

Jika hasilnya `MISSING`, jalankan: `npm install -D @testing-library/user-event`

Ini satu-satunya paket baru dalam plan ini dan khusus devDependency untuk test; tidak menambah bundle produksi.

- [ ] **Step 2: Tulis test yang gagal**

Buat `tests/notify/notify-form.test.tsx`:

```tsx
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NotifyForm from "@/components/notify/notify-form";

function mockFetchOnce(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

describe("NotifyForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetchOnce(200, { ok: true }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows an inline error and sends nothing for an invalid address", async () => {
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /valid email address/i,
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("posts the normalized address and shows the success panel", async () => {
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/email/i), "Founder@Startup.IO");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/notify-subscription",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "founder@startup.io", website: "" }),
        }),
      );
    });

    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument();
  });

  it("surfaces the server message and keeps the typed email on failure", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetchOnce(429, { message: "Too many requests. Please try again." }),
    );
    const user = userEvent.setup();
    render(<NotifyForm />);

    const input = screen.getByLabelText(/email/i);
    await user.type(input, "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /too many requests/i,
    );
    // Nothing was recorded, so the user must be able to retry without retyping.
    expect(input).toHaveValue("founder@startup.io");
  });

  it("falls back to a generic message when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const user = userEvent.setup();
    render(<NotifyForm />);

    await user.type(screen.getByLabelText(/email/i), "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /something went wrong/i,
    );
  });

  it("calls onDone when the success panel is dismissed", async () => {
    const onDone = vi.fn();
    const user = userEvent.setup();
    render(<NotifyForm onDone={onDone} />);

    await user.type(screen.getByLabelText(/email/i), "founder@startup.io");
    await user.click(screen.getByRole("button", { name: /notify me/i }));
    await screen.findByText(/you're on the list/i);
    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 3: Jalankan test, pastikan gagal**

Run: `npx vitest run tests/notify/notify-form.test.tsx`
Expected: FAIL — `Failed to resolve import "@/components/notify/notify-form"`

- [ ] **Step 4: Tulis implementasi minimal**

Buat `components/notify/notify-form.tsx`:

```tsx
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
        <Button type="button" variant="outline" onClick={onDone}>
          Close
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
```

- [ ] **Step 5: Jalankan test, pastikan lulus**

Run: `npx vitest run tests/notify/notify-form.test.tsx`
Expected: PASS — 5 test

Jika test "shows an inline error" gagal karena `getByLabelText(/email/i)` menemukan lebih dari satu elemen, itu berarti label honeypot ("Website") tidak ikut cocok tetapi ada label lain yang cocok — periksa bahwa hanya satu `<Label htmlFor="notify-email">Email</Label>` yang dirender.

- [ ] **Step 6: Commit**

```bash
git add components/notify/notify-form.tsx tests/notify/notify-form.test.tsx package.json package-lock.json
git commit -m "feat: add notify subscription form component"
```

---

## Task 6: Pembungkus NotifyDialog dan NotifyCta

**Files:**
- Create: `components/notify/notify-dialog.tsx`
- Create: `components/notify/notify-cta.tsx`

**Interfaces:**
- Consumes: `NotifyForm` dari `@/components/notify/notify-form` (Task 5); `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` dari `@/components/ui/dialog`
- Produces:
  - `NotifyDialog(props: { open: boolean; onOpenChange: (open: boolean) => void }): JSX.Element` — default export dari `notify-dialog.tsx`
  - `NotifyCta(props: { label: string; className?: string; ariaLabel?: string; children?: React.ReactNode }): JSX.Element` — default export dari `notify-cta.tsx`

- [ ] **Step 1: Buat dialog terkontrol**

Buat `components/notify/notify-dialog.tsx`:

```tsx
"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotifyForm from "@/components/notify/notify-form";

export default function NotifyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Remounting on each open resets NotifyForm's state, so a closed
          success panel does not greet the next visitor. */}
      <DialogContent key={open ? "open" : "closed"} className="p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#154284]">
            Get Notified for Next Program
          </DialogTitle>
          <DialogDescription>
            Registration for this program has closed. Leave your email and
            we&apos;ll let you know as soon as the next one opens.
          </DialogDescription>
        </DialogHeader>
        <NotifyForm onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Buat CTA self-contained**

Buat `components/notify/notify-cta.tsx`:

```tsx
"use client";

import * as React from "react";

import NotifyDialog from "@/components/notify/notify-dialog";

/**
 * Owns its own open state so server components can drop it in without a
 * provider. Base UI only mounts dialog content while open, so several
 * instances on one page cost nothing meaningful.
 */
export default function NotifyCta({
  label,
  className,
  ariaLabel,
  children,
}: {
  label: string;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        {children}
      </button>
      <NotifyDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
```

- [ ] **Step 3: Verifikasi tipe dan test**

Run: `npx tsc --noEmit && npm test`
Expected: tidak ada error TypeScript, seluruh test lulus.

- [ ] **Step 4: Commit**

```bash
git add components/notify/notify-dialog.tsx components/notify/notify-cta.tsx
git commit -m "feat: add notify dialog and CTA wrappers"
```

---

## Task 7: Pasang CTA di hero, about, dan floating dock

**Files:**
- Modify: `lib/site-content.ts:10` (`about.cta`), `lib/site-content.ts:170-177` (`navbar.actions`), `lib/site-content.ts:210` (`hero.action`)
- Modify: `components/hero.tsx:58-67`
- Modify: `components/about.tsx:26-33`
- Modify: `components/floating-dock.tsx:49-52`

**Interfaces:**
- Consumes: `NotifyCta` dari `@/components/notify/notify-cta` (Task 6)
- Produces: tidak ada API baru.

- [ ] **Step 1: Perbarui label di site-content**

Di `lib/site-content.ts` baris 10, ganti:

```ts
    cta: { label: "Register", href: "/startup-registration" },
```

menjadi:

```ts
    cta: { label: "Get Notified for Next Program" },
```

Di baris 210, ganti:

```ts
    action: { label: "REGISTER", href: "/startup-registration" },
```

menjadi:

```ts
    action: { label: "GET NOTIFIED FOR NEXT PROGRAM" },
```

Di blok `navbar.actions` (baris 170-177), ganti:

```ts
    actions: [
      {
        label: "REGISTER",
        href: "/startup-registration",
        variant: "primary",
        comingSoon: false,
      },
    ],
```

menjadi:

```ts
    actions: [
      {
        // Shortened for the narrow dock pill; NotifyCta carries the full
        // wording as its aria-label.
        label: "GET NOTIFIED",
        ariaLabel: "Get Notified for Next Program",
        variant: "primary",
        comingSoon: false,
      },
    ],
```

- [ ] **Step 2: Ganti tombol hero**

Di `components/hero.tsx`, hapus impor `Link` (`import Link from "next/link";`) dan tambahkan:

```tsx
import NotifyCta from "@/components/notify/notify-cta";
```

Ganti blok `<Link>` (baris 58-67):

```tsx
          <Link
            href={hero.action.href}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 w-48 rounded-full border-0 bg-[#3176e4] text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#2560c8] sm:h-14 sm:w-56 sm:text-sm",
            )}
          >
            {hero.action.label}
          </Link>
```

menjadi:

```tsx
          <NotifyCta
            label={hero.action.label}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 w-56 rounded-full border-0 bg-[#3176e4] px-6 text-center text-[0.65rem] font-bold uppercase leading-tight tracking-widest text-white transition-colors hover:bg-[#2560c8] sm:h-14 sm:w-72 sm:text-xs",
            )}
          />
```

Lebar dan ukuran font disesuaikan karena label baru jauh lebih panjang dari "REGISTER".

- [ ] **Step 3: Ganti tombol about**

Di `components/about.tsx`, hapus impor `Link` dan tambahkan:

```tsx
import NotifyCta from "@/components/notify/notify-cta";
```

Ganti blok `<Link>` (baris 26-33):

```tsx
          <Link
            href={about.cta.href}
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-white to-gray-100 px-9 py-3.5 text-base font-bold text-[#0070C0] shadow-md shadow-black/15 ring-1 ring-black/5 transition duration-200 hover:to-gray-200 hover:text-[#3176E4] hover:shadow-lg sm:text-lg"
          >
            <span>{about.cta.label}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Link>
```

menjadi:

```tsx
          <NotifyCta
            label={about.cta.label}
            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-white to-gray-100 px-9 py-3.5 text-base font-bold text-[#0070C0] shadow-md shadow-black/15 ring-1 ring-black/5 transition duration-200 hover:to-gray-200 hover:text-[#3176E4] hover:shadow-lg sm:text-lg"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </NotifyCta>
```

Impor `ArrowRight` tetap dipakai — jangan dihapus.

- [ ] **Step 4: Ganti tombol floating dock**

Di `components/floating-dock.tsx`, tambahkan impor:

```tsx
import NotifyCta from "@/components/notify/notify-cta";
```

Ganti cabang akhir `ActionButton` (baris 49-52):

```tsx
  return (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  );
```

menjadi:

```tsx
  return (
    <NotifyCta
      label={action.label}
      ariaLabel={action.ariaLabel}
      className={className}
    />
  );
```

Cabang `action.comingSoon` di atasnya tidak berubah. Perhatikan juga baris 105 dan 134 yang memakai `key={action.href}` — ganti keduanya menjadi `key={action.label}` karena `href` sudah tidak ada.

- [ ] **Step 5: Verifikasi tipe dan build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: bersih. Jika `tsc` mengeluh `Property 'href' does not exist`, berarti masih ada pemakaian `hero.action.href` / `about.cta.href` / `action.href` yang tertinggal — hapus pemakaian itu.

- [ ] **Step 6: Commit**

```bash
git add lib/site-content.ts components/hero.tsx components/about.tsx components/floating-dock.tsx
git commit -m "feat: replace register CTAs with get-notified subscription"
```

---

## Task 8: Sambungkan tombol problem statement

`problem-overview.tsx` sudah punya `<Dialog>` sendiri, jadi ia memakai `NotifyDialog` terkontrol dan menutup dialog detail terlebih dahulu — bukan dialog di dalam dialog.

**Files:**
- Modify: `components/problem-overview.tsx:1-10` (impor), `:50-61` (state + handler), `:143-152` (tombol), `:319` (render dialog)

**Interfaces:**
- Consumes: `NotifyDialog` dari `@/components/notify/notify-dialog` (Task 6)
- Produces: tidak ada API baru.

- [ ] **Step 1: Ganti impor**

Di `components/problem-overview.tsx`, hapus:

```tsx
import { useRouter } from "next/navigation";
```

dan tambahkan:

```tsx
import NotifyDialog from "@/components/notify/notify-dialog";
```

- [ ] **Step 2: Ganti state dan handler**

Ganti baris 50-61:

```tsx
export default function ProblemOverview() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const selected = (
    selectedIndex !== null ? problemOverview.items[selectedIndex] : null
  ) as ProblemOverviewItem | null;

  function handleSelectProblem() {
    if (selectedIndex === null) return;
    router.push(`/startup-registration?problem=${selectedIndex}`);
    setSelectedIndex(null);
  }
```

menjadi:

```tsx
export default function ProblemOverview() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [notifyOpen, setNotifyOpen] = React.useState(false);
  const selected = (
    selectedIndex !== null ? problemOverview.items[selectedIndex] : null
  ) as ProblemOverviewItem | null;

  /**
   * Registration is closed, so the detail dialog hands off to the notify
   * dialog. Close the detail first — Base UI does not stack two modals.
   */
  function handleNotifyMe() {
    setSelectedIndex(null);
    setNotifyOpen(true);
  }
```

- [ ] **Step 3: Ganti tombol di dalam dialog detail**

Ganti baris 143-152:

```tsx
                <button
                  type="button"
                  onClick={handleSelectProblem}
                  className="w-full rounded-xl bg-[#154284] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
                >
                  Select the
                  <br />
                  Problem Statement
                </button>
```

menjadi:

```tsx
                <button
                  type="button"
                  onClick={handleNotifyMe}
                  className="w-full rounded-xl bg-[#154284] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
                >
                  Get Notified for
                  <br />
                  Next Program
                </button>
```

- [ ] **Step 4: Render dialog notify**

Tepat setelah penutup `</Dialog>` dari dialog detail (baris ~319), sebelum penutup `</section>`, tambahkan:

```tsx
      <NotifyDialog open={notifyOpen} onOpenChange={setNotifyOpen} />
```

- [ ] **Step 5: Verifikasi**

Run: `npx tsc --noEmit && npm run lint`
Expected: bersih.

Run: `grep -n "router\|startup-registration" components/problem-overview.tsx`
Expected: tidak ada hasil.

- [ ] **Step 6: Commit**

```bash
git add components/problem-overview.tsx
git commit -m "feat: open notify dialog from problem statement detail"
```

---

## Task 9: Nonaktifkan /startup-registration

**Files:**
- Modify: `next.config.ts`
- Modify: `app/sitemap.ts:4-5, 14-19`

**Interfaces:**
- Consumes: tidak ada.
- Produces: tidak ada API baru.

- [ ] **Step 1: Tambahkan redirect**

Ganti seluruh isi `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Registration for this batch is closed. `permanent: false` (307) is
        // deliberate: a 308 would be cached by browsers indefinitely and be
        // painful to undo when the next batch opens. Delete this block to
        // re-enable the page — the form and its API are untouched.
        source: "/startup-registration",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Hapus halaman dari sitemap**

Di `app/sitemap.ts`, hapus entri berikut (baris 14-19):

```ts
    {
      url: `${SITE_URL}/startup-registration`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
```

Perbarui juga komentar di baris 4-5 menjadi:

```ts
// Public, indexable routes only — /login and /dashboard are intentionally
// excluded (admin area, noindex), and /startup-registration is temporarily
// redirected to / while registration is closed.
```

- [ ] **Step 3: Verifikasi redirect berjalan**

Run: `npm run build`
Expected: build sukses.

Jalankan dev server di terminal terpisah (`npm run dev`), lalu:

Run: `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/startup-registration`
Expected: `307 http://localhost:3000/`

- [ ] **Step 4: Commit**

```bash
git add next.config.ts app/sitemap.ts
git commit -m "chore: temporarily redirect startup-registration to home"
```

---

## Task 10: Verifikasi menyeluruh

**Files:** tidak ada perubahan kode, kecuali perbaikan yang muncul dari temuan.

- [ ] **Step 1: Jalankan seluruh gerbang otomatis**

Run: `npm test && npm run lint && npm run build`
Expected: tiga-tiganya bersih. Jangan menyatakan selesai sebelum semua hijau.

- [ ] **Step 2: Pastikan tidak ada tautan register yang tertinggal**

Run: `grep -rn "startup-registration" app components lib --include="*.tsx" --include="*.ts" | grep -v "app/startup-registration/" | grep -v "components/startup-registration-form.tsx" | grep -v "lib/ntt-data/registration-errors.ts"`

Expected: tidak ada `href` atau `router.push` yang tersisa.

- [ ] **Step 3: Uji manual di browser**

Jalankan `npm run dev`, buka `http://localhost:3000`, lalu periksa:

1. Tombol hero bertuliskan "GET NOTIFIED FOR NEXT PROGRAM" dan membuka dialog.
2. Tombol about bertuliskan "Get Notified for Next Program" dengan panah, membuka dialog.
3. Pil floating dock bertuliskan "GET NOTIFIED" dan membuka dialog.
4. Buka satu problem statement → tombol kiri bawah bertuliskan "Get Notified for Next Program"; klik → dialog detail tertutup, dialog notify terbuka.
5. Di dialog: submit `bukan-email` → pesan error inline, tidak ada request. Submit email valid → panel "You're on the list". Tutup lalu buka lagi → kembali ke form kosong, bukan panel sukses.
6. Tekan Esc dan klik area luar → dialog tertutup.
7. Kunjungi `http://localhost:3000/startup-registration` → mendarat di `/`.
8. Periksa `http://localhost:3000/sitemap.xml` → tidak memuat `/startup-registration`.

Verifikasi email sungguhan hanya berjalan bila kredensial SMTP tersedia di `.env.local`. Bila tidak, submit akan menghasilkan 500 dan pesan generik — itu perilaku yang benar, bukan bug.

- [ ] **Step 4: Periksa lebar tombol di mobile**

Di DevTools, setel viewport ke 375px dan pastikan tidak ada tombol yang meluber atau memaksa scroll horizontal — terutama tombol hero dan pil dock, yang labelnya paling panjang. Sesuaikan kelas Tailwind bila perlu, lalu jalankan ulang `npm run build`.

- [ ] **Step 5: Commit perbaikan yang muncul**

```bash
git add -A
git commit -m "fix: polish get-notified CTA sizing on small viewports"
```

Lewati langkah ini bila tidak ada perubahan.

---

## Catatan pasca-implementasi

Sesuai protokol OpenWolf di `CLAUDE.md`, setelah implementasi selesai:

- Perbarui `.wolf/anatomy.md` dengan entri untuk file baru di `lib/notify/`, `components/notify/`, `app/api/notify-subscription/`, dan `tests/notify/`.
- Tambahkan baris ringkasan sesi ke `.wolf/memory.md`.
- Catat di `.wolf/cerebrum.md` bahwa konvensi respons error API proyek ini adalah `{ message }`, bukan envelope `{ success, data, error }` dari global rules — ini sempat salah di draf spec pertama.
