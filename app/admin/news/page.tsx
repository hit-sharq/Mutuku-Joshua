"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function NewsManager() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/admin/news")
      if (response.ok) {
        const data = await response.json()
        setNewsItems(data)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return

    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setNewsItems(newsItems.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error("Error deleting news:", error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="admin-header">
          <h1 className="admin-title">News Manager</h1>
        </div>
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">News Manager</h1>
        <Link href="/admin/news/new" className="btn btn-primary">
          Add News
        </Link>
      </div>

      <div className="card">
        {newsItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h3>No news items yet</h3>
            <p>Add your first news item to get started.</p>
            <Link href="/admin/news/new" className="btn btn-primary">
              Add First News
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.title}</strong>
                    {item.excerpt && (
                      <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.25rem" }}>
                        {item.excerpt.substring(0, 100)}...
                      </div>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "3px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background: item.published ? "#c6f6d5" : "#fed7d7",
                        color: item.published ? "#276749" : "#c53030",
                      }}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    {item.featured ? "⭐ Yes" : "No"}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/news/edit/${item.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
