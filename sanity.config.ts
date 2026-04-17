import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
} from './sanity/env'

export default defineConfig({
  name: 'banton-group-studio',
  title: 'Banton Group — News',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  /** Studio is mounted at /studio on the main site. */
  basePath: '/studio',

  apiVersion: SANITY_API_VERSION,

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: SANITY_API_VERSION }),
  ],

  schema: {
    types: schemaTypes,
  },
})
