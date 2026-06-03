import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'
import { type Block, type ClassAction, type CaseStatus } from '@/data/classActions'
import {
  fetchCases,
  fetchInvestigations,
  fetchPastActions,
  type Investigation,
} from '@/lib/classActions'
import { cleanListingSummary, splitBodyAtFirstHeading } from '@/lib/caseBody'

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

// Display hierarchy requested by the firm: Active first, then matters under
// investigation, then those on appeal, with settled matters last.
const STATUS_ORDER: CaseStatus[] = ['Active', 'Investigating', 'On Appeal', 'Settled']
const STATUS_FILTERS: (CaseStatus | 'All')[] = ['All', ...STATUS_ORDER]

function statusRank(s: CaseStatus): number {
  const i = STATUS_ORDER.indexOf(s)
  return i === -1 ? STATUS_ORDER.length : i
}

function rowStatus(row: Row): CaseStatus {
  // Standalone investigation entries are, by definition, "Investigating".
  return row.kind === 'case' ? row.data.status : 'Investigating'
}

const statusBadgeClass: Record<CaseStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Investigating: 'bg-amber-50 text-amber-700 border-amber-200',
  'On Appeal': 'bg-sky-50 text-sky-700 border-sky-200',
  Settled: 'bg-slate-100 text-slate-600 border-slate-200',
}

function StatusBadge({ status }: { status: CaseStatus }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border ${statusBadgeClass[status]}`}
    >
      {status}
    </span>
  )
}

export function ClassActions() {
  const [cases, setCases] = useState<ClassAction[]>([])
  const [investigations, setInvestigations] = useState<Investigation[]>([])
  const [pastActions, setPastActions] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<CaseStatus | 'All'>('All')

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
   * Merge cases and investigations into a single list, ordered first by
   * status hierarchy (Active → Investigating → On Appeal → Settled) and,
   * within each status, by `orderIndex` (lower first). Entries without an
   * orderIndex keep their insertion order; investigations land after by
   * default.
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
    merged.sort((a, b) => {
      const sa = statusRank(rowStatus(a.row))
      const sb = statusRank(rowStatus(b.row))
      if (sa !== sb) return sa - sb
      return a.key - b.key
    })
    return merged.map((m) => m.row)
  }, [cases, investigations])

  // Count per status so the filter pills can show how many matters each holds.
  const statusCounts = useMemo(() => {
    const counts = { All: rows.length } as Record<CaseStatus | 'All', number>
    for (const s of STATUS_ORDER) counts[s] = 0
    for (const r of rows) counts[rowStatus(r)] += 1
    return counts
  }, [rows])

  const visibleRows = useMemo(
    () => (filter === 'All' ? rows : rows.filter((r) => rowStatus(r) === filter)),
    [rows, filter],
  )

  // Past actions are concluded matters — only relevant under "All" or "Settled".
  const showPastActions = pastActions.length > 0 && (filter === 'All' || filter === 'Settled')

  return (
    <section id="class-actions" className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {!loaded ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#1C3A64]/20 border-t-[#1C3A64] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Sort by / filter tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pb-2">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#1C3A64]/60">
                Sort by
              </span>
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((f) => {
                  const active = filter === f
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                        active
                          ? 'bg-[#1C3A64] text-white border-[#1C3A64]'
                          : 'bg-white text-[#555555] border-[#1C3A64]/20 hover:border-[#1C3A64]/50 hover:text-[#1C3A64]'
                      }`}
                    >
                      {f === 'All' ? 'All matters' : f}
                      <span className={active ? 'text-white/60 ml-1.5' : 'text-[#1C3A64]/40 ml-1.5'}>
                        {statusCounts[f] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {visibleRows.length === 0 ? (
              <p className="text-[#555555] text-[15px] py-16 text-center">
                No matters in this category at the moment.
              </p>
            ) : (
              visibleRows.map((row, idx) =>
                row.kind === 'case' ? (
                  <CaseRow key={`c-${row.data.id}`} caseData={row.data} html={row.html} first={idx === 0} />
                ) : (
                  <InvestigationRow key={`i-${row.data.id}`} inv={row.data} first={idx === 0} />
                ),
              )
            )}

            {showPastActions && <PastActionsRow items={pastActions} />}
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
  // Listing card shows only the intro: paragraphs up to the first
  // section heading (BACKGROUND, COURT'S ORDERS, etc). `detail` is the
  // content from the first heading onwards — when it's empty the case has
  // no dedicated detail page, so we don't render the "read more" button.
  const { summary, detail } = splitBodyAtFirstHeading(html)
  const intro = cleanListingSummary(summary) || `<p>${caseData.summary}</p>`
  const hasDetail = detail.trim().length > 0
  return (
    <ScrollReveal>
      <article
        className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 py-10 md:py-12 ${
          first ? '' : 'border-t border-[#1C3A64]/15'
        }`}
      >
        <div className="md:pr-4">
          <div className="mb-3">
            <StatusBadge status={caseData.status} />
          </div>
          <h3 className="font-typewriter text-[#1C3A64] text-[22px] md:text-[26px] leading-[1.25]">
            {caseData.title}
          </h3>
        </div>
        <div>
          <div className={proseClasses} dangerouslySetInnerHTML={{ __html: intro }} />
          {hasDetail && (
            <Link
              to={`/class-actions/${slug}`}
              className="mt-6 inline-flex items-center gap-2 bg-[#1C3A64] hover:bg-[#2A4E72] text-white text-[13px] font-medium px-5 py-2.5 rounded-md transition-colors"
            >
              {caseData.title}
              <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </article>
    </ScrollReveal>
  )
}

function InvestigationRow({ inv, first }: { inv: Investigation; first?: boolean }) {
  return (
    <ScrollReveal>
      <article
        className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 py-10 md:py-12 ${
          first ? '' : 'border-t border-[#1C3A64]/15'
        }`}
      >
        <div className="md:pr-4">
          <div className="mb-3">
            <StatusBadge status="Investigating" />
          </div>
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
