# Deck Submission — Email Gate

**Date:** 2026-07-21
**Status:** Approved (design)
**Scope:** Enhance the existing `/deck-submission` page so users can enter their
email and verify it against PocketBase before the upload inputs appear, without
breaking the existing email-link flow.

---

## Problem

Today `/deck-submission` only works when opened via the registration
confirmation email link, which carries `?email=...` in the URL. If someone lands
on the page without that query param, they see an error telling them to use the
link.

We want the same page to also support a manual entry path: the user types their
email, clicks **Check Email**, and — only if the email is registered in
PocketBase **and** has selected problem statements — the pitch-deck upload inputs
appear (with already-uploaded decks shown as filled).

The underlying logic is identical to the existing flow; the only difference is
that the email is supplied by the user and gated behind a button instead of
coming from the URL.

## Goals

- One page (`/deck-submission`) serves both entry paths (DRY).
- Preserve the existing `?email=` auto-load behavior exactly (the email-link flow
  must keep working).
- Add an email-gate step (input + Check button) for the no-query case.
- Show the stored filename for decks that were already uploaded.
- Confirm before a user replaces an already-uploaded deck.

## Non-Goals

- No new route/page.
- No change to `lib/problem-decks.ts` or the submit (`POST`) flow.
- No public download/preview of uploaded files (only the stored filename text is
  shown).
- No re-check / "change email" affordance after a successful check (single check
  per the product decision).

---

## Approach

Enhance `/deck-submission` in place. The page resolves an **active email** from
either:

1. the `?email=` query param (email-link flow → auto-load, email locked), or
2. the result of a successful **Check Email** action (manual flow).

Once an active email is resolved and the registration has selected problem
statements, the existing upload UI renders unchanged.

The backend already does the lookup we need via `GET
/api/deck-submission?email=`; the Check button simply calls the same endpoint on
click instead of on mount. The only backend change is adding the stored filename
to that endpoint's response so the form can display it.

## State Machine (manual / no-query path)

```
idle ──(user types email + clicks Check)──▶ checking
  checking ──found & has problems──────────▶ ready       (render upload inputs, email locked)
  checking ──found, no problems selected───▶ no-problems (informational message)
  checking ──not found (404)───────────────▶ not-found   (neutral message, input stays editable)
  checking ──other error───────────────────▶ error       (inline error, input stays editable)
```

- **Single check:** after `ready`, there is no "change email" link. In
  `not-found` / `error`, the email input remains editable so the user can correct
  it and click Check again (ordinary retry, not a dedicated feature).
- The `?email=` path skips `idle`/`checking` and behaves exactly as today
  (`loading → ready | error`), with the email locked.

## User-Facing Copy (English, to match existing form)

- Email gate prompt: "Enter the email you used during registration to load your
  pitch-deck submission."
- Check button label: "Check Email" (shows spinner + "Checking…" while pending).
- Not-found (neutral): "We couldn't find a registration for that email. Please
  make sure you're using the same email you registered with."
- No problems selected: reuse the existing "We couldn't find any selected problem
  statements for your registration." message.
- Already-uploaded deck: "Already uploaded: `{filename}` — choose a file only if
  you want to replace it."
- Replace confirmation dialog title/body: "Replace file for '{deck.title}'?" /
  "'{oldFilename}' will be replaced with '{newFilename}' when you submit."
  Actions: **Replace** / **Cancel**.

## Component & API Changes

### `app/api/deck-submission/route.ts` (GET)

Add the stored filename to each problem in the response.

- Current: `{ id, uploaded }`
- New: `{ id, uploaded, filename }`
  - `filename = typeof record[deck.field] === "string" ? record[deck.field] : ""`
  - `uploaded` stays `Boolean(record[deck.field])`.

The stored filename is PocketBase's persisted name (may include a random suffix);
that is acceptable for recognition. No change to `POST`, 404, or 400 handling.

### `components/deck-submission-form.tsx` (refactor)

- Introduce an `activeEmail` concept sourced from the query param **or** a
  successful Check.
- Extract the problem-loading logic (currently inside the on-mount `useEffect`)
  into a single callable async function reused by both the query path (effect)
  and the Check button (click handler).
- Add the email-gate UI (input + Check button) for the no-query state, replacing
  the current "use the pitch-deck link" error branch.
- Extend the `DeckProblem` shape with `filename` and render it in the
  already-uploaded badge.
- Add a replace-confirmation `Dialog` (shadcn/Base UI registry component — not
  `window.confirm`): when the user selects a new file for a deck whose
  `uploaded` is true, open the dialog; on **Replace** set the pending file, on
  **Cancel** discard the selection.
- Submit flow unchanged: `POST /api/deck-submission` with the active email + the
  picked files.
- Keep the file as a single module; it should remain under 800 lines. If it grows
  past that, extract the email-gate sub-UI into a small presentational component.

## Edge Cases

- **File inputs cannot be pre-filled** (browser security). "Filled" means we show
  the stored filename + already-uploaded badge, not an actual populated file
  input.
- **Empty / invalid email on Check:** validate format client-side before calling
  the API; show an inline validation message, don't call the endpoint.
- **Replace then Cancel picking a file:** the deck keeps its already-uploaded
  state; no pending file is set.
- **Query param present but invalid/not-found:** unchanged from today (shows the
  existing error state).

## Security Note

The public Check button makes it marginally easier to probe whether an email is
registered (user-existence disclosure / enumeration). This exposure already
exists because the `GET` endpoint is reachable via query param, so the button
does not add a new capability. The not-found copy is kept neutral in tone to
avoid an explicit "this email is/isn't registered" signal. Rate limiting is out
of scope for this change but noted as a possible future hardening.

## Testing

- **Unit:** GET response now includes `filename`; verify it maps the stored value
  and returns an empty string when the field is absent.
- **Component:** email-gate transitions (idle → checking → ready / not-found /
  no-problems / error); replace-confirmation dialog confirm vs cancel; the
  `?email=` path still auto-loads and locks the email.
- **Manual/E2E:** open `/deck-submission` with no query → check a
  known-registered email → inputs appear with filenames → replace one (confirm
  dialog) → submit.
