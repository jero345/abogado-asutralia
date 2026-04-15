import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { AmandaBio } from '@/components/sections/AmandaBio'
import { Technology } from '@/components/sections/Technology'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Specialist boutique."
        italicTitle="Big-firm firepower."
        subtitle="Established February 2020 by Amanda Banton — today one of Australia's largest private litigation and insolvency practices."
        breadcrumbs={[{ label: 'About' }]}
        backgroundImage="/img/hero-bg/about.jpg"
      />
      <About />
      <AmandaBio />
      <Technology />
    </>
  )
}
