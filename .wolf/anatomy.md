# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-07-15T09:30:43.520Z
> Files: 19 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/ae0aa915-b62d-4e38-ac95-c3145ed9b82b/scratchpad/


## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/


## ./


## .claude/


## .claude/rules/


## app/

- `layout.tsx` — Root layout: Noto Sans/Nulshock/Georgia fonts + full SEO metadata (metadataBase=SITE_URL, title template "%s | SITE_NAME", OG website + /og-image.jpg, twitter card). NO alternates/og:url here — canonicals are per-page (Next metadata merge is shallow) (~626 tok)
- `manifest.ts` — Web manifest: SITE_NAME, theme #154284, icons /icons/icon-{192,512}.png (~161 tok)
- `page.tsx` — Home: section components + canonical "/" + WebSite/Organization JSON-LD script (~412 tok)
- `robots.ts` — Allow all; disallow /api/ + /dashboard; /login stays crawlable so its noindex meta is seen; sitemap URL (~125 tok)
- `sitemap.ts` — 4 public URLs (/, /startup-registration, /faq, /deck-submission) off SITE_URL; login/dashboard excluded (~233 tok)

## app/api/auth/[...nextauth]/


## app/api/deck-submission/


## app/api/ntt-data/


## app/api/ntt-data/[id]/file/[field]/


## app/api/ntt-data/[id]/send-email/

- `route.ts` — POST: auth-protected manual trigger — fetches record from PocketBase, sends registration-confirmation email via lib/mailer (same from/subject/headers as the form flow) (~639 tok)

## app/dashboard/

- `page.tsx` — metadata — renders table (~651 tok)

## app/deck-submission/

- `page.tsx` — metadata (~329 tok)

## app/faq/

- `page.tsx` — metadata (~392 tok)

## app/login/

- `page.tsx` — metadata (~274 tok)

## app/startup-registration/

- `page.tsx` — --- COMING SOON placeholder imports (disabled) --- (~887 tok)

## components/

- `navbar.tsx` — Top navbar: logo + "More" dropdown (NAVBAR_ACTIONS) + Open Innovation button only, all breakpoints; nav list & mobile Sheet/hamburger removed 2026-07-13 (~650 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~3276 tok)
- `startup-registration-form.tsx` — MAX_DESCRIPTION_FILE_BYTES — renders form (~9052 tok)

## components/dashboard/

- `email-table.tsx` — "Email Automation" table: search + simple pagination, per-row Send Email button with confirm Dialog, per-row status sending/sent/error via POST /api/ntt-data/[id]/send-email; status is session-only, not persisted (~2545 tok)

## components/ui/


## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## docs/superpowers/plans/


## docs/superpowers/specs/


## lib/

- `mailer.ts` — Exports transporter, buildRegistrationEmail, buildDeckSubmissionEmail (~4154 tok)
- `site-config.ts` — Exports SITE_URL (NEXT_PUBLIC_SITE_URL, fallback https://oiw.ntt-startupchallenge.com), SITE_NAME, SITE_DESCRIPTION — single source of truth for SEO/canonical (~208 tok)
- `site-content.ts` — Exports SITE_CONTENT (~12497 tok)

## lib/auth/


## lib/ntt-data/


## public/


## scripts/

- `generate-seo-assets.js` — Regenerates public/og-image.jpg, public/icons/icon-{192,512}.png, app/apple-icon.png from brand artwork via sharp; run `node scripts/generate-seo-assets.js` (~848 tok)

## tests/auth/


## tests/ntt-data/


## utils/

