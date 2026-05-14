"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminCard from "@/components/admin/AdminCard"
import AdminButton from "@/components/admin/AdminButton"
import AdminBadge from "@/components/admin/AdminBadge"

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team")
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id))
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
    }
  }

  if (loading) {
    return (
      <AdminPage>
        <AdminPageHeader title="Team Manager" />
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
        title="Team Manager"
        description="Manage your team members. Add profiles, photos, and positions."
        actions={
          <AdminButton href="/admin/team/new" variant="primary">
            + Add Team Member
          </AdminButton>
        }
      />

      <AdminCard>
        {members.length === 0 ? (
          <div className="admin-empty">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>👥</div>
            <h3>No Team Members Yet</h3>
            <p>Build your team page by adding your first team member.</p>
            <AdminButton href="/admin/team/new" variant="primary">
              Add First Team Member
            </AdminButton>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {members.map((member) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.25rem",
                  background: "var(--background)",
                  borderRadius: "12px",
                  border: "1px solid var(--admin-border-color)",
                  transition: "all 0.2s ease",
                }}
                className="team-member-card"
              >
                <div style={{ flexShrink: 0 }}>
                  <Image
                    src={member.image || "/placeholder.svg?height=80&width=80"}
                    alt={member.name}
                    width={80}
                    height={80}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--admin-border-color)",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      marginBottom: "0.25rem",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--primary)",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {member.title}
                  </p>
                  <p
                    style={{
                      color: "var(--admin-text-secondary)",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {member.bio}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <AdminButton
                      href={`/admin/team/edit/${member.id}`}
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
                        handleDelete(member.id)
                      }}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </AdminPage>
  )
}
