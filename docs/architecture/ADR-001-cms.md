# ADR-001: CMS untuk konten, gambar, dan SEO website company profile

**Status:** Accepted — Sanity (diputuskan 2026-10-22)
**Date:** 2026-10-22
**Deciders:** Albert Ade Kristadeo (engineering), tim marketing/konten HiFeed

## Context

Saat ini semua konten website di-hardcode (lihat [overview.md](overview.md)):
- Teks EN/ID di `src/i18n/dictionaries.ts`; tiap perubahan copy butuh developer + deploy.
- Gambar di `public/` dengan path hardcode; video lewat iframe Google Drive.
- SEO hanya satu set metadata global di `layout.tsx`; tidak ada SEO per halaman, tidak ada `hreflang`.
- Bahasa ditentukan lewat cookie/IP di URL yang sama, jadi versi Indonesia praktis tidak terindeks.

Kebutuhan:
1. Tim non-developer bisa mengubah **konten**, **gambar**, dan **SEO** (title, description, OG image, canonical, noindex) per halaman, dalam **EN + ID**.
2. Bisa menambah halaman/artikel (blog, news, press) untuk SEO jangka panjang.
3. Perubahan tampil tanpa redeploy, tetapi halaman tetap statis/cepat (ISR / on-demand revalidation).
4. Tetap di Vercel, biaya rendah, tim kecil (1–2 developer) dengan stack TypeScript/Next.js.
5. Nice-to-have: database yang sama nantinya bisa dipakai untuk input data MRV riil.

Constraint: tidak ada backend/DB saat ini; tim familiar dengan Next.js + TS, bukan dengan ops server.

## Decision

**Pakai Sanity** (Option D), di-provision lewat **Vercel Marketplace** (integrasi native: project, env var, dan billing dikelola dari Vercel). Sanity Studio di-embed di app Next.js yang sama pada route `/studio`; konten diambil dengan `next-sanity` di Server Components, gambar via Sanity image CDN (`@sanity/image-url`, hotspot/crop), dan perubahan konten memicu revalidasi lewat webhook → `revalidateTag`.

Alasan memilih Sanity dibanding Payload (rekomendasi awal): satu-satunya CMS native di Vercel Marketplace (tanpa database/storage yang harus dirawat sendiri), editor Studio yang matang untuk tim non-teknis, dan live preview (Presentation tool). Konsekuensinya: konten berada di Content Lake milik Sanity dan data MRV riil nantinya butuh database terpisah.

i18n berbasis URL (`/id`, `/en`) sudah diterapkan di Fase 1; di Sanity bahasa disimpan per field (`{ en, id }`).

## Options Considered

### Option A: Payload CMS 3 (embedded di Next.js) — **direkomendasikan**

| Dimension | Assessment |
|---|---|
| Complexity | Medium — install ke repo yang sama; schema ditulis sebagai TypeScript config |
| Cost | Rendah — open-source (MIT); hanya bayar Postgres (free tier Neon/Supabase cukup) + Vercel Blob |
| Scalability | Baik untuk company profile + blog; halaman di-cache statis, CMS hanya dipanggil saat build/revalidate |
| Team familiarity | Tinggi — murni Next.js + TS, type otomatis untuk konten |

**Pros:** satu repo & satu deploy; Local API (query langsung di Server Component, tanpa HTTP/REST); localization per-field bawaan (EN/ID); `@payloadcms/plugin-seo` (meta title/description/image + preview Google); upload gambar dengan resize/crop & focal point; draft, versioning, live preview; auth & role admin bawaan; hook `afterChange` → `revalidatePath/revalidateTag`; DB yang sama bisa dipakai untuk modul MRV nanti.
**Cons:** admin ikut bundle/deploy app (build sedikit lebih lama); butuh Next ≥15 & React 19 (sudah terpenuhi); migrasi DB perlu dikelola; komunitas lebih kecil dari Strapi.

### Option B: Strapi 5 (headless, service terpisah)

| Dimension | Assessment |
|---|---|
| Complexity | Medium–High — dua aplikasi, dua deploy, API token, CORS, webhook revalidate |
| Cost | Self-host: VPS/Railway/Render ~$5–20/bln + DB + storage (S3/Cloudinary). Strapi Cloud: berbayar per bulan |
| Scalability | Baik; tapi server Strapi harus selalu hidup (tidak serverless-friendly, tidak jalan di Vercel) |
| Team familiarity | Medium — Node.js, tapi konvensi & plugin sendiri |

**Pros:** paling populer, admin UI matang & ramah non-teknis, Content-Type Builder via UI, i18n plugin resmi, ekosistem plugin besar (SEO plugin tersedia).
**Cons:** infrastruktur tambahan yang harus dirawat (uptime, update, backup); fetch lewat REST/GraphQL (latensi + token); schema dibuat via UI → lebih sulit di-review di git; upgrade major version (v4→v5) historisnya menyakitkan.

### Option C: Bangun CMS sendiri

| Dimension | Assessment |
|---|---|
| Complexity | High — auth, role, upload & optimasi gambar, editor rich text, i18n, draft/preview, versioning, SEO fields, audit log |
| Cost | Infra murah, **biaya developer paling mahal** (estimasi 4–8 minggu untuk setara fitur dasar Payload/Strapi) |
| Scalability | Tergantung implementasi |
| Team familiarity | Tinggi (kode sendiri), tapi semua maintenance jadi tanggungan tim |

**Pros:** kontrol penuh, bisa sangat spesifik (mis. digabung dengan input data MRV).
**Cons:** menulis ulang fitur yang sudah gratis di Option A/B; risiko keamanan (auth, upload) ditanggung sendiri; editor experience biasanya kalah. Hanya masuk akal jika kebutuhannya bukan CMS umum — dan untuk company profile, bukan.

### Option D: Headless SaaS (Sanity / Storyblok / Contentful)

| Dimension | Assessment |
|---|---|
| Complexity | Low–Medium — hosted, tinggal integrasi SDK |
| Cost | Free tier cukup di awal; naik tajam saat butuh banyak seat/locale/role |
| Scalability | Sangat baik (CDN vendor) |
| Team familiarity | Medium |

**Pros:** nol ops, editor visual (Storyblok) / real-time collab (Sanity), CDN gambar bawaan.
**Cons:** vendor lock-in & pricing per seat/locale; data konten di luar kendali; tidak bisa dipakai ulang untuk data MRV.

> **Vercel Marketplace, kategori CMS (dicek 2026-10-22 lewat vercel.com/marketplace):**
> - **Native** (provisioning, env var, dan billing lewat Vercel): **Sanity** — satu-satunya.
> - **Connectable** (akun dibuat di vendor, lalu disambungkan): Contentful, DatoCMS, Builder.io, Makeswift, Agility CMS, ButterCMS, Contentstack, Sitecore XM Cloud. (Formspree juga diberi tag CMS, tapi sebenarnya form backend.)
> - Payload dan Strapi **tidak** ada di Marketplace.
>
> Jika memilih SaaS (Option D), Sanity yang paling cocok: native di Vercel, punya i18n per field/dokumen, `@sanity/image-url` + hotspot/crop, Visual Editing/Presentation untuk live preview di Next.js, dan Studio bisa di-embed di `/studio` di repo yang sama. Trade-off-nya: konten tersimpan di Content Lake milik Sanity (bukan DB sendiri), dan pricing per seat/kuota begitu melewati free tier.

## Trade-off Analysis

- **Ops vs kontrol:** Strapi memberi admin paling "siap pakai" tapi menambah satu server untuk dirawat. Payload memberi hasil setara tanpa server tambahan karena hidup di dalam Next.js di Vercel. Untuk tim kecil, menghapus satu komponen infra lebih bernilai daripada kelebihan UI Strapi.
- **Schema-as-code:** Payload (dan custom) menyimpan schema di git → bisa direview, punya type otomatis. Strapi menyimpan schema sebagai JSON hasil UI builder — tetap di git, tapi lebih rawan drift.
- **Performa SEO:** semua opsi bisa menghasilkan halaman statis + revalidate. Payload unggul tipis karena Local API tanpa round-trip HTTP saat build.
- **Custom CMS** hanya menang jika kebutuhan sangat unik. Kebutuhan di sini (konten, gambar, SEO, 2 bahasa) adalah kasus standar.
- **Jangka panjang (MRV):** Payload/custom bisa memakai Postgres yang sama untuk collection `partners`, `feed-distributions`, dsb. dengan admin UI gratis untuk input data — nilai tambah besar dibanding Strapi/SaaS.

## Rancangan Content Model (Payload)

**Globals** (satu dokumen):
| Global | Field |
|---|---|
| `site-settings` | nama situs, logo, favicon, default SEO (title template, description, OG image), social links, email/telepon/alamat (localized), GTM/GA ID, Google verification |
| `header` | menu nav (label localized, anchor/URL), CTA |
| `footer` | about (localized), kolom link, alamat, copyright |

**Collections:**
| Collection | Field utama | Catatan |
|---|---|---|
| `pages` | `title`, `slug`, `layout` (blocks), `seo` (plugin), `status` draft/published | Landing `/` = page `home` |
| `media` | file, `alt` (localized, wajib), caption, focal point | Upload ke Vercel Blob; ukuran `og` 1200×630, `card`, `hero` |
| `stories` | nama, peran/peternakan, quote, foto, urutan | Menggantikan `stories_${i}.webp` |
| `posts` *(fase 2)* | title, slug, excerpt, cover, rich text, kategori, author, publishedAt, `seo` | Blog/berita untuk SEO |
| `affiliate-links` | slug, target URL, aktif | Menggantikan map di `affiliate/[slug]` |
| `consultation-leads` *(opsional)* | data form konsultasi | Arsip selain Slack |
| `users` | email, role (`admin`, `editor`) | Auth admin |

**Blocks untuk `pages.layout`** — satu block per section yang sudah ada, field localized mengikuti struktur `dictionaries.ts`:
`hero` · `challenges` · `solution` · `benefits` · `palatability` · `impact` · `stories` (relasi ke collection) · `consultation` (form config) · plus block generik `rich-text`, `image-text`, `cta`, `faq` (FAQ → JSON-LD FAQPage).

**SEO per dokumen:** `meta.title`, `meta.description`, `meta.image`, `canonical` override, `noindex`, `jsonLd` tambahan. Fallback ke `site-settings`.

## Arsitektur target

```
                ┌────────────────────── Next.js app (Vercel) ───────────────────────┐
 Editor ──────► │ /admin  (Payload Admin UI, auth, roles)                           │
                │    │ afterChange hook ──► revalidateTag('page:home') dll.         │
                │    ▼                                                               │
                │ Payload Local API ◄─── src/app/(site)/[locale]/[[...slug]]/page.tsx│
                │    │                     generateMetadata() dari field seo         │
                │    │                     sitemap.ts dari collection pages/posts    │
                └────┼───────────────────────────────────────────────────────────────┘
                     ├──► Postgres (Neon/Supabase, Vercel Marketplace)
                     └──► Vercel Blob (media)  ──► next/image
 Pengunjung ─► CDN Vercel (halaman statis/ISR per locale: /id, /en)
```

Struktur folder target:
```
src/
├── app/
│   ├── (site)/[locale]/            # landing & halaman publik, Server Components
│   │   ├── layout.tsx              # <html lang>, hreflang, JSON-LD dari site-settings
│   │   ├── [[...slug]]/page.tsx    # render pages.layout → block components
│   │   └── blog/[slug]/page.tsx    # fase 2
│   ├── (payload)/admin/...         # di-generate Payload
│   ├── (payload)/api/...           # REST/GraphQL Payload (opsional)
│   ├── mrv/...                     # tetap, nanti dipindah ke (internal) + auth
│   ├── sitemap.ts, robots.ts
├── blocks/                         # Hero, Challenges, ... (server components; bagian interaktif → client kecil)
├── payload/
│   ├── collections/ (Pages, Media, Stories, Posts, AffiliateLinks, Users)
│   ├── globals/ (SiteSettings, Header, Footer)
│   └── hooks/revalidate.ts
├── payload.config.ts
└── middleware.ts                   # redirect "/" → "/id" atau "/en" (cookie → Accept-Language → default)
```

## Consequences

**Lebih mudah:**
- Marketing mengubah teks, gambar, SEO, dan menambah halaman/artikel tanpa developer.
- SEO per halaman & per bahasa, `hreflang`, sitemap otomatis, OG image per halaman.
- Gambar teroptimasi (`next/image` + ukuran turunan), alt text wajib.
- Fondasi DB + admin untuk data MRV riil.

**Lebih sulit / baru:**
- Ada database & media storage yang harus dibackup dan dimonitor.
- Migrasi schema Payload perlu masuk alur deploy (`payload migrate`).
- Komponen section harus direfactor dari `useLocale().t()` (client) menjadi menerima props dari CMS (server).
- URL berubah ke `/id` & `/en` → perlu redirect 301 dari `/` dan update Google Search Console.

**Perlu ditinjau ulang nanti:**
- Apakah modul MRV memakai Payload collections atau service terpisah setelah metodologi difinalkan.
- Video: pindah dari Google Drive ke Vercel Blob / Mux / YouTube.
- Jika jumlah editor & workflow approval bertambah, evaluasi ulang kebutuhan editor visual (Storyblok/Sanity).

## Action Items

**Fase 0 — Cleanup (±1 hari)**
1. [ ] Hapus `components/` (root), `public/robots.txt`, `postcss.config.mjs`, SVG template, `Team.tsx` jika memang tidak dipakai.
2. [ ] Pindah `themeColor` ke `export const viewport`; hapus JSON-LD `SearchAction`.
3. [ ] Beri label "Prototype / demo data" di `/mrv` (atau batasi akses) sampai data riil tersedia.

**Fase 1 — i18n berbasis URL (±2–3 hari)**
4. [ ] `src/app/(site)/[locale]/...` + `middleware.ts` untuk deteksi & redirect locale.
5. [ ] `generateMetadata` per locale dengan `alternates.languages` (hreflang) & canonical.
6. [ ] Ubah section menjadi Server Components yang menerima props (masih dari `dictionaries.ts` dulu).

**Fase 2 — Payload CMS (±1–2 minggu)**
7. [ ] Provision Postgres + Vercel Blob (via Vercel Marketplace, `vercel env pull`).
8. [ ] Install Payload 3 ke repo; buat `users`, `media`, globals, `pages` + blocks, `stories`, `affiliate-links`; aktifkan localization `en`/`id` dan plugin SEO.
9. [ ] Script seed: impor isi `dictionaries.ts` + gambar `public/` ke CMS.
10. [ ] Render `pages.layout` → block components; `generateMetadata` & `sitemap.ts` dari CMS.
11. [ ] Hook revalidate on publish; aktifkan draft mode + live preview.
12. [ ] Role `editor` untuk tim konten; training singkat + panduan.

**Fase 3 — Konten SEO & lanjutan**
13. [ ] Collection `posts` (blog/news) + block FAQ dengan JSON-LD.
14. [ ] Migrasi video dari Google Drive.
15. [ ] (Terpisah) Desain data model MRV riil di DB yang sama + auth untuk `/mrv`.
