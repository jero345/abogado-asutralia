import { PageHero } from '@/components/ui/PageHero'
import { PracticeAreas } from '@/components/sections/PracticeAreas'

export function LitigationPage() {
  return (
    <>
      <PageHero
        eyebrow="Litigation"
        title="Four specialisms."
        italicTitle="One relentless commitment."
        subtitle="Class actions, commercial litigation, insolvency and complex financial disputes — across every Australian court, up to and including the High Court."
        breadcrumbs={[{ label: 'Litigation' }]}
      />
      <PracticeAreas />
    </>
  )
}
