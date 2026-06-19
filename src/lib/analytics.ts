// Google Analytics 4 (gtag.js) — loaded only when a Measurement ID is set in
// the admin (site_settings.ga_measurement_id). This is a client-side SPA, so
// we disable gtag's automatic page_view and send one manually on each route
// change instead.

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let loadedId: string | null = null

/** Inject gtag.js once for the given Measurement ID (e.g. "G-XXXXXXXXXX"). */
export function initGA(measurementId: string | null | undefined): boolean {
  const id = (measurementId ?? '').trim()
  if (!id) return false
  if (loadedId === id) return true
  if (loadedId) return true // a different id is already loaded; don't double-load
  loadedId = id

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // Send page_view ourselves on each route change (SPA).
  window.gtag('config', id, { send_page_view: false })
  return true
}

/** Report a page view to GA for the current route. */
export function trackPageView(path: string): void {
  if (!loadedId || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
