# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-27T08:07:44.360Z
> Files: 17 tracked | Anatomy hits: 0 | Misses: 0

## ../../../../private/tmp/claude-501/-Users-mm-Documents-ntt-data/d4b558a1-d9b0-410a-a76e-060cd8d0dba0/scratchpad/

- `cdp-shot.mjs` — CHROME: makeClient, evaluate, shoot (~947 tok)

## ./


## .claude/


## .claude/rules/


## app/

- `globals.css` — Styles + theme tokens; defines `font-georgia` utility via `@theme inline { --font-georgia: var(--font-georgia-base), Georgia, serif; }` (~1411 tok)
- `layout.tsx` — Root layout; loads fonts via next/font: Noto Sans (`--font-noto-sans`, default sans), Nulshock (`--font-nulshock`), Georgia local from public/georgia (`--font-georgia-base`, 4 ttf variants) (~383 tok)
- `page.tsx` — Home (~222 tok)

## app/api/deck-submission/


## app/api/ntt-data/


## app/deck-submission/


## app/faq/


## app/startup-registration/

- `page.tsx` — Startup Registration route: ACTIVE form (Navbar + FloatingDock + breadcrumb + StartupRegistrationForm + Footer); COMING SOON placeholder kept commented for restore (~829 tok)

## components/

- `about.tsx` — About; h2 heading uses `font-georgia` (Georgia) (~490 tok)
- `benefit.tsx` — Benefit (~539 tok)
- `countdown.tsx` — getTimeLeft (~1106 tok)
- `faq.tsx` — GROUP_ICONS (~1102 tok)
- `footer.tsx` — footerLinks (~844 tok)
- `hero.tsx` — Hero; REGISTER CTA is an active Link to hero.action.href (/startup-registration) (~778 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~1366 tok)
- `program-overview.tsx` — ITEM_COUNT; "Program Overview" h2 heading uses `font-georgia` (Georgia) (~1148 tok)
- `roadmap.tsx` — Roadmap; "Program Roadmap and Timeline" section. Server Component, data-driven from `SITE_CONTENT.roadmap`. Desktop CSS grid (pills span phases, chevrons between steps); mobile vertical stack w/ rotate-90 chevrons. White icons from `public/time-line`; `font-georgia` heading (~1713 tok)
- `startup-registration-form.tsx` — MAX_DESCRIPTION_FILE_BYTES — renders form (~8101 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## lib/

- `home-faq.ts` — Home page FAQ content — a curated, shorter set shown on the landing page. (~1019 tok)
- `site-content.ts` — Exports SITE_CONTENT (~8101 tok)

## public/


## scripts/


## utils/

