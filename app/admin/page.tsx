import Link from "next/link"
import { prisma } from "@/lib/prisma"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminStatCard from "@/components/admin/AdminStatCard"
import AdminStatsGrid from "@/components/admin/AdminStatsGrid"
import AdminCard from "@/components/admin/AdminCard"
import AdminButton from "@/components/admin/AdminButton"

async function getAdminStats() {
  const stats = {
    blogCount: 0,
    newsCount: 0,
    teamCount: 0,
    galleryCount: 0,
    practiceAreaCount: 0,
    contactCount: 0,
    testimonialCount: 0,
  }

  try {
    const [blogCount, newsCount, teamCount, galleryCount, practiceAreaCount, contactCount, testimonialCount] = await Promise.all([
      prisma.blogPost.count().catch(() => 0),
      prisma.news.count().catch(() => 0),
      prisma.teamMember.count().catch(() => 0),
      prisma.galleryImage.count().catch(() => 0),
      prisma.practiceArea.count().catch(() => 0),
      prisma.contactRequest.count().catch(() => 0),
      prisma.testimonials.count().catch(() => 0),
    ])

    stats.blogCount = blogCount
    stats.newsCount = newsCount
    stats.teamCount = teamCount
    stats.galleryCount = galleryCount
    stats.practiceAreaCount = practiceAreaCount
    stats.contactCount = contactCount
    stats.testimonialCount = testimonialCount
  } catch (error) {
    console.error("Failed to fetch admin stats:", error)
  }

  return stats
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  const quickActions = [
    { href: "/admin/blog/new", label: "Create Blog Post", icon: "📝", variant: "primary" as const },
    { href: "/admin/news/new", label: "Add News Item", icon: "📰", variant: "primary" as const },
    { href: "/admin/team/new", label: "Add Team Member", icon: "👥", variant: "primary" as const },
    { href: "/admin/gallery/new", label: "Upload Image", icon: "🖼️", variant: "primary" as const },
    { href: "/admin/services/new", label: "Add Service", icon: "💻", variant: "primary" as const },
    { href: "/admin/testimonials/new", label: "Add Testimonial", icon: "💬", variant: "primary" as const },
    { href: "/admin/contact-requests", label: "Contact Requests", icon: "📧", variant: "secondary" as const },
    { href: "/admin/profile", label: "Settings", icon: "⚙️", variant: "secondary" as const },
  ]

  return (
    <AdminPage>
      <AdminPageHeader
        title="Dashboard"
        description="Welcome to your admin dashboard. Manage all aspects of your website from here."
      />

      <AdminStatsGrid>
        <AdminStatCard
          number={stats.blogCount}
          label="Blog Posts"
          icon="📝"
        />
        <AdminStatCard
          number={stats.newsCount}
          label="News Items"
          icon="📰"
        />
        <AdminStatCard
          number={stats.teamCount}
          label="Team Members"
          icon="👥"
        />
        <AdminStatCard
          number={stats.galleryCount}
          label="Gallery Images"
          icon="🖼️"
        />
        <AdminStatCard
          number={stats.practiceAreaCount}
          label="Services"
          icon="💻"
        />
        <AdminStatCard
          number={stats.contactCount}
          label="Contact Requests"
          icon="📧"
        />
        <AdminStatCard
          number={stats.testimonialCount}
          label="Testimonials"
          icon="💬"
        />
      </AdminStatsGrid>

      <AdminCard title="Quick Actions">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {quickActions.map((action) => (
            <AdminButton
              key={action.href}
              href={action.href}
              variant={action.variant}
              size="lg"
              style={{ textAlign: "center", padding: "1.25rem" }}
            >
              <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>
                {action.icon}
              </span>
              {action.label}
            </AdminButton>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Getting Started">
        <div
          style={{
            background: "rgba(184, 150, 12, 0.06)",
            padding: "1.5rem",
            borderRadius: "0",
            border: "0.5px solid var(--admin-border-color)",
          }}
        >
          <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>
            Welcome to your admin panel
          </h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "Add your services to showcase your technical expertise",
              "Upload team member profiles and photos",
              "Create engaging blog posts to share knowledge",
              "Add gallery images to showcase projects",
              "Monitor and respond to contact requests",
              "Customize your profile settings",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem 0",
                  borderBottom: index < 5 ? "1px solid var(--admin-border-color)" : "none",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--admin-success-bg)",
                    color: "var(--admin-success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: "var(--admin-text-secondary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AdminCard>
    </AdminPage>
  )
}