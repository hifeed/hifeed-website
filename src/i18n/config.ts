import type { Locale } from './dictionaries';

export const locales: readonly Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE = 'locale';

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  id: 'id_ID',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hifeed.co';

// Hanya deployment production Vercel yang boleh diindeks; staging/preview (mis. staging.hifeed.co)
// otomatis noindex. Build lokal (tanpa VERCEL_ENV) diperlakukan seperti production.
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';
