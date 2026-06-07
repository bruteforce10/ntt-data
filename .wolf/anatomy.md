# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-07T22:46:52.813Z
> Files: 7 tracked | Anatomy hits: 0 | Misses: 0

## ./


## .claude/


## .claude/rules/


## app/


## app/api/deck-submission/

- `route.ts` — POST: validates email+file (image/pdf/ppt, ≤8MB), looks up ntt_data record by email, PATCHes pick_deck (multipart), sends buildDeckSubmissionEmail confirmation (~1457 tok)

## app/api/ntt-data/


## app/deck-submission/

- `page.tsx` — Deck submission page: Navbar + FloatingDock + Footer, renders DeckSubmissionForm inside <Suspense> (needed for useSearchParams) (~278 tok)

## app/startup-registration/


## components/

- `deck-submission-form.tsx` — MAX_SIZE_BYTES — renders form (~2257 tok)
- `floating-dock.tsx` — Fixed bottom floating nav dock (dark, separate from top Navbar); driven by SITE_CONTENT.navbar (~900 tok)
- `navbar.tsx` — NAVBAR_ACTIONS (~3876 tok)

## components/ui/ (shadcn — Base UI registry, import from @base-ui/react/*)


## constant/

- `listNavbar.ts` — Exports LIST_NAVBAR (~437 tok)

## lib/

- `mailer.ts` — Exports transporter, buildRegistrationEmail, buildDeckSubmissionEmail (~3834 tok)

## public/


## utils/

