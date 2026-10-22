import { defineType } from 'sanity';

// Satu field teks dengan versi per bahasa. Bahasa Indonesia boleh kosong
// (website akan memakai teks bawaan untuk field yang kosong).
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  options: { columns: 2 },
  fields: [
    { name: 'en', title: 'English', type: 'string' },
    { name: 'id', title: 'Bahasa Indonesia', type: 'string' },
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'text', rows: 3 },
    { name: 'id', title: 'Bahasa Indonesia', type: 'text', rows: 3 },
  ],
});
