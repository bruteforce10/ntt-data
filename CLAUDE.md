# OpenWolf

@.wolf/OPENWOLF.md

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md every session. Check .wolf/cerebrum.md before generating code. Check .wolf/anatomy.md before reading files.

# Frontend-First Direction

Untuk saat ini, fokus pengembangan proyek adalah frontend terlebih dahulu.

## Stack Utama

- Gunakan Next.js terbaru sesuai dokumentasi resmi Context7 (`/vercel/next.js`, latest stable).
- Gunakan App Router (`app/`) sebagai routing utama.
- Gunakan TypeScript untuk semua kode frontend.
- Gunakan React Server Components secara default; pakai Client Components hanya saat butuh interaksi browser, state client, event handler, atau API browser.
- Gunakan Tailwind CSS untuk styling.
- Gunakan shadcn/ui sebagai sumber komponen UI utama.

## Next.js Guidelines

- Ikuti dokumentasi Context7 sebelum memakai API Next.js yang belum pasti.
- Global CSS hanya di-import dari root layout (`app/layout.tsx`).
- Pakai `metadata`/`generateMetadata` bawaan Next.js untuk SEO halaman.
- Pakai `next/image` untuk gambar kecuali ada alasan teknis kuat.
- Pakai route groups dan nested layouts bila struktur UI butuh pemisahan jelas.
- Jaga page dan layout tetap kecil; ekstrak section/component ketika file mulai padat.

## shadcn/ui Guidelines

- Inisialisasi shadcn/ui dengan CLI resmi: `npx shadcn@latest init`.
- Tambah komponen lewat CLI resmi, contoh: `npx shadcn@latest add button`.
- Import komponen dari `@/components/ui/...`, contoh: `import { Button } from "@/components/ui/button"`.
- Gunakan komponen shadcn/ui sebelum membuat komponen UI custom.
- Pertahankan aksesibilitas bawaan Radix/shadcn; jangan hilangkan focus ring, label, keyboard behavior, atau ARIA tanpa pengganti setara.
- Styling komponen pakai varian dan Tailwind class yang konsisten, bukan inline style kecuali sangat perlu.

## Typography

Gunakan **Noto Sans** sebagai font utama proyek.

- Load via `next/font/google`: `import { Noto_Sans } from 'next/font/google'`
- Apply di root layout (`app/layout.tsx`) dengan variable CSS `--font-noto-sans`
- Set sebagai `font-sans` default di `tailwind.config.ts`:
  ```ts
  fontFamily: { sans: ['var(--font-noto-sans)', ...defaultTheme.fontFamily.sans] }
  ```
- Jangan mix font lain kecuali ada kebutuhan spesifik (monospace untuk kode boleh `font-mono`).

## Theme Colors

Gunakan warna brand berikut sebagai sumber kebenaran desain:

- Button blue: `#3176E4`
- Primary: `#0070C0`
- Dark blue: `#154284`

Rekomendasi mapping CSS variable/Tailwind:

```css
:root {
  --brand-button-blue: #3176E4;
  --brand-primary: #0070C0;
  --brand-dark-blue: #154284;
}
```

Gunakan:

- `#3176E4` untuk primary button/default CTA.
- `#0070C0` untuk aksen utama, link penting, active state, dan highlight brand.
- `#154284` untuk heading penting, nav emphasis, footer, atau area kontras gelap.

## UI Quality Bar

- Desain harus bersih, modern, responsif, dan tidak terlihat generik/white-coded.
- Semua tampilan harus mobile-first lalu ditingkatkan untuk tablet/desktop.
- Pastikan kontras teks dan tombol memenuhi WCAG AA.
- Gunakan spacing konsisten; prefer skala Tailwind (`4`, `6`, `8`, `12`, `16`).
- Hindari magic colors di komponen; pakai token warna brand atau CSS variables.
- Sebelum menyatakan selesai untuk perubahan UI, jalankan/verifikasi di browser atau pakai `openwolf designqc` bila diminta evaluasi desain.
