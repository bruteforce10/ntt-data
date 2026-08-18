# Get Notified for Next Program — Design

**Date:** 2026-08-18
**Status:** Approved, ready for implementation planning

## Problem

Registrasi untuk batch program saat ini sudah ditutup, tetapi seluruh CTA di situs masih
mengarah ke `/startup-registration`. Pengunjung yang tertarik menemui form yang tidak lagi
relevan, dan minat mereka tidak tertangkap sama sekali.

## Goal

Ganti setiap tombol "Register" menjadi "Get Notified for Next Program" yang membuka dialog
subscription email. Submission dikirim sebagai notifikasi email ke
`openinnovation@ntt-startupchallenge.com`. Nonaktifkan `/startup-registration` sementara,
dengan cara yang mudah dibatalkan saat batch berikutnya dibuka.

## Non-Goals

- Tidak menyimpan subscriber ke PocketBase. Rekap dilakukan manual dari inbox.
- Tidak mengirim auto-reply ke subscriber. Konfirmasi hanya berupa success state di dialog.
- `/fast-track` dan `/deck-submission` tetap aktif. Peserta lama masih bisa mengirim pitch deck.
- Copy FAQ tidak diubah pada iterasi ini.
- Kode registrasi (`app/startup-registration/`, `components/startup-registration-form.tsx`,
  `/api/ntt-data`) tidak dihapus — hanya dibuat tidak terjangkau.

## Architecture

### File map

**Baru:**

| File | Tanggung jawab |
|---|---|
| `lib/email-validation.ts` | `normalizeEmail()`, `isValidEmail()` — dipakai client dan server |
| `lib/notify/notify-email.ts` | `buildNotifySubscriptionEmail()` → `{ subject, html, text, replyTo }` |
| `app/api/notify-subscription/route.ts` | POST handler |
| `components/notify/notify-form.tsx` | Field email + state machine submission |
| `components/notify/notify-dialog.tsx` | Dialog terkontrol yang membungkus `NotifyForm` |
| `components/notify/notify-cta.tsx` | Tombol + state open sendiri |
| `tests/notify/email-validation.test.ts` | Unit test validator |
| `tests/notify/notify-email.test.ts` | Unit test template email |
| `tests/notify/notify-subscription-route.test.ts` | Test route handler dengan SMTP di-mock |

**Dimodifikasi:**

| File | Perubahan |
|---|---|
| `lib/site-content.ts` | Label CTA (lihat tabel Copy) |
| `components/hero.tsx` | `<Link>` → `<NotifyCta>` |
| `components/about.tsx` | `<Link>` → `<NotifyCta>` |
| `components/floating-dock.tsx` | `<a>` → `<NotifyCta>` |
| `components/problem-overview.tsx` | `router.push()` → buka `<NotifyDialog>` |
| `components/startup-registration-form.tsx` | Impor `isValidEmail` dari `lib/email-validation.ts` |
| `next.config.ts` | Tambah `redirects()` |
| `app/sitemap.ts` | Hapus entri `/startup-registration` |

### Dua entry point komponen

Kebutuhan pemanggilnya berbeda, jadi ada dua pembungkus di atas `NotifyForm` yang sama:

- **`<NotifyCta label className ariaLabel? children? />`** — self-contained: merender tombol
  dan memiliki state `open` sendiri. `className` diteruskan ke tombol sehingga tiap pemanggil
  mempertahankan stylingnya masing-masing; `ariaLabel` dipakai dock untuk mengembalikan teks
  penuh; `children` menampung ornamen seperti `<ArrowRight>` di about. Dipakai di hero, about,
  dan floating-dock. Aman dirender langsung dari server component karena komponennya sendiri
  yang `"use client"`.
- **`<NotifyDialog open onOpenChange />`** — terkontrol, tanpa tombol. Dipakai di
  `problem-overview.tsx`, yang **sudah memiliki `<Dialog>` sendiri** untuk detail problem
  statement. Di sana tombolnya menutup dialog detail lalu membuka dialog notify — bukan
  dialog bersarang di dalam dialog.

Empat instance `NotifyCta` berarti empat state boolean independen. Ini disengaja: Base UI
`Dialog` hanya me-mount konten ke portal saat terbuka, jadi biayanya dapat diabaikan, dan
pendekatan ini menghindari context provider yang akan memaksa perubahan boundary di
`app/page.tsx`.

### Deduplikasi validator

`isValidEmail` saat ini terduplikasi di `components/startup-registration-form.tsx:105`.
Regex yang sama (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) dipindahkan ke `lib/email-validation.ts`
dan kedua pemakai mengimpor dari sana.

## UI Flow

```
[ Get Notified for Next Program ]  ← klik
            ↓
┌─ Dialog ────────────────────────────┐
│  Get Notified for Next Program      │
│  Registrasi program ini sudah       │
│  ditutup. Tinggalkan email Anda     │
│  dan kami kabari saat program       │
│  berikutnya dibuka.                 │
│                                     │
│  Email *                            │
│  [__________________________]       │
│  ⚠ Please enter a valid email       │
│                                     │
│         [ Notify Me ]               │
└─────────────────────────────────────┘
            ↓ 200
┌─ Dialog ────────────────────────────┐
│         ✓  You're on the list       │
│   We'll email you as soon as the    │
│   next program opens.               │
│            [ Close ]                │
└─────────────────────────────────────┘
```

### State machine `NotifyForm`

| State | Tampilan | Transisi |
|---|---|---|
| `idle` | Input aktif, tombol "Notify Me" | submit valid → `submitting` |
| `submitting` | Input & tombol disabled, tombol "Sending…" | 200 → `success`; selain itu → `error` |
| `success` | Panel sukses menggantikan form | tutup dialog → reset ke `idle` |
| `error` | Pesan merah, tombol aktif kembali, isian email dipertahankan | submit ulang → `submitting` |

### Aksesibilitas

- Fokus pindah ke input email saat dialog terbuka; ke heading sukses saat berhasil.
- Pesan error diumumkan lewat `role="alert"`, dan input ditautkan via `aria-describedby`.
- Focus trap, Esc, dan click-outside sudah ditangani Base UI `Dialog` — tidak dimodifikasi.
- Tombol dock memakai `aria-label="Get Notified for Next Program"` karena labelnya dipendekkan.

## Backend

### `POST /api/notify-subscription`

Request body: `{ email: string, website?: string }` (`website` adalah honeypot).

```
POST /api/notify-subscription
  ├─ honeypot `website` terisi?       → 200 { ok: true }, tanpa kirim email
  ├─ isValidEmail(email)?             → tidak: 400 { message }
  ├─ rate limit per IP (5 / 10 menit) → lewat: 429 { message }
  └─ transporter.sendMail             → gagal: 500 { message }
                                      → 200 { ok: true }
```

Respons mengikuti konvensi route yang sudah ada di proyek — error berupa
`{ message }` (lihat `app/api/deck-submission/route.ts:272`), bukan envelope
`{ success, data, error }`. Klien membaca `data?.message`, sama seperti
`components/deck-submission-form.tsx:317`.

### Email yang dikirim

- **To:** `openinnovation@ntt-startupchallenge.com`
- **From:** `process.env.SMTP_FROM`
- **Reply-To:** email subscriber — supaya bisa langsung dibalas dari inbox
- **Subject:** `New "Notify Me" subscriber — <email>`
- **Body:** email subscriber dan timestamp submission (ISO 8601, UTC)

Memakai `transporter` yang sudah diekspor `lib/mailer.ts`. Semua env SMTP sudah terkonfigurasi
(`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) — tidak ada
env baru.

### Abuse mitigation

Endpoint ini publik dan mengirim email, sehingga menjadi vektor spam jika tidak dijaga.
Dua lapis pertahanan:

1. **Honeypot** — field `website` yang tersembunyi secara visual. Bot mengisinya; manusia tidak.
   Saat terisi, endpoint mengembalikan 200 tanpa mengirim apa pun, sehingga bot tidak belajar
   bahwa ia terdeteksi.
2. **Rate limit per IP** — 5 request per 10 menit, `Map` in-memory dengan sweep entri kedaluwarsa.
   IP diambil dari entri pertama header `x-forwarded-for`, fallback ke `x-real-ip`. Bila kedua
   header tidak ada, request tetap diproses (dihitung ke bucket `"unknown"` bersama) — lebih
   baik daripada memblokir traffic sah di lingkungan tanpa proxy.

Batas in-memory bersifat per-instance dan akan reset saat cold start di serverless. Ini
diterima secara sadar: menutup abuse kasar tanpa menambah dependensi (Redis/Upstash). Jika
spam tetap lolos, langkah berikutnya adalah rate limit terpusat — di luar scope iterasi ini.

## Menonaktifkan /startup-registration

```ts
// next.config.ts
async redirects() {
  return [
    { source: "/startup-registration", destination: "/", permanent: false },
  ];
}
```

`permanent: false` (307) dipilih dengan sengaja, bukan 308. Penonaktifan ini sementara;
redirect permanen akan di-cache browser tanpa batas dan sulit dibatalkan saat batch
berikutnya dibuka.

Entri `/startup-registration` juga dihapus dari `app/sitemap.ts` agar crawler tidak terus
diarahkan ke URL yang me-redirect.

Mengaktifkan kembali nanti = hapus satu blok redirect dan kembalikan entri sitemap. Seluruh
kode form dan API tetap utuh.

## Copy

| Lokasi | Dari | Ke |
|---|---|---|
| `site-content.ts` `about.cta` | `{ label: "Register", href: "/startup-registration" }` | `{ label: "Get Notified for Next Program" }` |
| `site-content.ts` `hero.action` | `{ label: "REGISTER", href: "/startup-registration" }` | `{ label: "GET NOTIFIED FOR NEXT PROGRAM" }` |
| `site-content.ts` `navbar.actions[0]` | `{ label: "REGISTER", href: "/startup-registration" }` | `{ label: "GET NOTIFIED" }` |
| `problem-overview.tsx` tombol detail | label "Select the Problem Statement" + `router.push("/startup-registration?problem=N")` | label "Get Notified for Next Program", menutup dialog detail lalu membuka `NotifyDialog` |

`href` dihapus dari ketiga entri karena tidak lagi menjadi tautan navigasi. Properti
`variant` dan `comingSoon` pada `navbar.actions[0]` dipertahankan sehingga helper
`getActionClassName()` dan cabang `comingSoon` di `floating-dock.tsx` tetap berlaku —
perubahan di sana terbatas pada `<a href>` yang menjadi `<NotifyCta>`.

Dock memakai label pendek "GET NOTIFIED" karena pill-nya sempit dan uppercase
tracking-widest; teks penuh dipakai sebagai `aria-label`.

## Error Handling

| Kondisi | Perilaku |
|---|---|
| Email kosong / format salah | Validasi client, pesan inline, request tidak dikirim |
| Server balas 400 | Pesan error server ditampilkan di dialog |
| Server balas 429 | "Too many requests. Please try again in a few minutes." |
| SMTP gagal | 500 dengan pesan generik; detail SMTP di-log server-side, tidak bocor ke klien |
| Fetch gagal (offline) | "Something went wrong. Please try again." |

Di setiap kasus gagal, isian email dipertahankan supaya user tidak perlu mengetik ulang.

## Testing

Vitest sudah terpasang (`npm test`). Mengikuti pola test yang ada di `tests/ntt-data/`.

**`tests/notify/email-validation.test.ts`**
- menerima alamat valid
- menolak alamat tanpa `@`, tanpa domain, tanpa TLD, dan yang mengandung spasi
- `normalizeEmail` memangkas whitespace dan menurunkan ke lowercase

**`tests/notify/notify-email.test.ts`**
- subject memuat email subscriber
- `replyTo` sama dengan email subscriber
- body memuat email dan timestamp

**`tests/notify/notify-subscription-route.test.ts`** (`transporter.sendMail` di-mock)
- email valid → 200 dan `sendMail` dipanggil satu kali
- email invalid → 400 dan `sendMail` tidak dipanggil
- honeypot terisi → 200 dan `sendMail` tidak dipanggil
- request ke-6 dari IP yang sama dalam jendela waktu → 429
- `sendMail` melempar error → 500 tanpa membocorkan detail SMTP

## Verification

- `npm test` hijau
- `npm run build` sukses
- `npm run lint` bersih
- Manual: klik CTA di hero, about, floating-dock, dan problem-overview — masing-masing membuka
  dialog; submit email valid → success state; kunjungi `/startup-registration` → mendarat di `/`
