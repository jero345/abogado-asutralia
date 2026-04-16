import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { AmandaQuote } from '@/components/sections/AmandaQuote'
import { AmandaBio } from '@/components/sections/AmandaBio'
import { Innovation } from '@/components/sections/Innovation'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Established in 2020."
        italicTitle="One of Australia's most formidable practices."
        subtitle="Today, Banton Group is one of Australia's most formidable private litigation and insolvency practices."
        breadcrumbs={[{ label: 'About' }]}
        backgroundImage="/img/hero-bg/about.jpg"
      />
      <AmandaQuote />
      <About />
      <AmandaBio />
      <Innovation />
    </>
  )
}
