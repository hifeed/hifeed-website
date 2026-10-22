'use client';

// Sanity Studio, di-embed di Next.js pada route /studio.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId, LANDING_PAGE_ID } from './src/sanity/env';

const SINGLETON_TYPES = new Set(['landingPage']);

export default defineConfig({
  name: 'hifeed',
  title: 'HiFeed CMS',
  basePath: '/studio',
  // Placeholder valid saat env belum diisi; halaman /studio menampilkan petunjuk setup.
  projectId: projectId || 'not-configured',
  dataset,
  schema: {
    types: schemaTypes,
    // Singleton tidak muncul di menu "Create new document".
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Singleton tidak bisa dihapus / diduplikasi.
    actions: (actions, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Landing page')
              .id(LANDING_PAGE_ID)
              .child(S.document().schemaType('landingPage').documentId(LANDING_PAGE_ID)),
            S.divider(),
            S.documentTypeListItem('affiliateLink').title('Affiliate links'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
