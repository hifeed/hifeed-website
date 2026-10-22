# HiFeed Website

Website resmi HiFeed - Platform inovatif untuk solusi terdepan.

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

Project ini sudah dikonfigurasi untuk deployment di Vercel. Langkah deployment:

1. Push code ke repository
2. Connect repository di Vercel dashboard
3. Deploy otomatis akan berjalan

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/      # Situs publik per bahasa: /en, /id
│   ├── mrv/           # Dashboard MRV (prototype, noindex)
│   ├── studio/        # Sanity Studio (CMS) di /studio
│   ├── api/contact/   # Form konsultasi → Slack
│   └── affiliate/     # Redirect link afiliasi
├── components/        # Section landing page + mrv/
├── i18n/              # config locale, dictionaries EN/ID, LocaleProvider
├── lib/mrv/           # Data & kalkulasi MRV (carbon.ts = data riil workbook)
├── sanity/            # Schema, client, getSiteContent()
└── middleware.ts      # Redirect "/" → /en atau /id
public/                # Static assets
docs/architecture/     # Overview & ADR
```

Bahasa ditentukan oleh URL. Pengunjung yang membuka `/` diarahkan (307) ke `/id` atau `/en` berdasarkan cookie `locale` → negara (`x-vercel-ip-country`) → `Accept-Language` → default `en`.

## 📝 CMS

Konten, gambar, dan SEO landing page dikelola di Sanity Studio (`/studio`). Setup & cara pakai: [docs/cms-sanity.md](docs/cms-sanity.md).

## 🔧 Environment Variables

Salin `.env.example` ke `.env.local` lalu isi nilainya.

## 📱 Features

- Responsive design
- TypeScript support
- Tailwind CSS styling
- SEO optimized
- Fast loading

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

This project is bootstrapped with [Next.js](https://nextjs.org) and ready for deployment on [Vercel Platform](https://vercel.com).
