"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProjectCard from "@/components/ProjectCard"

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
  const router = useRouter()

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
      <div>
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Projects</h1>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>
              Manage your portfolio projects. Add projects with screenshots, descriptions, and links.
            </p>
          </div>
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
        <div>
          <h1 className="admin-title">Projects</h1>
          <p style={{ color: "#666", marginTop: "0.5rem" }}>
            Manage your portfolio projects. Add projects with screenshots, descriptions, and links.
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary">
          + Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
          <h3>No Projects Yet</h3>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            Start building your portfolio by adding your first project.
          </p>
          <Link href="/admin/projects/new" className="btn btn-primary">
            Add Your First Project
          </Link>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="project-cards-grid">
              {projects.map((project) => (
                <div key={project.id} style={{ position: "relative" }}>
                  <ProjectCard project={project} />
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                      padding: "0 0.75rem",
                    }}
                  >
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-danger btn-sm"
                      style={{ flex: 1 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="card" style={{ marginTop: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Project Overview</h3>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
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
          </div>
        </>
      )}
    </div>
  )
}

