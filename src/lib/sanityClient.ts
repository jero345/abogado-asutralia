import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  hasSanity,
} from '../../sanity/env'

export { hasSanity }

export const sanityClient = hasSanity
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: unknown) {
  if (!builder) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any)
}
