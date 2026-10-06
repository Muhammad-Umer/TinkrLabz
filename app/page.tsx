import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Services } from '@/components/site/services'
import { Process } from '@/components/site/process'
import { Cta } from '@/components/site/cta'
import { Contact } from '@/components/site/contact'
import { SiteFooter } from '@/components/site/site-footer'

import { Technologies } from '@/components/site/technologies'

export const metadata = { alternates: { canonical: '/' }, openGraph: { url: 'https://www.tinkrlabz.com/' } }

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'TinkrLabz', url: 'https://www.tinkrlabz.com/', logo: 'https://www.tinkrlabz.com/images/logo-mark.png', contactPoint: { '@type': 'ContactPoint', email: 'hello@tinkrlabz.com', contactType: 'sales' } }) }} />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Technologies />
        <Cta />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
