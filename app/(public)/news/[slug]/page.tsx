import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { notFound, permanentRedirect } from "next/navigation"
import AnimatedSection from "@/components/AnimatedSection"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, newsArticleSchema } from "@/lib/schema"
import { SITE_NAME, truncate } from "@/lib/site-config"

export const dynamic = "force-dynamic"

/**
 * Legacy `/news/<id>` URLs resolve here too: cuid ids no longer match a slug,
 * so they are permanently redirected to the canonical slug URL.
 */
async function getNews(slug: string) {
  const bySlug = await prisma.news.findUnique({
    where: { slug, published: true },
  })
  if (bySlug) return bySlug

  const byId = await prisma.news.findFirst({
    where: { id: slug, published: true },
    select: { slug: true },
  })
  if (byId) permanentRedirect(`/news/${byId.slug}`)

  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const news = await prisma.news.findUnique({
    where: { slug, published: true },
  })

  if (!news) {
    return { title: "News Not Found", robots: { index: false, follow: false } }
  }

  const description = truncate(news.excerpt || news.content)
  const path = `/news/${news.slug}`

  return {
    title: news.title,
    description,
    keywords: [
      "Mutuku Joshua",
      "Lumyn Technologies",
      "announcement",
      "web development Kenya",
      "digital agency news",
    ],
    alternates: { canonical: path },
    authors: [{ name: SITE_NAME, url: "/" }],
    openGraph: {
      type: "article",
      url: path,
      title: news.title,
      description,
      siteName: SITE_NAME,
      publishedTime: new Date(news.createdAt).toISOString(),
      modifiedTime: new Date(news.updatedAt).toISOString(),
      images: [
        {
          url: news.image || "/og-image.png",
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [news.image || "/og-image.png"],
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const news = await getNews(slug)

  if (!news) {
    notFound()
  }

  const description = truncate(news.excerpt || news.content)
  const path = `/news/${news.slug}`

  return (
    <div className="section">
      <JsonLd
        data={[
          newsArticleSchema({
            title: news.title,
            description,
            path,
            image: news.image,
            createdAt: news.createdAt,
            updatedAt: news.updatedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "News", path: "/news" },
            { name: news.title, path },
          ]),
        ]}
      />
      <div className="container">
        <AnimatedSection>
          <Link href="/news" className="btn btn-secondary" style={{ marginBottom: "2rem", display: "inline-block" }}>
            ← Back to News
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <article style={{ maxWidth: "800px", margin: "0 auto" }}>
            <header style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                  color: "#1a365d",
                  lineHeight: "1.2",
                }}
              >
                {news.title}
              </h1>
              <div
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                }}
              >
                {new Date(news.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {news.image && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "2rem", overflow: "hidden" }}>
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </header>
            <div
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#333",
                whiteSpace: "pre-wrap",
              }}
            >
              {news.content}
            </div>
            {news.link && (
              <div style={{ marginTop: "2rem" }}>
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: "inline-block" }}
                >
                  Read More
                </a>
              </div>
            )}
          </article>
        </AnimatedSection>
      </div>
    </div>
  )
}
