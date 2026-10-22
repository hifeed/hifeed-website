# HiFeed Website — Architecture Overview

> Snapshot per 2026-10-22 (commit `42e44a7`). Dokumen ini menjelaskan struktur repo apa adanya, termasuk temuan yang perlu dibereskan.

## 1. Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15.5 (App Router, Turbopack dev), React 19.1 |
| Bahasa | TypeScript (strict), alias `@/*` → `src/*` |
| Styling | Tailwind CSS 3.4 |
| Chart / Map / PDF | Recharts, react-simple-maps (GeoJSON di `public/`), @react-pdf/renderer |
| i18n | Custom React Context (`src/i18n`), EN + ID, tanpa routing per bahasa |
| Backend | Hanya 1 route handler: `POST /api/contact` → Slack webhook |
| Database / CMS | **Tidak ada.** Semua konten & data di-hardcode di source |
| Hosting | Vercel (`output: 'standalone'`), GTM `GTM-PBF5GK7K` + GA4 `G-FLJH7FKJ1D` |

## 2. Struktur folder

```
hifeed-website/
├── components/                 ⚠ DEAD CODE — versi lama komponen landing, tidak di-import di mana pun
├── public/
│   ├── hifeed_logo.png, hifeed-cettle.jpg (OG image), cettle-feed-pellets.jpg, partner.png
│   ├── stories_1..4.webp       Foto testimoni (dipanggil via `/stories_${i}.webp`)
│   ├── indonesia.json, indonesia-topo.json   GeoJSON peta MRV
│   ├── robots.txt              ⚠ Bentrok dengan src/app/robots.ts
│   └── file/globe/next/vercel/window.svg     Sisa template create-next-app
├── src/
│   ├── app/                    ── ROUTES (App Router)
│   │   ├── layout.tsx          Root: metadata SEO, JSON-LD, GTM/GA, deteksi locale (cookie / x-vercel-ip-country)
│   │   ├── page.tsx            "/" landing page — seluruhnya "use client", merangkai 10 section
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts          Hanya berisi "/"
│   │   ├── robots.ts
│   │   ├── manifest.webmanifest
│   │   ├── api/contact/route.ts        Form konsultasi → Slack (env SLACK_WEBHOOK_URL)
│   │   ├── affiliate/[slug]/page.tsx   Redirect link afiliasi (map hardcoded)
│   │   └── mrv/                ── DASHBOARD MRV (publik, tanpa login)
│   │       ├── layout.tsx      Sidebar + main
│   │       ├── page.tsx        /mrv          Overview: stats, peta, credit pipeline, growth chart
│   │       ├── carbon/         /mrv/carbon   Siklus karbon, tabel pengukuran, verifikasi
│   │       ├── partners/       /mrv/partners Tabel mitra peternakan
│   │       ├── report/         /mrv/report   Laporan per periode + export PDF (dipakai tombol "Investors")
│   │       └── settings/       /mrv/settings Placeholder "Module Under Development"
│   ├── components/
│   │   ├── Header, Hero, Challenges, Solution, Benefits, Palatability,
│   │   │   Impact, Stories, Consultation, Footer   ── section landing page
│   │   ├── InvestorsFloatingButton.tsx             Link ke /mrv/report
│   │   ├── Team.tsx                                Tidak dipakai di page.tsx
│   │   └── mrv/                                    Komponen dashboard + report/ (PDF, period selector, supply chain)
│   ├── i18n/
│   │   ├── dictionaries.ts     SEMUA copy landing page (EN & ID) — ~390 baris
│   │   └── LocaleProvider.tsx  Context `t('hero.title')`, simpan pilihan di localStorage+cookie, fallback ke ipapi.co
│   └── lib/mrv/                ── "DATA LAYER" MRV (lihat bagian 3)
│       ├── types.ts            Tipe domain: FarmPartner, CattleRecord, CultivationPlot, HarvestRecord, ...
│       ├── data.ts             Dataset hardcoded + generator sintetis
│       ├── calc.ts             Rumus agregasi & konversi CO₂e
│       ├── periods.ts          Definisi periode laporan (Q1-2025 … YTD 2026)
│       └── report-meta.ts      Metadata laporan (versi "prototype-v0.1")
├── next.config.ts              standalone, images.remotePatterns '**', security headers
├── tailwind.config.js
├── postcss.config.js           ⚠ dua config PostCSS; .mjs mereferensikan @tailwindcss/postcss (v4) yang tidak terinstall
├── postcss.config.mjs
└── vercel.json
```

### Alur render landing page

```
layout.tsx (server)  ──► generateMetadata(): baca cookie `locale` / header negara → pilih deskripsi EN/ID
        │
        └─► LocaleProvider (client) ──► page.tsx (client)
                                          └─ Header → Hero → Challenges → Solution → Benefits
                                             → Palatability → Impact → Stories → Consultation → Footer
                                             (tiap section: const { t } = useLocale(); t('hero.title'))
```

Sumber konten landing page:
- **Teks** → `src/i18n/dictionaries.ts`
- **Gambar** → path statis `/public/*` di-hardcode di komponen
- **Video** → iframe Google Drive (`Hero.tsx`, `Palatability.tsx`)
- **SEO** → `layout.tsx` (title, description, keywords, OG, Twitter, JSON-LD) — satu set untuk seluruh situs

## 3. MRV — datanya dari mana?

**Jawaban singkat: seluruh data MRV adalah data dummy/prototype yang ditulis tangan di `src/lib/mrv/data.ts`, sebagian lagi di-generate secara sintetis dari angka tersebut, dan beberapa angka di-hardcode langsung di komponen.** Tidak ada database, API, IoT, atau input dari lapangan. `report-meta.ts` sendiri menandai versi `prototype-v0.1` dan `"pre-generated, prototype"`.

### 3.1 Tiga lapisan sumber data

| Lapisan | Isi | Lokasi |
|---|---|---|
| **A. Input hardcoded** | 10 mitra peternakan (nama, lokasi, jumlah sapi, koordinat, **feed ton per bulan** Jan 2025–Jul 2026) | `data.ts` → `PARTNERS` |
| | 6 ekor sapi sampel dengan histori reduksi metana & sekuestrasi (Jan–Jun 2025 saja) | `data.ts` → `CATTLE` |
| | 25 plot budidaya Indigofera/Pakcoy (hektar, tanggal tanam, yield, CO₂e/ha/tahun) | `data.ts` → `CULTIVATION_PLOTS` |
| | Konstanta: EF 0.36 t CO₂e/t pakan, GWP₁₀₀ = 28, rasio sekuestrasi 0.155, dry/fresh 0.25, yield proses 0.62 | `calc.ts`, `data.ts` |
| **B. Turunan sintetis** | `MONTHLY`: baseline = feedTon × 4000 g; faktor reduksi = `0.78 − index/600` (dibuat-buat agar tren naik); kredit issued = 70% CO₂e, pending = 20% | `data.ts` → `aggregateMonthly()` |
| | `HARVESTS`: tiap plot dianggap panen penuh **setiap bulan** setelah siklus pertama | `data.ts` → `buildHarvests()` |
| | `PROCESSING`: dihitung mundur dari feed ton (pellet = feed × 1000 kg) | `data.ts` → `buildProcessing()` |
| | Kredit "sold" = 56% dari kredit kumulatif | `calc.ts` → `aggregatePipelineForPeriod()` |
| **C. Angka statis di UI** | "45.2 Ton CO₂e", "32 / 9 / 18 Credits", timeline verifikasi Jul–Agu 2025 | `app/mrv/page.tsx`, `components/mrv/CreditPipeline.tsx`, `VerificationStatus.tsx`, `MeasurementTable.tsx`, `ReportingChart.tsx` (tidak import `lib/mrv`) |

### 3.2 Alur data

```
PARTNERS / CATTLE / CULTIVATION_PLOTS  (hardcoded)
        │
        ├─► aggregateMonthly() ─► MONTHLY ─┐
        ├─► buildHarvests()    ─► HARVESTS ┤
        └─► buildProcessing()  ─► PROCESSING
                                           ▼
                         calc.ts (filter by period dari periods.ts)
                                           ▼
     DashboardStats · FarmPartnersTable · ReportSummary · SupplyChainFlow · ReportPdfDocument
     GrowthChart · IndonesiaMap (langsung dari data.ts)
```

Semua dihitung di **client** saat runtime (module-level constant), jadi angkanya deterministik dan sama untuk semua pengunjung.

### 3.3 Catatan penting

1. **Risiko klaim ke investor.** Halaman `/mrv` menulis *"Real-time monitoring"* dan tombol "Investors" di landing page mengarah ke `/mrv/report`, padahal datanya dummy. Sebaiknya beri label "Demo / Prototype data" yang jelas, atau tutup di balik login, sampai data riil tersedia.
2. **Inkonsistensi angka.** Header & `CreditPipeline` memakai angka statis (45.2 t, 32/9/18 credits) yang tidak sama dengan hasil `calc.ts` untuk periode manapun.
3. **Metodologi tidak konsisten.** Ada tiga jalur CO₂e berbeda: `feedToCO2e` (EF 0.36), `MONTHLY.savedG` (baseline 4000 g/t × faktor arbitrer), dan `entericMethaneCreditFromG` (GWP 28 dari 6 sapi sampel). Sebelum diaudit (Verra VCS), metode harus disatukan.
4. **Tidak ada auth.** `/mrv/*` publik.
5. **Jalan menuju data riil** (di luar scope CMS, tapi bisa memakai DB yang sama): tabel `partners`, `feed_distributions`, `cultivation_plots`, `harvests`, `processing_batches`, `measurements`; input via admin panel / upload CSV / sensor IoT; `lib/mrv/data.ts` diganti query DB dengan signature yang sama sehingga `calc.ts` dan komponen tidak perlu banyak berubah.

## 4. Temuan teknis lain (cleanup)

> **Update 2026-10-22 (Fase 0 + 1):** #1, #2, #3, #5, #6, #7, #8 dan sebagian #10 (SVG template, `Team.tsx`) sudah dikerjakan. `page.tsx` kini server component, tapi section-nya masih client (`useLocale`) sampai Fase 2 (CMS). Bagian 2 di atas menggambarkan struktur *sebelum* perubahan; lihat README untuk struktur terbaru.

| # | Temuan | Dampak |
|---|---|---|
| 1 | Folder `components/` di root = duplikat lama, tidak di-import | Membingungkan; hapus |
| 2 | `public/robots.txt` + `src/app/robots.ts` | Konflik; hapus file statis |
| 3 | Dua PostCSS config, satu mereferensikan paket yang tidak terinstall | Rawan build break; sisakan `postcss.config.js` |
| 4 | `page.tsx` full `"use client"` | Semua copy ikut ke bundle JS; tidak bisa fetch CMS di server |
| 5 | Bahasa dipilih via cookie/IP pada URL yang sama, tanpa `hreflang` | Google hanya mengindeks satu bahasa (biasanya EN, karena Googlebot dari US) |
| 6 | JSON-LD `SearchAction` ke `/?q=` padahal tidak ada fitur search | Structured data tidak valid |
| 7 | `sitemap.ts` hanya `/` | Halaman lain tidak tercantum |
| 8 | `metadata.themeColor` deprecated di Next 15 | Warning; pindah ke `export const viewport` |
| 9 | Video via iframe Google Drive | Lambat, tidak bisa dioptimasi, bergantung permission Drive |
| 10 | `Team.tsx`, SVG template, nama paket `"nextjs"`, README generik | Sisa scaffold |
