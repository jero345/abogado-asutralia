import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { AmandaBio } from '@/components/sections/AmandaBio'
import { Innovation } from '@/components/sections/Innovation'

export function AboutPage() {
  return (
    <>
      <PageHero
        title="Specialist boutique,"
        italicTitle="Big-firm firepower."
        redCallout=""
        subtitle=" A private litigation and insolvency practice built for high-stakes matters."
        breadcrumbs={[{ label: 'About Us' }]}
        backgroundImage="/img/hero-bg/about.jpg"
      />
      <About />
      <Innovation />
      <AmandaBio />
    </>
  )
}
