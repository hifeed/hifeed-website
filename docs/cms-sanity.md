# HiFeed CMS (Sanity) — setup & cara pakai

Keputusan arsitektur: [ADR-001](architecture/ADR-001-cms.md).

## Cara kerja

```
Editor ─► /studio (Sanity Studio, embedded)  ──publish──►  Sanity Content Lake
                                                              │ webhook
                                                              ▼
Pengunjung ─► /en, /id (halaman statis) ◄── revalidateTag('sanity') ── /api/revalidate
                    ▲
                    └─ getSiteContent(locale): konten Sanity digabung di atas src/i18n/dictionaries.ts
```

- **Konten teks**: dokumen singleton *Landing page*, satu tab per section (SEO, Hero, Challenges, …).
  Setiap teks punya kolom *English* dan *Bahasa Indonesia*. Field yang dikosongkan otomatis
  memakai teks bawaan di `src/i18n/dictionaries.ts`, jadi halaman tidak pernah kosong.
- **SEO**: tab *SEO* — title, description, OG image (dipotong 1200×630 mengikuti hotspot), keywords, noindex.
- **Gambar & video**: tab *Images & video* — logo, gambar & video palatability, foto testimoni,
  logo partner, URL video hero. Gambar disajikan dari CDN Sanity (webp/avif otomatis).
- **Link afiliasi**: dokumen *Affiliate link* → `hifeed.co/affiliate/<slug>`.
- Schema field konten **dibuat otomatis dari struktur `dictionaries.ts`**
  (`src/sanity/schemaTypes/landingPage.ts`). Menambah key baru di dictionary + komponen
  otomatis memunculkan field baru di Studio.
- Tanpa env Sanity, website tetap jalan dengan konten bawaan dan `/studio` menampilkan petunjuk setup.

## Setup (sekali)

### 1. Buat project Sanity

**Opsi A — lewat Vercel Marketplace (direkomendasikan, setelah akses ke project Vercel website ada):**

```bash
npx vercel@latest link
npx vercel@latest integration add sanity
npx vercel@latest env pull .env.local --yes
```

Slug integrasi `sanity` belum diverifikasi; cek dulu dengan `npx vercel@latest integration discover --category cms`.
Periksa juga nama env var yang dibuat integrasi; kode ini membaca `NEXT_PUBLIC_SANITY_PROJECT_ID`
dan `NEXT_PUBLIC_SANITY_DATASET`. Jika namanya berbeda, tambahkan alias dengan nama tersebut di Vercel.

**Opsi B — langsung di sanity.io** (bila akses Vercel belum ada): login di https://www.sanity.io/manage
dengan akun it-ops@hifeed.co → *Create project* → dataset `production` (public). Salin Project ID ke `.env.local`
(lihat `.env.example`).

### 2. CORS origins

Di sanity.io/manage → project → *API* → *CORS origins*, tambahkan dengan **Allow credentials**:
`http://localhost:3000`, `https://hifeed.co`, dan domain preview Vercel.

### 3. Isi konten awal

Buat token di *API → Tokens* (role **Editor**), simpan sebagai `SANITY_API_WRITE_TOKEN` di `.env.local`, lalu:

```bash
npm run sanity:seed
```

Script mengunggah gambar dari `public/`, membuat dokumen *Landing page* dari `dictionaries.ts`
(EN + ID), dan 4 link afiliasi. Aman dijalankan ulang (tidak menimpa; pakai `-- --force` untuk menimpa).
Token ini tidak perlu dipasang di Vercel.

### 4. Webhook revalidasi

sanity.io/manage → *API* → *Webhooks* → *Create*:
- URL: `https://hifeed.co/api/revalidate`
- Dataset: `production`, Trigger: create/update/delete, Filter: `_type in ["landingPage", "affiliateLink"]`
- Secret: string acak → simpan juga sebagai `SANITY_REVALIDATE_SECRET` di env Vercel.

### 5. Env di Vercel

`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET` → redeploy.

### 6. Undang editor

sanity.io/manage → *Members* → invite (role Editor). Editor login di `https://hifeed.co/studio`.

## Pemeriksaan

```bash
npm run verify:cms      # konversi dictionary ⇄ dokumen Sanity tidak kehilangan konten
npm run build
```

## Versi

`sanity@4.22` + `next-sanity@11.6` — versi terakhir yang mendukung Next 15 / React 19.1.
Upgrade ke Sanity 5 / next-sanity 12+ bersamaan dengan upgrade Next 16 + React 19.2.
