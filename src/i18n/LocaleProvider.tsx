"use client";
import React, { createContext, useContext, useMemo, useState } from 'react';
import { dictionaries, type Locale, type Dictionary } from './dictionaries';

interface LocaleContextType {
  locale: Locale;
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

export const LocaleProvider: React.FC<{ initialLocale: Locale; children: React.ReactNode }> = ({ initialLocale, children }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Pada mount: gunakan preferensi yang tersimpan, jika tidak ada deteksi IP -> set default.
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('locale') as Locale | null;
    if (saved === 'en' || saved === 'id') {
      if (saved !== locale) setLocale(saved);
      document.documentElement.lang = saved;
      document.cookie = `locale=${saved}; path=/; max-age=31536000`;
      return;
    }
    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const isID = data && data.country === 'ID';
        const detected: Locale = isID ? 'id' : 'en';
        window.localStorage.setItem('locale', detected);
        document.cookie = `locale=${detected}; path=/; max-age=31536000`;
        setLocale(detected);
        document.documentElement.lang = detected;
      } catch {
        document.documentElement.lang = locale;
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    const dict: Dictionary = dictionaries[locale];
    return {
      locale,
      t: (path: string) => get(dict, path),
      setLocale: (l: Locale) => {
        setLocale(l);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('locale', l);
          document.documentElement.lang = l;
          document.cookie = `locale=${l}; path=/; max-age=31536000`;
        }
      },
    } as LocaleContextType;
  }, [locale]);

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
