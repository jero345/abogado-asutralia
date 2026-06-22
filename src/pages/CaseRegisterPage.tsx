import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import { fetchCaseDetailBySlug } from '@/lib/classActions'
import { buttonizePdfLinks } from '@/lib/caseBody'

// Renders the Formstack registration form for a case at
// /class-actions/<slug>/register. Cases without a Formstack form configured
// (formType !== 'formstack') redirect back to the case detail page, where
// visitors are directed to contact the firm.
export function CaseRegisterPage() {
  const { slug } = useParams<{ slug: string }>()
  const [caseData, setCaseData] = useState<CaseDetail | undefined | null>(undefined)

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

  if (caseData === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1C3A64]" size={28} />
      </div>
    )
  }
  if (caseData === null) return <Navigate to="/class-actions" replace />

  // No Formstack form for this case → back to the detail page.
  if (caseData.formType !== 'formstack' || !caseData.formstackUrl) {
    return <Navigate to={`/class-actions/${caseData.slug}`} replace />
  }

  return (
    <>
      <PageHero
        title={caseData.title}
        italicTitle="Registration form"
        subtitle="Complete the form below to register as a group member. All information is private and confidential. Initial conversations are at no charge unless we are retained by you."
        breadcrumbs={[
          { label: 'Class Actions', to: '/class-actions' },
          { label: caseData.title, to: `/class-actions/${caseData.slug}` },
          { label: 'Register' },
        ]}
      />

      <section className="relative py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Optional eligibility / process intro above the form. */}
          {caseData.registerProcessHtml && (
            <ScrollReveal>
              <div
                className={[
                  'prose prose-slate max-w-none mb-12',
                  'prose-headings:text-[#1C3A64] prose-headings:font-medium',
                  'prose-h3:underline prose-h3:underline-offset-4 prose-h3:text-[16px]',
                  'prose-h4:text-[14px] prose-h4:uppercase prose-h4:tracking-wide',
                  'prose-p:text-[#555555] prose-p:leading-[1.75] prose-p:text-[14.5px]',
                  'prose-a:text-[#1C3A64] prose-a:font-medium',
                  'prose-strong:text-[#1C3A64]',
                  'prose-li:text-[#555555] prose-li:text-[14.5px]',
                  '[&_.pdf-button]:inline-flex [&_.pdf-button]:items-center [&_.pdf-button]:gap-3',
                  '[&_.pdf-button]:bg-white [&_.pdf-button]:border [&_.pdf-button]:border-[#1C3A64]/30',
                  '[&_.pdf-button]:hover:border-[#1C3A64]/60 [&_.pdf-button]:hover:bg-[#F4F6FB]',
                  '[&_.pdf-button]:text-[#1C3A64] [&_.pdf-button]:text-[13px] [&_.pdf-button]:font-medium',
                  '[&_.pdf-button]:px-5 [&_.pdf-button]:py-3 [&_.pdf-button]:rounded-md',
                  '[&_.pdf-button]:no-underline [&_.pdf-button]:my-3 [&_.pdf-button]:transition-colors',
                  '[&_.pdf-button_svg]:w-3.5 [&_.pdf-button_svg]:h-3.5 [&_.pdf-button_svg]:flex-shrink-0',
                  '[&_.pdf-li]:list-none [&_.pdf-li]:ml-0 [&_.pdf-li]:pl-0',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: buttonizePdfLinks(caseData.registerProcessHtml) }}
              />
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="rounded-2xl border border-[#1C3A64]/[0.1] bg-white overflow-hidden shadow-[0_1px_3px_rgba(28,58,100,0.05)]">
              <iframe
                src={caseData.formstackUrl}
                title={`${caseData.title} registration form`}
                loading="lazy"
                className="block w-full min-h-[1100px] border-0 bg-white"
              />
            </div>
          </ScrollReveal>

          <div className="mt-8">
            <Link
              to={`/class-actions/${caseData.slug}`}
              className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
            >
              <ArrowLeft size={14} />
              Back to case
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
