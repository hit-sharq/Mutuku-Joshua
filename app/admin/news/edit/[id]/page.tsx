"use client"

import type React from "react"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditNewsItem({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    link: "",
    published: false,
    featured: false,
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await fetch(`/api/admin/news/${unwrappedParams.id}`)
        if (response.ok) {
          const newsItem = await response.json()
          setFormData({
            title: newsItem.title,
            slug: newsItem.slug,
            content: newsItem.content,
            excerpt: newsItem.excerpt || "",
            link: newsItem.link || "",
            published: newsItem.published,
            featured: newsItem.featured,
            order: newsItem.order || 0,
          })
          setImageUrl(newsItem.image || "")
        } else {
          router.push("/admin/news")
        }
      } catch (error) {
        console.error("Error fetching news item:", error)
        router.push("/admin/news")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewsItem()
  }, [unwrappedParams.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
        const formData = new FormData()
        formData.append("file", image)

        const uploadResponse = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed")
        }

        const uploadData = await uploadResponse.json()
        finalImageUrl = uploadData.imageUrl
      }

      const response = await fetch(`/api/admin/news/${unwrappedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: finalImageUrl || null,
        }),
      })

      if (response.ok) {
        router.push("/admin/news")
      }
    } catch (error) {
      console.error("Error updating news item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">Edit News Item</h1>
        </div>
        <div className="card">
          <p>Loading news item...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit News Item</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
              placeholder="Enter news title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug" className="form-label">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              className="form-input"
              placeholder="url-friendly-slug"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="form-input"
              placeholder="Brief summary of the news"
            />
          </div>

          <div className="form-group">
            <label htmlFor="link" className="form-label">
              External Link (optional)
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
              className="form-input"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Featured Image
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "200px", borderRadius: "5px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              required
              className="form-textarea"
              placeholder="Write your news content here..."
              rows={10}
            />
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              />
              Publish immediately
            </label>
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              />
              Feature this news (shows prominently on home page)
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="order" className="form-label">
              Display Order (lower numbers appear first)
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="form-input"
              min="0"
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Updating..." : "Update News"}
            </button>
            <button type="button" onClick={() => router.back()} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
