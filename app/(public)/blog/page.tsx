import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import BlogCard from "@/components/BlogCard"

type BlogPostType = {
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

async function getBlogPosts(): Promise<BlogPostType[]> {
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Tech Blog</h1>
        <p className="section-subtitle">
          Stay updated with my latest articles on programming, web development, technology trends, and coding best practices.
        </p>

        <div className="blog-cards-grid">
          {posts.map((post: BlogPostType) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Blog Posts Coming Soon</h3>
            <p>I'm currently working on my first tech articles. Check back soon for programming tutorials and insights.</p>
          </div>
        )}

        <div
          style={{
            background: "#f7fafc",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Stay Updated</h3>
          <p style={{ marginBottom: "2rem", color: "#666" }}>
            Subscribe to my newsletter to receive the latest tech articles and coding tips directly in your inbox.
          </p>
          <a href="/contact" className="btn btn-primary">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
