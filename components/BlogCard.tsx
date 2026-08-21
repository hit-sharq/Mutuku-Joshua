import Image from "next/image"
import Link from "next/link"

interface BlogPostType {
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

interface BlogCardProps {
  post: BlogPostType
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Link href={`/blog/${post.slug}`} className="card blog-card-small blog-card">
      <div className="blog-card-image-wrapper">
        <Image
          src={post.image || "/placeholder.svg?height=150&width=200"}
          alt={post.title}
          width={200}
          height={150}
          className="blog-card-image"
        />
      </div>
      <div className="blog-card-content">
        <div className="blog-meta">{formatDate(post.createdAt)}</div>
        <h3 className="blog-card-title">{post.title}</h3>
        {post.summary && (
          <p className="blog-card-excerpt">{post.summary}</p>
        )}
        <span className="read-more-btn">Read More</span>
      </div>
    </Link>
  )
}
