import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CaseRegistrationForm } from '@/components/ui/CaseRegistrationForm'
import { ArrowLeft, Loader2, Mail, MapPin } from 'lucide-react'
import type { CaseDetail } from '@/data/caseDetails'
import { fetchCaseDetailBySlug } from '@/lib/classActions'
import { buttonizePdfLinks } from '@/lib/caseBody'

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
          {/* Registration-process intro (eligibility, what info we need,
              institutional investors, privacy note). Only renders when the
              admin has filled out register_process_html for this case. */}
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
                  // PDF links (e.g. the Fitch "Product List") render as outlined
                  // buttons, matching the case detail page.
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
            {/* Alternative submission methods — only shown when no
                register_process_html (otherwise the process HTML already
                covers email + post details). */}
            {!caseData.registerProcessHtml && (
              <div className="mb-10 p-6 bg-[#F4F6FB] border border-[#1C3A64]/10 rounded-2xl">
                <h3 className="text-[#1C3A64] text-[14px] font-medium tracking-wide uppercase mb-4">
                  Other ways to register
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-[14px]">
                  {caseData.email && (
                    <a
                      href={`mailto:${caseData.email}`}
                      className="flex items-start gap-3 text-[#1C3A64] hover:opacity-75 transition-opacity"
                    >
                      <Mail size={14} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[#888888] text-[11px] uppercase tracking-[0.12em] mb-1">
                          Email
                        </div>
                        <div className="font-medium">{caseData.email}</div>
                      </div>
                    </a>
                  )}
                  <div className="flex items-start gap-3 text-[#555555]">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#1C3A64]" />
                    <div>
                      <div className="text-[#888888] text-[11px] uppercase tracking-[0.12em] mb-1">
                        Post
                      </div>
                      <div>
                        Banton Group<br />
                        Level 12, 60 Martin Place<br />
                        Sydney NSW 2000
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[#555555] text-[13px] leading-[1.6] mt-5 pt-5 border-t border-[#1C3A64]/10">
                  If you are an agent or trustee of a claimant, you may complete the registration
                  (online or in hard copy) on the claimant's behalf.
                </p>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-[#1C3A64] text-[14px] font-medium tracking-[0.15em] uppercase mb-6">
              Registration Form
            </h2>
            <CaseRegistrationForm caseData={caseData} />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 pt-8 border-t border-[#1C3A64]/10">
              <Link
                to={`/class-actions/${caseData.slug}`}
                className="inline-flex items-center gap-2 text-[#1C3A64] text-[13px] font-medium hover:underline"
              >
                <ArrowLeft size={14} />
                Back to {caseData.title}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
