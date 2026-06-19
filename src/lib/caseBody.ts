/**
 * Helpers that adapt the migrated case body HTML to the two different
 * views the firm needs:
 *
 *   1. Listing page (`/class-actions`)
 *      - Only the short intro paragraphs (everything before the first
 *        heading). The body's "Click here for more information…" text
 *        stays; the WordPress self-link is stripped because we render
 *        our own button.
 *
 *   2. Detail page (`/class-actions/<slug>`)
 *      - Everything from the first heading onwards.
 *      - PDF links rendered as outlined buttons with a doc icon that open
 *        in a new tab (the blog renders PDFs the same way — no inline viewer).
 */

const HEADING_RE = /<h[1-6]\b/i
const BANTON_PAGE_LINK_RE =
  /<p>\s*<a\s+[^>]*href="https?:\/\/(?:www\.)?bantongroup\.com\/[^"]*"[^>]*>[\s\S]*?<\/a>\s*<\/p>\s*/gi
const BANTON_REGISTER_URL_RE =
  /https?:\/\/(?:www\.)?bantongroup\.com\/registration-process-for-([a-z0-9-]+?)-class-action\/?/i

export function splitBodyAtFirstHeading(html: string): { summary: string; detail: string } {
  if (!html) return { summary: '', detail: '' }
  const match = html.match(HEADING_RE)
  if (!match || match.index === undefined) {
    return { summary: html, detail: '' }
  }
  return {
    summary: html.slice(0, match.index).trim(),
    detail: html.slice(match.index).trim(),
  }
}

/**
 * Cleans the summary used in the listing: drops any standalone
 * paragraph that's just a link back to the legacy WordPress page,
 * since the rendered card already provides its own "Read more" button.
 */
export function cleanListingSummary(html: string): string {
  return html.replace(BANTON_PAGE_LINK_RE, '').trim()
}

const PDF_HREF_RE = /\.pdf(?:[?#][^"]*)?$/i

function escapeHtml(s: string): string {
  return s
    // Escape *bare* ampersands only. The labels we receive are pulled from
    // already-encoded WordPress HTML, so they can legitimately contain
    // entities like &rsquo;, &amp; or &#39;. Escaping those again produced
    // double-encoding (e.g. "The Court&rsquo;s orders" rendered literally).
    // The negative lookahead leaves any valid entity untouched while still
    // escaping a stray "&" in plain text such as "Jones & Co".
    .replace(/&(?!(?:#\d+|#x[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function pdfButton(href: string, label: string): string {
  const cleanLabel = label.replace(/<[^>]+>/g, '').trim() || 'PDF document'
  const safeHref = href.replace(/"/g, '&quot;')
  // The icon is inlined so the helper doesn't depend on the consumer
  // shipping an icon font / sprite. SVG width/height are set in CSS.
  return (
    `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="pdf-button">` +
      `<span>${escapeHtml(cleanLabel)}</span>` +
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
        `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>` +
        `<polyline points="14 2 14 8 20 8"/>` +
      `</svg>` +
    `</a>`
  )
}

/**
 * Rewrites legacy WordPress registration links to the matching internal
 * `/class-actions/<slug>/register` route, and styles them as a primary
 * (filled navy) call-to-action button. Recognises both:
 *   bantongroup.com/registration-process-for-arrium-class-action/
 *   www.bantongroup.com/registration-process-for-fitch-class-action/
 */
export function buttonizeRegisterLinks(html: string): string {
  if (!html) return html
  // Public online registration is disabled: strip any legacy WordPress
  // "registration process" CTA paragraph from the body so no register button
  // is shown. Visitors are directed to contact the firm instead.
  return html.replace(
    /<p>\s*<a\s+[^>]*?href="([^"]+)"[^>]*>[\s\S]*?<\/a>\s*<\/p>/gi,
    (match, href) => (BANTON_REGISTER_URL_RE.test(href) ? '' : match),
  )
}

/**
 * Replaces PDF anchor tags wrapped in <p> or <li> with outlined-button
 * versions. Used on both the class-action detail pages and the blog — PDFs
 * always render as cards that open in a new tab (no inline iframe viewer).
 */
export function buttonizePdfLinks(html: string): string {
  if (!html) return html

  // <p>-wrapped single PDF link
  html = html.replace(
    /<p>\s*<a\s+([^>]*?)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>\s*<\/p>/gi,
    (match, _pre, href, _post, label) => {
      if (!PDF_HREF_RE.test(href)) return match
      return pdfButton(href, label)
    },
  )

  // <li>-wrapped PDF link inside a <ul> (auto "Key documents" block)
  html = html.replace(
    /<li>\s*<a\s+([^>]*?)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>\s*<\/li>/gi,
    (match, _pre, href, _post, label) => {
      if (!PDF_HREF_RE.test(href)) return match
      return `<li class="pdf-li">${pdfButton(href, label)}</li>`
    },
  )

  return html
}
