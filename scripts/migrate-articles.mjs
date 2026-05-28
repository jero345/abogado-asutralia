// One-time migration of the 7 static blog articles from
// src/data/news.ts into the public.articles Supabase table so they
// become editable from /admin.
//
// The static array stores body content as typed blocks (p, h2, h3,
// ul, quote, link, image) — we convert each block to HTML so it
// loads in the TipTap rich-text editor.
//
// Usage (one time):
//   node scripts/migrate-articles.mjs
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
//
// Safe to re-run: rows are upserted by slug.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

function loadEnv(file) {
  try {
    const text = readFileSync(file, 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (!m) continue
      const [, k, v] = m
      if (!process.env[k]) process.env[k] = v.replace(/^["']|["']$/g, '')
    }
  } catch {}
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
loadEnv(path.join(root, '.env.local'))

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─── Load the static articles array by re-exporting it via a tiny shim ─
// We can't import the .ts source directly into Node. Instead we parse it
// with a regex to extract the `articles = [...]` literal. Since the file
// is well-formed TS with plain object literals (no imports / runtime
// values), eval'ing it in a sandbox works fine for a one-off migration.
function loadStaticArticles() {
  const text = readFileSync(path.join(root, 'src/data/news.ts'), 'utf8')
  const start = text.indexOf('export const articles')
  if (start < 0) throw new Error('Could not find `export const articles` in news.ts')
  // Skip past the `= ` so we land on the actual array literal, not the
  // `[` in the `NewsArticle[]` type annotation.
  const eq = text.indexOf('=', start)
  const arrStart = text.indexOf('[', eq)
  // Walk the file balancing brackets to find the matching ].
  let depth = 0
  let end = -1
  for (let i = arrStart; i < text.length; i++) {
    const c = text[i]
    if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end < 0) throw new Error('Could not find end of articles array')
  const literal = text.slice(arrStart, end + 1)
  // The literal is JS-valid as long as we strip the TS type annotations.
  // None are present in the array literal itself, so direct eval works.
  // eslint-disable-next-line no-new-func
  const articles = new Function('return ' + literal)()
  return articles
}

// ─── Block → HTML conversion ──────────────────────────────────────────
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function blockToHtml(b) {
  switch (b.kind) {
    case 'p':
      return `<p>${escapeHtml(b.text)}</p>`
    case 'h2':
      return `<h2>${escapeHtml(b.text)}</h2>`
    case 'h3':
      return `<h3>${escapeHtml(b.text)}</h3>`
    case 'ul':
      return `<ul>${b.items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
    case 'quote':
      return `<blockquote><p>${escapeHtml(b.text)}</p>${b.attribution ? `<footer>— ${escapeHtml(b.attribution)}</footer>` : ''}</blockquote>`
    case 'link':
      return `<p><a href="${escapeHtml(b.href)}" target="_blank" rel="noopener">${escapeHtml(b.label)}</a></p>`
    case 'image':
      return `<figure><img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.caption || '')}" />${b.caption ? `<figcaption>${escapeHtml(b.caption)}</figcaption>` : ''}</figure>`
    default:
      return ''
  }
}

function contentToHtml(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks.map(blockToHtml).filter(Boolean).join('\n')
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`→ Supabase: ${SUPABASE_URL}\n`)
  const articles = loadStaticArticles()
  console.log(`Found ${articles.length} static articles to migrate.\n`)

  for (const a of articles) {
    const body_html = a.bodyHtml ?? contentToHtml(a.content)
    const row = {
      slug: a.slug,
      title: a.title,
      date: a.date,
      excerpt: a.excerpt ?? '',
      category: a.category ?? null,
      author: a.author ?? null,
      source_name: a.source?.name ?? null,
      source_url: a.source?.url ?? null,
      cover_image: a.coverImage ?? null,
      content: [],            // legacy block array — empty, we use body_html
      body_html,
      tags: a.tags ?? [],
      seo_title: a.seo?.title ?? null,
      seo_description: a.seo?.description ?? null,
      seo_og_image: a.seo?.ogImage ?? null,
      published: true,         // keep them live — they're already public
      publish_at: null,
    }
    const { error } = await supabase
      .from('articles')
      .upsert(row, { onConflict: 'slug' })
    if (error) {
      console.error(`❌ ${a.slug}: ${error.message}`)
      continue
    }
    console.log(`✔ ${a.slug}`)
  }

  console.log('\n✅ Done. Edit any article from /admin.')
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})
