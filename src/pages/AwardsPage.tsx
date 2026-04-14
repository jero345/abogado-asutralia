import { PageHero } from '@/components/ui/PageHero'
import { Awards } from '@/components/sections/Awards'

export function AwardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Awards & Recognition"
        title="The work speaks."
        italicTitle="The rankings confirm it."
        subtitle="Chambers Asia-Pacific · Legal 500 · Australasian Law Awards — across every year since our founding."
        breadcrumbs={[{ label: 'Awards' }]}
      />
      <Awards />
    </>
  )
}
