// Meta (Facebook) Pixel helper. The base pixel is loaded in index.html; this
// just fires standard events safely (no-op if the pixel hasn't loaded, e.g.
// blocked by an ad blocker).

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function mpTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window.fbq !== 'function') return
  if (params) window.fbq('track', event, params)
  else window.fbq('track', event)
}
