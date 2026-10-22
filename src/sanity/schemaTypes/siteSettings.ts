import { defineField, defineType } from 'sanity';

// Pengaturan yang sama untuk semua bahasa: kontak, WhatsApp sales, dan link eksternal.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Ditampilkan di footer dan data terstruktur (JSON-LD).',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Sales WhatsApp number',
      type: 'string',
      description: 'Tujuan form konsultasi. Format internasional tanpa + atau spasi, mis. 6285117626252.',
      validation: (rule) => rule.regex(/^[1-9]\d{7,14}$/, { name: 'nomor internasional tanpa +' }),
    }),
    defineField({ name: 'careersUrl', title: 'Careers page URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'privacyPolicyUrl', title: 'Privacy policy URL', type: 'url', description: 'Kosongkan bila belum ada.' }),
    defineField({ name: 'termsUrl', title: 'Terms of service URL', type: 'url', description: 'Kosongkan bila belum ada.' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
