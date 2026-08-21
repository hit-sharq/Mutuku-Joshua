import Image from "next/image"
import Link from "next/link"

interface NewsItemType {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  image: string | null
  link: string | null
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

interface NewsCardProps {
  news: NewsItemType
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Link href={`/news/${news.slug}`} className="card news-card-small">
      <div className="news-card-image-wrapper">
        <Image
          src={news.image || "/placeholder.svg?height=150&width=200"}
          alt={news.title}
          width={200}
          height={150}
          className="news-card-image"
        />
      </div>
      <div className="news-card-content">
        <div className="news-meta">{formatDate(news.createdAt)}</div>
        <h3 className="news-card-title">{news.title}</h3>
        {news.excerpt && (
          <p className="news-card-excerpt">{news.excerpt.substring(0, 80)}...</p>
        )}
        <span className="read-more-btn">Read More</span>
      </div>
    </Link>
  )
}
