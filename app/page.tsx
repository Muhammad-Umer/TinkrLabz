import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { Services } from '@/components/site/services'
import { Process } from '@/components/site/process'
import { Cta } from '@/components/site/cta'
import { Contact } from '@/components/site/contact'
import { SiteFooter } from '@/components/site/site-footer'

import { AiCapabilities } from '@/components/site/ai-capabilities'
import { Products } from '@/components/site/products'
import { Technologies } from '@/components/site/technologies'

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'TinkrLabz | AI Products & Software Engineering',
    description:
      'AI products, intelligent automation, and software engineering for real business problems.',
    type: 'website' as const,
    siteName: 'TinkrLabz',
    url: 'https://www.tinkrlabz.com/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'TinkrLabz',
            url: 'https://www.tinkrlabz.com/',
            logo: 'https://www.tinkrlabz.com/images/logo-mark.png',
            contactPoint: {
              '@type': 'ContactPoint',
              url: 'https://www.tinkrlabz.com/#contact',
              contactType: 'sales',
            },
          }),
        }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <AiCapabilities />
        <Products />
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
