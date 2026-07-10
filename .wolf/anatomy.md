# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-10T13:58:38.504Z
> Files: 6 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ./


## .claude/


## .claude/rules/


## app/


## app/api/auth/[...nextauth]/


## app/api/deck-submission/


## app/api/ntt-data/


## app/api/ntt-data/[id]/file/[field]/


## app/api/ntt-data/[id]/send-email/

- `route.ts` — POST: auth-protected manual trigger — fetches record from PocketBase, sends registration-confirmation email via lib/mailer (same from/subject/headers as the form flow) (~639 tok)

## app/dashboard/

- `page.tsx` — DashboardPage — renders table (~603 tok)

## app/deck-submission/


## app/faq/


## app/login/


## app/startup-registration/


## components/

- `problem-overview.tsx` — ProblemOverview — "Explore the Challenges" cards + detail Dialog; optional modal sections: tailoredTowards, question, priorityScope, targetOutcomes, dataExpected, pocApproach, keywords (~3174 tok)

## components/dashboard/

- `email-table.tsx` — "Email Automation" table: search + simple pagination, per-row Send Email button with confirm Dialog, per-row status sending/sent/error via POST /api/ntt-data/[id]/send-email; status is session-only, not persisted (~2545 tok)

## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/

- `site-content.ts` — SITE_CONTENT `as const`: all page copy — nav, hero, countdown, problemOverview.items (6 challenge cards: 2x Digital Bank, industrial materials co., The GEAR by Kajima II, dHost, The GEAR by Kajima I — each detail.context[] + detail.description{develop, tailoredTowards?, helpsUsers, solutionMust, keywords?, ...}), faq, roadmap (~12562 tok)

## lib/auth/


## lib/ntt-data/


## public/


## scripts/


## tests/auth/


## tests/ntt-data/


## utils/

