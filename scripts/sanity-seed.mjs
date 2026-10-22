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
import { DEFAULT_SETTINGS } from '../src/sanity/siteDefaults.ts';
import { DEFAULT_CARBON_DATA } from '../src/lib/mrv/carbon.ts';
import { carbonToSanity } from '../src/sanity/lib/carbonMapping.ts';

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
    await syncLandingPageFields(existing);
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

// Dokumen sudah ada: tambahkan key dictionary yang belum ada, hapus key yang sudah tidak dipakai.
// Konten yang sudah diedit di Studio tidak disentuh.
async function syncLandingPageFields(existing) {
  const content = localize(dictionaries.en, dictionaries.id);
  const setIfMissing = {};
  const unset = [];
  for (const [section, fields] of Object.entries(content)) {
    const current = existing[section] ?? {};
    for (const [key, value] of Object.entries(fields)) {
      if (current[key] === undefined) setIfMissing[`${section}.${key}`] = value;
    }
    for (const key of Object.keys(current)) {
      if (!key.startsWith('_') && !(key in fields)) unset.push(`${section}.${key}`);
    }
  }
  if (!Object.keys(setIfMissing).length && !unset.length) {
    console.log('landingPage already up to date.');
    return;
  }
  await client.patch('landingPage').setIfMissing(setIfMissing).unset(unset).commit();
  console.log(`✓ landingPage synced — added: ${Object.keys(setIfMissing).join(', ') || '-'}; removed: ${unset.join(', ') || '-'}`);
}

async function seedSingletons() {
  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings', ...Object.fromEntries(Object.entries(DEFAULT_SETTINGS).filter(([, v]) => v)) });
  console.log('✓ siteSettings ensured (existing values kept)');
  const carbonExisting = await client.getDocument('carbonAccounting');
  if (carbonExisting && !force) {
    console.log('carbonAccounting already exists — skipped (use --force to overwrite).');
  } else {
    await client.createOrReplace({ _id: 'carbonAccounting', _type: 'carbonAccounting', ...carbonToSanity(DEFAULT_CARBON_DATA) });
    console.log('✓ carbonAccounting written from workbook data');
  }
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
await seedSingletons();
await seedAffiliateLinks();
console.log('Done. Open /studio to review, then publish changes as needed.');
