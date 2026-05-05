"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewGalleryImage() {
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

  const uploadImageToServer = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      alert("Please select an image")
      return
    }

    setIsSubmitting(true)

    try {
      const uploadedImageUrl = await uploadImageToServer(image)

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: uploadedImageUrl,
        }),
      })

      if (response.ok) {
        router.push("/admin/gallery")
      }
    } catch (error) {
      console.error("Error creating gallery image:", error)
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

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Project</h1>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          Add your projects to showcase your work. Include technologies used, demo URL, and GitHub link.
        </p>
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
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
              className="form-textarea"
              placeholder="Describe your project"
              rows={4}
            />
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
              placeholder="React, Node.js, PostgreSQL (comma-separated)"
            />
            <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
              Enter technologies separated by commas
            </small>
          </div>

          <div className="grid grid-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="demoUrl" className="form-label">
                Live Demo URL
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
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                className="form-input"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                style={{ width: "auto", margin: 0 }}
              />
              Feature this project (will appear in the featured section)
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Project Screenshot *
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              required
            />
            {imageUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview"
                style={{ marginTop: "1rem", maxWidth: "300px", borderRadius: "5px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="order" className="form-label">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value) || 0 }))}
              className="form-input"
              placeholder="Lower numbers appear first"
            />
            <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
              Lower numbers will appear first. Use this to control the order of projects.
            </small>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Uploading..." : "Add Project"}
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

