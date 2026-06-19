import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  fetchSeoSettings,
  fetchSiteSettings,
  MANAGED_ROUTES,
  type SeoSetting,
  type SiteSettings,
} from '@/lib/seo'
import { initGA, trackPageView } from '@/lib/analytics'

const MANAGED_PATHS = new Set(MANAGED_ROUTES.map((r) => r.path))

function setOrUpdateMeta(attr: 'name' | 'property', key: string, content: string | null) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (content == null || content === '') {
    // Remove tags we manage when there's nothing to show, so a previous page's
    // value doesn't linger.
    if (el && el.dataset.managed === 'seo') el.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.dataset.managed = 'seo'
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string | null) {
  const selector = 'link[rel="canonical"]'
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!href) {
    if (el && el.dataset.managed === 'seo') el.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    el.dataset.managed = 'seo'
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function applySeo(row: SeoSetting | undefined, site: SiteSettings | null) {
  const suffix = site?.title_suffix ?? ''
  const title = row?.title ? `${row.title}${suffix}` : site?.default_title ?? null
  if (title) document.title = title

  setOrUpdateMeta('name', 'description', row?.description ?? site?.default_description ?? null)
  setOrUpdateMeta('name', 'keywords', row?.keywords ?? null)
  setOrUpdateMeta('property', 'og:title', row?.title ?? site?.default_title ?? null)
  setOrUpdateMeta(
    'property',
    'og:description',
    row?.description ?? site?.default_description ?? null,
  )
  setOrUpdateMeta('property', 'og:image', row?.og_image ?? site?.default_og_image ?? null)
  setCanonical(row?.canonical ?? null)
  setOrUpdateMeta('name', 'robots', row?.noindex ? 'noindex, nofollow' : null)
}

/**
 * Applies admin-managed SEO meta per route and reports page views to Google
 * Analytics. Render once inside the public Layout. Dynamic detail pages
 * (blog articles, case pages) keep managing their own meta — we only touch the
 * static routes listed in MANAGED_ROUTES.
 */
export function SeoManager() {
  const { pathname } = useLocation()
  const seoRef = useRef<SeoSetting[] | null>(null)
  const siteRef = useRef<SiteSettings | null>(null)

  // Load config once, then apply to the current route.
  useEffect(() => {
    let active = true
    Promise.all([fetchSeoSettings(), fetchSiteSettings()]).then(([seo, site]) => {
      if (!active) return
      seoRef.current = seo
      siteRef.current = site
      initGA(site?.ga_measurement_id)
      applyForPath(pathname)
      trackPageView(pathname)
    })
    return () => {
      active = false
    }
    // Load only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-apply on every route change (after config is loaded).
  useEffect(() => {
    if (seoRef.current == null) return
    applyForPath(pathname)
    trackPageView(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function applyForPath(path: string) {
    // Only manage the static routes; let detail pages set their own meta.
    if (!MANAGED_PATHS.has(path)) return
    const row = seoRef.current?.find((r) => r.path === path)
    applySeo(row, siteRef.current)
  }

  return null
}
