import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"
import { SITE_URL } from "@/lib/site-config"

export const revalidate = 3600

type Entry = {
  path: string
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const staticPages: Entry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/practice-areas', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/resume', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  type Content = {
    blog: { slug: string; updatedAt: Date }[]
    news: { slug: string; updatedAt: Date }[]
    projects: { id: string; updatedAt: Date }[]
  }

  let content: Content = { blog: [], news: [], projects: [] }

  try {
    const [blog, news, projects] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.news.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.project.findMany({
        select: { id: true, updatedAt: true },
        orderBy: { order: 'asc' },
      }),
    ])
    content = { blog, news, projects }
  } catch (error) {
    // Still serve the static routes so a database blip cannot drop the whole
    // sitemap and deindex the site.
    console.error('Error building dynamic sitemap entries:', error)
  }

  const { blog: blogPosts, news: newsItems, projects } = content

  // Static routes carry the newest content date so crawlers see real
  // freshness instead of a `new Date()` value that changes on every revalidation.
  const newestContentDate =
    [blogPosts[0]?.updatedAt, newsItems[0]?.updatedAt, projects[0]?.updatedAt]
      .filter(Boolean)
      .reduce<Date | null>(
        (latest, date) => (!latest || date! > latest ? date : latest),
        null,
      ) ?? new Date()

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: newestContentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const dynamicSitemap: MetadataRoute.Sitemap = [
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...newsItems.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticSitemap, ...dynamicSitemap]
}