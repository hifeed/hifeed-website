// Pengaturan situs bawaan (sebelum CMS). Tanpa import runtime agar bisa dipakai script seed.

export interface SiteSettings {
  contactEmail: string;
  whatsappNumber: string;
  careersUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  /** Kosong = link belum ada (ditampilkan sebagai #). */
  privacyPolicyUrl: string;
  termsUrl: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: 'partnership@hifeed.co',
  whatsappNumber: '6285117626252',
  careersUrl: 'https://lifeathifeed.notion.site/Life-at-HiFeed-43e47d221e8d4ff4b22126783533bd87',
  linkedinUrl: 'https://www.linkedin.com/company/hifeedx',
  instagramUrl: 'https://www.instagram.com/hifeed.co',
  privacyPolicyUrl: '',
  termsUrl: '',
};
