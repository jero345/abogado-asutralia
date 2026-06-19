import { pdfButton } from './caseBody'

/**
 * Converts any saved PDF-embed block into an outlined "card" button that
 * opens the PDF in a new tab — NO inline iframe preview, NO "Download" word.
 *
 * Handles the block the editor saves (old inline-viewer shape and the new
 * one alike):
 *   <div data-type="pdf-embed" data-src="…" data-title="…" class="pdf-embed">…</div>
 *
 * The button markup is rebuilt from the div's data-src / data-title, so
 * articles created before this change are normalised automatically at render
 * time (the old <iframe> + "Download …" fallback inside are discarded).
 *
 * Standalone <p><a href="…pdf"> links are NOT touched here — run them through
 * buttonizePdfLinks (from caseBody) as well, which both the article and case
 * pages already do.
 */
export function pdfEmbedsToButtons(html: string): string {
  if (!html) return html
  return html.replace(
    /<div\b[^>]*\bclass="[^"]*\bpdf-embed\b[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    (block) => {
      const src = (block.match(/data-src="([^"]*)"/i) || [])[1]
      const title = (block.match(/data-title="([^"]*)"/i) || [])[1] || 'PDF document'
      return src ? pdfButton(src, title) : block
    },
  )
}

const FORMSTACK_RE = /^https?:\/\/[a-z0-9.-]*formstack\.com\/forms\/[^\s"<]+$/i

function formstackIframe(url: string): string {
  const safe = url.replace(/"/g, '&quot;')
  return (
    `<div class="formstack-embed">` +
      `<iframe src="${safe}" title="Registration form" loading="lazy" class="formstack-iframe"></iframe>` +
    `</div>`
  )
}

/**
 * Embeds a Formstack registration form placed *inline* in the body. Any
 * standalone paragraph that is just a Formstack form link — pasted as a link
 * or as a bare URL on its own line — becomes an <iframe>, so editors drop the
 * form exactly where they want it without a separate field.
 *
 * Submissions are captured by Formstack (off this site), which is why this is
 * the firm's chosen registration method.
 */
export function embedFormstackLinks(html: string): string {
  if (!html) return html
  // <p><a href="…formstack…/forms/…">label</a></p>
  let out = html.replace(
    /<p>\s*<a\s+[^>]*?href="([^"]+)"[^>]*>[\s\S]*?<\/a>\s*<\/p>/gi,
    (match, href) => (FORMSTACK_RE.test(href) ? formstackIframe(href) : match),
  )
  // <p>bare https://….formstack.com/forms/… URL</p>
  out = out.replace(
    /<p>\s*(https?:\/\/[a-z0-9.-]*formstack\.com\/forms\/[^\s"<]+)\s*<\/p>/gi,
    (_match, url) => formstackIframe(url),
  )
  return out
}
