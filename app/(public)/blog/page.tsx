import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"
import BlogListingClient from "./BlogListingClient"

const TITLE = "Blog"
const DESCRIPTION =
  "Articles on programming, web development, technology trends and engineering practice by Mutuku Joshua, covering React, Next.js, Node.js, Django and building software that holds up in production."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: `${TITLE} | Mutuku Joshua`,
    description: DESCRIPTION,
    siteName: "Mutuku Joshua",
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
    title: `${TITLE} | Mutuku Joshua`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      summary: true,
      image: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return <BlogListingClient initialPosts={posts} />
}
