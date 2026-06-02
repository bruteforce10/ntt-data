# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-27

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->
- [2026-06-02] NO inline `style={{ ... }}` on JSX. Sizing/layout via `<Image>` props (`width`/`height`) or static Tailwind classes only. User said: "saya gak mau menggunakan inline css tapi dari Image atau tailwindnya".
- Per-item image sizing from data: store numeric pixel `width`/`height` on the data object, pass directly as `<Image width={n} height={n}>` props. Avoid `fill` + sized wrapper for variable sizes.

## Key Learnings

- **Project:** ntt-data
- Frontend direction: prioritize Next.js latest App Router, TypeScript, Tailwind CSS, and shadcn/ui components.
- Brand colors: button blue `#3176E4`, primary `#0070C0`, dark blue `#154284`.
- Tailwind v4 zero-config (no `tailwind.config.ts`/`.js`); content paths auto-detected. Dynamic class strings built from data files may not get scanned reliably — prefer static classes in JSX or props-based sizing.
- Next.js `<Image fill>` requires `sizes` prop and a sized wrapper; for variable per-item sizes, prefer numeric `width`/`height` props (no `fill`) to avoid `sizes` and aspect-ratio warnings.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->
- [2026-06-02] Don't use inline `style={{ width, height }}` on Image wrappers or dynamic Tailwind class strings (`h-${n}`, `w-${n}`) read from `.ts` data files. User explicitly rejected inline CSS. Instead: pass `width`/`height` as numeric props to `<Image>` directly. Drop `fill` + wrapper unless size is fixed at design time with static Tailwind classes.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
