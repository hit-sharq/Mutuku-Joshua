import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, webPageSchema } from "@/lib/schema"
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_URL,
} from "@/lib/site-config"
import HomeClient, {
  type BlogPost,
  type NewsItem,
  type Project,
} from "./HomeClient"

export const revalidate = 300

export const metadata: Metadata = {
  title: {
    absolute: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default async function HomePage() {
  let projects: Project[] = []
  let blogPosts: BlogPost[] = []
  let newsItems: NewsItem[] = []
  let projectCount = 0
  let hasServerData = false

  try {
    const [projectRows, blogRows, newsRows, projectTotal] = await Promise.all([
      prisma.project.findMany({
        take: 3,
        orderBy: [{ featured: "desc" }, { order: "asc" }],
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.news.findMany({
        where: { published: true },
        take: 3,
        orderBy: [{ featured: "desc" }, { order: "asc" }],
      }),
      prisma.project.count(),
    ])

    projects = projectRows as unknown as Project[]
    blogPosts = blogRows as unknown as BlogPost[]
    newsItems = newsRows as unknown as NewsItem[]
    projectCount = projectTotal
    hasServerData = true
  } catch (error) {
    // The client component falls back to fetching from the API routes.
    console.error("Error fetching homepage data:", error)
  }

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            DEFAULT_TITLE,
            "/",
            DEFAULT_DESCRIPTION,
          ),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <HomeClient
        initialProjects={projects}
        initialBlogPosts={blogPosts}
        initialNewsItems={newsItems}
        initialProjectCount={projectCount}
        hasServerData={hasServerData}
      />
    </>
  )
}