# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-24T02:57:11.819Z
> Files: 3 tracked | Anatomy hits: 0 | Misses: 0

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

- `route.ts` — POST: Vercel Blob client-upload token handshake (handleUpload/onBeforeGenerateToken); validates email+registration+deck field, caps size 8 MB. Lets the browser upload decks straight to Blob, bypassing Vercel's 4.5 MB body cap. (~920 tok)

## app/api/deck-submission/

- `route.ts` — GET ?email= → selected problems; POST takes JSON {email, uploads:[{field,url,name}]}, fetches each staged Blob (SSRF host-check), PATCHes files into PocketBase, then del()s the blobs. maxDuration=60. (~3241 tok)

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

- `deck-submission-form.tsx` — Error carrying the HTTP status so callers can special-case not-found. (~6380 tok)

## components/dashboard/


## components/problem/


## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/


## lib/auth/


## lib/ntt-data/


## public/


## scripts/


## tests/auth/


## tests/ntt-data/


## utils/

