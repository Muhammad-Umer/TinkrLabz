import Link from 'next/link'
import { products } from '@/lib/products'
import { SectionHeading } from './section-heading'

export function ProductCatalog() {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-border bg-secondary/40 p-8">
        <h3 className="text-xl font-bold text-navy">Practical by design.</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Useful AI. Simpler workflows. Tools with a clear purpose.
        </p>
        <a
          href="/?topic=Ask%20about%20a%20TinkrLabz%20product#contact"
          className="mt-5 inline-block font-semibold text-primary hover:underline"
        >
          Discuss a product idea
        </a>
      </div>
    )
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug} className="rounded-2xl border border-border p-8">
          <h3 className="text-xl font-bold text-navy">{product.name}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{product.description}</p>
          <Link
            href={product.url}
            className="mt-6 inline-block font-semibold text-primary hover:underline"
          >
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
        <SectionHeading eyebrow="The Product Lab" title="From possibility to product." />
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          Our product approach starts with a real problem and a simpler way to solve it.
        </p>
        <div className="mt-10">
          <ProductCatalog />
        </div>
      </div>
    </section>
  )
}
