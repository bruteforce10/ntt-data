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
- **shadcn uses the Base UI registry here, NOT Radix.** UI components in `components/ui/*` import from `@base-ui/react/*` (e.g. `@base-ui/react/dialog`, `/menu`, `/navigation-menu`, `/accordion`, `/button`). When porting code from a Radix-based shadcn project, translate the APIs:
  - `asChild` → `render={<El/>}` prop (Base UI composition). Children go on the Base UI component or inside the render element (one place only).
  - Base UI `Button` defaults `nativeButton: true`; when `render`-ing as `<a>`/`<span>`, pass `nativeButton={false}`.
  - DropdownMenu `Label` = Base UI `Menu.GroupLabel` → MUST be inside `<DropdownMenuGroup>`.
  - `<Accordion type="single" collapsible>` → `<Accordion multiple={false}>`. (NOT `openMultiple` — that prop doesn't exist in Base UI; TypeScript will error.)
  - `<NavigationMenu viewport={false}>` → no `viewport` prop (remove it); Base UI always renders a shared Positioner/Viewport.
- Some Base UI errors only throw on component **mount/open** (e.g. opening a menu), so a page-load console check misses them — verify interactively (open every dropdown/menu).
- designqc desktop viewport ≈ `--max-width` (default 1200px). The navbar's desktop layout uses the `xl` (1280px) breakpoint, so capture with `--max-width 1440` to see the full desktop nav instead of the mobile hamburger.
- For big banner-style text that scales to fill the width (mimicking a wide exported SVG/PNG), use a static Tailwind arbitrary class with clamp, e.g. `text-[clamp(2rem,11vw,9.5rem)]`. This is fluid like the SVG yet satisfies the "no inline style, static classes only" preference. `font-sans` already = NotoSans (`--font-sans: var(--font-noto-sans)` in globals.css), max weight loaded is 700 (`font-bold`).
- `openwolf` CLI is NOT on PATH in this environment (not a local/global npm bin), so `openwolf designqc` can't be auto-run here — verify UI in the browser instead.
- `public/Assets Picture/coming-soon.svg` = the words "COMING SOON" in brand blue `#0070C0`, drawn in a wide techno font (looks like the project's Nulshock), implemented as two embedded base64 PNGs (white letters used as a luminance mask over a solid `#0070C0` fill). To inspect such an SVG's true color/look, decode its base64 with PowerShell `[Convert]::FromBase64String` → write PNG → Read it; sample pixels via `System.Drawing.Bitmap.GetPixel`. The text version now used in `problem-overview.tsx` reproduces it with NotoSans.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->
- [2026-06-02] Don't use inline `style={{ width, height }}` on Image wrappers or dynamic Tailwind class strings (`h-${n}`, `w-${n}`) read from `.ts` data files. User explicitly rejected inline CSS. Instead: pass `width`/`height` as numeric props to `<Image>` directly. Drop `fill` + wrapper unless size is fixed at design time with static Tailwind classes.
- [2026-06-07] Don't paste Radix-based shadcn code (`asChild`, Accordion `type/collapsible`, NavigationMenu `viewport`) into this project — it uses the **Base UI** shadcn registry (`@base-ui/react`). It compiles but renders broken ("like shadcn isn't installed"). Use Base UI APIs instead (see Key Learnings).
- [2026-06-07] When `render`-ing a Base UI `Button` as a non-button (`<a>`/`<span>`), always set `nativeButton={false}` or it logs a console error (Next dev shows "1 Issue").
- [2026-06-07] Base UI `DropdownMenuLabel` (Menu.GroupLabel) throws unless wrapped in `<DropdownMenuGroup>`; error only appears when the menu is opened, so verify dropdowns by actually opening them.
- [2026-06-08] Base UI Accordion root prop for single-open behavior is `multiple={false}`, NOT `openMultiple={false}`. Using `openMultiple` causes a TS build error on Vercel.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
- [2026-06-07] Ported the parent NTT Startup Challenge navbar into the sub-site by **adapting it to Base UI** (the project's existing shadcn registry) rather than installing `@radix-ui/*` and swapping the UI components. Rationale: keeps the project consistent on one component library and avoids replacing the Base-UI `button.tsx` that other components (forms, floating-dock) already depend on. Register CTA uses brand `#3176E4` per CLAUDE.md (also matches the design image) instead of the parent's `blue-ntt`. Desktop nav kept at the `xl` breakpoint (7 items + 2 buttons don't fit below ~1280px).
