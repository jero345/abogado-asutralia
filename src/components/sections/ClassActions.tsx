import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ChevronDown, Calendar, Scale, FileText, Mail, ArrowUpRight } from 'lucide-react'
import { classActions, investigations, pastActions, type Block, type CaseStatus } from '@/data/classActions'

const statusColors: Record<CaseStatus, string> = {
  Active: 'text-[#1C3A64] bg-[#E8F0FA] border-[#1C3A64]/20',
  Settled: 'text-[#1A6B41] bg-[#E6F4EE] border-[#1A6B41]/20',
  'On Appeal': 'text-[#8A6D1E] bg-[#C9A84C]/10 border-[#C9A84C]/30',
  Investigating: 'text-[#1C3A64] bg-white border-[#1C3A64]/30',
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-[#555555] text-[14px] md:text-[15px] leading-[1.75]">{block.text}</p>
    case 'h':
      return (
        <h4 className="text-[#1C3A64] text-[15px] md:text-[16px] font-medium leading-[1.3] mt-2">
          {block.text}
        </h4>
      )
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-2 text-[#555555] text-[14px] md:text-[15px] leading-[1.7]">
          {block.items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal pl-5 space-y-2 text-[#555555] text-[14px] md:text-[15px] leading-[1.7]">
          {block.items.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </ol>
      )
    case 'link':
      return (
        <a
          href={block.href}
          className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium border border-[#1C3A64]/25 bg-white rounded-full px-4 py-2 hover:bg-[#1C3A64] hover:text-white transition-colors"
        >
          <FileText size={13} />
          {block.label}
        </a>
      )
    case 'email':
      return (
        <div className="inline-flex flex-wrap items-center gap-2 bg-[#F4F6FB] border border-[#1C3A64]/15 rounded-lg px-4 py-3">
          <Mail size={13} className="text-[#1C3A64]" />
          <span className="text-[#555555] text-[13px]">{block.label}:</span>
          <a href={`mailto:${block.address}`} className="text-[#1C3A64] text-[13px] font-medium hover:underline">
            {block.address}
          </a>
        </div>
      )
    case 'recalls':
      return (
        <div className="overflow-x-auto -mx-1">
          <table className="min-w-full text-[12px] md:text-[13px] border border-[#1C3A64]/10 rounded-lg">
            <thead className="bg-[#1C3A64]/[0.06]">
              <tr>
                {block.columns.map((c) => (
                  <th
                    key={c}
                    className="text-left text-[#1C3A64] font-medium px-3 py-2.5 border-b border-[#1C3A64]/10 tracking-wide"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 === 0 ? 'bg-white' : 'bg-[#1C3A64]/[0.02]'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 border-b border-[#1C3A64]/[0.06] text-[#555555]">
                      {typeof cell === 'string' ? (
                        cell
                      ) : (
                        <a href={cell.link} className="text-[#1C3A64] underline hover:opacity-70">
                          {cell.label}
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

export function ClassActions() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="class-actions" className="relative py-20 md:py-28 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-12">
          <span className="section-label mb-4 block">
            <span className="w-5 h-px bg-[#1C3A64]" />
            Current Matters
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] lg:text-[44px] font-medium text-[#1C3A64] leading-[1.1] tracking-tight">
              Landmark
              <br />
              <span className="italic-display text-[#6D8FB5]">class actions.</span>
            </h2>
            <p className="text-[#555555] text-[14px] md:text-[15px] leading-[1.7] lg:max-w-sm">
              Representing real people against powerful institutions — tap any matter for the full summary, recall tables and enquiry contacts.
            </p>
          </div>
        </ScrollReveal>

        {/* Case list */}
        <div className="space-y-3">
          {classActions.map((c, i) => {
            const isOpen = expanded === c.id
            return (
              <ScrollReveal key={c.id} delay={i * 0.03}>
                <motion.div
                  layout
                  className={`relative border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-[#1C3A64]/25 bg-[#1C3A64]/[0.03]'
                      : 'border-[#1C3A64]/10 bg-white hover:border-[#1C3A64]/20'
                  }`}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                    className="w-full text-left p-5 lg:p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border tracking-wide ${statusColors[c.status]}`}
                          >
                            {c.status}
                          </span>
                          <span className="text-[#1C3A64]/70 text-[11px] font-medium px-2.5 py-1 bg-[#1C3A64]/[0.05] border border-[#1C3A64]/15 rounded-full tracking-wide">
                            {c.category}
                          </span>
                          <span className="text-[#888888] text-[11px] hidden sm:flex items-center gap-1">
                            <Calendar size={11} />
                            {c.year}
                          </span>
                        </div>
                        <h3 className="text-[#1C3A64] font-medium text-[16px] md:text-[18px] leading-snug pr-4">
                          {c.title}
                        </h3>
                        <p className="text-[#555555] text-[13px] md:text-[14px] mt-1.5 leading-relaxed line-clamp-2">
                          {c.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                        {c.court && (
                          <div className="text-right hidden md:block">
                            <div className="text-[#1C3A64] font-medium text-[13px] leading-tight">{c.court}</div>
                          </div>
                        )}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-9 h-9 border border-[#1C3A64]/20 rounded-full flex items-center justify-center text-[#1C3A64] flex-shrink-0"
                        >
                          <ChevronDown size={15} />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 lg:px-6 pb-7 border-t border-[#1C3A64]/[0.08]">
                          {c.court && (
                            <div className="mt-5 flex items-center gap-2 text-[#1C3A64] text-[12px] font-medium tracking-wide">
                              <Scale size={13} />
                              <span>Jurisdiction:</span>
                              <span className="text-[#555555] font-normal">{c.court}</span>
                            </div>
                          )}
                          <div className="mt-5 space-y-4">
                            {c.content.map((b, k) => (
                              <BlockRenderer key={k} block={b} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Investigations */}
        <ScrollReveal delay={0.1} className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#1C3A64]/40" />
            <span className="text-[#1C3A64] text-[11px] font-medium tracking-[0.2em] uppercase">
              Current Investigations
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investigations.map((inv, i) => (
              <ScrollReveal key={inv.id} delay={i * 0.06}>
                <div className="h-full bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-2xl p-6">
                  <h3 className="text-[#1C3A64] font-medium text-[16px] mb-2">{inv.title}</h3>
                  <p className="text-[#555555] text-[13px] md:text-[14px] leading-[1.6] mb-3">{inv.summary}</p>
                  <p className="text-[#555555] text-[13px] leading-[1.7] mb-4">{inv.body}</p>
                  <a
                    href={inv.link.href}
                    className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
                  >
                    {inv.link.label}
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Past Actions */}
        <ScrollReveal delay={0.2} className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#1C3A64]/40" />
            <span className="text-[#1C3A64] text-[11px] font-medium tracking-[0.2em] uppercase">
              Past Class Actions and Schemes
            </span>
          </div>
          <p className="text-[#555555] text-[14px] leading-[1.7] mb-4 max-w-3xl">
            Our team has acted for class members in the following matters, among others:
          </p>
          <div className="flex flex-wrap gap-2">
            {pastActions.map((m) => (
              <span
                key={m}
                className="text-[#1C3A64] text-[11px] font-medium px-3 py-1.5 bg-[#1C3A64]/[0.04] border border-[#1C3A64]/15 rounded-full tracking-wide"
              >
                {m}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
