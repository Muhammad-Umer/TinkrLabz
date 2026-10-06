import { ContentPage } from '@/components/site/content-page'
import { ProductCatalog } from '@/components/site/products'

export const metadata = {
  title: 'Software Products | TinkrLabz',
  description: 'Explore TinkrLabz software products and ask about solutions for your business.',
  twitter: { card: 'summary_large_image', title: 'Software Products | TinkrLabz', description: 'Software products created by TinkrLabz to solve real problems.', images: ['/opengraph-image'] },
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Software Products | TinkrLabz',
    description: 'Software products created by TinkrLabz to solve real problems.',
    url: 'https://www.tinkrlabz.com/products',
    type: 'website',
    siteName: 'TinkrLabz',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function ProductsPage() {
  return (
    <ContentPage title="Our products">
      <p>AI and practical software. Ask TinkrBot what is next.</p>
      <ProductCatalog />
    </ContentPage>
  )
}
