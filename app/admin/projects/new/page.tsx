"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminRichTextEditor from "@/components/admin/AdminRichTextEditor"

export default function NewProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    demoUrl: "",
    githubUrl: "",
    featured: false,
    order: 0,
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadImageToApi = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Image upload failed")
    }

    const data = await response.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let finalImageUrl = imageUrl

      if (image) {
        finalImageUrl = await uploadImageToApi(image)
      }

      if (!finalImageUrl) {
        alert("Please upload a project image")
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl,
          technologies: formData.technologies,
        }),
      })

      if (response.ok) {
        router.push("/admin/projects")
      }
    } catch (error) {
      console.error("Error creating project:", error)
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

  const handleDescriptionChange = (html: string) => {
    setFormData((prev) => ({ ...prev, description: html }))
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Project</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
              placeholder="Enter project title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <AdminRichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe your project..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Project Image *
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="form-input" required />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "300px", borderRadius: "5px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="technologies" className="form-label">
              Technologies Used
            </label>
            <input
              type="text"
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
              className="form-input"
              placeholder="React, Node.js, PostgreSQL (comma separated)"
            />
            <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
              Enter technologies separated by commas
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="demoUrl" className="form-label">
                Demo URL
              </label>
              <input
                type="url"
                id="demoUrl"
                value={formData.demoUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                className="form-input"
                placeholder="https://your-project-demo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubUrl" className="form-label">
                GitHub URL
              </label>
              <input
                type="url"
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                className="form-input"
                placeholder="https://github.com/your-project"
              />
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="order" className="form-label">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="form-input"
                placeholder="0"
                min="0"
              />
              <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                Lower numbers appear first
              </p>
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem" }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                />
                Mark as Featured Project
              </label>
              <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                Featured projects appear prominently on the page
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Creating..." : "Create Project"}
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

