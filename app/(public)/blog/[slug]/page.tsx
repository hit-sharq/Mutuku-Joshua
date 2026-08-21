import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ShareButton from "@/components/ShareButton"
import BlogCard from "@/components/BlogCard"
import AnimatedSection from "@/components/AnimatedSection"
import styles from "../blog.module.css"
import detailStyles from "../blog-detail.module.css"

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

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPostType[]> {
  const current = await getBlogPost(slug)
  if (!current) return []

  return await prisma.blogPost.findMany({
    where: {
      published: true,
      slug: { not: slug },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
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
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: 'Blog Post Not Found' }
  return {
    title: `${post.title} - Mutuku Joshua | Lumyn Technologies`,
    description: post.summary || post.content.slice(0, 160).replace(/<[^>]*>/g, ''),
    keywords: 'Blog, Web Development, React, Next.js, Node.js, Tutorials, Lumyn Technologies',
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://www.lumyn.co.ke/blog/${slug}`,
      title: post.title,
      description: post.summary || post.content.slice(0, 160).replace(/<[^>]*>/g, ''),
      siteName: 'Lumyn Technologies',
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
  const relatedPosts = await getRelatedPosts(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className={detailStyles.blogDetailCard}>
            <div className={detailStyles.blogDetailImageWrapper}>
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className={detailStyles.blogDetailImage}
                />
              )}
            </div>

            <div className={detailStyles.blogDetailBody}>
              <h1 className={detailStyles.blogDetailTitle}>{post.title}</h1>
              <div className={detailStyles.blogDetailMeta}>
                Published on{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className={detailStyles.blogDetailContent}>
                {post.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={detailStyles.blogDetailActions}>
              <Link href="/blog" className={detailStyles.backLink}>
                ← Back to Blog
              </Link>
              <ShareButton post={{ title: post.title, slug: post.slug, summary: post.summary }} />
            </div>
          </div>

          <div
            style={{
              background: "var(--ink2, #1c1c1c)",
              border: "0.5px solid rgba(184, 150, 12, 0.15)",
              padding: "2rem",
              borderRadius: "0",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "var(--cream, #faf7f2)", marginBottom: "1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400 }}>
              Have a Project in Mind?
            </h3>
            <p style={{ marginBottom: "2rem", color: "var(--muted-foreground)" }}>
              If you have questions about this topic or want to collaborate on a project, don't hesitate to reach out.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Let's Collaborate
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <div style={{ marginTop: "4rem" }}>
              <AnimatedSection>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 400,
                    color: "var(--cream, #faf7f2)",
                    marginBottom: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  You May Also Be Interested In
                </h2>
                <p
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "center",
                    marginBottom: "2.5rem",
                    fontSize: "1rem",
                  }}
                >
                  Continue exploring more insights and tutorials.
                </p>
              </AnimatedSection>

              <div className={styles.blogGrid}>
                {relatedPosts.map((relatedPost, index) => (
                  <AnimatedSection key={relatedPost.id} delay={index * 0.1}>
                    <BlogCard post={relatedPost} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

