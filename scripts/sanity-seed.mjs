// Memindahkan konten website saat ini ke Sanity (sekali jalan, setelah project Sanity dibuat).
//
//   node --env-file=.env.local scripts/sanity-seed.mjs           # buat dokumen bila belum ada
//   node --env-file=.env.local scripts/sanity-seed.mjs --force   # timpa landing page yang sudah ada
//
// Butuh: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN (role Editor).
import { createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient } from '@sanity/client';
import { dictionaries } from '../src/i18n/dictionaries.ts';
import { localize } from '../src/sanity/lib/localized.ts';
import { FALLBACK_AFFILIATE_LINKS } from '../src/sanity/affiliateFallback.ts';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
const force = process.argv.includes('--force');

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (e.g. in .env.local) first.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false });
const PUBLIC_DIR = join(import.meta.dirname, '..', 'public');

async function uploadImage(file, alt) {
  const path = join(PUBLIC_DIR, file);
  if (!existsSync(path)) {
    console.warn(`  ! ${file} not found, skipped`);
    return undefined;
  }
  const asset = await client.assets.upload('image', createReadStream(path), { filename: basename(path) });
  console.log(`  ↑ ${file}`);
  return { _type: 'image', alt, asset: { _type: 'reference', _ref: asset._id } };
}

async function seedLandingPage() {
  const existing = await client.getDocument('landingPage');
  if (existing && !force) {
    console.log('landingPage already exists — skipped (use --force to overwrite).');
    return;
  }

  console.log('Uploading images…');
  const [logo, ogImage, palatabilityImage, partnersImage, ...stories] = await Promise.all([
    uploadImage('hifeed_logo.png', 'HiFeed logo'),
    uploadImage('hifeed-cettle.jpg', 'HiFeed - Sustainable Cattle Farming'),
    uploadImage('cettle-feed-pellets.jpg', 'HiFeed Pellets'),
    uploadImage('partner.png', 'Partners'),
    ...[1, 2, 3, 4].map((i) => uploadImage(`stories_${i}.webp`, `Story ${i}`)),
  ]);

  const content = localize(dictionaries.en, dictionaries.id);
  const doc = {
    _id: 'landingPage',
    _type: 'landingPage',
    ...content,
    keywords: [
      'HiFeed', 'cattle feed', 'complete feed pellets', 'sustainable farming',
      'carbon negative feed', 'net-zero agriculture', 'pakan sapi', 'peternakan berkelanjutan',
    ],
    noIndex: false,
    logo,
    ogImage,
    heroVideoUrl: 'https://drive.google.com/file/d/1nmRfmHQs2cvrIq-Kak-FEblI8zZc8JC1/preview',
    palatabilityImage,
    palatabilityVideoUrl: 'https://drive.google.com/file/d/1xTamyiCaRIt4kcBqMCc24GgtJQfx4MFO/preview',
    storyImages: stories.filter(Boolean).map((image, i) => ({ ...image, _key: `story${i + 1}` })),
    partnersImage,
  };

  await client.createOrReplace(doc);
  console.log('✓ landingPage written');
}

async function seedAffiliateLinks() {
  const tx = client.transaction();
  for (const [slug, url] of Object.entries(FALLBACK_AFFILIATE_LINKS)) {
    tx.createIfNotExists({
      _id: `affiliateLink.${slug}`,
      _type: 'affiliateLink',
      slug: { _type: 'slug', current: slug },
      url,
      active: true,
    });
  }
  await tx.commit();
  console.log(`✓ ${Object.keys(FALLBACK_AFFILIATE_LINKS).length} affiliate links ensured`);
}

await seedLandingPage();
await seedAffiliateLinks();
console.log('Done. Open /studio to review, then publish changes as needed.');
