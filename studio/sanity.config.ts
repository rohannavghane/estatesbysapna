import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Estates By Sapna',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'rx98mfqq',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    deskTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    hostname: 'estatesbysapna',
  },
});
