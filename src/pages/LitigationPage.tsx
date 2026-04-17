import { PageHero } from '@/components/ui/PageHero'
import { PracticeAreas } from '@/components/sections/PracticeAreas'
import { KeyLitigation } from '@/components/sections/KeyLitigation'

export function LitigationPage() {
  return (
    <>
      <PageHero
        eyebrow="Litigation"
        title="Key Practice Areas."
        italicTitle="Where intent meets strategy to shape outcomes."
        subtitle="Class actions, commercial litigation, insolvency and complex financial disputes — across every Australian court, up to and including the High Court."
        breadcrumbs={[{ label: 'Litigation' }]}
        backgroundImage="/img/hero-bg/litigation.jpg"
      />
      <PracticeAreas />
      <KeyLitigation />
    </>
  )
}
