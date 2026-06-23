import { PageHero } from '@/components/ui/PageHero'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <PageHero
        title="Your case starts"
        italicTitle="with a conversation."
        subtitle="All consultations are private and confidential. Tell us about your matter and we will assess whether we can assist. Initial conversations are at no charge. If you choose to retain us, our fees will be discussed and agreed with you."
        breadcrumbs={[{ label: 'Contact' }]}
      />
      <Contact />
    </>
  )
}
