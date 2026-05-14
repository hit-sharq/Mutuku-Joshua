"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminCard from "@/components/admin/AdminCard"
import AdminButton from "@/components/admin/AdminButton"
import AdminTable from "@/components/admin/AdminTable"
import AdminBadge from "@/components/admin/AdminBadge"

interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id))
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (post: BlogPost) => (
        <div>
          <strong style={{ color: "var(--admin-text-primary)" }}>
            {post.title}
          </strong>
          {post.summary && (
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
              {post.summary}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (post: BlogPost) => (
        <AdminBadge variant={post.published ? "success" : "neutral"}>
          {post.published ? "Published" : "Draft"}
        </AdminBadge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (post: BlogPost) => (
        <span style={{ color: "var(--admin-text-secondary)" }}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (post: BlogPost) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <AdminButton
            href={`/admin/blog/edit/${post.id}`}
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
              handleDelete(post.id)
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
        <AdminPageHeader title="Blog Manager" />
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
        title="Blog Manager"
        description="Manage your blog posts. Create, edit, and publish content."
        actions={
          <AdminButton href="/admin/blog/new" variant="primary">
            + New Post
          </AdminButton>
        }
      />

      <AdminCard noPadding>
        <AdminTable
          columns={columns}
          data={posts}
          keyExtractor={(post) => post.id}
          emptyMessage="No blog posts yet. Create your first post to get started."
        />
      </AdminCard>
    </AdminPage>
  )
}
