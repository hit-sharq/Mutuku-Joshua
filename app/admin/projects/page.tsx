"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminCard from "@/components/admin/AdminCard"
import AdminButton from "@/components/admin/AdminButton"
import AdminBadge from "@/components/admin/AdminBadge"

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  technologies: string | null
  demoUrl: string | null
  githubUrl: string | null
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProjects(projects.filter((project) => project.id !== id))
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  if (loading) {
    return (
      <AdminPage>
        <AdminPageHeader
          title="Projects"
          description="Manage your portfolio projects. Add projects with screenshots, descriptions, and links."
        />
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
        title="Projects"
        description="Manage your portfolio projects. Add projects with screenshots, descriptions, and links."
        actions={
          <AdminButton href="/admin/projects/new" variant="primary">
            + Add New Project
          </AdminButton>
        }
      />

      {projects.length === 0 ? (
        <AdminCard>
          <div className="admin-empty">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
            <h3>No Projects Yet</h3>
            <p>Start building your portfolio by adding your first project.</p>
            <AdminButton href="/admin/projects/new" variant="primary">
              Add Your First Project
            </AdminButton>
          </div>
        </AdminCard>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {projects.map((project) => (
              <AdminCard key={project.id}>
                <div style={{ position: "relative" }}>
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  />
                  {project.featured && (
                    <AdminBadge
                      variant="warning"
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                      }}
                    >
                      Featured
                    </AdminBadge>
                  )}
                  <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--admin-text-secondary)",
                      marginBottom: "1rem",
                      fontSize: "0.9375rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {project.technologies.split(",").map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "0.25rem 0.75rem",
                            background: "var(--secondary)",
                            borderRadius: "9999px",
                            fontSize: "0.8125rem",
                            color: "var(--admin-text-secondary)",
                          }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <AdminButton
                      href={`/admin/projects/edit/${project.id}`}
                      variant="secondary"
                      size="sm"
                      style={{ flex: 1 }}
                    >
                      Edit
                    </AdminButton>
                    <AdminButton
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        handleDelete(project.id)
                      }}
                      style={{ flex: 1 }}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>

          <AdminCard title="Project Overview">
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong>Total Projects:</strong> {projects.length}
              </div>
              <div>
                <strong>Featured:</strong> {projects.filter((p) => p.featured).length}
              </div>
              <div>
                <strong>With Demo URL:</strong> {projects.filter((p) => p.demoUrl).length}
              </div>
              <div>
                <strong>With GitHub:</strong> {projects.filter((p) => p.githubUrl).length}
              </div>
            </div>
          </AdminCard>
        </>
      )}
    </AdminPage>
  )
}

