# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-23T04:38:20.647Z
> Files: 6 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/76656933-c5c6-4dc9-af53-306958f53131/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/7a26cf47-3e42-4577-af5b-502e6667d243/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/f1b4550f-e6e1-4d86-aba9-c13c3f504060/scratchpad/


## ./


## .claude/


## .claude/rules/


## app/


## app/api/auth/[...nextauth]/


## app/api/deck-submission/


## app/api/fast-track/


## app/api/ntt-data/


## app/api/ntt-data/[id]/file/[field]/


## app/api/ntt-data/[id]/send-email/


## app/dashboard/


## app/deck-submission/


## app/faq/


## app/fast-track/


## app/login/


## app/startup-registration/


## components/


## components/dashboard/

- `columns.tsx` — TanStack column defs: TextCell (truncate+title) for company_address/problem_statement/did_you_hear_about_us; combined "Company Description" col (PDF link if company_description_pdf else text); business_mode column removed 2026-07-22 (~2268 tok)
- `data-table.tsx` — DataTable: toolbar search/column-toggle/Excel export (EXPORT_KEYS incl PO_01..PO_10, funding_stage; company_description is ONE combined column — company_description_pdf dropped from keys), passes window.location.origin to recordsToAoa so file links are absolute; sort+filter, pagination; only phone_number hidden by default (~3819 tok)

## components/problem/


## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/


## lib/auth/


## lib/ntt-data/

- `columns-config.ts` — Exports ColumnType, ColumnMeta, COLUMN_META (drives detail sheet + export headers; business_mode removed 2026-07-22), COLUMN_META_BY_KEY, NTT_DATA_FILE_FIELDS (~547 tok)
- `export-selection.ts` — resolveExportRows(selected, filtered): selected rows if any, else the filtered set (~90 tok)
- `export-xlsx.ts` — recordsToAoa(records, keys, origin?) → header row (COLUMN_META labels) + values; file-type columns export absolute download link (origin+/api/ntt-data/:id/file/:field) not the bare filename; company_description = PDF link if company_description_pdf else the plain text. downloadXlsx dynamic-imports "xlsx" (~490 tok)

## public/


## scripts/


## tests/auth/


## tests/ntt-data/

- `export-xlsx.test.ts` — Declares record (~553 tok)

## utils/

