import { PageHero } from '@/components/ui/PageHero'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Two offices."
        italicTitle="One conversation away."
        subtitle="Initial consultations are confidential and obligation-free. Sydney HQ at 60 Martin Place — Melbourne at 140 William Street."
        breadcrumbs={[{ label: 'Contact' }]}
      />
      <Contact />
    </>
  )
}
