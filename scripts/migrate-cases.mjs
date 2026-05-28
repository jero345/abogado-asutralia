// One-time migration script:
//   • Uploads every PDF in class-actions-cases/<folder>/ to the
//     article-documents Storage bucket under cases/<slug>/<filename>.
//   • Converts the extracted .docx text into TipTap-compatible HTML.
//   • Replaces wp-content/uploads URLs with the freshly uploaded
//     Storage URLs where the filename matches a local PDF.
//   • Upserts each case into public.cases (or investigations) as a draft.
//
// Usage (one time):
//   1. Add SUPABASE_SERVICE_ROLE_KEY=... to .env.local (alongside the
//      existing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
//   2. From the project root:  node scripts/migrate-cases.mjs
//
// Safe to re-run: cases are upserted by slug and PDFs are uploaded with
// upsert: true (so re-running just overwrites the previous draft).
//
// All cases land as DRAFTS (published = false) so you can review each
// in /admin/cases before publishing.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// ─── Tiny .env.local loader ──────────────────────────────────────────
function loadEnv(file) {
  try {
    const text = readFileSync(file, 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (!m) continue
      const [, k, v] = m
      if (!process.env[k]) {
        process.env[k] = v.replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    /* file optional */
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
loadEnv(path.join(root, '.env.local'))
loadEnv(path.join(root, '.env'))

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    '❌ Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.',
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─── Folder → slug + table mapping ───────────────────────────────────
const PLAN = [
  {
    folder: 'Arrium Class Action',
    slug: 'arrium',
    table: 'cases',
    title: 'Arrium Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2020',
    court: 'Supreme Court of Victoria',
    summary:
      'Class action against former directors of Arrium Limited (ASX:ARI) and auditor KPMG for misleading investors through inflated share prices.',
    keyDate: 'Trial 3 Aug 2026',
    detailSlug: 'arrium',
    wordpressLink: 'https://bantongroup.com/arrium-class-action/',
  },
  {
    folder: 'Blue Sky Class Action',
    slug: 'blue-sky',
    table: 'cases',
    title: 'Blue Sky Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2021',
    court: 'Federal Court of Australia',
    summary:
      'Consolidated class action (Banton Group with Shine Lawyers) on behalf of Blue Sky shareholders against Blue Sky, its former directors and auditor Ernst & Young.',
    detailSlug: 'blue-sky',
  },
  {
    folder: 'CuDeco Class Action',
    slug: 'cudeco',
    table: 'cases',
    title: 'CuDeco Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2022',
    court: 'Federal Court of Australia',
    summary:
      'Class action against former directors and auditor (KPMG) of CuDeco Limited (ASX:CDU). KPMG settlement approved; claims against the directors continue to trial on 29 June 2026.',
    keyDate: 'Directors trial 29 Jun 2026',
    detailSlug: 'cudeco',
    wordpressLink: 'https://bantongroup.com/cudeco-class-action/',
  },
  {
    folder: 'Fitch Ratings UK Representative Action',
    slug: 'fitch-ratings-uk',
    table: 'cases',
    title: 'Fitch Ratings UK Representative Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2025',
    court: 'High Court of Justice of England and Wales',
    summary:
      'Representative action (CPR 19.8) against Fitch Ratings Ltd in the UK Commercial Court regarding SCDOs rated using the VECTOR models from 2005-2007.',
    keyDate: 'Particulars of Claim due 19 May 2026',
    detailSlug: 'fitch-ratings-uk',
    wordpressLink: 'https://bantongroup.com/fitch-ratings-uk-representative-action/',
  },
  {
    folder: 'Fitch SCDO Class Action',
    slug: 'fitch-scdo',
    table: 'cases',
    title: 'Fitch SCDO Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2024',
    court: 'Federal Court of Australia',
    summary:
      'Class action on behalf of investors against Fitch Ratings concerning SCDOs rated AAA/AA+/AA/AA- in 2005-2007. Trial commences 3 May 2027.',
    keyDate: 'Register/opt-out deadline 4 Apr 2026',
    detailSlug: 'fitch-scdo',
    wordpressLink: 'https://bantongroup.com/fitch-ratings-class-action/',
  },
  {
    folder: 'Hyundai ABS Class Action',
    slug: 'hyundai-abs',
    table: 'cases',
    title: 'Hyundai ABS Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    summary:
      'Class action against Hyundai Motor Company Australia Pty Ltd over ABS module short-circuit defect identified in multiple safety recall notices.',
    detailSlug: 'hyundai-abs',
    wordpressLink: 'https://bantongroup.com/hyundai-abs-class-action/',
  },
  {
    folder: 'Kia ABS Defect Class Action',
    slug: 'kia-abs',
    table: 'cases',
    title: 'Kia ABS Defect Class Action',
    status: 'Active',
    category: 'Consumer',
    year: '2024',
    court: 'Supreme Court of Victoria',
    summary:
      'Class action against Kia Australia Pty Ltd and Kia Corporation over ABS module short-circuit defect identified in multiple safety recall notices.',
    detailSlug: 'kia-abs',
    wordpressLink: 'https://bantongroup.com/kia-abs-class-action/',
  },
  {
    folder: 'Light Rail Class Action',
    slug: 'light-rail',
    table: 'cases',
    title: 'Light Rail Class Action',
    status: 'On Appeal',
    category: 'Nuisance',
    year: '2019',
    court: 'High Court of Australia',
    summary:
      'Proceedings on behalf of businesses, landlords and residents against TfNSW in relation to the CBD & South-East Light Rail project. Appeal heard in the High Court on 15-16 May 2025.',
    keyDate: 'High Court appeal heard 15-16 May 2025',
    detailSlug: 'light-rail',
  },
  {
    folder: 'Murray Darling Basin Class Action',
    slug: 'murray-darling',
    table: 'cases',
    title: 'Murray Darling Basin Class Action',
    status: 'Active',
    category: 'Environmental',
    year: '2019',
    court: 'Supreme Court of New South Wales',
    summary:
      "Representative proceedings on behalf of NSW Murray Regulated River water entitlement holders and related parties against the Murray Darling Basin Authority and the Commonwealth.",
    detailSlug: 'murray-darling',
    wordpressLink: 'https://bantongroup.com/murray-darling-basin-class-action/',
  },
  {
    folder: 'Phoslock Class Action',
    slug: 'phoslock',
    table: 'cases',
    title: 'Phoslock Class Action',
    status: 'Active',
    category: 'Securities',
    year: '2024',
    court: 'Federal Court of Australia',
    summary:
      'Class action against Phoslock Environmental Technologies Ltd (ASX:PET), its former Chairman and Managing Director, and auditor KPMG over alleged misleading disclosure of China business operations.',
    keyDate: 'Mediation 11 Jun 2026',
    detailSlug: 'phoslock',
    wordpressLink: 'https://bantongroup.com/phoslock-class-action/',
  },
  {
    folder: 'Qoin Class Action',
    slug: 'qoin',
    table: 'cases',
    title: 'Qoin Class Action',
    status: 'Settled',
    category: 'Financial Products',
    year: '2023',
    court: 'Federal Court of Australia',
    summary:
      'Settled class action concerning Qoin digital currency. Settlement approval orders dated 28 May 2025.',
    keyDate: 'Settlement approved 28 May 2025',
    /** Qoin has minimal text — we override the auto-generated body. */
    bodyHtmlOverride:
      '<p>The settlement approval orders dated 28 May 2025 may be accessed below.</p>',
  },
  {
    folder: 'S&P CDO & CPDO Ratings Class Action',
    slug: 'sp-cdo-cpdo',
    table: 'cases',
    title: 'S&P CDO & CPDO Ratings Class Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2020',
    court: 'Federal Court of Australia',
    summary:
      'Class action on behalf of investors against S&P Global, Inc and Standard & Poor’s International, LLC concerning CDOs and CPDOs rated AAA/AA+/AA/AA- in 2005-2007.',
    detailSlug: 'sp-cdo-cpdo',
  },
  {
    folder: 'S&P Global UK Representative Action',
    slug: 'sp-global-uk',
    table: 'cases',
    title: 'S&P Global UK Representative Action',
    status: 'Active',
    category: 'Financial Products',
    year: '2025',
    court: 'High Court of Justice of England and Wales',
    summary:
      'Representative action (CPR 19.8) against S&P Global UK Limited in the UK Commercial Court regarding CDOs/CPDOs rated using the CDO/CPDO Evaluator models from 2005-2007.',
    keyDate: 'Particulars of Claim due 19 May 2026',
    detailSlug: 'sp-global-uk',
    wordpressLink: 'https://bantongroup.com/sp-global-uk-representative-action/',
  },
  // ─── Investigations table ─────────────────────────────────────────
  {
    folder: 'HighLow Markets Pty Ltd Investigation',
    slug: 'highlow',
    table: 'investigations',
    title: 'HighLow Markets Pty Ltd Investigation',
    summary:
      'Banton Group is investigating a potential class action on behalf of people who purchased binary options from HighLow Markets Pty Ltd since 1 February 2015.',
  },
  {
    folder: 'Tyro Payments Ltd Investigation',
    slug: 'tyro',
    table: 'investigations',
    title: 'Tyro Payments Ltd Investigation',
    summary:
      'Banton Group is investigating a possible class action on behalf of Tyro Payments (ASX:TYR) customers affected by the January 2021 19-day terminal outage.',
  },
  {
    folder: 'Salt Lake Class Action',
    slug: 'salt-lake',
    table: 'investigations',
    title: 'Salt Lake Potash Class Action Investigation',
    summary:
      'Investigation of class action proceedings against Salt Lake Potash Limited (ASX:SO4), its former directors and officers, and its auditors Ernst & Young.',
  },
  {
    folder: 'Zip Co Class Action',
    slug: 'zip-co',
    table: 'investigations',
    title: 'Zip Co Class Action Investigation',
    summary:
      'Investigation of potential claims against Zip Co, its directors and officers, and its auditor Deloitte Touche Tohmatsu.',
  },
  // Past Class Actions and Schemes is already covered by past_actions table; skipped.
]

// ─── Parse extracted-content.txt into per-folder text ─────────────────
function parseExtracted() {
  const text = readFileSync(path.join(__dirname, 'extracted-content.txt'), 'utf8')
  const sections = {}
  const parts = text.split(/={20,}\s*CASE FOLDER: /).slice(1)
  for (const part of parts) {
    const [header, ...rest] = part.split('\n')
    const folder = header.trim()
    const fileLine = rest.find((l) => l.startsWith('FILE:')) ?? ''
    const startIdx = rest.findIndex((l) => /^={20,}$/.test(l))
    const body = rest.slice(startIdx + 1).join('\n').trim()
    if (!sections[folder]) {
      sections[folder] = body
    } else {
      // Multiple .docx in one folder (e.g. Phoslock has the Opt Out form) →
      // append as separate sub-section. Skip the form templates for now.
      if (!fileLine.includes('Opt-Out-Form') && !fileLine.includes('~$')) {
        sections[folder] += '\n\n' + body
      }
    }
  }
  return sections
}

// ─── Text → HTML conversion ──────────────────────────────────────────
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isUpperHeading(line) {
  // Short, mostly-uppercase line — treat as a section heading.
  if (line.length === 0 || line.length > 100) return false
  const letters = line.replace(/[^A-Za-z]/g, '')
  if (letters.length < 2) return false
  const upper = letters.replace(/[^A-Z]/g, '')
  return upper.length / letters.length >= 0.85
}

function isBulletLine(line) {
  return (
    /^[•\-–]\s/.test(line) ||
    /^\(?[a-z]\)\s/i.test(line) ||
    /^\d+\.\s/.test(line)
  )
}

function stripBulletPrefix(line) {
  return line
    .replace(/^[•\-–]\s*/, '')
    .replace(/^\(?[a-z]\)\s*/i, '')
    .replace(/^\d+\.\s*/, '')
}

function mapUrl(rawUrl, urlMap) {
  if (!rawUrl) return '#'
  if (rawUrl.startsWith('about:blank') || rawUrl === '#') return '#'
  // External (non-WP) → keep as-is.
  if (!/wp-content\/uploads/.test(rawUrl)) {
    // For bantongroup.com WP page links (not file uploads), keep.
    return rawUrl
  }
  // Try filename match against uploaded PDFs.
  try {
    const filename = decodeURIComponent(rawUrl.split('/').pop().split('?')[0])
    const local = urlMap.byFilename.get(filename.toLowerCase())
    if (local) return local
  } catch {}
  return rawUrl
}

/**
 * Convert raw extracted-from-.docx text into TipTap-friendly HTML.
 * Approach:
 *   1. Walk line-by-line.
 *   2. Lines matching `HYPERLINK "url" Label` produce <a href> chunks.
 *   3. Blank lines flush the current paragraph.
 *   4. Consecutive bullet-like lines collapse into a <ul>.
 *   5. Single short ALL-CAPS line becomes <h3>.
 *   6. Everything else joins as text into the current paragraph.
 */
function textToHtml(text, urlMap) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const out = []
  let para = []      // text lines making up current <p>
  let list = []      // items collected for current <ul>

  const flushPara = () => {
    if (para.length === 0) return
    const joined = para.join(' ').trim()
    para = []
    if (!joined) return
    // Detect heading via the plaintext (strip any inline HTML first).
    const plain = joined.replace(/<[^>]+>/g, '')
    if (isUpperHeading(plain)) {
      out.push(`<h3>${joined}</h3>`)
    } else {
      out.push(`<p>${joined}</p>`)
    }
  }

  const flushList = () => {
    if (list.length === 0) return
    out.push(`<ul>${list.map((i) => `<li>${i}</li>`).join('')}</ul>`)
    list = []
  }

  const flushAll = () => {
    flushPara()
    flushList()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushAll()
      continue
    }

    // HYPERLINK line on its own (most common case from the docx output).
    const hl = line.match(/^HYPERLINK\s+"([^"]+)"\s+(.*)$/)
    if (hl) {
      const url = mapUrl(hl[1], urlMap)
      const label = escapeHtml(hl[2].trim() || hl[1])
      const anchor = `<a href="${url}" target="_blank" rel="noopener">${label}</a>`
      // If we're mid-paragraph, append inline; otherwise emit as its own <p>.
      if (para.length > 0) {
        para.push(anchor)
      } else {
        flushList()
        out.push(`<p>${anchor}</p>`)
      }
      continue
    }

    // Bullet-like line → collect into list.
    if (isBulletLine(line)) {
      flushPara()
      list.push(escapeHtml(stripBulletPrefix(line)))
      continue
    }

    // Plain text line → append to current paragraph.
    flushList()
    para.push(escapeHtml(line))
  }

  flushAll()
  return out.join('\n')
}

// ─── Upload PDFs for a case ──────────────────────────────────────────
async function uploadCasePdfs(caseFolder, slug) {
  const dir = path.join(root, 'class-actions-cases', caseFolder)
  let entries = []
  try {
    entries = readdirSync(dir)
  } catch {
    return { byFilename: new Map(), uploaded: [] }
  }

  const pdfs = entries.filter((f) => f.toLowerCase().endsWith('.pdf'))
  const byFilename = new Map()
  const uploaded = []

  for (const filename of pdfs) {
    const fullPath = path.join(dir, filename)
    const size = statSync(fullPath).size
    if (size > 49 * 1024 * 1024) {
      console.warn(`  ⚠  ${filename} is ${(size / 1024 / 1024).toFixed(1)} MB — exceeds 50 MB bucket cap, skipping.`)
      continue
    }
    const buf = readFileSync(fullPath)
    const objectPath = `cases/${slug}/${filename}`
    const { error } = await supabase.storage
      .from('article-documents')
      .upload(objectPath, buf, {
        contentType: 'application/pdf',
        upsert: true,
      })
    if (error) {
      console.error(`  ❌ Upload failed for ${filename}: ${error.message}`)
      continue
    }
    const { data: pub } = supabase.storage
      .from('article-documents')
      .getPublicUrl(objectPath)
    byFilename.set(filename.toLowerCase(), pub.publicUrl)
    uploaded.push({ name: filename, url: pub.publicUrl, size })
    console.log(`  ↑  ${filename}  (${(size / 1024 / 1024).toFixed(2)} MB)`)
  }

  return { byFilename, uploaded }
}

// ─── Upsert a row ────────────────────────────────────────────────────
async function upsertCase(item, body_html, uploaded) {
  if (item.table === 'cases') {
    const row = {
      slug: item.slug,
      title: item.title,
      status: item.status,
      category: item.category,
      year: item.year,
      court: item.court ?? null,
      summary: item.summary,
      body_html,
      key_date: item.keyDate ?? null,
      wordpress_link: item.wordpressLink ?? null,
      detail_slug: item.detailSlug ?? null,
      recalls: [],
      order_index: 0,
      // Publish immediately so the public detail page reads from the DB
      // (the static caseDetails.ts fallback has old WP links).
      published: true,
      publish_at: null,
    }
    const { error } = await supabase
      .from('cases')
      .upsert(row, { onConflict: 'slug' })
    if (error) throw new Error(`cases upsert failed: ${error.message}`)
  } else if (item.table === 'investigations') {
    // investigations table doesn't have a unique slug column; we delete
    // any previous row with the same title before inserting.
    await supabase.from('investigations').delete().eq('title', item.title)
    const row = {
      title: item.title,
      summary: item.summary,
      body: body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      link_label: uploaded[0] ? 'Key document' : null,
      link_href: uploaded[0]?.url ?? null,
      order_index: 0,
      published: true,
    }
    const { error } = await supabase.from('investigations').insert(row)
    if (error) throw new Error(`investigations insert failed: ${error.message}`)
  }
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log(`→ Supabase: ${SUPABASE_URL}\n`)
  const sections = parseExtracted()

  for (const item of PLAN) {
    console.log(`\n▶ ${item.folder}`)
    const urlMap = await uploadCasePdfs(item.folder, item.slug)

    let body_html
    if (item.bodyHtmlOverride) {
      // For Qoin etc — use the override and append PDF links.
      body_html = item.bodyHtmlOverride
    } else {
      const text = sections[item.folder] ?? ''
      if (!text) {
        console.warn(`  ⚠  No text extracted; body will be empty.`)
        body_html = ''
      } else {
        body_html = textToHtml(text, urlMap)
      }
    }

    // Always append a "Key documents" block listing uploaded PDFs that the
    // body didn't already link (so nothing is hidden).
    if (urlMap.uploaded.length > 0) {
      const linked = new Set()
      const linkRegex = /href="([^"]+)"/g
      let m
      while ((m = linkRegex.exec(body_html)) !== null) linked.add(m[1])
      const orphans = urlMap.uploaded.filter((u) => !linked.has(u.url))
      if (orphans.length > 0) {
        body_html += `\n<h3>Key documents</h3>\n<ul>`
        for (const o of orphans) {
          body_html += `<li><a href="${o.url}" target="_blank" rel="noopener">${escapeHtml(o.name.replace(/\.pdf$/i, ''))}</a></li>`
        }
        body_html += `</ul>`
      }
    }

    await upsertCase(item, body_html, urlMap.uploaded)
    console.log(`  ✔ Inserted as draft → ${item.table}/${item.slug ?? item.title}`)
  }

  console.log('\n✅ Migration complete. Review drafts in /admin/cases and /admin/investigations.')
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})
