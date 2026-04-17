import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Scale,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { getCaseBySlug, type CaseBlock, type CaseStatus } from '@/data/caseDetails'

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
  const caseData = slug ? getCaseBySlug(slug) : undefined

  if (!caseData) return <Navigate to="/class-actions" replace />

  return (
    <>
      <PageHero
        eyebrow={`${caseData.category} Class Action`}
        title={caseData.title}
        subtitle={caseData.summary}
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
                {caseData.content.map((b, i) => (
                  <BlockRenderer key={i} block={b} />
                ))}
              </div>
            </ScrollReveal>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              {/* Register Interest */}
              <ScrollReveal delay={0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-[#1C3A64] rounded-2xl p-6 text-white shadow-lg"
                >
                  <div className="text-[#8AAECE] text-[10px] tracking-[0.2em] uppercase mb-3">
                    Register Interest
                  </div>
                  <p className="text-white/85 text-[14px] leading-[1.6] mb-5">
                    Register your interest as a group member. All enquiries are private and confidential.
                  </p>
                  {caseData.hasInternalForm ? (
                    <Link
                      to={`/class-actions/${caseData.slug}/register`}
                      className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em]"
                    >
                      Register Now
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : caseData.registrationUrl ? (
                    <a
                      href={caseData.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em]"
                    >
                      Register Now
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-white text-[#1C3A64] text-[13px] font-medium rounded-full hover:bg-[#EFF4F4] transition-colors tracking-[0.02em]"
                    >
                      Contact us
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {caseData.email && (
                    <a
                      href={`mailto:${caseData.email}`}
                      className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2 text-[#8AAECE] hover:text-white text-[13px] transition-colors break-all"
                    >
                      <Mail size={13} className="flex-shrink-0" />
                      {caseData.email}
                    </a>
                  )}
                </motion.div>
              </ScrollReveal>

              {/* Case summary */}
              <ScrollReveal delay={0.15}>
                <div className="bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-2xl p-6">
                  <div className="text-[#1C3A64] text-[10px] tracking-[0.2em] uppercase mb-4 font-medium">
                    Case Summary
                  </div>
                  <dl className="space-y-3 text-[13px]">
                    <div>
                      <dt className="text-[#888888]">Category</dt>
                      <dd className="text-[#1C3A64] font-medium">{caseData.category}</dd>
                    </div>
                    <div>
                      <dt className="text-[#888888]">Commenced</dt>
                      <dd className="text-[#1C3A64] font-medium">{caseData.year}</dd>
                    </div>
                    {caseData.court && (
                      <div>
                        <dt className="text-[#888888]">Court</dt>
                        <dd className="text-[#1C3A64] font-medium">{caseData.court}</dd>
                      </div>
                    )}
                    {caseData.fileNumber && (
                      <div>
                        <dt className="text-[#888888]">File number</dt>
                        <dd className="text-[#1C3A64] font-medium">{caseData.fileNumber}</dd>
                      </div>
                    )}
                    {caseData.funder && (
                      <div>
                        <dt className="text-[#888888]">Funder</dt>
                        <dd className="text-[#1C3A64] font-medium">{caseData.funder}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </ScrollReveal>

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
