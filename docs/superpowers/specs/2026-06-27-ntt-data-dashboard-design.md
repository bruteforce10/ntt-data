# Design: Protected Admin Dashboard for `ntt_data`

> Status: Approved (2026-06-27). Next step: implementation plan via `writing-plans`.
> Branch: `feat/ntt-data-dashboard`

## 1. Problem & Goal

Build an internal, authenticated admin dashboard that lists the `ntt_data` PocketBase
collection (startup-challenge registrations) in a rich data table. Admins must be able to
search, filter per column, sort, toggle columns, multi-select rows, export to Excel, see a
"New" badge on recently added/updated records, and download the uploaded PDF files
(pitch deck + company description).

The public marketing site is unchanged. Only the new dashboard routes require login.

## 2. Decisions (confirmed with user)

- **"New" badge:** pure **24-hour window** — a row is "New" when `max(created, updated)`
  is within the last 24h. No PocketBase schema change, no per-viewer tracking. A fresh
  registration shows "New" for 1×24h; an edited record re-flags for 24h.
- **Theme:** **light / brand** — match the existing public NTT site (light surface,
  `#3176E4` primary, `#0070C0` accent, `#154284` headings, Noto Sans). The reference
  screenshot defines the *layout & feature set*, not the dark palette.
- **Export:** **selected rows, else current filtered/searched view** → `.xlsx`.
- **Files:** `pick_deck` & `company_description_pdf` are **click-to-download** links.

## 3. Architecture

```
Browser ──> Next.js Route Handler (server) ──> PocketBase
            (Auth.js session-gated)            (POCKETBASE_SUPERUSER_TOKEN, server-only)
```

The browser never talks to PocketBase directly and never sees the superuser token.
This reuses the pattern already established in the existing `app/api/ntt-data/route.ts`
(`POST` registration handler), which authenticates to PocketBase with
`POCKETBASE_SUPERUSER_TOKEN` and `POCKETBASE_URL`.

### Routes

| Route | Type | Purpose |
|---|---|---|
| `/login` | public page | Credentials login form (brand-styled). |
| `/dashboard` | protected page (RSC) | Fetches all records server-side, renders client table. |
| `middleware.ts` | edge | Redirects unauthenticated requests for `/dashboard/*` and `/api/ntt-data/*` to `/login`. |
| `app/api/auth/[...nextauth]/route.ts` | route handler | Auth.js GET/POST handlers. |
| `app/api/ntt-data` (`GET`) | route handler | Session-gated list proxy → PocketBase. (`POST` stays as-is.) |
| `app/api/ntt-data/[id]/file/[field]` (`GET`) | route handler | Streams a record's PDF file from PocketBase (download proxy). |

## 4. Authentication — Auth.js v5 (`next-auth@beta`)

Confirmed via Context7 (`/websites/authjs_dev`). Standard App Router pattern, with the
**split-config** approach because middleware runs on the **Edge runtime** (bcrypt cannot
run on edge; it must live in the Node-runtime `authorize`).

- **`auth.config.ts`** (edge-safe): `pages.signIn = '/login'`, `callbacks.authorized`
  (used by middleware to allow/deny based on session + path). No bcrypt import here.
- **`auth.ts`**: `NextAuth({ ...authConfig, providers: [Credentials({ authorize })],
  session: { strategy: 'jwt' } })`. Exports `{ handlers, auth, signIn, signOut }`.
  `authorize` (Node runtime) validates email + compares password against a bcrypt hash.
- **`middleware.ts`**: `export default NextAuth(authConfig).auth;` with a matcher that
  covers `/dashboard/:path*` and the protected API. Edge-safe (no bcrypt).

### Credentials (single admin)

Stored in `.env.local` (git-ignored) — never hardcoded in source:

```
AUTH_SECRET=<generated>
ADMIN_EMAIL=admin@srv783840.hstgr.cloud
ADMIN_PASSWORD_HASH=<bcrypt hash of "Luckwith2026@">
```

`scripts/hash-admin-password.mjs` generates the hash once. `authorize` returns the admin
user only when email matches `ADMIN_EMAIL` and `bcrypt.compare(password, ADMIN_PASSWORD_HASH)`
is true; otherwise it returns `null` / throws "Invalid credentials".

## 5. Data Layer

- **`lib/ntt-data/types.ts`** — `NttDataRecord` type matching the 19 PocketBase fields:
  `id, full_name, email, phone_number, job_title, startup_name, website, business_mode,
  country, city, company_address, problem_statement, did_you_hear_about_us, pick_deck,
  funding_stage, company_description_pdf, company_description, created, updated`
  (plus `collectionId`, `collectionName`).
- **`lib/ntt-data/pocketbase.ts`** — server-only helper: `fetchAllRecords()` pages through
  `GET {POCKETBASE_URL}/api/collections/ntt_data/records?perPage=500&sort=-created` with
  `Authorization: <superuser token>` until exhausted; returns `NttDataRecord[]`. Also a
  `fetchFile(id, field)` helper for the download proxy (obtains a PocketBase file token
  server-side when the file field is protected, then streams the file).
- **`GET /api/ntt-data`** — session-gated; returns `{ success, data, error }`
  (`ApiResponse<NttDataRecord[]>`). `cache: 'no-store'`.
- **Fetch strategy:** **fetch all rows once** (≈340 today; "Page 1 of 34" @10/page in the
  reference) and run search/filter/sort/paginate **client-side** for instant interaction
  and trivial export. *Documented alternative:* server-side pagination — only worth it past
  ~5k rows (YAGNI now). If the dataset grows large, switch the API to accept
  `page/perPage/sort/filter` and push them to PocketBase.

## 6. Table UI — TanStack Table + shadcn (Base UI registry)

> The project's shadcn components import from **`@base-ui/react`**, NOT Radix. New
> primitives must be added via the Base UI registry and any ported TanStack/shadcn
> examples must be translated to Base UI APIs (`asChild`→`render`, etc.).

`@tanstack/react-table` is headless (UI-agnostic) and pairs with the existing Base UI
primitives plus three new ones (`table`, `badge`, `popover`).

### Toolbar (mirrors reference, light/brand theme)
- **Global search** input (top-left) — TanStack `globalFilter`.
- **Per-column filtering** — sortable headers + a filter control per column:
  text "contains" for free-text columns; **faceted select** for low-cardinality columns
  (`business_mode`, `funding_stage`, `country`).
- **Columns** dropdown (the "View" button in the screenshot) — toggle visibility of any
  of the 19 fields.
- **Export** button — see §8.

### Body
- **Multiselect** — leading checkbox column; header checkbox = select-all-on-current-page.
  Selection drives Export.
- **"New" badge** — see §7.
- **Default visible columns** (~9, like the reference): `full_name, email, phone_number,
  job_title, startup_name, country, business_mode, funding_stage, created`. The rest are
  hidden by default but toggleable. File columns render download links.
- **Per-row "View"** (eye icon) → opens `record-detail` (Base UI dialog/sheet) showing the
  full record, including readable long text (`problem_statement`, `company_description`,
  `company_address`) and file download buttons.

### Footer
- Rows-per-page `select` + page navigation (first/prev/next/last) + "Page X of Y", like the
  reference.

### Components (small, focused files)
```
components/dashboard/
  data-table.tsx      table shell, TanStack instance, state wiring
  columns.tsx         column defs (accessor, header, cell renderers, badges, links)
  toolbar.tsx         search + column-visibility + export
  column-filter.tsx   per-column text / faceted filter control
  row-actions.tsx     per-row "View" trigger
  record-detail.tsx   full-record dialog/sheet
  new-badge.tsx       "New" badge (24h)
  export-button.tsx   selected-else-filtered xlsx export
```

## 7. "New" Badge

`lib/ntt-data/is-new.ts`:

```ts
const NEW_WINDOW_MS = 24 * 60 * 60 * 1000;
export function isNew(record: Pick<NttDataRecord, 'created' | 'updated'>, now = Date.now()): boolean {
  const ts = Math.max(Date.parse(record.created), Date.parse(record.updated || record.created));
  return Number.isFinite(ts) && now - ts < NEW_WINDOW_MS;
}
```

Rendered as a brand-blue (`#3176E4`) "New" badge in the first data column (and/or the
`created` cell). Purely derived from timestamps — no storage, no PocketBase change.

## 8. Excel Export

`lib/ntt-data/export-xlsx.ts` using **SheetJS (`xlsx`)**, client-side:
- Rows = **checked rows** if any are selected; otherwise the **current filtered/searched**
  (and sorted) rows from the table model.
- Columns = current **visible** columns (file columns export the file name/URL, not binary).
- Output: `ntt-data-YYYY-MM-DD.xlsx`, single sheet, header row from column labels.
- *Install note:* SheetJS's npm `xlsx` is outdated; install from the official source
  (`https://cdn.sheetjs.com/...tgz`). Fallback if problematic: `exceljs` (npm, server-side
  generation via a route handler). Confirm at implementation time.

## 9. File Download (click-to-download)

`GET /api/ntt-data/[id]/file/[field]` (session-gated):
- Validates `field ∈ { pick_deck, company_description_pdf }` and that the record has a
  non-empty value for it.
- Fetches the file from PocketBase server-side using the superuser token (obtaining a
  PocketBase file token first if the field is protected), then streams it back with
  `Content-Disposition: attachment; filename="..."`.
- In the table/detail, empty file fields render as "—"; present files render as a link/icon
  pointing at this proxy.

## 10. Theme — light / brand

- Reuse existing Base UI components and brand tokens: `#3176E4` primary buttons/active,
  `#0070C0` links/accents, `#154284` headings/emphasis, Noto Sans (`font-sans`).
- WCAG-AA contrast for text and controls. No inline styles (project rule) — Tailwind
  classes / component variants only.
- Dashboard is its own clean, modern admin surface; it does not need the marketing
  navbar/footer.

## 11. Dependencies

- `next-auth@beta` (Auth.js v5)
- `bcryptjs` + `@types/bcryptjs`
- `@tanstack/react-table`
- `xlsx` (SheetJS — official source) [fallback: `exceljs`]
- New shadcn (Base UI) primitives: `table`, `badge`, `popover`

## 12. Testing

- **Unit:** `is-new.ts` (boundary at exactly 24h, missing `updated`), `export-xlsx.ts`
  (selected vs filtered selection logic), `authorize` (valid / wrong email / wrong password).
- **Component:** toolbar search + column-visibility behavior; "New" badge rendering.
- **Manual:** login gate + redirect, search, per-column filter, sort, column toggle,
  multiselect + export, PDF download, session expiry → `/login`.
- Target ≥80% on new non-trivial logic (`lib/ntt-data/*`, `authorize`).

## 13. Edge Cases & Failure Modes

- Empty/very long text fields (truncate in cell, full text in detail).
- Missing/empty file fields → "—", no broken download link.
- PocketBase file token expiry → proxy re-requests a token per download.
- Session expiry → middleware redirects to `/login`.
- PocketBase unreachable / non-200 → dashboard shows a friendly error state, not a crash.
- Export with zero rows selected and an empty filtered view → disabled export + hint.

## 14. Out of Scope (YAGNI)

- Editing/creating/deleting records from the dashboard (read-only + export only).
- Multi-user / roles / password reset (single fixed admin).
- Server-side pagination (until dataset growth demands it).
- The reference screenshot's "Register & Upload" button (belongs to a different flow).
