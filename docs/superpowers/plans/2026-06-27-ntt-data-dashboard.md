# NTT Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Plan style note:** Logic/security-critical units (auth, PocketBase helpers, file proxy, pure utils) carry complete code + TDD. UI-assembly tasks specify exact files, responsibilities, contracts, the project's Base UI gotchas, and manual verification — full component code is written at execution following those patterns. This is a deliberate, cost-aware right-sizing, not a placeholder.

**Goal:** Ship a login-protected admin dashboard that lists the `ntt_data` PocketBase collection in a shadcn data table with search, per-column filter, sort, column visibility, multiselect, 24h "New" badge, Excel export, and click-to-download PDFs.

**Architecture:** Browser → Auth.js-gated Next.js Route Handlers → PocketBase (superuser token, server-only). Records are fetched all-at-once server-side; search/filter/sort/paginate/select run client-side in TanStack Table. Single fixed admin via Credentials provider with a bcrypt hash in env.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, Tailwind v4, shadcn (Base UI registry), Auth.js v5 (`next-auth@beta`), `@tanstack/react-table`, `bcryptjs`, SheetJS `xlsx`, Vitest.

## Global Constraints

- Next.js latest App Router; RSC by default, Client Components only for interaction/state/browser APIs.
- TypeScript everywhere; explicit types on exported/public APIs; no `any` (use `unknown` + narrow).
- Tailwind v4 zero-config (NO `tailwind.config.ts`). Styling via Tailwind classes / component variants only — **NO inline `style={{}}`**.
- shadcn here uses the **Base UI registry (`@base-ui/react`), NOT Radix.** Translate ported APIs: `asChild`→`render={<El/>}`; Base UI `Button` rendered as non-button needs `nativeButton={false}`; `DropdownMenuLabel` must sit inside `<DropdownMenuGroup>`; Accordion single = `multiple={false}`. Verify menus/dialogs by opening them (some errors only throw on mount).
- Brand tokens: primary/CTA `#3176E4`; accent/links/active `#0070C0`; headings/emphasis `#154284`. Font: Noto Sans (`font-sans`). Meet WCAG AA contrast.
- Immutability (spread, no mutation). Files <800 lines, functions <50 lines, nesting <4. Explicit error handling, no swallowed errors, no `console.log`.
- Secrets only in `.env.local` (git-ignored); never hardcode credentials/tokens in source.
- Conventional commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`), frequent, **no attribution footer** (user's global git rule).
- Reuse existing patterns: the current `app/api/ntt-data/route.ts` `POST` shows the PocketBase auth pattern (`POCKETBASE_URL`, `Authorization: <POCKETBASE_SUPERUSER_TOKEN>`).

## File Structure

```
auth.config.ts                         edge-safe config: pages + authorized callback
auth.ts                                NextAuth(): Credentials + jwt session; exports handlers/auth/signIn/signOut
middleware.ts                          gate /dashboard/* (edge, no bcrypt)
app/api/auth/[...nextauth]/route.ts    re-export { GET, POST } = handlers

lib/auth/verify-credentials.ts         TESTABLE: email + bcrypt compare against env → AdminUser | null
scripts/hash-admin-password.mjs        one-off: print bcrypt hash for the admin password

lib/ntt-data/types.ts                  NttDataRecord, NttDataFileField, ApiResponse<T>
lib/ntt-data/pocketbase.ts             server-only: fetchAllRecords, getRecord, fetchRecordFile
lib/ntt-data/is-new.ts                 TESTABLE: 24h New-window predicate
lib/ntt-data/export-selection.ts       TESTABLE: selected-else-filtered resolver
lib/ntt-data/export-xlsx.ts            build + download .xlsx from records + column spec
lib/ntt-data/columns-config.ts         shared column key→label + which are files/dates/facets

app/api/ntt-data/route.ts              ADD GET (session-guarded list). POST unchanged.
app/api/ntt-data/[id]/file/[field]/route.ts   session-guarded download proxy

app/login/page.tsx                     RSC shell (redirect to /dashboard if already authed)
app/login/login-form.tsx               'use client' credentials form (server action signIn)
app/dashboard/page.tsx                 RSC: auth() + fetchAllRecords() + error state + sign-out
app/dashboard/sign-out-button.tsx      sign out (server action)

components/ui/table.tsx                shadcn table primitives (registry-agnostic HTML)
components/ui/badge.tsx                shadcn badge (CVA)
components/ui/popover.tsx              Base UI popover wrapper

components/dashboard/data-table.tsx    TanStack instance + state + render
components/dashboard/columns.tsx       ColumnDef<NttDataRecord>[] (select, data, New, files, actions)
components/dashboard/toolbar.tsx       global search + Columns menu + Export
components/dashboard/column-filter.tsx per-column text / faceted filter
components/dashboard/data-table-pagination.tsx  rows-per-page + page nav
components/dashboard/record-detail.tsx full-record dialog (long text + file downloads)
components/dashboard/row-actions.tsx   per-row "View" trigger
components/dashboard/new-badge.tsx     <NewBadge created updated />
components/dashboard/export-button.tsx selected-else-filtered xlsx export

tests/**                               Vitest unit tests
vitest.config.ts                       jsdom + tsconfig paths
```

---

### Task 1: Setup — dependencies, env, Vitest, shadcn primitives

**Files:**
- Modify: `package.json` (deps + `test` script)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `components/ui/table.tsx`, `components/ui/badge.tsx`, `components/ui/popover.tsx`
- Create: `scripts/hash-admin-password.mjs`
- Modify: `.env.local` (append AUTH + ADMIN vars)

**Interfaces:**
- Produces: installed deps; `npm test` runs Vitest; `@/components/ui/{table,badge,popover}`; env `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`.

- [ ] **Step 1: Install dependencies**

```bash
npm i next-auth@beta bcryptjs @tanstack/react-table
npm i "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz"   # SheetJS official source (npm 'xlsx' is stale)
npm i -D @types/bcryptjs vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom vite-tsconfig-paths
```
Expected: installs succeed. (If the SheetJS tarball URL fails, fall back to `npm i exceljs` and adapt `export-xlsx.ts` in Task 7.)

- [ ] **Step 2: Add Vitest config + setup + script**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
});
```
`vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```
`package.json` scripts → add: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 3: Add shadcn primitives (registry-agnostic)**

`components/ui/table.tsx` — standard shadcn table (Table/Header/Body/Row/Head/Cell), pure `<table>` + Tailwind, using `cn` from `@/lib/utils`. (Reference: ui.shadcn.com table primitive; it has no Radix dependency.)
`components/ui/badge.tsx` — CVA badge with variants `default | secondary | outline`, plus a `new` variant styled brand blue (`bg-[#3176E4] text-white`).
`components/ui/popover.tsx` — wrap `@base-ui/react/popover` (`Popover.Root/Trigger/Portal/Positioner/Popup`), exporting `Popover`, `PopoverTrigger`, `PopoverContent`. Match the existing `dropdown-menu.tsx`/`select.tsx` Base UI style in this repo.

- [ ] **Step 4: Add the password-hash script**

`scripts/hash-admin-password.mjs`:
```js
import bcrypt from "bcryptjs";
const pw = process.argv[2];
if (!pw) { console.error("usage: node scripts/hash-admin-password.mjs <password>"); process.exit(1); }
process.stdout.write(bcrypt.hashSync(pw, 10) + "\n");
```

- [ ] **Step 5: Generate secret + hash and write env**

```bash
node scripts/hash-admin-password.mjs 'Luckwith2026@'    # copy output
npx auth secret --raw 2>/dev/null || openssl rand -base64 33   # AUTH_SECRET value
```
Append to `.env.local`:
```
AUTH_SECRET=<generated>
ADMIN_EMAIL=admin@srv783840.hstgr.cloud
ADMIN_PASSWORD_HASH=<bcrypt output from above>
```

- [ ] **Step 6: Verify build still compiles & test runner works**

Run: `npm test` → Expected: "No test files found" (exit 0) or passes. Run: `npx tsc --noEmit` → Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts components/ui/table.tsx components/ui/badge.tsx components/ui/popover.tsx scripts/hash-admin-password.mjs
git commit -m "chore: add dashboard deps, vitest, ui primitives, hash script"
```
(`.env.local` is git-ignored — do not commit.)

---

### Task 2: Auth core (split config) + credential verification (TDD)

**Files:**
- Create: `lib/auth/verify-credentials.ts`, `auth.config.ts`, `auth.ts`, `middleware.ts`, `app/api/auth/[...nextauth]/route.ts`
- Test: `tests/auth/verify-credentials.test.ts`

**Interfaces:**
- Produces: `verifyCredentials(email, password, env?) → Promise<AdminUser | null>`; `AdminUser = { id; email; name }`; exports `{ handlers, auth, signIn, signOut }` from `@/auth`.

- [ ] **Step 1: Write the failing test**

`tests/auth/verify-credentials.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";
import { verifyCredentials } from "@/lib/auth/verify-credentials";

const env = { ADMIN_EMAIL: "admin@srv783840.hstgr.cloud", ADMIN_PASSWORD_HASH: bcrypt.hashSync("Luckwith2026@", 4) } as NodeJS.ProcessEnv;

describe("verifyCredentials", () => {
  it("returns the admin user for correct email + password", async () => {
    const u = await verifyCredentials("admin@srv783840.hstgr.cloud", "Luckwith2026@", env);
    expect(u).toEqual({ id: "admin", email: "admin@srv783840.hstgr.cloud", name: "Admin" });
  });
  it("is case-insensitive on email and trims", async () => {
    expect(await verifyCredentials("  ADMIN@SRV783840.HSTGR.CLOUD ", "Luckwith2026@", env)).not.toBeNull();
  });
  it("returns null for wrong password", async () => {
    expect(await verifyCredentials("admin@srv783840.hstgr.cloud", "nope", env)).toBeNull();
  });
  it("returns null for unknown email", async () => {
    expect(await verifyCredentials("x@y.com", "Luckwith2026@", env)).toBeNull();
  });
  it("returns null when env not configured", async () => {
    expect(await verifyCredentials("a", "b", {} as NodeJS.ProcessEnv)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/auth/verify-credentials.test.ts` → Expected: FAIL (module not found).

- [ ] **Step 3: Implement `verify-credentials.ts`**

```ts
import bcrypt from "bcryptjs";

export interface AdminUser { id: string; email: string; name: string; }

export async function verifyCredentials(
  email: string,
  password: string,
  env: NodeJS.ProcessEnv = process.env,
): Promise<AdminUser | null> {
  const adminEmail = env.ADMIN_EMAIL;
  const hash = env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !hash) return null;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return null;
  const ok = await bcrypt.compare(password, hash);
  return ok ? { id: "admin", email: adminEmail, name: "Admin" } : null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/auth/verify-credentials.test.ts` → Expected: PASS (5 tests).

- [ ] **Step 5: Wire Auth.js (edge-safe split)**

`auth.config.ts`:
```ts
import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname.startsWith("/dashboard")) return isLoggedIn;
      return true;
    },
  },
} satisfies NextAuthConfig;
```
`auth.ts`:
```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { verifyCredentials } from "@/lib/auth/verify-credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: (c) => verifyCredentials(String(c?.email ?? ""), String(c?.password ?? "")),
    }),
  ],
});
```
`middleware.ts`:
```ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
export default NextAuth(authConfig).auth;
export const config = { matcher: ["/dashboard/:path*"] };
```
`app/api/auth/[...nextauth]/route.ts`:
```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

- [ ] **Step 6: Typecheck + commit**

Run: `npx tsc --noEmit` → Expected: no errors.
```bash
git add lib/auth/verify-credentials.ts auth.config.ts auth.ts middleware.ts "app/api/auth/[...nextauth]/route.ts" tests/auth/verify-credentials.test.ts
git commit -m "feat: add auth.js v5 credentials auth with bcrypt admin"
```

---

### Task 3: Login page + dashboard stub (verify the gate end-to-end)

**Files:**
- Create: `app/login/page.tsx`, `app/login/login-form.tsx`, `app/dashboard/page.tsx` (stub), `app/dashboard/sign-out-button.tsx`

**Interfaces:**
- Consumes: `signIn`, `signOut`, `auth` from `@/auth`.
- Produces: working `/login` → `/dashboard` redirect; sign-out.

- [ ] **Step 1: Login form (client) with server action**

`app/login/login-form.tsx` (`'use client'`): brand-styled card using existing `@/components/ui/{input,label,button}`. Email + password fields. Submits to a server action that calls `signIn("credentials", { email, password, redirectTo: "/dashboard" })`; on `AuthError` (CredentialsSignin) show "Email atau password salah." Use `useActionState` for the error. No inline styles; brand `#3176E4` submit button. Accessible labels + focus ring preserved.

`app/login/page.tsx` (RSC): if `await auth()` already has a user → `redirect("/dashboard")`; else render `<LoginForm/>` centered, brand background.

- [ ] **Step 2: Dashboard stub + sign out**

`app/dashboard/page.tsx` (RSC): `const session = await auth(); if (!session) redirect("/login");` render `<h1>Dashboard</h1>` + `<SignOutButton/>` for now.
`app/dashboard/sign-out-button.tsx`: form with server action `await signOut({ redirectTo: "/login" })`, brand outline button.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`. Verify:
- Visiting `/dashboard` while logged out → redirected to `/login`.
- Wrong password → inline error, stays on `/login`.
- Correct creds (`admin@srv783840.hstgr.cloud` / `Luckwith2026@`) → lands on `/dashboard`.
- Sign out → back to `/login`; `/dashboard` blocked again.

- [ ] **Step 4: Commit**

```bash
git add app/login app/dashboard
git commit -m "feat: add login page, auth gate, and dashboard stub"
```

---

### Task 4: Data layer — types + PocketBase server helpers + GET API

**Files:**
- Create: `lib/ntt-data/types.ts`, `lib/ntt-data/pocketbase.ts`
- Modify: `app/api/ntt-data/route.ts` (add `GET`; keep `POST`)

**Interfaces:**
- Produces: `NttDataRecord`; `NttDataFileField = "pick_deck" | "company_description_pdf"`; `ApiResponse<T> = { success: boolean; data?: T; error?: string }`; `fetchAllRecords(): Promise<NttDataRecord[]>`; `getRecord(id): Promise<NttDataRecord | null>`; `fetchRecordFile(id, filename): Promise<Response>`.

- [ ] **Step 1: Types**

`lib/ntt-data/types.ts`:
```ts
export type NttDataFileField = "pick_deck" | "company_description_pdf";

export interface NttDataRecord {
  collectionId: string; collectionName: string; id: string;
  full_name: string; email: string; phone_number: number | string;
  job_title: string; startup_name: string; website: string;
  business_mode: string; country: string; city: string;
  company_address: string; problem_statement: string;
  did_you_hear_about_us: string; pick_deck: string; funding_stage: string;
  company_description_pdf: string; company_description: string;
  created: string; updated: string;
}

export interface ApiResponse<T> { success: boolean; data?: T; error?: string; }
```

- [ ] **Step 2: PocketBase server helpers**

`lib/ntt-data/pocketbase.ts`:
```ts
import "server-only";
import type { NttDataRecord } from "./types";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "https://pb.ntt-startupchallenge.com";

function authToken(): string {
  const t = process.env.POCKETBASE_SUPERUSER_TOKEN || process.env.POCKETBASE_TOKEN;
  if (!t) throw new Error("POCKETBASE_SUPERUSER_TOKEN is not configured");
  return t;
}

export async function fetchAllRecords(): Promise<NttDataRecord[]> {
  const perPage = 500;
  const all: NttDataRecord[] = [];
  let page = 1, totalPages = 1;
  do {
    const url = `${POCKETBASE_URL}/api/collections/ntt_data/records?perPage=${perPage}&page=${page}&sort=-created`;
    const res = await fetch(url, { headers: { Authorization: authToken() }, cache: "no-store" });
    if (!res.ok) throw new Error(`PocketBase list failed: ${res.status}`);
    const json = (await res.json()) as { items: NttDataRecord[]; totalPages: number };
    all.push(...json.items);
    totalPages = json.totalPages ?? 1;
    page += 1;
  } while (page <= totalPages);
  return all;
}

export async function getRecord(id: string): Promise<NttDataRecord | null> {
  const res = await fetch(`${POCKETBASE_URL}/api/collections/ntt_data/records/${id}`, {
    headers: { Authorization: authToken() }, cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`PocketBase get failed: ${res.status}`);
  return (await res.json()) as NttDataRecord;
}

export async function fetchRecordFile(id: string, filename: string): Promise<Response> {
  // Obtain a short-lived file token so protected file fields are accessible.
  let qs = "";
  try {
    const tok = await fetch(`${POCKETBASE_URL}/api/files/token`, {
      method: "POST", headers: { Authorization: authToken() }, cache: "no-store",
    });
    if (tok.ok) { const { token } = await tok.json(); if (token) qs = `?token=${token}`; }
  } catch { /* public files need no token; ignore */ }
  return fetch(`${POCKETBASE_URL}/api/files/ntt_data/${id}/${encodeURIComponent(filename)}${qs}`, { cache: "no-store" });
}
```

- [ ] **Step 3: Add session-guarded GET to existing route**

In `app/api/ntt-data/route.ts` add (keep existing imports + POST):
```ts
import { auth } from "@/auth";
import { fetchAllRecords } from "@/lib/ntt-data/pocketbase";
import type { ApiResponse, NttDataRecord } from "@/lib/ntt-data/types";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json<ApiResponse<never>>({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await fetchAllRecords();
    return NextResponse.json<ApiResponse<NttDataRecord[]>>({ success: true, data });
  } catch {
    return NextResponse.json<ApiResponse<never>>({ success: false, error: "Failed to load records" }, { status: 502 });
  }
}
```

- [ ] **Step 4: Manual verification**

With dev server + logged in, open `http://localhost:3000/api/ntt-data` in the authed browser → Expected: `{ "success": true, "data": [ ... ] }`. Logged out (or via curl without cookie) → `401 { success:false }`.

- [ ] **Step 5: Typecheck + commit**

Run: `npx tsc --noEmit` → no errors.
```bash
git add lib/ntt-data/types.ts lib/ntt-data/pocketbase.ts app/api/ntt-data/route.ts
git commit -m "feat: add ntt_data types, pocketbase helpers, and guarded GET list"
```

---

### Task 5: File download proxy

**Files:**
- Create: `app/api/ntt-data/[id]/file/[field]/route.ts`

**Interfaces:**
- Consumes: `auth`, `getRecord`, `fetchRecordFile`.
- Produces: `GET /api/ntt-data/:id/file/:field` → streamed attachment.

- [ ] **Step 1: Implement the proxy (Next 16 async params)**

```ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRecord, fetchRecordFile } from "@/lib/ntt-data/pocketbase";

const ALLOWED = new Set(["pick_deck", "company_description_pdf"]);

export async function GET(_req: Request, ctx: { params: Promise<{ id: string; field: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, field } = await ctx.params;
  if (!ALLOWED.has(field)) return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  const record = await getRecord(id);
  const filename = record?.[field as "pick_deck" | "company_description_pdf"];
  if (!filename) return NextResponse.json({ error: "File not found" }, { status: 404 });
  const file = await fetchRecordFile(id, filename);
  if (!file.ok || !file.body) return NextResponse.json({ error: "Upstream fetch failed" }, { status: 502 });
  return new NextResponse(file.body, {
    headers: {
      "Content-Type": file.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
    },
  });
}
```

- [ ] **Step 2: Manual verification**

Find a record id with a `pick_deck` value (from the GET list). Visit `/api/ntt-data/<id>/file/pick_deck` while authed → file downloads. Invalid field → 400. Unknown id → 404. Logged out → 401.

- [ ] **Step 3: Commit**

```bash
git add "app/api/ntt-data/[id]/file/[field]/route.ts"
git commit -m "feat: add authenticated pocketbase file download proxy"
```

---

### Task 6: Pure client utils — `is-new`, `export-selection`, columns config (TDD)

**Files:**
- Create: `lib/ntt-data/is-new.ts`, `lib/ntt-data/export-selection.ts`, `lib/ntt-data/columns-config.ts`
- Test: `tests/ntt-data/is-new.test.ts`, `tests/ntt-data/export-selection.test.ts`

**Interfaces:**
- Produces: `isNew(record, now?) → boolean`; `resolveExportRows<T>(selected, filtered) → T[]`; `COLUMN_META`, `COLUMN_META_BY_KEY`.

- [ ] **Step 1: Failing tests**

`tests/ntt-data/is-new.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { isNew } from "@/lib/ntt-data/is-new";
const NOW = Date.parse("2026-06-27T12:00:00Z");
describe("isNew", () => {
  it("true when created within 24h", () => {
    expect(isNew({ created: "2026-06-27T00:00:01Z", updated: "2026-06-27T00:00:01Z" }, NOW)).toBe(true);
  });
  it("true when updated within 24h even if created older", () => {
    expect(isNew({ created: "2026-01-01T00:00:00Z", updated: "2026-06-27T06:00:00Z" }, NOW)).toBe(true);
  });
  it("false when both older than 24h", () => {
    expect(isNew({ created: "2026-06-25T00:00:00Z", updated: "2026-06-25T00:00:00Z" }, NOW)).toBe(false);
  });
  it("false exactly at the 24h boundary", () => {
    expect(isNew({ created: "2026-06-26T12:00:00Z", updated: "2026-06-26T12:00:00Z" }, NOW)).toBe(false);
  });
  it("handles empty updated", () => {
    expect(isNew({ created: "2026-06-27T11:00:00Z", updated: "" }, NOW)).toBe(true);
  });
});
```
`tests/ntt-data/export-selection.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { resolveExportRows } from "@/lib/ntt-data/export-selection";
describe("resolveExportRows", () => {
  it("returns selected when any selected", () => {
    expect(resolveExportRows([1, 2], [1, 2, 3, 4])).toEqual([1, 2]);
  });
  it("returns filtered when none selected", () => {
    expect(resolveExportRows([], [3, 4])).toEqual([3, 4]);
  });
});
```

- [ ] **Step 2: Run → fail**

Run: `npx vitest run tests/ntt-data` → Expected: FAIL (modules not found).

- [ ] **Step 3: Implement**

`lib/ntt-data/is-new.ts`:
```ts
import type { NttDataRecord } from "./types";
const NEW_WINDOW_MS = 24 * 60 * 60 * 1000;
export function isNew(r: Pick<NttDataRecord, "created" | "updated">, now: number = Date.now()): boolean {
  const c = Date.parse(r.created);
  const u = r.updated ? Date.parse(r.updated) : c;
  const ts = Math.max(Number.isNaN(c) ? -Infinity : c, Number.isNaN(u) ? -Infinity : u);
  return Number.isFinite(ts) && now - ts < NEW_WINDOW_MS;
}
```
`lib/ntt-data/export-selection.ts`:
```ts
export function resolveExportRows<T>(selected: readonly T[], filtered: readonly T[]): T[] {
  return selected.length > 0 ? [...selected] : [...filtered];
}
```
`lib/ntt-data/columns-config.ts`: export
```ts
import type { NttDataRecord } from "./types";
export type ColumnKind = "text" | "facet" | "file" | "date";
export interface ColumnMeta { key: keyof NttDataRecord; label: string; kind: ColumnKind; defaultVisible: boolean; }
export const COLUMN_META: ColumnMeta[] = [ /* all 19 fields with label/kind/defaultVisible */ ];
export const COLUMN_META_BY_KEY: Record<string, ColumnMeta> = Object.fromEntries(COLUMN_META.map(m => [m.key, m]));
```
Facets: `business_mode`, `funding_stage`, `country`. Files: `pick_deck`, `company_description_pdf`. Dates: `created`, `updated`. Default-visible: full_name, email, phone_number, job_title, startup_name, country, business_mode, funding_stage, created.

- [ ] **Step 4: Run → pass**

Run: `npx vitest run tests/ntt-data` → Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/ntt-data/is-new.ts lib/ntt-data/export-selection.ts lib/ntt-data/columns-config.ts tests/ntt-data
git commit -m "feat: add is-new, export-selection, and column metadata (TDD)"
```

---

### Task 7: Excel export builder

**Files:**
- Create: `lib/ntt-data/export-xlsx.ts`
- Test: `tests/ntt-data/export-xlsx.test.ts`

**Interfaces:**
- Consumes: `NttDataRecord`, `COLUMN_META_BY_KEY`.
- Produces: `recordsToAoa(records, keys) → (string|number)[][]` (TESTABLE); `downloadXlsx(records, keys, filename)` (browser side-effect).

- [ ] **Step 1: Failing test for the pure mapping**

`tests/ntt-data/export-xlsx.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { recordsToAoa } from "@/lib/ntt-data/export-xlsx";
import type { NttDataRecord } from "@/lib/ntt-data/types";
const rec = { id: "r1", full_name: "Jane", email: "j@x.io", pick_deck: "deck.pdf", created: "2026-06-27T00:00:00Z" } as NttDataRecord;
describe("recordsToAoa", () => {
  it("emits header row + values for selected keys", () => {
    const aoa = recordsToAoa([rec], ["full_name", "email"]);
    expect(aoa[0]).toEqual(["Full Name", "Email"]);
    expect(aoa[1]).toEqual(["Jane", "j@x.io"]);
  });
  it("renders file fields as the filename", () => {
    const aoa = recordsToAoa([rec], ["pick_deck"]);
    expect(aoa[1]).toEqual(["deck.pdf"]);
  });
});
```

- [ ] **Step 2: Run → fail.** `npx vitest run tests/ntt-data/export-xlsx.test.ts`

- [ ] **Step 3: Implement**

`lib/ntt-data/export-xlsx.ts`: `recordsToAoa` maps keys→labels (from `COLUMN_META_BY_KEY`, fallback to the key) for the header and pulls `String(record[key] ?? "")` for cells (file fields naturally become the stored filename). `downloadXlsx` uses `import * as XLSX from "xlsx"`: `aoa_to_sheet(recordsToAoa(...))` → `book_new` → `book_append_sheet(wb, ws, "ntt_data")` → `writeFile(wb, filename)`. Keep `downloadXlsx` thin (untested); all branching lives in `recordsToAoa`.

- [ ] **Step 4: Run → pass.** `npx vitest run tests/ntt-data/export-xlsx.test.ts` → PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/ntt-data/export-xlsx.ts tests/ntt-data/export-xlsx.test.ts
git commit -m "feat: add xlsx export builder (TDD on row mapping)"
```

---

### Task 8: Data table core — columns + TanStack instance

**Files:**
- Create: `components/dashboard/new-badge.tsx`, `components/dashboard/columns.tsx`, `components/dashboard/data-table.tsx`, `components/dashboard/data-table-pagination.tsx`

**Interfaces:**
- Consumes: `NttDataRecord`, `isNew`, `COLUMN_META`, `@/components/ui/{table,checkbox,badge,button,select}`.
- Produces: `<DataTable data={NttDataRecord[]} />`; `getColumns(): ColumnDef<NttDataRecord>[]`.

- [ ] **Step 1: NewBadge**

`new-badge.tsx` (`'use client'`): `function NewBadge({ created, updated }: Pick<NttDataRecord,"created"|"updated">)` → renders `<Badge variant="new">New</Badge>` when `isNew({created,updated})`, else `null`. (Client so "now" reflects load time.)

- [ ] **Step 2: Columns**

`columns.tsx` (`'use client'`): `getColumns()` returns:
- **select** column: header = select-all checkbox bound to `table.getIsAllPageRowsSelected()` / `toggleAllPageRowsSelected`; cell = row checkbox. Use `@/components/ui/checkbox` (Base UI). `enableSorting:false, enableHiding:false`.
- One column per `COLUMN_META` entry: `accessorKey: key`, `header` = sortable button (label + `lucide-react` arrow) toggling `column.toggleSorting`, `enableColumnFilter:true`. First data column (`full_name`) cell also renders `<NewBadge/>` beside the name. **file** columns: cell renders a download `<a href={`/api/ntt-data/${row.original.id}/file/${key}`}>` with a `lucide-react` Download icon, or "—" when empty. **date** columns: cell formats `toLocaleString`.
- **actions** column: cell renders `<RowActions record={row.original}/>` (Task 10), `enableHiding:false`.

- [ ] **Step 3: DataTable**

`data-table.tsx` (`'use client'`): create `useReactTable` with `getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getFacetedRowModel, getFacetedUniqueValues`. State: `rowSelection, sorting, columnFilters, columnVisibility, globalFilter`. Initialize `columnVisibility` from `COLUMN_META` `defaultVisible`. `globalFilterFn: "includesString"`. Render `<DataTableToolbar table={table}/>` (Task 9) + `<Table>` from `@/components/ui/table` mapping `getHeaderGroups`/`getRowModel().rows` + `<DataTablePagination table={table}/>`. Empty state row when no results.

- [ ] **Step 4: Pagination**

`data-table-pagination.tsx`: selected-count text (`table.getFilteredSelectedRowModel().rows.length` of `table.getFilteredRowModel().rows.length`); rows-per-page `Select` (10/20/30/50/100) → `table.setPageSize`; "Page X of Y"; first/prev/next/last buttons wired to table pagination API + `lucide-react` chevrons. Brand styling; disabled states; aria-labels.

- [ ] **Step 5: Mount on dashboard + manual verify**

Temporarily render `<DataTable data={records}/>` in `app/dashboard/page.tsx` (Task 11 finalizes it). Run dev, log in. Verify: rows render, sort toggles, row + select-all checkboxes work, pagination changes pages/size, "New" badge shows on recent rows, file links download, dates format.

- [ ] **Step 6: Typecheck + commit**

Run: `npx tsc --noEmit`.
```bash
git add components/dashboard/new-badge.tsx components/dashboard/columns.tsx components/dashboard/data-table.tsx components/dashboard/data-table-pagination.tsx
git commit -m "feat: add data table core, columns, new badge, pagination"
```

---

### Task 9: Toolbar — global search, column visibility, per-column filters, export

**Files:**
- Create: `components/dashboard/toolbar.tsx`, `components/dashboard/column-filter.tsx`, `components/dashboard/export-button.tsx`

**Interfaces:**
- Consumes: `Table<NttDataRecord>`, `resolveExportRows`, `downloadXlsx`, `COLUMN_META_BY_KEY`, Base UI `dropdown-menu`/`popover`/`input`/`select`.
- Produces: `<DataTableToolbar table/>`, `<ColumnFilter column/>`, `<ExportButton table/>`.

- [ ] **Step 1: Toolbar**

`toolbar.tsx`: left = global search `Input` bound to `table.getState().globalFilter` / `table.setGlobalFilter`. Right = **Columns** `DropdownMenu` listing `table.getAllColumns().filter(c=>c.getCanHide())` with checkbox items toggling `column.toggleVisibility` (remember: Base UI `DropdownMenuCheckboxItem`; group labels need `DropdownMenuGroup`). Plus `<ExportButton table/>`. Optional "Reset" when filters active (`table.resetColumnFilters`).

- [ ] **Step 2: Per-column filter**

`column-filter.tsx`: given a `Column`, if its `COLUMN_META_BY_KEY[col.id].kind === "facet"` render a `Popover` with the faceted unique values (`column.getFacetedUniqueValues()`) as checkboxes building an array filter value (with an array `filterFn` on those columns); else render a small text `Input` setting `column.setFilterValue`. Render this control under the header label in `columns.tsx` header. Use Base UI `Popover` wrapper from Task 1.

- [ ] **Step 3: Export button**

`export-button.tsx` (`'use client'`):
```tsx
const selected = table.getFilteredSelectedRowModel().rows.map(r => r.original);
const filtered = table.getFilteredRowModel().rows.map(r => r.original);
const rows = resolveExportRows(selected, filtered);
const keys = table.getVisibleLeafColumns().map(c => c.id).filter(id => id in COLUMN_META_BY_KEY);
downloadXlsx(rows, keys, `ntt-data-${new Date().toISOString().slice(0,10)}.xlsx`);
```
Disable when `rows.length === 0`. Label shows count, e.g. "Export (12)".

- [ ] **Step 4: Manual verify**

Search filters across columns; faceted filter on `business_mode`/`funding_stage`/`country` narrows rows; column toggle hides/shows; Export with selection → only selected rows; Export with none selected but filtered → filtered set; open the .xlsx to confirm headers + values.

- [ ] **Step 5: Typecheck + commit**

```bash
git add components/dashboard/toolbar.tsx components/dashboard/column-filter.tsx components/dashboard/export-button.tsx components/dashboard/columns.tsx
git commit -m "feat: add toolbar search, column visibility, per-column filters, export"
```

---

### Task 10: Row detail dialog + row actions

**Files:**
- Create: `components/dashboard/record-detail.tsx`, `components/dashboard/row-actions.tsx`

**Interfaces:**
- Consumes: `NttDataRecord`, Base UI `dialog` (`@/components/ui/dialog`), `COLUMN_META`, `isNew`.
- Produces: `<RowActions record/>`.

- [ ] **Step 1: Record detail**

`record-detail.tsx`: a `Dialog` (Base UI) showing all 19 fields as label/value rows; long-text fields (`problem_statement`, `company_description`, `company_address`) render full, wrapped, scrollable. File fields render download buttons → `/api/ntt-data/${id}/file/${field}` (or "No file"). Dates localized. "New" badge in the header when `isNew`.

- [ ] **Step 2: Row actions**

`row-actions.tsx`: an eye `lucide-react` icon button opening `<RecordDetail/>`. (Keep it to "View" only — read-only per scope.)

- [ ] **Step 3: Manual verify** — open a few rows; long text readable; PDFs download; empty files show "No file"; dialog keyboard-accessible (Esc closes, focus trap), opened via interaction (Base UI errors surface on open).

- [ ] **Step 4: Commit**

```bash
git add components/dashboard/record-detail.tsx components/dashboard/row-actions.tsx
git commit -m "feat: add per-row detail dialog with file downloads"
```

---

### Task 11: Dashboard page finalization — fetch, error state, layout, sign-out

**Files:**
- Modify: `app/dashboard/page.tsx`

**Interfaces:**
- Consumes: `auth`, `fetchAllRecords`, `<DataTable/>`, `<SignOutButton/>`.

- [ ] **Step 1: Wire the page (RSC)**

`app/dashboard/page.tsx`:
```tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchAllRecords } from "@/lib/ntt-data/pocketbase";
import { DataTable } from "@/components/dashboard/data-table";
import { SignOutButton } from "./sign-out-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Dashboard — NTT Startup Challenge" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  let records: Awaited<ReturnType<typeof fetchAllRecords>> = [];
  let error: string | null = null;
  try { records = await fetchAllRecords(); }
  catch { error = "Gagal memuat data. Coba muat ulang."; }
  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#154284]">NTT Startup Challenge — Registrations</h1>
        <SignOutButton />
      </header>
      {error ? <p className="text-red-600">{error}</p> : <DataTable data={records} />}
    </main>
  );
}
```

- [ ] **Step 2: Manual verify (full flow)** — login → table loads → search/filter/sort/columns/select/export/detail/download all work → sign out. Simulate PB failure (temporarily break token) → friendly error, no crash.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "feat: finalize dashboard page with data fetch and error state"
```

---

### Task 12: Final verification, accessibility & docs

- [ ] **Step 1: Full test + typecheck + lint + build**

Run: `npm test` (all green), `npx tsc --noEmit` (clean), `npm run lint` (clean), `npm run build` (succeeds).

- [ ] **Step 2: Accessibility & brand pass** — keyboard-navigate the table/toolbar/dialog; focus rings intact; AA contrast on brand buttons/links; no inline styles introduced; no `console.log` left.

- [ ] **Step 3: Update docs** — append a "Dashboard" section to `CLAUDE.md`/README: routes (`/login`, `/dashboard`), required env (`AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`), how to rotate the admin password (`node scripts/hash-admin-password.mjs`). Update `.wolf/anatomy.md` + `.wolf/memory.md` per OpenWolf.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: document dashboard routes, env, and admin password rotation"
```

---

## Self-Review

**Spec coverage:** login/Auth.js (T2-3) ✓; protected routes (T2 middleware + T4/T5 API guards) ✓; data table via shadcn (T8) ✓; global search (T9) ✓; per-column filter (T9) ✓; sort (T8) ✓; column visibility "View" (T9) ✓; multiselect (T8 select column) ✓; pagination (T8) ✓; "New" 24h badge (T6 logic + T8 render) ✓; Excel export selected-else-filtered (T6/T7 + T9 button) ✓; click-to-download files (T5 proxy + T8/T10 links) ✓; light/brand theme (Global Constraints + T11) ✓; row detail (T10) ✓; error states (T11) ✓; tests (T2/T6/T7) ✓.

**Placeholder scan:** UI tasks intentionally specify contract+pattern+verification rather than full line-by-line code (declared at top); all logic/security code is complete. No "TBD/handle errors/similar to Task N".

**Type consistency:** `NttDataRecord`, `NttDataFileField`, `ApiResponse<T>`, `AdminUser`, `isNew`, `resolveExportRows`, `recordsToAoa`, `fetchAllRecords`/`getRecord`/`fetchRecordFile`, `getColumns`, `COLUMN_META`/`COLUMN_META_BY_KEY` used consistently across tasks.

## Execution Handoff

See chat for the execution-mode choice.
