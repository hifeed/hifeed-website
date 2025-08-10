import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "../i18n/LocaleProvider";
import { headers, cookies } from "next/headers";
import Script from "next/script";

// Prefer domain from env for canonical/OG URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hifeed.co";

export const metadata: Metadata = {
  title: "HiFeed - Sustainable Cattle Farming Revolution",
  description:
    "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
  // Set browser UI theme color (tab/address bar) to brand green
  themeColor: "#00AB7E",
  metadataBase: new URL(siteUrl),
  applicationName: "HiFeed",
  keywords: [
    "HiFeed",
    "cattle feed",
    "complete feed pellets",
    "sustainable farming",
    "carbon negative feed",
    "net-zero agriculture",
    "pakan sapi",
    "peternakan berkelanjutan",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HiFeed",
    title: "HiFeed - Sustainable Cattle Farming Revolution",
    description:
      "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
    images: [
      {
        url: "/hifeed-cettle.jpg",
        width: 1200,
        height: 630,
        alt: "HiFeed - Sustainable Cattle Farming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hifeed", // update if you have a real handle
    title: "HiFeed - Sustainable Cattle Farming Revolution",
    description:
      "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
    images: [
      {
        url: "/hifeed-cettle.jpg",
        alt: "HiFeed - Sustainable Cattle Farming",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Baca preferensi dari cookie (jika ada) atau deteksi negara dari header Vercel.
  const cookieStore = await cookies();
  const saved = cookieStore.get("locale")?.value as "en" | "id" | undefined;
  const h = await headers();
  const country = (h.get("x-vercel-ip-country") || h.get("x-country") || "").toUpperCase();
  const initialLocale: "en" | "id" = saved ?? (country === "ID" ? "id" : "en");

  return (
    <html lang={initialLocale} className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* JSON-LD Structured Data */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HiFeed",
          url: siteUrl,
          logo: `${siteUrl}/hifeed_logo.png`,
          sameAs: [],
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "hello@hifeed.co",
              contactType: "customer support",
              areaServed: "ID",
              availableLanguage: ["en", "id"],
            },
          ],
        })}</Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "HiFeed",
          url: siteUrl,
          inLanguage: initialLocale,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}</Script>
      </head>
      <body className="bg-white text-gray-800 font-sans overflow-x-hidden">
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?"&l="+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PBF5GK7K');
        `}</Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FLJH7FKJ1D" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-FLJH7FKJ1D');
        `}</Script>
        {/* End Google tag (gtag.js) */}

        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBF5GK7K" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        {/* End Google Tag Manager (noscript) */}

        <LocaleProvider initialLocale={initialLocale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
