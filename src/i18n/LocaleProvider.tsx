"use client";
import React, { createContext, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale, Dictionary } from './dictionaries';
import type { SiteMedia, SiteSettings } from '../sanity/content';
import { LOCALE_COOKIE } from './config';

// Simpan pilihan bahasa agar middleware memakainya saat user membuka "/" lagi.
export function rememberLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

interface LocaleContextType {
  locale: Locale;
  media: SiteMedia;
  settings: SiteSettings;
  t: (path: string) => unknown;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function get(obj: unknown, path: string): unknown {
  const keys = path.split('.');
  let acc: unknown = obj;
  for (const key of keys) {
    if (acc == null || typeof acc !== 'object') return undefined;
    const record = acc as Record<string, unknown>;
    acc = record[key];
  }
  return acc;
}

type LocaleProviderProps = {
  initialLocale: Locale;
  /** Konten (CMS digabung di atas dictionaries.ts) untuk bahasa ini, disiapkan di server. */
  dictionary: Dictionary;
  media: SiteMedia;
  settings: SiteSettings;
  children: React.ReactNode;
};

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ initialLocale, dictionary, media, settings, children }) => {
  // Bahasa ditentukan oleh URL (/en, /id); middleware yang mengarahkan pengunjung ke URL yang tepat.
  const locale = initialLocale;
  const router = useRouter();

  const value = useMemo(() => {
    return {
      locale,
      media,
      settings,
      t: (path: string) => get(dictionary, path),
      setLocale: (l: Locale) => {
        rememberLocale(l);
        router.push(`/${l}`);
      },
    } as LocaleContextType;
  }, [locale, dictionary, media, settings, router]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useTranslations(base?: string) {
  const { t } = useLocale();
  return (path: string) => t(base ? `${base}.${path}` : path);
}

export function useMedia() {
  return useLocale().media;
}

export function useSiteSettings() {
  return useLocale().settings;
}
