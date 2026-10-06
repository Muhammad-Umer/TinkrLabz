import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/products', '/work', '/privacy', '/terms'].map(path => ({ url: `https://www.tinkrlabz.com${path || '/'}` }))
}
