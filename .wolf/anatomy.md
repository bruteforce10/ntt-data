# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-21T17:52:19.847Z
> Files: 44 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/76656933-c5c6-4dc9-af53-306958f53131/scratchpad/

- `append-buglog.mjs` — Declares PATH (~640 tok)
- `bookkeep.mjs` — Declares WOLF (~800 tok)
- `check-pb.mjs` — Declares envRaw (~368 tok)
- `probe-hydration.mjs` — Declares SCRATCH (~782 tok)
- `verify-deck-form.mjs` — SCRATCH: warm, send, evalJs, navigate, screenshot (~2194 tok)

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/7a26cf47-3e42-4577-af5b-502e6667d243/scratchpad/

- `verify-hash-corruption.mjs` — Declares password (~192 tok)

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/f1b4550f-e6e1-4d86-aba9-c13c3f504060/scratchpad/

- `verify-modals.mjs` — CHROME: getWsUrl, cdp, evalIn (~1313 tok)

## ./


## .claude/


## .claude/rules/


## app/

- `layout.tsx` — notoSans (~633 tok)
- `manifest.ts` — Web manifest: SITE_NAME, theme #154284, icons /icons/icon-{192,512}.png (~161 tok)
- `page.tsx` — Home: section components + canonical "/" + WebSite/Organization JSON-LD script (~412 tok)
- `robots.ts` — Allow all; disallow /api/ + /dashboard; /login stays crawlable so its noindex meta is seen; sitemap URL (~125 tok)
- `sitemap.ts` — 4 public URLs (/, /startup-registration, /faq, /deck-submission) off SITE_URL; login/dashboard excluded (~233 tok)

## app/api/auth/[...nextauth]/


## app/api/deck-submission/

- `route.ts` — GET /api/deck-submission?email=... (~2486 tok)

## app/api/fast-track/

- `route.ts` — Returns true when an ntt_data record already uses this email, false when (~1984 tok)

## app/api/ntt-data/


## app/api/ntt-data/[id]/file/[field]/

- `route.ts` — Next.js API route: GET (~388 tok)

## app/api/ntt-data/[id]/send-email/

- `route.ts` — POST: auth-protected manual trigger — fetches record from PocketBase, sends registration-confirmation email via lib/mailer (same from/subject/headers as the form flow) (~639 tok)

## app/dashboard/

- `page.tsx` — metadata — renders table (~651 tok)

## app/deck-submission/

- `page.tsx` — metadata (~329 tok)

## app/faq/

- `page.tsx` — metadata (~392 tok)

## app/fast-track/

- `page.tsx` — metadata (~332 tok)

## app/login/

- `page.tsx` — metadata (~274 tok)

## app/startup-registration/

- `page.tsx` — --- COMING SOON placeholder imports (disabled) --- (~887 tok)

## components/

- `deck-submission-form.tsx` — Error carrying the HTTP status so callers can special-case not-found. (~5868 tok)
- `fast-track-form.tsx` — EMAIL_RE — renders form (~2094 tok)
- `navbar.tsx` — Top navbar: logo + "More" dropdown (NAVBAR_ACTIONS) + Open Innovation button only, all breakpoints; nav list & mobile Sheet/hamburger removed 2026-07-13 (~650 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~3633 tok)
- `startup-registration-form.tsx` — MAX_DESCRIPTION_FILE_BYTES — renders form (~9052 tok)

## components/dashboard/

- `columns.tsx` — FileCell (~2024 tok)
- `data-table.tsx` — DataTable: toolbar search/column-toggle/Excel export (EXPORT_KEYS incl PO_01..PO_10), header sort+filter, pagination (~2600 tok)
- `email-table.tsx` — "Email Automation" table: search + simple pagination, per-row Send Email button with confirm Dialog, per-row status sending/sent/error via POST /api/ntt-data/[id]/send-email; status is session-only, not persisted (~2545 tok)
- `record-detail.tsx` — Sheet detail: iterates COLUMN_META (incl PO deck rows), file fields render as /api/ntt-data/[id]/file/[field] download links via NTT_DATA_FILE_FIELDS (~700 tok)

## components/problem/

- `problem-rich-detail.tsx` — Renders the long-form `richDetail` problem layout: trade cards, numbered pain points, dependency chain, 7 capability modules, label/description tables. Exports the `ProblemRichDetail` type consumed by problem-overview.tsx. Trade→colour map is WCAG-AA verified; brand #3176e4 deliberately excluded (4.34:1 on white) (~2502 tok)

## components/ui/

- `badge.tsx` — badgeVariants (~354 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/

- `2026-07-21-deck-submission-email-gate-design.md` — Deck Submission — Email Gate (~1782 tok)

## lib/

- `mailer.ts` — Exports transporter, buildRegistrationEmail, buildDeckSubmissionEmail (~4154 tok)
- `problem-decks.ts` — PocketBase file-field names on the ntt_data collection, one per (~510 tok)
- `site-config.ts` — Exports SITE_URL (NEXT_PUBLIC_SITE_URL, fallback https://oiw.ntt-startupchallenge.com), SITE_NAME, SITE_DESCRIPTION — single source of truth for SEO/canonical (~208 tok)
- `site-content.ts` — Exports SITE_CONTENT (~22139 tok)

## lib/auth/


## lib/ntt-data/

- `columns-config.ts` — Exports ColumnType, ColumnMeta, COLUMN_META, COLUMN_META_BY_KEY, NTT_DATA_FILE_FIELDS (~553 tok)
- `is-new.ts` — Picks the recency badge for a table row. "New" wins over "Updated" so a (~463 tok)
- `types.ts` — Exports NttDataFileField, NttDataRecord, ApiResponse (~236 tok)

## public/


## scripts/

- `generate-seo-assets.js` — Regenerates public/og-image.jpg, public/icons/icon-{192,512}.png, app/apple-icon.png from brand artwork via sharp; run `node scripts/generate-seo-assets.js` (~848 tok)

## tests/auth/


## tests/ntt-data/

- `is-new.test.ts` — Declares NOW (~864 tok)
- `problem-decks.test.ts` — Declares deck (~800 tok)

## utils/

