"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminRichTextEditor from "@/components/admin/AdminRichTextEditor"

const EMOJI_OPTIONS = [
  "⚖️",
  "📝",
  "🏛️",
  "👨‍⚖️",
  "👩‍⚖️",
  "🔍",
  "📊",
  "📈",
  "🤝",
  "🏢",
  "🏠",
  "💼",
  "💰",
  "💵",
  "📋",
  "📁",
  "📂",
  "🗂️",
  "📑",
  "📄",
]

export default function NewPracticeArea() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "⚖️",
    order: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/practice-areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/practice-areas")
      }
    } catch (error) {
      console.error("Error creating practice area:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDescriptionChange = (html: string) => {
    setFormData((prev) => ({ ...prev, description: html }))
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Practice Area</h1>
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
              placeholder="E.g., Criminal Law, Family Law, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon" className="form-label">
              Icon
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon: emoji }))}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: formData.icon === emoji ? "0.5px solid var(--primary)" : "0.5px solid var(--admin-card-border)",
                    borderRadius: "0",
                    background: formData.icon === emoji ? "var(--admin-sidebar-hover)" : "transparent",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <AdminRichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe this practice area..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="order" className="form-label">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value) }))}
              className="form-input"
              placeholder="Lower numbers appear first"
            />
            <small style={{ color: "#666", marginTop: "0.5rem", display: "block" }}>
              Lower numbers will appear first on the practice areas page. Use this to control the order.
            </small>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Creating..." : "Add Practice Area"}
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
