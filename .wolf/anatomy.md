# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-24T02:28:14.424Z
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
- `countdown.tsx` — Countdown; "Registration Open" heading on white above full-width video banner with a translucent rounded-full pill (light numerals + title-case labels); live timer to countdown.targetDate (client component); no CTA button (~920 tok)
- `hero.tsx` — Hero; REGISTER CTA is an active Link to hero.action.href (/startup-registration) (~778 tok)
- `problem-overview.tsx` — ProblemOverview — "Coming Soon" now rendered as NotoSans text (`<p>` font-bold uppercase, color #0070C0, fluid `text-[clamp(1.5rem,10.5vw,8rem)]`) inside max-w-5xl, replacing the coming-soon.svg <Image>; cards grid still commented out; problem modal/dialog present (~1667 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/


## lib/

- `site-content.ts` — Exports SITE_CONTENT (~4605 tok)

## public/


## scripts/


## utils/

