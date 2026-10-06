import Link from 'next/link'
import { products } from '@/lib/products'
import { SectionHeading } from './section-heading'

export function ProductCatalog() {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-border bg-secondary/40 p-8">
        <h3 className="text-xl font-bold text-navy">Stay in the loop</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          No public products are listed yet. Contact us to ask about TinkrLabz products or share a problem you would like software to solve.
        </p>
        <Link href="/#contact" className="mt-6 inline-block font-semibold text-primary hover:underline">
          Ask about our products
        </Link>
      </div>
    )
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <li key={product.slug} className="rounded-2xl border border-border p-8">
          <h3 className="text-xl font-bold text-navy">{product.name}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{product.description}</p>
          <Link href={product.url} className="mt-6 inline-block font-semibold text-primary hover:underline">
            Explore {product.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function Products() {
  return (
    <section id="products" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Our Products" title="Ideas with intelligence built in." />
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          Our product direction brings AI and practical software together. Alongside client solutions, we explore tools that make everyday work simpler and more useful.
        </p>
        <div className="mt-10"><ProductCatalog /></div>
        <Link href="/products" className="mt-8 inline-block font-semibold text-primary hover:underline">
          Explore products
        </Link>
      </div>
    </section>
  )
}
