import { defineCliConfig } from 'sanity/cli';

// Dipakai oleh `npx sanity <command>` (mis. dataset, cors, schema deploy).
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
