import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { prisma } from "@/lib/prisma"

const BASE_URL = 'https://mutukujoshua.lumyn.co.ke'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

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
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...newsItems.map((item) => ({
      url: `${BASE_URL}/news/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [...staticSitemap, ...dynamicSitemap]
}
