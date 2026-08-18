# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-18T15:59:02.586Z
> Files: 24 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/76656933-c5c6-4dc9-af53-306958f53131/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/7a26cf47-3e42-4577-af5b-502e6667d243/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d67e2a2a-d5f5-46ce-9a6a-6ce72597cbff/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/f1b4550f-e6e1-4d86-aba9-c13c3f504060/scratchpad/


## ./

- `next.config.ts` — Declares nextConfig (~160 tok)

## .claude/


## .claude/rules/


## app/

- `sitemap.ts` — Public, indexable routes only — /login and /dashboard are intentionally (~217 tok)

## app/api/auth/[...nextauth]/


## app/api/deck-blob/


## app/api/deck-submission/


## app/api/fast-track-blob/


## app/api/fast-track/


## app/api/notify-subscription/

- `route.ts` — Behind Vercel the client IP arrives in `x-forwarded-for` as a comma-separated (~754 tok)

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

- `about.tsx` — About (~488 tok)
- `floating-dock.tsx` — getActionClassName (~1377 tok)
- `hero.tsx` — Hero (~770 tok)
- `problem-overview.tsx` — Registration is closed, so the detail dialog hands off to the notify (~3886 tok)
- `startup-registration-form.tsx` — STARTUP_REGISTRATION_FORM_ID — renders form (~9791 tok)

## components/dashboard/


## components/notify/

- `notify-cta.tsx` — Owns its own open state so server components can drop it in without a (~242 tok)
- `notify-dialog.tsx` — NotifyDialog — renders modal (~319 tok)
- `notify-form.tsx` — INVALID_EMAIL_MESSAGE — renders form (~1200 tok)

## components/problem/


## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/

- `2026-08-18-get-notified-subscription.md` — Get Notified for Next Program — Implementation Plan (~12863 tok)

## docs/superpowers/specs/

- `2026-08-18-get-notified-subscription-design.md` — Get Notified for Next Program — Design (~2829 tok)

## lib/

- `email-validation.ts` — Shared by the public notify-subscription endpoint and the registration form. (~208 tok)
- `problem-decks.ts` — PocketBase file-field names on the ntt_data collection, one per (~693 tok)
- `site-content.ts` — Exports SITE_CONTENT (~25265 tok)

## lib/auth/


## lib/notify/

- `notify-email.ts` — The open-innovation inbox that receives every "Notify Me" submission. (~599 tok)
- `rate-limit.ts` — Per-instance and reset by cold starts on serverless, so this is a speed bump (~342 tok)

## lib/ntt-data/


## public/


## scripts/


## tests/auth/


## tests/notify/

- `email-validation.test.ts` (~415 tok)
- `notify-email.test.ts` — Declares SUBMITTED_AT (~572 tok)
- `notify-form.test.tsx` — mockFetchOnce (~970 tok)
- `notify-subscription-route.test.ts` — sendMail: postRequest (~988 tok)
- `rate-limit.test.ts` — Declares START (~474 tok)

## tests/ntt-data/

- `problem-decks.test.ts` — Declares deck (~835 tok)

## utils/


## lib/notify/

- `notify-email.ts` — NOTIFY_RECIPIENT + buildNotifySubscriptionEmail(): assembles the internal "Notify Me" email (to/replyTo/subject/text/html), HTML-escapes the address (~700 tok)
- `rate-limit.ts` — consumeRateLimit()/resetRateLimit(): in-memory per-key bucket, 5 requests / 10 min (~450 tok)

## components/notify/

- `notify-form.tsx` — Email field + idle/submitting/success/error state machine, posts to /api/notify-subscription, hidden honeypot (~1300 tok)
- `notify-dialog.tsx` — Controlled Dialog wrapping NotifyForm; remounts on open to reset state (~400 tok)
- `notify-cta.tsx` — Button owning its own open state; used by hero, about, floating-dock (~350 tok)

## app/api/notify-subscription/

- `route.ts` — POST: honeypot → email validation → rate limit → nodemailer send to openinnovation@. Errors as { message } (~900 tok)

## tests/notify/

- `email-validation.test.ts` — 9 cases for isValidEmail/normalizeEmail (~450 tok)
- `notify-email.test.ts` — 5 cases incl. HTML-injection escaping (~600 tok)
- `rate-limit.test.ts` — 5 cases incl. expired-bucket sweep (~550 tok)
- `notify-subscription-route.test.ts` — 8 cases, SMTP mocked (~1100 tok)
- `notify-form.test.tsx` — 5 RTL cases, fetch mocked (~1000 tok)
