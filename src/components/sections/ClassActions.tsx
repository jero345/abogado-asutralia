import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'
import { type Block, type ClassAction } from '@/data/classActions'
import {
  fetchCases,
  fetchInvestigations,
  fetchPastActions,
  type Investigation,
} from '@/lib/classActions'
import { embedPdfLinks } from '@/lib/embedPdfs'

// Union of the entries we mix in the single ordered listing.
type Row =
  | { kind: 'case'; data: ClassAction; html: string }
  | { kind: 'investigation'; data: Investigation }

function caseHtml(c: ClassAction): string {
  // DB-backed cases push an `html` block; legacy/static cases push
  // structured Block[]. For listing we use the HTML body when present;
  // otherwise fall back to the case summary.
  const htmlBlock = c.content.find((b): b is Extract<Block, { kind: 'html' }> => b.kind === 'html')
  if (htmlBlock) return htmlBlock.html
  return `<p>${c.summary}</p>`
}

export function ClassActions() {
  const [cases, setCases] = useState<ClassAction[]>([])
  const [investigations, setInvestigations] = useState<Investigation[]>([])
  const [pastActions, setPastActions] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchCases(), fetchInvestigations(), fetchPastActions()]).then(
      ([cs, inv, past]) => {
        if (cancelled) return
        setCases(cs)
        setInvestigations(inv)
        setPastActions(past)
        setLoaded(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [])

  /**
   * Merge cases and investigations into a single list ordered by
   * `orderIndex` (lower first). Cases without orderIndex sort by
   * insertion order; investigations land after by default.
   */
  const rows = useMemo<Row[]>(() => {
    const merged: { row: Row; key: number }[] = []
    cases.forEach((c, i) => {
      merged.push({
        row: { kind: 'case', data: c, html: caseHtml(c) },
        key: typeof c.orderIndex === 'number' ? c.orderIndex : 1000 + i,
      })
    })
    investigations.forEach((inv, i) => {
      merged.push({
        row: { kind: 'investigation', data: inv },
        key: typeof inv.orderIndex === 'number' ? inv.orderIndex : 2000 + i,
      })
    })
    merged.sort((a, b) => a.key - b.key)
    return merged.map((m) => m.row)
  }, [cases, investigations])

  return (
    <section id="class-actions" className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {!loaded ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#1C3A64]/20 border-t-[#1C3A64] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {rows.map((row, idx) =>
              row.kind === 'case' ? (
                <CaseRow key={`c-${row.data.id}`} caseData={row.data} html={row.html} first={idx === 0} />
              ) : (
                <InvestigationRow key={`i-${row.data.id}`} inv={row.data} />
              ),
            )}

            {pastActions.length > 0 && <PastActionsRow items={pastActions} />}
          </>
        )}
      </div>
    </section>
  )
}

// ─── Body / prose styling shared by case + investigation rows ───────
const proseClasses = [
  'prose prose-slate max-w-none',
  'prose-headings:text-[#1C3A64] prose-headings:font-medium',
  'prose-p:text-[#555555] prose-p:leading-[1.75] prose-p:text-[14.5px]',
  'prose-a:text-[#1C3A64] prose-a:font-normal prose-a:underline',
  'prose-strong:text-[#1C3A64]',
  'prose-blockquote:border-l-[#1C3A64] prose-blockquote:bg-[#F4F6FB] prose-blockquote:rounded-r-xl',
  'prose-blockquote:not-italic',
  'prose-li:text-[#555555] prose-li:text-[14.5px]',
  // Inline PDF viewer
  '[&_.pdf-embed]:my-6 [&_.pdf-embed]:rounded-xl [&_.pdf-embed]:overflow-hidden',
  '[&_.pdf-embed]:border [&_.pdf-embed]:border-[#1C3A64]/15',
  '[&_.pdf-embed_iframe]:block [&_.pdf-embed_iframe]:w-full',
  '[&_.pdf-embed_iframe]:h-[80vh] [&_.pdf-embed_iframe]:min-h-[520px]',
  '[&_.pdf-embed_iframe]:bg-[#F4F6FB] [&_.pdf-embed_iframe]:border-0',
  '[&_.pdf-embed-fallback]:block [&_.pdf-embed-fallback]:text-center',
  '[&_.pdf-embed-fallback]:text-[12px] [&_.pdf-embed-fallback]:text-[#1C3A64]',
  '[&_.pdf-embed-fallback]:py-2 [&_.pdf-embed-fallback]:bg-[#F4F6FB]',
].join(' ')

function CaseRow({
  caseData,
  html,
  first,
}: {
  caseData: ClassAction
  html: string
  first?: boolean
}) {
  const slug = caseData.slug ?? caseData.detailSlug ?? caseData.id
  return (
    <ScrollReveal>
      <article
        className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 py-10 md:py-12 ${
          first ? '' : 'border-t border-[#1C3A64]/15'
        }`}
      >
        <div className="md:pr-4">
          <h3 className="font-typewriter text-[#1C3A64] text-[22px] md:text-[26px] leading-[1.25]">
            {caseData.title}
          </h3>
        </div>
        <div>
          <div
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: embedPdfLinks(html) }}
          />
          <Link
            to={`/class-actions/${slug}`}
            className="mt-6 inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-5 py-2.5 rounded-md transition-colors"
          >
            {caseData.title}
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  )
}

function InvestigationRow({ inv }: { inv: Investigation }) {
  return (
    <ScrollReveal>
      <article className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 py-10 md:py-12 border-t border-[#1C3A64]/15">
        <div className="md:pr-4">
          <h3 className="font-typewriter text-[#1C3A64] text-[22px] md:text-[26px] leading-[1.25]">
            {inv.title}
          </h3>
        </div>
        <div className={proseClasses}>
          <p>{inv.summary}</p>
          {inv.body && inv.body !== inv.summary && <p>{inv.body}</p>}
          {inv.link?.href && inv.link.href !== '#' && (
            <p>
              <a href={inv.link.href} target="_blank" rel="noopener noreferrer">
                {inv.link.label}
              </a>
            </p>
          )}
        </div>
      </article>
    </ScrollReveal>
  )
}

function PastActionsRow({ items }: { items: string[] }) {
  return (
    <ScrollReveal>
      <article className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 py-10 md:py-12 border-t border-[#1C3A64]/15">
        <div className="md:pr-4">
          <h3 className="font-typewriter text-[#1C3A64] text-[22px] md:text-[26px] leading-[1.25]">
            Past Class Actions and Schemes
          </h3>
        </div>
        <div className={proseClasses}>
          <p>Our team has acted for class members in the following matters, among others:</p>
          <ul>
            {items.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </article>
    </ScrollReveal>
  )
}
