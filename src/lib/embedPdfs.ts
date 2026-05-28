/**
 * Transforms an HTML body string so any standalone PDF link is shown as
 * an embedded inline viewer instead of just an underlined text link.
 *
 * Targets two common shapes produced by the editor / migration scripts:
 *   1. <p><a href="…file.pdf" …>Label</a></p>
 *   2. <li><a href="…file.pdf" …>Label</a></li>      (inside a <ul>)
 *
 * Links to non-PDF files are left untouched. Already-embedded PDFs
 * (<div class="pdf-embed"> … </div>) are also left as-is.
 */
export function embedPdfLinks(html: string): string {
  if (!html) return html

  // Quick regex to spot an <a href="…anything.pdf…"> on its own inside a
  // <p> (possibly with the link's own attributes / whitespace around it).
  // We don't bother with <li> for now to avoid breaking "Key documents"
  // lists — only standalone-paragraph PDF links become embeds.
  const re = /<p>\s*<a\s+([^>]*?)href="([^"]+\.pdf(?:[?#][^"]*)?)"([^>]*)>([\s\S]*?)<\/a>\s*<\/p>/gi

  return html.replace(re, (_match, _preAttrs, href, _postAttrs, label) => {
    const safeHref = href.replace(/"/g, '&quot;')
    const cleanLabel = label.replace(/<[^>]+>/g, '').trim() || 'PDF document'
    const safeLabel = cleanLabel.replace(/"/g, '&quot;')
    return (
      `<div data-type="pdf-embed" data-src="${safeHref}" data-title="${safeLabel}" class="pdf-embed">` +
        `<iframe src="${safeHref}" title="${safeLabel}" loading="lazy" allow="fullscreen"></iframe>` +
        `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="pdf-embed-fallback">` +
          `Open "${cleanLabel}"` +
        `</a>` +
      `</div>`
    )
  })
}
