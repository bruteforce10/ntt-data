# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-22T17:10:11.254Z
> Files: 41 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/76656933-c5c6-4dc9-af53-306958f53131/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/7a26cf47-3e42-4577-af5b-502e6667d243/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d67e2a2a-d5f5-46ce-9a6a-6ce72597cbff/scratchpad/

- `pb-diagnose.mjs` — Read-only diagnostic: PocketBase ntt_data schema + record stats. (~639 tok)
- `verify-dock.mjs` — One-off verification: full-width dock renders, its SUBMIT REGISTRATION (~928 tok)

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/f1b4550f-e6e1-4d86-aba9-c13c3f504060/scratchpad/


## ./


## .claude/


## .claude/rules/


## app/


## app/api/auth/[...nextauth]/


## app/api/deck-submission/

- `route.ts` — GET /api/deck-submission?email=... (~2585 tok)

## app/api/fast-track/

- `route.ts` — Returns true when an ntt_data record already uses this email, false when (~2004 tok)

## app/api/ntt-data/

- `route.ts` — Next.js API route: GET, POST (~2438 tok)

## app/api/ntt-data/[id]/file/[field]/


## app/api/ntt-data/[id]/send-email/


## app/dashboard/

- `page.tsx` — metadata — renders table (~630 tok)

## app/deck-submission/

- `page.tsx` — metadata (~318 tok)

## app/faq/

- `page.tsx` — metadata (~378 tok)

## app/fast-track/

- `page.tsx` — metadata (~332 tok)

## app/login/

- `page.tsx` — metadata (~264 tok)

## app/startup-registration/

- `page.tsx` — --- COMING SOON placeholder imports (disabled) --- (~928 tok)

## components/

- `about.tsx` — About (~490 tok)
- `benefit.tsx` — Benefit (~448 tok)
- `deck-submission-form.tsx` — Error carrying the HTTP status so callers can special-case not-found. (~5980 tok)
- `faq.tsx` — Faq (~639 tok)
- `fast-track-form.tsx` — EMAIL_RE — renders form (~2187 tok)
- `footer.tsx` — footerLinks (~878 tok)
- `hero.tsx` — Hero (~764 tok)
- `navbar.tsx` — NAVBAR_ACTIONS (~1492 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~3564 tok)
- `program-overview.tsx` — ITEM_COUNT (~1209 tok)
- `roadmap.tsx` — ICON_W (~1737 tok)
- `startup-registration-dock.tsx` — Registration-page replacement for the shared FloatingDock: a full-width (~1102 tok)
- `startup-registration-form.tsx` — STARTUP_REGISTRATION_FORM_ID — renders form (~9802 tok)

## components/dashboard/

- `columns.tsx` — TanStack column defs: TextCell (truncate+title); combined "Company Description" col (PDF link if company_description_pdf else text) (~2302 tok)
- `data-table.tsx` — DataTable: toolbar search/column-toggle/Excel export (EXPORT_KEYS incl PO_01..PO_10, funding_stage; company_description is ONE combined column — company_description_pdf dropped from keys), passes window.location.origin to recordsToAoa so file links are absolute; sort+filter, pagination (~3752 tok)
- `email-table.tsx` — PAGE_SIZE — renders table, modal (~2645 tok)
- `record-detail.tsx` — FILE_FIELDS (~709 tok)

## components/problem/

- `problem-rich-detail.tsx` — Each trade keeps one colour across the trade cards and the dependency chain, (~2526 tok)

## components/ui/

- `carousel.tsx` — CarouselContext (~1618 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/

- `site-content.ts` — Exports SITE_CONTENT (~22182 tok)

## lib/auth/


## lib/ntt-data/

- `columns-config.ts` — Exports ColumnType, ColumnMeta, COLUMN_META, COLUMN_META_BY_KEY + 2 more (~587 tok)
- `email-filter.ts` — buildEmailLookupFilter(email): lowercased input + PocketBase `:lower` modifier for case-insensitive registration lookup (~120 tok)
- `email-filter.ts` — Builds a PocketBase filter that matches a registration email (~161 tok)
- `export-selection.ts` — resolveExportRows(selected, filtered): selected rows if any, else the filtered set (~90 tok)
- `export-xlsx.ts` — recordsToAoa(records, keys, origin?) → header row (COLUMN_META labels) + values; file-type columns export absolute download link (origin+/api/ntt-data/:id/file/:field) not the bare filename; company_description = PDF link if company_description_pdf else the plain text. downloadXlsx dynamic-imports "xlsx" (~300 tok)
- `registration-errors.ts` — Shared helpers that turn a failed registration submit into a human-readable (~808 tok)

## public/


## scripts/


## tests/auth/


## tests/ntt-data/

- `email-filter.test.ts` — 3 tests: case-insensitive :lower filter, lowercase passthrough, quote escaping (~150 tok)
- `email-filter.test.ts` (~260 tok)
- `registration-errors.test.ts` — 10 tests: PB field-error flattening, network/413/field-list/5xx/4xx cause messages (~800 tok)
- `registration-errors.test.ts` — Declares message (~948 tok)

## utils/

