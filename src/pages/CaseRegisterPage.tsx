import { useParams, Navigate, Link } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CaseRegistrationForm } from '@/components/ui/CaseRegistrationForm'
import { ArrowLeft, Mail, MapPin } from 'lucide-react'
import { getCaseBySlug } from '@/data/caseDetails'

export function CaseRegisterPage() {
  const { slug } = useParams<{ slug: string }>()
  const caseData = slug ? getCaseBySlug(slug) : undefined

  if (!caseData) return <Navigate to="/class-actions" replace />

  return (
    <>
      <PageHero
        eyebrow="Register your interest"
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
          <ScrollReveal>
            {/* Alternative submission methods */}
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
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
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
