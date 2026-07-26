# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-26T18:14:45.002Z
> Files: 17 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/76656933-c5c6-4dc9-af53-306958f53131/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/7a26cf47-3e42-4577-af5b-502e6667d243/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d67e2a2a-d5f5-46ce-9a6a-6ce72597cbff/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/f1b4550f-e6e1-4d86-aba9-c13c3f504060/scratchpad/


## ./


## .claude/


## .claude/rules/


## app/


## app/api/auth/[...nextauth]/


## app/api/deck-blob/

- `route.ts` — Confirms the email belongs to a real registration before we hand out a Blob (~1009 tok)

## app/api/deck-submission/

- `route.ts` — Only fetch files we staged ourselves. Guards against SSRF: a caller could (~3477 tok)

## app/api/fast-track-blob/

- `route.ts` — POST /api/fast-track-blob (~731 tok)

## app/api/fast-track/

- `route.ts` — Only fetch files we staged ourselves. Guards against SSRF: a caller could (~3214 tok)

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

- `deck-link-tip.tsx` — Reassurance shown alongside the deck link inputs on both submit forms (~250 tok)
- `deck-submission-form.tsx` — Previously submitted fallback link (PO_xx_link), for prefilling. (~7542 tok)
- `fast-track-form.tsx` — FILE_ACCEPT — renders form (~3430 tok)

## components/dashboard/

- `columns.tsx` — TextCell (~2567 tok)
- `data-table.tsx` — PAGE_SIZE_OPTIONS — renders table (~3771 tok)

## components/problem/


## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/

- `problem-decks.ts` — PocketBase file-field names on the ntt_data collection, one per (~670 tok)
- `site-content.ts` — Exports SITE_CONTENT (~24369 tok)

## lib/auth/


## lib/ntt-data/

- `columns-config.ts` — Exports ColumnType, ColumnMeta, COLUMN_META, COLUMN_META_BY_KEY + 2 more (~628 tok)
- `deck-links.ts` — Normalize a user-pasted deck link into a safe, storable URL. (~1045 tok)
- `export-xlsx.ts` — Exports recordsToAoa, downloadXlsx (~660 tok)
- `types.ts` — Exports NttDataFileField, NttDataRecord, ApiResponse (~256 tok)

## public/


## scripts/


## tests/auth/


## tests/ntt-data/

- `deck-links.test.ts` — Declares f1 (~1360 tok)
- `export-xlsx.test.ts` — Declares record (~1000 tok)

## utils/

