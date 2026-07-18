import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lumyn.co.ke'

  const staticPages = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/services',
    '/practice-areas',
    '/team',
    '/gallery',
    '/news',
    '/privacy-policy',
    '/terms-of-use',
  ]

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  return staticSitemap
}
