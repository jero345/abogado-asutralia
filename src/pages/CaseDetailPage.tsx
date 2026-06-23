import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Scale,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { type CaseBlock, type CaseDetail, type CaseStatus } from '@/data/caseDetails'
import { fetchCaseDetailBySlug } from '@/lib/classActions'
import { buttonizePdfLinks, buttonizeRegisterLinks, splitBodyAtFirstHeading } from '@/lib/caseBody'
import { pdfEmbedsToButtons, embedFormstackLinks } from '@/lib/embedPdfs'

const statusColors: Record<CaseStatus, string> = {
  Active: 'text-[#1C3A64] bg-[#E8F0FA] border-[#1C3A64]/20',
  Settled: 'text-[#1A6B41] bg-[#E6F4EE] border-[#1A6B41]/20',
  'On Appeal': 'text-[#8A6D1E] bg-[#C9A84C]/10 border-[#C9A84C]/30',
  Investigating: 'text-[#1C3A64] bg-white border-[#1C3A64]/30',
}

const calloutTones = {
  info: {
    bg: 'bg-[#E8F0FA]',
    border: 'border-[#1C3A64]/20',
    text: 'text-[#1C3A64]',
    Icon: Info,
  },
  warning: {
    bg: 'bg-[#C9A84C]/10',
    border: 'border-[#C9A84C]/40',
    text: 'text-[#8A6D1E]',
    Icon: AlertCircle,
  },
  success: {
    bg: 'bg-[#E6F4EE]',
    border: 'border-[#1A6B41]/25',
    text: 'text-[#1A6B41]',
    Icon: CheckCircle2,
  },
}

function BlockRenderer({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.8] mb-5">{block.text}</p>
    case 'h2':
      return (
        <h2 className="text-[#1C3A64] text-[22px] md:text-[26px] font-medium leading-[1.25] mt-10 mb-5 tracking-tight">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-[#1C3A64] text-[17px] md:text-[19px] font-medium leading-[1.3] mt-7 mb-3">
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul className="list-disc pl-6 space-y-2 text-[#555555] text-[15px] md:text-[16px] leading-[1.7] mb-6">
          {block.items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal pl-6 space-y-2 text-[#555555] text-[15px] md:text-[16px] leading-[1.7] mb-6">
          {block.items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ol>
      )
    case 'quote':
      return (
        <blockquote className="border-l-[3px] border-l-[#1C3A64] bg-[#F4F6FB] rounded-r-xl px-6 py-5 my-8">
          <p className="text-[#1C3A64] text-[17px] italic leading-[1.6] mb-2">"{block.text}"</p>
          {block.attribution && (
            <footer className="text-[#888888] text-[13px] font-medium tracking-wide">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      )
    case 'callout': {
      const tone = calloutTones[block.tone ?? 'info']
      const Icon = tone.Icon
      return (
        <div className={`my-7 rounded-xl border ${tone.border} ${tone.bg} p-5 flex items-start gap-4`}>
          <Icon size={20} className={`${tone.text} flex-shrink-0 mt-0.5`} />
          <div>
            <div className={`${tone.text} text-[14px] font-medium mb-1`}>{block.title}</div>
            <p className={`${tone.text} text-[14px] md:text-[15px] leading-[1.65] opacity-90`}>
              {block.text}
            </p>
          </div>
        </div>
      )
    }
    case 'documents':
      return (
        <div className="my-7">
          {block.heading && (
            <h3 className="text-[#1C3A64] text-[15px] font-medium tracking-wide uppercase mb-4 letter-spacing-[0.08em]">
              {block.heading}
            </h3>
          )}
          <ul className="space-y-2">
            {block.items.map((d, k) => (
              <li key={k}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border border-[#1C3A64]/12 hover:border-[#1C3A64]/30 bg-white rounded-xl px-5 py-3.5 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText size={15} className="text-[#1C3A64] flex-shrink-0" />
                    <span className="text-[#1C3A64] text-[14px] font-medium leading-[1.4] truncate">
                      {d.label}
                    </span>
                  </div>
                  <Download
                    size={14}
                    className="text-[#888888] group-hover:text-[#1C3A64] flex-shrink-0 transition-colors"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'timeline':
      return (
        <div className="my-7">
          {block.heading && (
            <h3 className="text-[#1C3A64] text-[15px] font-medium tracking-wide uppercase mb-4">
              {block.heading}
            </h3>
          )}
          <ol className="space-y-3">
            {block.items.map((t, k) => (
              <li
                key={k}
                className="flex items-start gap-4 border-l-2 border-l-[#1C3A64]/20 pl-4 py-1"
              >
                <Calendar size={14} className="text-[#1C3A64] flex-shrink-0 mt-1" />
                <div className="flex-1 grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-4 items-baseline">
                  <span className="text-[#555555] text-[14px] md:text-[15px]">{t.label}</span>
                  <span className="text-[#1C3A64] text-[13px] md:text-[14px] font-medium tabular-nums">
                    {t.date}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
    case 'externalLink':
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="my-7 group flex items-start gap-4 border border-[#1C3A64]/15 hover:border-[#1C3A64]/40 bg-[#F4F6FB] rounded-xl p-5 transition-colors"
        >
          <ExternalLink size={18} className="text-[#1C3A64] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[#1C3A64] text-[14px] font-medium mb-1 flex items-center gap-2 group-hover:underline">
              {block.label}
              <ArrowUpRight size={12} />
            </div>
            {block.description && (
              <p className="text-[#555555] text-[13px] leading-[1.6]">{block.description}</p>
            )}
          </div>
        </a>
      )
    case 'table':
      return (
        <div className="my-7 overflow-x-auto">
          {block.heading && (
            <h3 className="text-[#1C3A64] text-[15px] font-medium tracking-wide uppercase mb-3">
              {block.heading}
            </h3>
          )}
          <table className="w-full text-[13px] md:text-[14px] border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#1C3A64] text-white">
                {block.columns.map((col, k) => (
                  <th
                    key={k}
                    className="text-left px-3 py-2.5 font-medium first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={`border-b border-[#1C3A64]/08 ${ri % 2 === 0 ? 'bg-white' : 'bg-[#F4F6FB]'}`}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2.5 text-[#444444] align-top">
                      {typeof cell === 'string' ? (
                        cell === '—' ? <span className="text-[#AAAAAA]">—</span> : cell
                      ) : (
                        <a
                          href={cell.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1C3A64] font-medium hover:underline inline-flex items-center gap-1"
                        >
                          {cell.label}
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

export function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [caseData, setCaseData] = useState<CaseDetail | undefined | null>(undefined)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!slug) {
      setCaseData(null)
      return
    }
    let cancelled = false
    fetchCaseDetailBySlug(slug).then((data) => {
      if (!cancelled) setCaseData(data ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  // Intercept clicks on internal-link anchors inside the (HTML) body so they
  // route via React Router instead of triggering a full page reload. Needed
  // because the rewritten "Register Now" button lives inside dangerouslySetInnerHTML.
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      const link = (e.target as HTMLElement | null)?.closest('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('/') && !link.target) {
        e.preventDefault()
        navigate(href)
      }
    }
    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [navigate, caseData])

  if (caseData === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1C3A64]" size={28} />
      </div>
    )
  }
  if (caseData === null) return <Navigate to="/class-actions" replace />

  return (
    <>
      <PageHero
        title={caseData.title}
        breadcrumbs={[{ label: 'Class Actions', to: '/class-actions' }, { label: caseData.title }]}
      />

      {/* Case meta bar — status + court + file number */}
      <section className="relative bg-white border-b border-[#1C3A64]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            <span
              className={`text-[11px] font-medium px-3 py-1.5 rounded-full border tracking-wide ${statusColors[caseData.status]}`}
            >
              {caseData.status}
            </span>
            {caseData.court && (
              <div className="flex items-center gap-1.5 text-[#555555] text-[13px]">
                <Scale size={13} className="text-[#1C3A64]" />
                {caseData.court}
              </div>
            )}
            {caseData.fileNumber && (
              <div className="text-[#888888] text-[13px]">File: {caseData.fileNumber}</div>
            )}
            {caseData.leadPlaintiff && (
              <div className="text-[#888888] text-[13px] hidden md:block">
                Lead Plaintiff: <span className="text-[#1C3A64]">{caseData.leadPlaintiff}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
            {/* Main column */}
            <ScrollReveal>
              <div>
                {caseData.bodyHtml ? (
                  <div
                    ref={bodyRef}
                    className={[
                      'prose prose-slate max-w-none',
                      'prose-headings:text-[#1C3A64] prose-headings:font-medium',
                      // Class-action headings are underlined in the firm's PDFs
                      'prose-h3:underline prose-h3:underline-offset-4 prose-h3:tracking-wide',
                      'prose-p:text-[#555555] prose-p:leading-[1.8]',
                      'prose-a:text-[#1C3A64] prose-a:font-medium prose-strong:text-[#1C3A64]',
                      'prose-blockquote:border-l-[#1C3A64] prose-blockquote:bg-[#F4F6FB]',
                      'prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-5',
                      'prose-blockquote:not-italic prose-li:text-[#555555]',
                      // Recall / eligibility tables (Hyundai & Kia ABS) — bordered
                      // cells with a light header, matching the firm's pages.
                      '[&_table]:w-full [&_table]:my-6 [&_table]:text-[14px] [&_table]:border-collapse',
                      '[&_th]:border [&_th]:border-[#1C3A64]/15 [&_th]:bg-[#F4F6FB] [&_th]:text-[#1C3A64] [&_th]:font-medium [&_th]:text-left [&_th]:px-3 [&_th]:py-2.5',
                      '[&_td]:border [&_td]:border-[#1C3A64]/15 [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-[#555555]',
                      // PDF outlined-button (replaces inline iframe — the firm
                      // explicitly wants the case docs as downloadable buttons,
                      // not inline viewers; that's blog-only).
                      '[&_.pdf-button]:inline-flex [&_.pdf-button]:items-center [&_.pdf-button]:gap-3',
                      '[&_.pdf-button]:bg-white [&_.pdf-button]:border [&_.pdf-button]:border-[#1C3A64]/30',
                      '[&_.pdf-button]:hover:border-[#1C3A64]/60 [&_.pdf-button]:hover:bg-[#F4F6FB]',
                      '[&_.pdf-button]:text-[#1C3A64] [&_.pdf-button]:text-[13px] [&_.pdf-button]:font-medium',
                      '[&_.pdf-button]:px-5 [&_.pdf-button]:py-3 [&_.pdf-button]:rounded-md',
                      '[&_.pdf-button]:no-underline [&_.pdf-button]:my-3 [&_.pdf-button]:transition-colors',
                      '[&_.pdf-button_svg]:w-3.5 [&_.pdf-button_svg]:h-3.5 [&_.pdf-button_svg]:flex-shrink-0',
                      // Lists of PDF buttons stack without the default bullets
                      '[&_.pdf-li]:list-none [&_.pdf-li]:ml-0 [&_.pdf-li]:pl-0',
                      '[&_ul:has(.pdf-li)]:pl-0 [&_ul:has(.pdf-li)]:list-none [&_ul:has(.pdf-li)]:space-y-0',
                      // Primary "Register Now" button (rewritten from any WP register link)
                      '[&_.register-button]:inline-flex [&_.register-button]:items-center [&_.register-button]:gap-2',
                      '[&_.register-button]:bg-[#1C3A64] [&_.register-button]:hover:bg-[#2A4E72]',
                      '[&_.register-button]:text-white [&_.register-button]:no-underline',
                      '[&_.register-button]:text-[13px] [&_.register-button]:font-medium',
                      '[&_.register-button]:px-5 [&_.register-button]:py-3 [&_.register-button]:rounded-md',
                      '[&_.register-button]:my-4 [&_.register-button]:transition-colors',
                      '[&_.register-button_svg]:w-3.5 [&_.register-button_svg]:h-3.5',
                      // Inline Formstack form (pasted as a link in the body)
                      '[&_.formstack-embed]:my-6 [&_.formstack-embed]:rounded-xl [&_.formstack-embed]:overflow-hidden',
                      '[&_.formstack-embed]:border [&_.formstack-embed]:border-[#1C3A64]/15 [&_.formstack-embed]:bg-white',
                      '[&_.formstack-iframe]:block [&_.formstack-iframe]:w-full [&_.formstack-iframe]:min-h-[1000px] [&_.formstack-iframe]:border-0',
                    ].join(' ')}
                    dangerouslySetInnerHTML={{
                      __html: buttonizeRegisterLinks(
                        buttonizePdfLinks(
                          pdfEmbedsToButtons(
                            embedFormstackLinks(
                              splitBodyAtFirstHeading(caseData.bodyHtml).detail ||
                                caseData.bodyHtml,
                            ),
                          ),
                        ),
                      ),
                    }}
                  />
                ) : (
                  caseData.content.map((b, i) => <BlockRenderer key={i} block={b} />)
                )}
              </div>
            </ScrollReveal>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              {/* Back link */}
              <ScrollReveal delay={0.2}>
                <Link
                  to="/class-actions"
                  className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
                >
                  <ArrowLeft size={14} />
                  All class actions
                </Link>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
