// Lightweight, Yoast-style SEO + readability analyser. Pure browser code, no
// dependencies and no external services — give it the page's content and it
// returns a list of traffic-light checks plus an overall score per section.
//
// These are heuristics (like Yoast's own), not absolute truth, and the
// readability checks are tuned for English.

export type Rating = 'good' | 'ok' | 'bad'

export interface Check {
  id: string
  rating: Rating
  text: string
}

export interface SectionResult {
  score: number // 0–100
  rating: Rating
  checks: Check[]
}

export interface AnalysisResult {
  seo: SectionResult
  readability: SectionResult
}

export interface SeoInput {
  keyphrase: string
  title: string // the SEO/meta title
  metaDescription: string
  slug: string
  bodyHtml: string
}

// ── text helpers ────────────────────────────────────────────────────
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0
  return haystack.split(needle).length - 1
}

interface ParsedBody {
  text: string
  words: string[]
  wordCount: number
  sentences: string[]
  paragraphs: string[]
  headings: string[]
  firstParagraph: string
  images: { alt: string }[]
  links: string[]
}

function parseBody(html: string): ParsedBody {
  const doc = new DOMParser().parseFromString(html || '', 'text/html')
  const text = (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
  const words = text.split(/\s+/).filter(Boolean)
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0)
  const paragraphs = Array.from(doc.querySelectorAll('p'))
    .map((p) => (p.textContent || '').trim())
    .filter(Boolean)
  const headings = Array.from(doc.querySelectorAll('h1,h2,h3,h4'))
    .map((h) => (h.textContent || '').trim())
    .filter(Boolean)
  const images = Array.from(doc.querySelectorAll('img')).map((img) => ({
    alt: img.getAttribute('alt') || '',
  }))
  const links = Array.from(doc.querySelectorAll('a'))
    .map((a) => a.getAttribute('href') || '')
    .filter(Boolean)
  return {
    text,
    words,
    wordCount: words.length,
    sentences,
    paragraphs,
    headings,
    firstParagraph: paragraphs[0] || '',
    images,
    links,
  }
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return w.length ? 1 : 0
  const trimmed = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    .replace(/^y/, '')
  const groups = trimmed.match(/[aeiouy]{1,2}/g)
  return groups ? groups.length : 1
}

// English transition words / phrases (subset, like Yoast).
const TRANSITIONS = [
  'however', 'therefore', 'moreover', 'furthermore', 'consequently', 'meanwhile',
  'nevertheless', 'nonetheless', 'accordingly', 'subsequently', 'additionally',
  'in addition', 'for example', 'for instance', 'in contrast', 'on the other hand',
  'as a result', 'in conclusion', 'in summary', 'first', 'firstly', 'second',
  'secondly', 'finally', 'because', 'although', 'though', 'despite', 'while',
  'whereas', 'thus', 'hence', 'besides', 'indeed', 'instead', 'likewise',
]

const PASSIVE_RE =
  /\b(is|are|was|were|be|been|being)\b\s+(\w+ed|done|made|given|taken|seen|known|held|brought|found|paid|built|sent|written|shown|told|put|kept|left|won|lost|met)\b/i

// ── scoring helpers ─────────────────────────────────────────────────
function sectionScore(checks: Check[]): SectionResult {
  if (checks.length === 0) return { score: 0, rating: 'bad', checks }
  const pts = checks.reduce((sum, c) => sum + (c.rating === 'good' ? 2 : c.rating === 'ok' ? 1 : 0), 0)
  const score = Math.round((pts / (checks.length * 2)) * 100)
  const rating: Rating = score >= 80 ? 'good' : score >= 50 ? 'ok' : 'bad'
  return { score, rating, checks }
}

// ── SEO analysis ────────────────────────────────────────────────────
function analyseSeo(input: SeoInput, body: ParsedBody): SectionResult {
  const kp = norm(input.keyphrase.trim())
  if (!kp) {
    return {
      score: 0,
      rating: 'bad',
      checks: [
        { id: 'keyphrase', rating: 'bad', text: 'Set a focus keyphrase to analyse this page.' },
      ],
    }
  }

  const checks: Check[] = []
  const title = norm(input.title)
  const desc = norm(input.metaDescription)
  const slug = norm(input.slug)
  const bodyText = norm(body.text)
  const kpWordCount = kp.split(/\s+/).length

  // Keyphrase in title
  checks.push(
    title.includes(kp)
      ? { id: 'kp-title', rating: 'good', text: 'The focus keyphrase appears in the SEO title.' }
      : { id: 'kp-title', rating: 'bad', text: 'The focus keyphrase is not in the SEO title.' },
  )

  // Title length
  const tLen = input.title.trim().length
  checks.push(
    tLen === 0
      ? { id: 'title-len', rating: 'bad', text: 'The SEO title is empty.' }
      : tLen < 30
      ? { id: 'title-len', rating: 'ok', text: `The SEO title is a bit short (${tLen} chars). Aim for 50–60.` }
      : tLen <= 60
      ? { id: 'title-len', rating: 'good', text: `The SEO title length is good (${tLen} chars).` }
      : { id: 'title-len', rating: 'ok', text: `The SEO title is long (${tLen} chars) and may be cut off in Google.` },
  )

  // Keyphrase in meta description
  checks.push(
    desc.includes(kp)
      ? { id: 'kp-desc', rating: 'good', text: 'The focus keyphrase appears in the meta description.' }
      : { id: 'kp-desc', rating: 'bad', text: 'The focus keyphrase is not in the meta description.' },
  )

  // Meta description length
  const dLen = input.metaDescription.trim().length
  checks.push(
    dLen === 0
      ? { id: 'desc-len', rating: 'bad', text: 'The meta description is empty.' }
      : dLen < 120
      ? { id: 'desc-len', rating: 'ok', text: `The meta description is short (${dLen} chars). Aim for 120–160.` }
      : dLen <= 160
      ? { id: 'desc-len', rating: 'good', text: `The meta description length is good (${dLen} chars).` }
      : { id: 'desc-len', rating: 'ok', text: `The meta description is long (${dLen} chars) and may be cut off.` },
  )

  // Keyphrase in slug
  checks.push(
    slug.includes(kp.replace(/\s+/g, '-')) || slug.includes(kp.replace(/\s+/g, ''))
      ? { id: 'kp-slug', rating: 'good', text: 'The focus keyphrase appears in the URL slug.' }
      : { id: 'kp-slug', rating: 'ok', text: 'The focus keyphrase is not in the URL slug.' },
  )

  // Keyphrase in first paragraph
  checks.push(
    norm(body.firstParagraph).includes(kp)
      ? { id: 'kp-intro', rating: 'good', text: 'The focus keyphrase appears in the first paragraph.' }
      : { id: 'kp-intro', rating: 'ok', text: 'The focus keyphrase does not appear in the first paragraph.' },
  )

  // Keyphrase in a subheading
  const inHeading = body.headings.some((h) => norm(h).includes(kp))
  checks.push(
    body.headings.length === 0
      ? { id: 'kp-heading', rating: 'ok', text: 'There are no subheadings (H2/H3) in the content.' }
      : inHeading
      ? { id: 'kp-heading', rating: 'good', text: 'The focus keyphrase appears in a subheading.' }
      : { id: 'kp-heading', rating: 'ok', text: 'The focus keyphrase is not in any subheading.' },
  )

  // Keyphrase density
  const occ = countOccurrences(bodyText, kp)
  const density = body.wordCount > 0 ? (occ * kpWordCount * 100) / body.wordCount : 0
  checks.push(
    occ === 0
      ? { id: 'kp-density', rating: 'bad', text: 'The focus keyphrase does not appear in the content.' }
      : density < 0.5
      ? { id: 'kp-density', rating: 'ok', text: `Keyphrase density is low (${density.toFixed(1)}%, ${occ}×). Aim for 0.5–2.5%.` }
      : density <= 2.5
      ? { id: 'kp-density', rating: 'good', text: `Keyphrase density is good (${density.toFixed(1)}%, ${occ}×).` }
      : { id: 'kp-density', rating: 'bad', text: `Keyphrase density is high (${density.toFixed(1)}%, ${occ}×) — looks like keyword stuffing.` },
  )

  // Content length
  checks.push(
    body.wordCount >= 300
      ? { id: 'length', rating: 'good', text: `The content is ${body.wordCount} words long.` }
      : body.wordCount >= 150
      ? { id: 'length', rating: 'ok', text: `The content is a bit thin (${body.wordCount} words). Aim for 300+.` }
      : { id: 'length', rating: 'bad', text: `The content is very short (${body.wordCount} words). Aim for 300+.` },
  )

  // Image alt text
  if (body.images.length > 0) {
    const altHasKp = body.images.some((img) => norm(img.alt).includes(kp))
    checks.push(
      altHasKp
        ? { id: 'img-alt', rating: 'good', text: 'An image alt text contains the focus keyphrase.' }
        : { id: 'img-alt', rating: 'ok', text: 'No image alt text contains the focus keyphrase.' },
    )
  } else {
    checks.push({ id: 'img', rating: 'ok', text: 'The content has no images — consider adding one.' })
  }

  // Outbound / links
  checks.push(
    body.links.length > 0
      ? { id: 'links', rating: 'good', text: 'The content contains links.' }
      : { id: 'links', rating: 'ok', text: 'The content has no links — consider linking to related pages or sources.' },
  )

  return sectionScore(checks)
}

// ── Readability analysis ────────────────────────────────────────────
function analyseReadability(body: ParsedBody): SectionResult {
  if (body.wordCount < 30) {
    return {
      score: 0,
      rating: 'bad',
      checks: [{ id: 'empty', rating: 'bad', text: 'Add more content to analyse readability.' }],
    }
  }

  const checks: Check[] = []
  const sentenceCount = body.sentences.length || 1

  // Flesch Reading Ease
  const syllables = body.words.reduce((sum, w) => sum + countSyllables(w), 0)
  const flesch = 206.835 - 1.015 * (body.wordCount / sentenceCount) - 84.6 * (syllables / body.wordCount)
  const fleschR = Math.max(0, Math.min(100, Math.round(flesch)))
  checks.push(
    flesch >= 60
      ? { id: 'flesch', rating: 'good', text: `Reading ease is good (${fleschR}/100 — fairly easy to read).` }
      : flesch >= 30
      ? { id: 'flesch', rating: 'ok', text: `Reading ease is ${fleschR}/100 — fairly difficult. Shorten sentences and words.` }
      : { id: 'flesch', rating: 'bad', text: `Reading ease is low (${fleschR}/100 — very difficult to read).` },
  )

  // Long sentences (> 20 words)
  const longSentences = body.sentences.filter((s) => s.split(/\s+/).filter(Boolean).length > 20).length
  const longPct = Math.round((longSentences / sentenceCount) * 100)
  checks.push(
    longPct <= 25
      ? { id: 'sentence-len', rating: 'good', text: `Sentence length is good (${longPct}% over 20 words).` }
      : { id: 'sentence-len', rating: 'ok', text: `${longPct}% of sentences are over 20 words. Try to shorten some.` },
  )

  // Long paragraphs (> 150 words)
  const longParas = body.paragraphs.filter((p) => p.split(/\s+/).filter(Boolean).length > 150).length
  checks.push(
    longParas === 0
      ? { id: 'para-len', rating: 'good', text: 'No overly long paragraphs.' }
      : { id: 'para-len', rating: 'ok', text: `${longParas} paragraph(s) are over 150 words. Break them up.` },
  )

  // Subheading distribution
  checks.push(
    body.wordCount <= 300 || body.headings.length > 0
      ? { id: 'subheadings', rating: 'good', text: 'Subheading distribution is good.' }
      : { id: 'subheadings', rating: 'ok', text: 'Long text with no subheadings. Add H2/H3 to break it up.' },
  )

  // Passive voice (approximate)
  const passive = body.sentences.filter((s) => PASSIVE_RE.test(s)).length
  const passivePct = Math.round((passive / sentenceCount) * 100)
  checks.push(
    passivePct <= 15
      ? { id: 'passive', rating: 'good', text: `Passive voice is low (~${passivePct}%).` }
      : { id: 'passive', rating: 'ok', text: `~${passivePct}% of sentences may use passive voice. Prefer active voice.` },
  )

  // Transition words
  const withTransition = body.sentences.filter((s) => {
    const n = norm(s)
    return TRANSITIONS.some((t) => n.includes(t))
  }).length
  const transitionPct = Math.round((withTransition / sentenceCount) * 100)
  checks.push(
    transitionPct >= 30
      ? { id: 'transitions', rating: 'good', text: `Good use of transition words (${transitionPct}%).` }
      : { id: 'transitions', rating: 'ok', text: `Only ${transitionPct}% of sentences use transition words. Aim for 30%+.` },
  )

  return sectionScore(checks)
}

export function analyseSeoContent(input: SeoInput): AnalysisResult {
  const body = parseBody(input.bodyHtml)
  return {
    seo: analyseSeo(input, body),
    readability: analyseReadability(body),
  }
}
