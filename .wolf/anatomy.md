# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-27T17:41:05.966Z
> Files: 50 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/

- `cdp-shot.mjs` — CHROME: makeClient, evaluate, shoot (~947 tok)

## ./

- `auth.config.ts` — Edge-safe Auth.js config shared by the middleware and the full `auth.ts`. (~178 tok)
- `auth.ts` (~172 tok)
- `middleware.ts` — Edge-safe: uses only `authConfig` (no Credentials/bcrypt import). The (~95 tok)
- `vitest.config.ts` (~89 tok)
- `vitest.setup.ts` (~13 tok)

## .claude/


## .claude/rules/


## app/

- `globals.css` — Styles + theme tokens; defines `font-georgia` utility via `@theme inline { --font-georgia: var(--font-georgia-base), Georgia, serif; }` (~1411 tok)
- `layout.tsx` — Root layout; loads fonts via next/font: Noto Sans (`--font-noto-sans`, default sans), Nulshock (`--font-nulshock`), Georgia local from public/georgia (`--font-georgia-base`, 4 ttf variants) (~383 tok)
- `page.tsx` — Home (~222 tok)

## app/api/auth/[...nextauth]/

- `route.ts` — Next.js API route (~22 tok)

## app/api/deck-submission/


## app/api/ntt-data/

- `route.ts` — Next.js API route: GET, POST (~1799 tok)

## app/api/ntt-data/[id]/file/[field]/

- `route.ts` — Next.js API route: GET (~382 tok)

## app/dashboard/

- `page.tsx` — DashboardPage — renders table (~431 tok)
- `sign-out-button.tsx` — SignOutButton — renders form (~122 tok)

## app/deck-submission/


## app/faq/


## app/login/

- `actions.ts` — API routes: GET (2 endpoints) (~168 tok)
- `login-form.tsx` — LoginForm — renders form (~442 tok)
- `page.tsx` — metadata (~256 tok)

## app/startup-registration/

- `page.tsx` — Startup Registration route: ACTIVE form (Navbar + FloatingDock + breadcrumb + StartupRegistrationForm + Footer); COMING SOON placeholder kept commented for restore (~829 tok)

## components/

- `about.tsx` — About; h2 heading uses `font-georgia` (Georgia) (~490 tok)
- `benefit.tsx` — Benefit (~539 tok)
- `countdown.tsx` — getTimeLeft (~1106 tok)
- `faq.tsx` — Faq (~735 tok)
- `footer.tsx` — footerLinks (~844 tok)
- `hero.tsx` — Hero; REGISTER CTA is an active Link to hero.action.href (/startup-registration) (~778 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~2109 tok)
- `program-overview.tsx` — ITEM_COUNT; "Program Overview" h2 heading uses `font-georgia` (Georgia) (~1148 tok)
- `roadmap.tsx` — Roadmap; "Program Roadmap and Timeline" section. Server Component, data-driven from `SITE_CONTENT.roadmap`. Desktop CSS grid (pills span phases, chevrons between steps); mobile vertical stack w/ rotate-90 chevrons. White icons from `public/time-line`; `font-georgia` heading (~1713 tok)
- `startup-registration-form.tsx` — MAX_DESCRIPTION_FILE_BYTES — renders form (~8228 tok)

## components/dashboard/

- `columns.tsx` — FileCell (~1535 tok)
- `data-table.tsx` — PAGE_SIZE_OPTIONS — renders table (~3688 tok)
- `record-detail.tsx` — FILE_FIELDS (~701 tok)

## components/ui/

- `badge.tsx` — badgeVariants (~317 tok)
- `popover.tsx` — Popover (~384 tok)
- `table.tsx` — Table — renders table (~699 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/

- `2026-06-27-ntt-data-dashboard.md` — NTT Admin Dashboard Implementation Plan (~9563 tok)

## docs/superpowers/specs/

- `2026-06-27-ntt-data-dashboard-design.md` — Design: Protected Admin Dashboard for `ntt_data` (~2777 tok)

## lib/

- `home-faq.ts` — Home page FAQ content — a curated, shorter set shown on the landing page. (~1019 tok)
- `site-content.ts` — Exports SITE_CONTENT (~8341 tok)

## lib/auth/

- `verify-credentials.ts` — Validates the single admin credential against env-stored values. (~246 tok)

## lib/ntt-data/

- `columns-config.ts` — Exports ColumnType, ColumnMeta, COLUMN_META, COLUMN_META_BY_KEY (~446 tok)
- `export-selection.ts` — Exports resolveExportRows (~43 tok)
- `export-xlsx.ts` — Exports recordsToAoa, downloadXlsx (~243 tok)
- `is-new.ts` — Exports isNew (~118 tok)
- `pocketbase.ts` — Exports fetchAllRecords, getRecord, fetchRecordFile (~446 tok)
- `types.ts` — Exports NttDataFileField, NttDataRecord, ApiResponse (~198 tok)

## public/


## scripts/

- `hash-admin-password.mjs` — Declares password (~65 tok)

## tests/auth/

- `verify-credentials.test.ts` — Declares env (~405 tok)

## tests/ntt-data/

- `export-selection.test.ts` — Declares filtered (~192 tok)
- `export-xlsx.test.ts` — Declares record (~262 tok)
- `is-new.test.ts` — Declares NOW (~314 tok)

## utils/

