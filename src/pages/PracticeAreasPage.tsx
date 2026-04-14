import { PageHero } from '@/components/ui/PageHero'
import { PracticeAreas } from '@/components/sections/PracticeAreas'

export function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Four specialisms."
        italicTitle="One relentless commitment."
        subtitle="Class actions, commercial litigation, insolvency and complex financial disputes — across every Australian court, up to and including the High Court."
        breadcrumbs={[{ label: 'Practice Areas' }]}
      />
      <PracticeAreas />
    </>
  )
}
