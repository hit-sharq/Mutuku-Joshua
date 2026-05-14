"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminCard from "@/components/admin/AdminCard"
import AdminButton from "@/components/admin/AdminButton"
import AdminTable from "@/components/admin/AdminTable"
import AdminBadge from "@/components/admin/AdminBadge"

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

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (item: NewsItem) => (
        <div>
          <strong style={{ color: "var(--admin-text-primary)" }}>
            {item.title}
          </strong>
          {item.excerpt && (
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--admin-text-muted)",
                marginTop: "0.25rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.excerpt}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: NewsItem) => (
        <AdminBadge variant={item.published ? "success" : "neutral"}>
          {item.published ? "Published" : "Draft"}
        </AdminBadge>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      render: (item: NewsItem) => (
        item.featured ? (
          <span style={{ color: "var(--primary)" }}>⭐ Yes</span>
        ) : (
          <span style={{ color: "var(--admin-text-muted)" }}>No</span>
        )
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (item: NewsItem) => (
        <span style={{ color: "var(--admin-text-secondary)" }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: NewsItem) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <AdminButton
            href={`/admin/news/edit/${item.id}`}
            variant="secondary"
            size="sm"
          >
            Edit
          </AdminButton>
          <AdminButton
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              handleDelete(item.id)
            }}
          >
            Delete
          </AdminButton>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <AdminPage>
        <AdminPageHeader title="News Manager" />
        <AdminCard>
          <div className="admin-loading">
            <div className="spinner" />
          </div>
        </AdminCard>
      </AdminPage>
    )
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="News Manager"
        description="Manage news articles and announcements."
        actions={
          <AdminButton href="/admin/news/new" variant="primary">
            + Add News
          </AdminButton>
        }
      />

      <AdminCard noPadding>
        <AdminTable
          columns={columns}
          data={newsItems}
          keyExtractor={(item) => item.id}
          emptyMessage="No news items yet. Add your first news article to get started."
        />
      </AdminCard>
    </AdminPage>
  )
}
