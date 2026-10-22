import { dictionaries, type Dictionary, type Locale } from '../i18n/dictionaries';
import { client, imageUrl, type ImageWithAlt } from './lib/client';
import { delocalize, mergeContent } from './lib/localized';
import { LANDING_PAGE_ID, SITE_SETTINGS_ID, CARBON_ACCOUNTING_ID, SANITY_CACHE_TAG } from './env';
import { carbonFromSanity } from './lib/carbonMapping';
import { DEFAULT_SETTINGS, type SiteSettings } from './siteDefaults';

export type { SiteSettings };
import { DEFAULT_CARBON_DATA, type CarbonDataset } from '../lib/mrv/carbon';

export interface SiteMedia {
  logo: string;
  heroVideoUrl: string;
  palatabilityImage: { src: string; alt: string };
  palatabilityVideoUrl: string;
  storyImages: Array<{ src: string; alt: string }>;
  partnersImage: string;
}

export interface SiteSeo {
  ogImage: { url: string; width: number; height: number; alt?: string };
  keywords: string[];
  noIndex: boolean;
}

export interface SiteContent {
  dictionary: Dictionary;
  media: SiteMedia;
  settings: SiteSettings;
  seo: SiteSeo;
  source: 'sanity' | 'static';
}

// Nilai bawaan = konten website sebelum CMS.
export const DEFAULT_MEDIA: SiteMedia = {
  logo: '/hifeed_logo.png',
  heroVideoUrl: 'https://drive.google.com/file/d/1nmRfmHQs2cvrIq-Kak-FEblI8zZc8JC1/preview',
  palatabilityImage: { src: '/cettle-feed-pellets.jpg', alt: 'HiFeed Pellets' },
  palatabilityVideoUrl: 'https://drive.google.com/file/d/1xTamyiCaRIt4kcBqMCc24GgtJQfx4MFO/preview',
  storyImages: [1, 2, 3, 4].map((i) => ({ src: `/stories_${i}.webp`, alt: `Story ${i}` })),
  partnersImage: '/partner.png',
};

export const DEFAULT_KEYWORDS = [
  'HiFeed',
  'cattle feed',
  'complete feed pellets',
  'sustainable farming',
  'carbon negative feed',
  'net-zero agriculture',
  'pakan sapi',
  'peternakan berkelanjutan',
];

const DEFAULT_OG_IMAGE = { url: '/hifeed-cettle.jpg', width: 1200, height: 630 };

type LandingPageDoc = Record<string, unknown> & {
  ogImage?: ImageWithAlt;
  keywords?: string[];
  noIndex?: boolean;
  logo?: ImageWithAlt;
  heroVideoUrl?: string;
  palatabilityImage?: ImageWithAlt;
  palatabilityVideoUrl?: string;
  storyImages?: ImageWithAlt[];
  partnersImage?: ImageWithAlt;
};

const SITE_QUERY = `{
  "page": *[_type == "landingPage" && _id == $pageId][0],
  "settings": *[_type == "siteSettings" && _id == $settingsId][0]
}`;

function mergeSettings(doc: Partial<SiteSettings> | null | undefined): SiteSettings {
  const entries = Object.entries(DEFAULT_SETTINGS).map(([key, fallback]) => {
    const value = doc?.[key as keyof SiteSettings];
    return [key, typeof value === 'string' && value.trim() ? value.trim() : fallback];
  });
  return Object.fromEntries(entries) as SiteSettings;
}

function staticContent(locale: Locale): SiteContent {
  return {
    dictionary: dictionaries[locale],
    media: DEFAULT_MEDIA,
    settings: DEFAULT_SETTINGS,
    seo: { ogImage: DEFAULT_OG_IMAGE, keywords: DEFAULT_KEYWORDS, noIndex: false },
    source: 'static',
  };
}

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  if (!client) return staticContent(locale);

  let doc: LandingPageDoc | null = null;
  let settingsDoc: Partial<SiteSettings> | null = null;
  try {
    const result = await client.fetch<{ page: LandingPageDoc | null; settings: Partial<SiteSettings> | null }>(
      SITE_QUERY,
      { pageId: LANDING_PAGE_ID, settingsId: SITE_SETTINGS_ID },
      { next: { tags: [SANITY_CACHE_TAG] } },
    );
    doc = result.page;
    settingsDoc = result.settings;
  } catch (error) {
    console.error('[sanity] Failed to fetch site content, using built-in content.', error);
  }
  if (!doc) return { ...staticContent(locale), settings: mergeSettings(settingsDoc) };

  const base = staticContent(locale);
  const dictionary = mergeContent(base.dictionary, delocalize(doc, locale));
  const altOr = (image: ImageWithAlt | undefined, fallback: string) => image?.alt || fallback;

  const storyImages = (doc.storyImages ?? [])
    .map((image, i) => ({ src: imageUrl(image, 720), alt: altOr(image, `Story ${i + 1}`) }))
    .filter((image): image is { src: string; alt: string } => !!image.src);

  const ogUrl = imageUrl(doc.ogImage, 1200, 630);

  return {
    dictionary,
    media: {
      logo: imageUrl(doc.logo, 256) ?? DEFAULT_MEDIA.logo,
      heroVideoUrl: doc.heroVideoUrl || DEFAULT_MEDIA.heroVideoUrl,
      palatabilityImage: {
        src: imageUrl(doc.palatabilityImage, 1600) ?? DEFAULT_MEDIA.palatabilityImage.src,
        alt: altOr(doc.palatabilityImage, DEFAULT_MEDIA.palatabilityImage.alt),
      },
      palatabilityVideoUrl: doc.palatabilityVideoUrl || DEFAULT_MEDIA.palatabilityVideoUrl,
      storyImages: storyImages.length > 0 ? storyImages : DEFAULT_MEDIA.storyImages,
      partnersImage: imageUrl(doc.partnersImage, 1200) ?? DEFAULT_MEDIA.partnersImage,
    },
    settings: mergeSettings(settingsDoc),
    seo: {
      ogImage: ogUrl
        ? { url: ogUrl, width: 1200, height: 630, alt: doc.ogImage?.alt }
        : DEFAULT_OG_IMAGE,
      keywords: doc.keywords?.length ? doc.keywords : DEFAULT_KEYWORDS,
      noIndex: doc.noIndex === true,
    },
    source: 'sanity',
  };
}

export async function getAffiliateUrl(slug: string): Promise<string | null> {
  if (!client) return null;
  try {
    return await client.fetch<string | null>(
      `*[_type == "affiliateLink" && slug.current == $slug && active != false][0].url`,
      { slug },
      { next: { tags: [SANITY_CACHE_TAG] } },
    );
  } catch (error) {
    console.error('[sanity] Failed to fetch affiliate link.', error);
    return null;
  }
}

/** Data MRV: dokumen "Carbon accounting" digabung di atas data workbook. */
export async function getCarbonData(): Promise<CarbonDataset> {
  if (!client) return DEFAULT_CARBON_DATA;
  try {
    const doc = await client.fetch<Record<string, unknown> | null>(
      `*[_type == "carbonAccounting" && _id == $id][0]`,
      { id: CARBON_ACCOUNTING_ID },
      { next: { tags: [SANITY_CACHE_TAG] } },
    );
    return carbonFromSanity(doc, DEFAULT_CARBON_DATA);
  } catch (error) {
    console.error('[sanity] Failed to fetch carbon accounting, using workbook data.', error);
    return DEFAULT_CARBON_DATA;
  }
}
