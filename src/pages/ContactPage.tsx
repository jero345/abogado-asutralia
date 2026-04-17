import { PageHero } from '@/components/ui/PageHero'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Your case starts"
        italicTitle="with a conversation."
        subtitle="All consultations are private and confidential. Tell us about your matter and we will assess whether we can help. Initial conversations are at no charge unless we are retained by you."
        breadcrumbs={[{ label: 'Contact' }]}
        backgroundImage="/img/hero-bg/contact.jpg"
      />
      <Contact />
    </>
  )
}
