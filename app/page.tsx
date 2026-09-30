import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { About } from '@/components/site/about'
import { Services } from '@/components/site/services'
import { Process } from '@/components/site/process'
import { Cta } from '@/components/site/cta'
import { Contact } from '@/components/site/contact'
import { SiteFooter } from '@/components/site/site-footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Cta />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
