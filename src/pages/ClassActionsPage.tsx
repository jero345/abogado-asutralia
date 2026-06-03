import { PageHero } from '@/components/ui/PageHero'
import { ClassActions } from '@/components/sections/ClassActions'

export function ClassActionsPage() {
  return (
    <>
      <PageHero
        title="Active actions."
        italicTitle="International reach. One goal."
        subtitle="Representing individuals, groups and businesses in complex claims against powerful institutions, major corporations and global organisations."
        breadcrumbs={[{ label: 'Class Actions' }]}
        backgroundImage="/img/hero-bg/class-actions.jpg"
      />
      <ClassActions />
    </>
  )
}
