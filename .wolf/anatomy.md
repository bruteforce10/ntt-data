# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-12T00:50:44.563Z
> Files: 15 tracked | Anatomy hits: 0 | Misses: 0

## ./


## .claude/


## .claude/rules/


## app/

- `page.tsx` — Home (~211 tok)

## app/api/deck-submission/

- `route.ts` — POST: validates email+file (image/pdf/ppt, ≤8MB), looks up ntt_data record by email, PATCHes pick_deck (multipart), sends buildDeckSubmissionEmail confirmation (~1457 tok)

## app/api/ntt-data/

- `route.ts` — Next.js API route: POST (~1650 tok)

## app/deck-submission/

- `page.tsx` — Deck submission page: Navbar + FloatingDock + Footer, renders DeckSubmissionForm inside <Suspense> (needed for useSearchParams) (~278 tok)

## app/startup-registration/


## components/

- `deck-submission-form.tsx` — MAX_SIZE_BYTES — renders form (~2257 tok)
- `faq.tsx` — Faq (~372 tok)
- `floating-dock.tsx` — Fixed bottom floating nav dock (dark, separate from top Navbar); driven by SITE_CONTENT.navbar (~900 tok)
- `footer.tsx` — Footer (~568 tok)
- `hero.tsx` — Hero (~759 tok)
- `navbar.tsx` — NAVBAR_ACTIONS (~4046 tok)
- `problem-overview.tsx` — ProblemOverview — renders modal (~1537 tok)
- `startup-registration-form.tsx` — MAX_DESCRIPTION_FILE_BYTES — renders form (~8198 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/

- `listNavbar.ts` — Exports LIST_NAVBAR (~388 tok)

## lib/

- `mailer.ts` — Exports transporter, buildRegistrationEmail, buildDeckSubmissionEmail (~3834 tok)
- `site-content.ts` — Exports SITE_CONTENT (~4507 tok)

## public/


## utils/

