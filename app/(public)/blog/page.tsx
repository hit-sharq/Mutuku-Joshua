import { prisma } from "@/lib/prisma"
import BlogListingClient from "./BlogListingClient"

export const metadata = {
  title: 'Blog - Mutuku Joshua | Lumyn Technologies',
  description: 'Articles on programming, web development, technology trends, and coding best practices by Mutuku Joshua.',
  keywords: 'Blog, Web Development, React, Next.js, Node.js, Tutorials, Lumyn Technologies, Programming',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.lumyn.co.ke/blog',
    title: 'Blog - Mutuku Joshua',
    description: 'Articles on programming, web development, technology trends, and coding best practices.',
    siteName: 'Lumyn Technologies',
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
