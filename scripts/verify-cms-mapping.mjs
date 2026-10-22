// Memastikan konversi dictionary ⇄ dokumen Sanity tidak kehilangan konten.
// Jalankan: npm run verify:cms
import assert from 'node:assert/strict';
import { dictionaries } from '../src/i18n/dictionaries.ts';
import { localize, delocalize, mergeContent } from '../src/sanity/lib/localized.ts';

const doc = localize(dictionaries.en, dictionaries.id);

// 1. Round-trip: seed → fetch menghasilkan dictionary yang identik untuk kedua bahasa.
assert.deepEqual(delocalize(doc, 'en'), dictionaries.en, 'EN round-trip');
assert.deepEqual(delocalize(doc, 'id'), dictionaries.id, 'ID round-trip');

// 2. Dokumen kosong / null tidak mengubah konten bawaan.
assert.deepEqual(mergeContent(dictionaries.en, {}), dictionaries.en, 'empty doc keeps defaults');
assert.deepEqual(mergeContent(dictionaries.en, null), dictionaries.en, 'null doc keeps defaults');

// 3. Field yang diisi menang, field kosong jatuh ke bawaan.
const merged = mergeContent(dictionaries.id, {
  hero: { title: 'Judul Baru {highlight}', subtitle: '   ' },
  benefits: { items: [{ title: 'Manfaat Baru' }] },
});
assert.equal(merged.hero.title, 'Judul Baru {highlight}');
assert.equal(merged.hero.subtitle, dictionaries.id.hero.subtitle, 'blank string falls back');
assert.equal(merged.benefits.items.length, 1, 'CMS controls list length');
assert.equal(merged.benefits.items[0].title, 'Manfaat Baru');
assert.equal(merged.benefits.items[0].description, dictionaries.id.benefits.items[0].description, 'missing item field falls back');

// 4. Setiap teks punya versi ID (kalau tidak, editor akan melihat field kosong).
const missing = [];
(function walk(node, path) {
  if (node && node._type?.startsWith('locale')) {
    if (!node.id) missing.push(path);
    return;
  }
  if (Array.isArray(node)) node.forEach((n, i) => walk(n, `${path}[${i}]`));
  else if (node && typeof node === 'object') Object.entries(node).forEach(([k, v]) => !k.startsWith('_') && walk(v, path ? `${path}.${k}` : k));
})(doc, '');
console.log(missing.length ? `Note: fields without Indonesian text: ${missing.join(', ')}` : 'All fields have both languages.');

console.log('OK — dictionary ⇄ Sanity mapping is lossless.');
