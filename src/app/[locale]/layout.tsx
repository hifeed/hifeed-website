import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { getSiteContent } from "../../sanity/content";
import { isIndexable, isLocale, locales, ogLocales, siteUrl } from "../../i18n/config";
import Analytics from "../../components/Analytics";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Hanya /en dan /id yang valid; keduanya dirender statis saat build.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#00AB7E",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { dictionary, seo } = await getSiteContent(locale);
  const { meta } = dictionary;
  const ogImage = { ...seo.ogImage, alt: seo.ogImage.alt || meta.ogImageAlt };
  const indexable = isIndexable && !seo.noIndex;

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    applicationName: "HiFeed",
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "HiFeed",
      title: meta.title,
      description: meta.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: "@hifeed",
      title: meta.title,
      description: meta.description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
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
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { dictionary, media, settings } = await getSiteContent(locale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "HiFeed",
      url: siteUrl,
      logo: media.logo.startsWith("http") ? media.logo : `${siteUrl}${media.logo}`,
      sameAs: [settings.linkedinUrl, settings.instagramUrl].filter(Boolean),
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: settings.contactEmail,
          contactType: "customer support",
          areaServed: "ID",
          availableLanguage: ["en", "id"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "HiFeed",
      url: `${siteUrl}/${locale}`,
      inLanguage: locale,
    },
  ];

  return (
    <html lang={locale} className="overflow-x-hidden">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // Escape "<" agar string (kelak dari CMS) tidak bisa menutup tag <script>.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="bg-white text-gray-800 font-sans overflow-x-hidden">
        <Analytics />
        <LocaleProvider initialLocale={locale} dictionary={dictionary} media={media} settings={settings}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
