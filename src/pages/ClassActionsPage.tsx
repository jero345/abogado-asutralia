import { PageHero } from '@/components/ui/PageHero'
import { ClassActions } from '@/components/sections/ClassActions'

export function ClassActionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Landmark Matters"
        title="Ten active actions."
        italicTitle="Six courts. One goal."
        subtitle="Representing real people against powerful institutions — securities, financial products, consumer, environmental and nuisance claims."
        breadcrumbs={[{ label: 'Class Actions' }]}
        backgroundImage="/img/hero-bg/class-actions.jpg"
      />
      <ClassActions />
    </>
  )
}
