import { defineField, defineType, type FieldDefinition } from 'sanity';
import { dictionaries } from '../../i18n/dictionaries';
import { arrayItemTypeName, localizedTypeFor } from '../lib/localized';

// Field konten dibuat dari struktur dictionaries.en, sehingga setiap key yang dibaca komponen
// lewat t('section.key') punya field yang sama persis di Studio.

const SECTIONS: Record<string, { title: string; description?: string }> = {
  meta: { title: 'SEO', description: 'Judul & deskripsi halaman untuk Google dan media sosial.' },
  nav: { title: 'Navigation' },
  hero: { title: 'Hero' },
  challenges: { title: 'Challenges' },
  solution: { title: 'Solution' },
  benefits: { title: 'Benefits' },
  palatability: { title: 'Palatability' },
  impact: { title: 'Impact' },
  stories: { title: 'Stories' },
  consultation: { title: 'Consultation form' },
  footer: { title: 'Footer' },
};

const FIELD_HELP: Record<string, string> = {
  'meta.title': 'Ideal 50–60 karakter.',
  'meta.description': 'Ideal 120–160 karakter.',
  'hero.title': 'Pertahankan placeholder {highlight}; diganti dengan teks "Highlight" berwarna hijau.',
  'benefits.items.emoji': 'Satu emoji.',
};

function titleFromKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function fieldsFromShape(shape: Record<string, unknown>, path: string): FieldDefinition[] {
  return Object.entries(shape).map(([key, value]) => {
    const fieldPath = `${path}.${key}`;
    const common = { name: key, title: titleFromKey(key), description: FIELD_HELP[fieldPath] };

    if (typeof value === 'string') {
      return defineField({ ...common, type: localizedTypeFor(value) });
    }
    if (Array.isArray(value)) {
      const item = value[0] as Record<string, unknown>;
      return defineField({
        ...common,
        type: 'array',
        of: [
          {
            type: 'object',
            name: arrayItemTypeName(key),
            fields: fieldsFromShape(item, fieldPath),
            preview: {
              select: { title: 'title.en', subtitle: 'title.id', emoji: 'emoji.en' },
              prepare: ({ title, subtitle, emoji }: { title?: string; subtitle?: string; emoji?: string }) => ({
                title: [emoji, title].filter(Boolean).join(' '),
                subtitle,
              }),
            },
          },
        ],
      });
    }
    return defineField({
      ...common,
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: fieldsFromShape(value as Record<string, unknown>, fieldPath),
    });
  });
}

const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: { hotspot: true },
    fields: [{ name: 'alt', title: 'Alt text', type: 'string', description: 'Deskripsi gambar untuk aksesibilitas & SEO.' }],
  });

const shape = dictionaries.en as unknown as Record<string, Record<string, unknown>>;

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  groups: [
    { name: 'meta', title: 'SEO', default: true },
    { name: 'media', title: 'Images & video' },
    ...Object.keys(shape)
      .filter((key) => key !== 'meta')
      .map((key) => ({ name: key, title: SECTIONS[key]?.title ?? titleFromKey(key) })),
  ],
  fields: [
    ...Object.entries(shape).map(([key, value]) =>
      defineField({
        name: key,
        title: SECTIONS[key]?.title ?? titleFromKey(key),
        description: SECTIONS[key]?.description,
        type: 'object',
        group: key,
        fields: fieldsFromShape(value, key),
      }),
    ),
    imageWithAlt('ogImage', 'Social share image (OG)', 'Gambar saat link dibagikan. Ukuran ideal 1200 × 630 px.'),
    defineField({
      name: 'keywords',
      title: 'SEO keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'meta',
    }),
    defineField({ name: 'noIndex', title: 'Hide from search engines (noindex)', type: 'boolean', initialValue: false, group: 'meta' }),

    imageWithAlt('logo', 'Logo'),
    defineField({ name: 'heroVideoUrl', title: 'Hero video URL', type: 'url', description: 'URL embed video (mis. Google Drive …/preview atau YouTube embed).' }),
    imageWithAlt('palatabilityImage', 'Palatability image'),
    defineField({ name: 'palatabilityVideoUrl', title: 'Palatability video URL', type: 'url' }),
    defineField({
      name: 'storyImages',
      title: 'Story images',
      description: 'Foto testimoni (portrait 9:16), ditampilkan 4 kolom.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] }],
      validation: (rule) => rule.max(8),
    }),
    imageWithAlt('partnersImage', 'Partners logo strip'),
  ].map((field) => {
    // Field media & SEO tambahan masuk ke grup yang sesuai.
    if (['ogImage', 'keywords', 'noIndex'].includes(field.name)) return { ...field, group: 'meta' };
    if (!(field.name in shape)) return { ...field, group: 'media' };
    return field;
  }),
  preview: {
    prepare: () => ({ title: 'Landing page' }),
  },
});
