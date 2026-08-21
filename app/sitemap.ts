import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"

export const revalidate = 3600

export default async function sitemap(): MetadataRoute.Sitemap {
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

  const portfolioUrl = 'https://mutukujoshua.lumyn.co.ke'
  const externalSitemap: MetadataRoute.Sitemap = [
    {
      url: portfolioUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const [blogPosts, newsItems] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.news.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const dynamicSitemap: MetadataRoute.Sitemap = [
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...newsItems.map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [...staticSitemap, ...externalSitemap, ...dynamicSitemap]
}
