import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, blogPostingSchema } from "@/lib/schema"
import { SITE_NAME, truncate } from "@/lib/site-config"

export const dynamic = "force-dynamic"

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

export async function getBlogPost(slug: string): Promise<BlogPostType | null> {
  return await prisma.blogPost.findUnique({
    where: {
      slug,
      published: true,
    },
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) {
    return { title: "Blog Post Not Found", robots: { index: false, follow: false } }
  }

  const description = truncate(post.summary || post.content)
  const path = `/blog/${post.slug}`

  return {
    title: post.title,
    description,
    keywords: [
      "Mutuku Joshua",
      "web development blog",
      "React",
      "Next.js",
      "Node.js",
      "software engineering",
      "Kenya",
    ],
    alternates: { canonical: path },
    authors: [{ name: SITE_NAME, url: "/" }],
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description,
      siteName: SITE_NAME,
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      images: [
        {
          url: post.image || "/og-image.png",
          width: post.image ? 1200 : 1200,
          height: post.image ? 630 : 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image || "/og-image.png"],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const description = truncate(post.summary || post.content)
  const path = `/blog/${post.slug}`

  return (
    <div className="section">
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.title,
            description,
            path,
            image: post.image,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
        ]}
      />
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/blog" className="btn btn-secondary" style={{ marginBottom: "2rem" }}>
            ← Back to Blog
          </Link>

          <article>
            <header style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                  color: "#1a365d",
                  lineHeight: "1.2",
                }}
              >
                {post.title}
              </h1>

              <div
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                }}
              >
                Published on{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {post.image && (
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    marginBottom: "2rem",
                  }}
                />
              )}
            </header>

            <div
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "1.5rem" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <div
            style={{
              background: "#f7fafc",
              padding: "2rem",
              borderRadius: "10px",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#1a365d", marginBottom: "1rem" }}>Have a Project in Mind?</h3>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
              If you have questions about this topic or want to collaborate on a project, don't hesitate to reach out.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Let's Collaborate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

