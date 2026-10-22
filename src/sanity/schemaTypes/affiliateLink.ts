import { defineField, defineType } from 'sanity';

// Menggantikan map hardcoded di src/app/affiliate/[slug]/page.tsx.
export const affiliateLink = defineType({
  name: 'affiliateLink',
  title: 'Affiliate link',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL: hifeed.co/affiliate/<slug>',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Destination URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'slug.current', subtitle: 'url', active: 'active' },
    prepare: ({ title, subtitle, active }: { title?: string; subtitle?: string; active?: boolean }) => ({
      title: `${active === false ? '⏸ ' : ''}${title ?? '(no slug)'}`,
      subtitle,
    }),
  },
});
