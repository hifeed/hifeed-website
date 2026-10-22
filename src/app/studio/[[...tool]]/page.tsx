import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { isSanityConfigured } from '@/sanity/env';

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '10vh auto', padding: 24, lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 24 }}>HiFeed CMS belum terhubung</h1>
        <p>
          Env var <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> belum diisi, sehingga Studio belum bisa dibuka.
          Website tetap berjalan memakai konten bawaan dari <code>src/i18n/dictionaries.ts</code>.
        </p>
        <p>Langkah setup ada di <code>docs/cms-sanity.md</code>.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
