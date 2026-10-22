// Konversi antara bentuk dictionary (src/i18n/dictionaries.ts) dan dokumen Sanity
// yang menyimpan setiap teks sebagai { en, id }. Dipakai oleh schema, seed, dan fetch,
// sehingga ketiganya selalu mengikuti struktur dictionary yang sama.
// Tidak ada import runtime agar bisa dipakai juga oleh script Node (scripts/sanity-seed.mjs).

export const LOCALES = ['en', 'id'] as const;
export type ContentLocale = (typeof LOCALES)[number];

/** Teks bahasa Inggris lebih panjang dari ini memakai textarea di Studio. */
export const LONG_TEXT_THRESHOLD = 90;

export interface LocalizedValue {
  _type: 'localeString' | 'localeText';
  en?: string;
  id?: string;
}

type Plain = string | Plain[] | { [key: string]: Plain };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isLocalized(value: unknown): value is LocalizedValue {
  return isRecord(value) && (value._type === 'localeString' || value._type === 'localeText');
}

export function localizedTypeFor(en: string): LocalizedValue['_type'] {
  return en.length > LONG_TEXT_THRESHOLD ? 'localeText' : 'localeString';
}

/** Nama tipe objek untuk item array, harus sama dengan schema (landingPage.ts). */
export function arrayItemTypeName(key: string): string {
  return `${key}Item`;
}

/** dictionaries.en + dictionaries.id → struktur dokumen Sanity. */
export function localize(en: unknown, id: unknown, key = ''): unknown {
  if (typeof en === 'string') {
    return { _type: localizedTypeFor(en), en, id: typeof id === 'string' ? id : '' };
  }
  if (Array.isArray(en)) {
    const idArray = Array.isArray(id) ? id : [];
    return en.map((item, i) => ({
      _key: `item${i}`,
      _type: arrayItemTypeName(key),
      ...(localize(item, idArray[i]) as object),
    }));
  }
  if (isRecord(en)) {
    const idRecord = isRecord(id) ? id : {};
    return Object.fromEntries(Object.entries(en).map(([k, value]) => [k, localize(value, idRecord[k], k)]));
  }
  return en;
}

/** Dokumen Sanity → dictionary satu bahasa (field sistem `_…` dibuang). */
export function delocalize(value: unknown, locale: ContentLocale): unknown {
  if (isLocalized(value)) return value[locale] ?? '';
  if (Array.isArray(value)) return value.map((item) => delocalize(item, locale));
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith('_'))
        .map(([key, v]) => [key, delocalize(v, locale)]),
    );
  }
  return value;
}

/**
 * Gabungkan konten CMS di atas konten bawaan. String kosong / field yang tidak ada
 * tetap memakai nilai bawaan, jadi dokumen yang belum lengkap tidak merusak halaman.
 */
export function mergeContent<T>(base: T, override: unknown): T {
  if (typeof base === 'string') {
    return (typeof override === 'string' && override.trim() !== '' ? override : base) as T;
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(override) || override.length === 0) return base;
    // Item tambahan dari CMS (melebihi jumlah bawaan) dipakai apa adanya.
    return override.map((item, i) => (i < base.length ? mergeContent(base[i], item) : item)) as T;
  }
  if (isRecord(base)) {
    const source = isRecord(override) ? override : {};
    return Object.fromEntries(
      Object.entries(base).map(([key, value]) => [key, mergeContent(value, source[key])]),
    ) as T;
  }
  return base;
}

export type { Plain };
