import { PageHero } from '@/components/ui/PageHero'
import { Team } from '@/components/sections/Team'

export function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Accomplished litigators,"
        italicTitle="united by one mission."
        subtitle="Specialists across partners, senior associates and associates — recognised by Chambers Asia-Pacific and Legal 500."
        breadcrumbs={[{ label: 'Team' }]}
        backgroundImage="/img/hero-bg/team.jpg"
      />
      <Team />
    </>
  )
}
