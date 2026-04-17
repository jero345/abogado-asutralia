// Sanity configuration — read from Vite env vars. The frontend fetcher and
// the embedded Studio both read from here so we only set the project ID once.
//
// These are set in .env.local (dev) and in Vercel project settings (prod):
//   VITE_SANITY_PROJECT_ID="xxxxxxxx"
//   VITE_SANITY_DATASET="production"
//
// The API version is pinned intentionally — bump it in one place when Sanity
// releases a new API version we want to use.

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID ?? ''
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET ?? 'production'
export const SANITY_API_VERSION = '2024-10-01'

/** True when the site has valid Sanity credentials — otherwise we fall back to static data. */
export const hasSanity = Boolean(SANITY_PROJECT_ID)
