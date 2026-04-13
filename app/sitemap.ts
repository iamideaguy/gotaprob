import { MetadataRoute } from 'next'
import { getAllSlugs, getAllCategories } from '@/lib/problems'

const BASE = 'https://www.gotaprob.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs()
  const categories = getAllCategories()

  const staticPages = [
    { url: BASE, priority: 1.0 },
    { url: `${BASE}/browse`, priority: 0.9 },
    { url: `${BASE}/categories`, priority: 0.8 },
    { url: `${BASE}/research-guide`, priority: 0.7 },
    { url: `${BASE}/about`, priority: 0.5 },
    { url: `${BASE}/submit`, priority: 0.5 },
    { url: `${BASE}/advertise`, priority: 0.4 },
    { url: `${BASE}/contact`, priority: 0.4 },
    { url: `${BASE}/privacy`, priority: 0.3 },
    { url: `${BASE}/terms`, priority: 0.3 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  const problemPages = slugs.map(slug => ({
    url: `${BASE}/problems/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryPages = categories.map(({ name }) => ({
    url: `${BASE}/categories/${name.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...problemPages, ...categoryPages]
}
