import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AnimatedSection from "@/components/AnimatedSection"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findUnique({
    where: { slug: params.slug },
  })

  if (!news) {
    return { title: 'News Not Found' }
  }

  return {
    title: `${news.title} - News | Mutuku Joshua`,
    description: news.excerpt || news.content.slice(0, 160),
    keywords: 'News, Updates, Announcements, Fullstack Developer, Lumyn Technologies',
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://www.lumyn.co.ke/news/${params.slug}`,
      title: news.title,
      description: news.excerpt || news.content.slice(0, 160),
      siteName: 'Lumyn Technologies',
    },
  }
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findUnique({
    where: { slug: params.slug },
  })

  if (!news) {
    notFound()
  }

  return (
    <div className="section">
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
