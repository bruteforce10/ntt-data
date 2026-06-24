# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-24T02:17:23.655Z
> Files: 7 tracked | Anatomy hits: 0 | Misses: 0

## ./


## .claude/


## .claude/rules/


## app/


## app/api/deck-submission/


## app/api/ntt-data/


## app/deck-submission/


## app/faq/


## app/startup-registration/

- `page.tsx` — Startup Registration route: ACTIVE form (Navbar + FloatingDock + breadcrumb + StartupRegistrationForm + Footer); COMING SOON placeholder kept commented for restore (~829 tok)

## components/

- `about.tsx` — About; description + "Apply Now!" CTA Link (about.cta.href -> /startup-registration) (~431 tok)
- `benefit.tsx` — Benefit; centered circular-icon layout (icon + blue title + description per column); icons from /Assets Picture/benefit/{1,2,3}.png, object-cover square (~439 tok)
- `countdown.tsx` — Countdown; "Registration Open" heading on white above full-width video banner; timer REPLACED by large fluid "COMING SOON" NotoSans text (font-bold uppercase, text-[clamp(2rem,11vw,9.5rem)], white + drop-shadow over bg-black/35); now a server component (no "use client", no timer state) (~330 tok)
- `hero.tsx` — Hero; REGISTER CTA is an active Link to hero.action.href (/startup-registration) (~778 tok)
- `problem-overview.tsx` — ProblemOverview — "Coming Soon" now rendered via /Assets Picture/coming-soon.png (object-cover crop, max-w-5xl); cards grid still commented out; problem modal/dialog present (~1671 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## lib/

- `site-content.ts` — Exports SITE_CONTENT (~4605 tok)

## public/


## scripts/


## utils/

