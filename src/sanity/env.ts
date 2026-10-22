// Konfigurasi Sanity dari env var. Selama project belum dibuat (NEXT_PUBLIC_SANITY_PROJECT_ID
// kosong), website memakai konten bawaan di src/i18n/dictionaries.ts.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const isSanityConfigured = projectId !== '';

/** Tag cache untuk semua fetch Sanity; di-invalidate oleh /api/revalidate. */
export const SANITY_CACHE_TAG = 'sanity';

/** ID dokumen singleton halaman utama. */
export const LANDING_PAGE_ID = 'landingPage';
