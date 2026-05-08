import { prisma } from "@/lib/prisma"
import NewsCard from "@/components/NewsCard"

type NewsItemType = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  image: string | null
  link: string | null
  featured: boolean
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

async function getNewsItems(): Promise<NewsItemType[]> {
  return await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export const dynamic = "force-dynamic"

export default async function NewsPage() {
  const newsItems = await getNewsItems()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">News & Updates</h1>
        <p className="section-subtitle">
          Stay updated with my latest projects, achievements, and professional news.
        </p>

        <div className="blog-cards-grid">
          {newsItems.map((news: NewsItemType) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {newsItems.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>No news yet</h3>
            <p>Check back soon for updates on my latest projects and achievements.</p>
          </div>
        )}
      </div>
    </div>
  )
}
