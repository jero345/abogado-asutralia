import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { AmandaBio } from '@/components/sections/AmandaBio'
import { Innovation } from '@/components/sections/Innovation'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="A private litigation and insolvency practice"
        italicTitle="built for high-stakes matters."
        subtitle="Today, Banton Group is one of Australia's most formidable private litigation and insolvency practices."
        breadcrumbs={[{ label: 'About Us' }]}
        backgroundImage="/img/hero-bg/about.jpg"
      />
      <About />
      <Innovation />
      <AmandaBio />
    </>
  )
}
