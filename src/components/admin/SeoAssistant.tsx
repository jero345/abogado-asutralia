import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { analyseSeoContent, type Rating, type SectionResult, type Check } from '@/lib/seoAnalysis'

const RATING_DOT: Record<Rating, string> = {
  good: 'bg-green-500',
  ok: 'bg-amber-500',
  bad: 'bg-red-500',
}
const RATING_LABEL: Record<Rating, string> = {
  good: 'Good',
  ok: 'Needs work',
  bad: 'Problems',
}
const RATING_ORDER: Record<Rating, number> = { bad: 0, ok: 1, good: 2 }

export function SeoAssistant({
  keyphrase,
  onKeyphraseChange,
  title,
  metaDescription,
  slug,
  bodyHtml,
}: {
  keyphrase: string
  onKeyphraseChange: (v: string) => void
  title: string
  metaDescription: string
  slug: string
  bodyHtml: string
}) {
  const result = useMemo(
    () => analyseSeoContent({ keyphrase, title, metaDescription, slug, bodyHtml }),
    [keyphrase, title, metaDescription, slug, bodyHtml],
  )

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-[#1C3A64] mb-1.5">
          Focus keyphrase
        </label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa]" />
          <input
            type="text"
            value={keyphrase}
            onChange={(e) => onKeyphraseChange(e.target.value)}
            placeholder="e.g. class action lawyers"
            className="w-full rounded-lg border border-[#1C3A64]/15 bg-white pl-9 pr-3 py-2 text-[13px] text-[#333333] placeholder:text-[#bbbbbb] focus:outline-none focus:border-[#1C3A64]/40 transition-colors"
          />
        </div>
        <p className="text-[11px] text-[#aaaaaa] mt-1">
          The main term you want this page to rank for in Google.
        </p>
      </div>

      <Section title="SEO analysis" data={result.seo} />
      <Section title="Readability analysis" data={result.readability} />
    </div>
  )
}

function Section({ title, data }: { title: string; data: SectionResult }) {
  const [open, setOpen] = useState(true)
  const checks = [...data.checks].sort((a, b) => RATING_ORDER[a.rating] - RATING_ORDER[b.rating])
  return (
    <div className="rounded-lg border border-[#1C3A64]/10 overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-[#1C3A64]/[0.02] transition-colors"
      >
        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${RATING_DOT[data.rating]}`} />
        <span className="text-[13px] font-medium text-[#1C3A64] flex-1">{title}</span>
        <span className="text-[11px] text-[#888888]">
          {RATING_LABEL[data.rating]} · {data.score}/100
        </span>
        <ChevronDown
          size={15}
          className={`text-[#888888] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="px-4 pb-3 pt-1 space-y-2 border-t border-[#1C3A64]/[0.06]">
          {checks.map((c: Check) => (
            <li key={c.id} className="flex items-start gap-2.5 text-[12px] text-[#3A4A5F] leading-snug">
              <span className={`mt-[5px] w-2 h-2 rounded-full flex-shrink-0 ${RATING_DOT[c.rating]}`} />
              {c.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
