import { supabase } from './supabase'

// ── Per-route SEO ───────────────────────────────────────────────────
export interface SeoSetting {
  id?: string
  path: string
  title: string | null
  description: string | null
  keywords: string | null
  og_image: string | null
  canonical: string | null
  noindex: boolean
}

// ── Global settings (single row) ────────────────────────────────────
export interface SiteSettings {
  ga_measurement_id: string | null
  default_title: string | null
  title_suffix: string | null
  default_description: string | null
  default_og_image: string | null
}

// The public pages the client can manage SEO for. These are the static
// routes (dynamic detail pages — blog articles, case pages — set their own
// meta from their content). Keep in sync with the routes in main.tsx.
export const MANAGED_ROUTES: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Team' },
  { path: '/litigation', label: 'Litigation' },
  { path: '/class-actions', label: 'Class Actions' },
  { path: '/blog', label: 'Blog' },
  { path: '/work-with-us', label: 'Work With Us' },
  { path: '/awards', label: 'Awards' },
  { path: '/contact', label: 'Contact' },
  { path: '/terms-of-use', label: 'Terms of Use' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
]

export function emptySeo(path: string): SeoSetting {
  return {
    path,
    title: null,
    description: null,
    keywords: null,
    og_image: null,
    canonical: null,
    noindex: false,
  }
}

export async function fetchSeoSettings(): Promise<SeoSetting[]> {
  if (!supabase) return []
  const { data, error } = await supabase.from('seo_settings').select('*')
  if (error) {
    console.error('[seo] fetch failed', error)
    return []
  }
  return (data ?? []) as SeoSetting[]
}

export async function saveSeoSetting(s: SeoSetting): Promise<{ error?: string }> {
  if (!supabase) return { error: 'Backend not configured.' }
  const body = {
    path: s.path,
    title: emptyToNull(s.title),
    description: emptyToNull(s.description),
    keywords: emptyToNull(s.keywords),
    og_image: emptyToNull(s.og_image),
    canonical: emptyToNull(s.canonical),
    noindex: !!s.noindex,
  }
  // One row per path → upsert on the unique `path`.
  const { error } = await supabase
    .from('seo_settings')
    .upsert(body, { onConflict: 'path' })
  return { error: error?.message }
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle()
  if (error) {
    console.error('[seo] site settings fetch failed', error)
    return null
  }
  return (data as SiteSettings) ?? null
}

export async function saveSiteSettings(
  patch: Partial<SiteSettings>,
): Promise<{ error?: string }> {
  if (!supabase) return { error: 'Backend not configured.' }
  const body: Record<string, string | null> = {}
  for (const [k, v] of Object.entries(patch)) {
    body[k] = emptyToNull(v as string | null)
  }
  const { error } = await supabase.from('site_settings').update(body).eq('id', 1)
  return { error: error?.message }
}

function emptyToNull(v: string | null | undefined): string | null {
  if (v == null) return null
  const t = v.trim()
  return t === '' ? null : t
}
