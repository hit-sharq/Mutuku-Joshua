'use client'

import PremiumButton from "@/components/PremiumButton"
import { useEffect, useState } from "react"
import styles from "./projects.module.css"

type Project = {
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

const FILTERS = ["ALL", "WEB APP", "MOBILE", "UI/UX", "API"] as const
type Filter = (typeof FILTERS)[number]

function categorize(p: Project): Filter[] {
  const t = (p.technologies || "").toLowerCase()
  const cats: Filter[] = ["ALL"]
  if (t.includes("react native") || t.includes("mobile") || t.includes("flutter")) cats.push("MOBILE")
  if (t.includes("ui") || t.includes("figma") || t.includes("design")) cats.push("UI/UX")
  if (t.includes("api") || t.includes("node") || t.includes("django") || t.includes("laravel")) cats.push("API")
  if (t.includes("next") || t.includes("web") || p.demoUrl) cats.push("WEB APP")
  return cats
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [active, setActive] = useState<Filter>("ALL")

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        if (data.projects) {
          setProjects(data.projects)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const techStack = [
    { icon: "⚛️", name: "React/Next.js" },
    { icon: "🟢", name: "Node.js" },
    { icon: "🐍", name: "Python" },
    { icon: "📘", name: "TypeScript" },
    { icon: "🗄️", name: "PostgreSQL" },
    { icon: "🍃", name: "MongoDB" },
    { icon: "🐳", name: "Docker" },
    { icon: "☁️", name: "AWS" },
    { icon: "🎨", name: "Tailwind CSS" },
    { icon: "🔷", name: "Prisma" },
  ]

  const visible = active === "ALL" ? projects : projects.filter((p) => categorize(p).includes(active))

  if (loading) {
    return (
      <div className={styles.page}>
      <section className={styles.workHeader}>
        <div className={styles.secEyebrow}>CURATED WORK</div>
        <div className={styles.secTitle}>Work that moved the needle</div>
        <div className={styles.workPills}>
          {FILTERS.map((f) => (
            <button key={f} className={`${styles.wpill} ${f === "ALL" ? styles.on : ""}`}>{f}</button>
          ))}
        </div>
      </section>
        <div className={styles.workGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonText} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || projects.length === 0) {
    return (
      <div className={styles.page}>
        <section className={styles.workHeader}>
          <div className={styles.secEyebrow}>SELECTED WORK</div>
          <div className={styles.secTitle}>Projects that shipped</div>
        </section>

        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🚀</span>
          <h3>{error ? "System offline" : "Engagements loading"}</h3>
          <p>
            {error
              ? "Database connection interrupted. Retry when ready."
              : "New work is being catalogued. Check back soon."}
          </p>
          <div className={styles.buttonGroup}>
            {error && (
              <button onClick={() => window.location.reload()} className="btn btn-primary">
                Try Again
              </button>
            )}
            <PremiumButton href="/contact" variant="secondary">Contact Me</PremiumButton>
          </div>
        </div>

        <section className={styles.techStackSection}>
          <div className="container">
            <h2 className={styles.secTitle}>Technologies I Use</h2>
            <div className={styles.techGrid}>
              {techStack.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.githubSection}>
          <div className="container">
            <div className={styles.githubCard}>
              <span className={styles.githubIcon}>🐙</span>
              <h2>Check Out My GitHub</h2>
              <p>Explore more of my projects, contributions, and open-source work on GitHub.</p>
              <PremiumButton href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer">
                Visit GitHub Profile
              </PremiumButton>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
              <p className={styles.ctaText}>I'm always open to discussing new opportunities and interesting projects.</p>
              <PremiumButton href="/contact" size="lg" className={styles.ctaButton}>Initiate Engagement</PremiumButton>
            </div>
          </div>
        </section>
      </div>
    )
  }

    return (
      <div className={styles.page}>
        <section className={styles.workHeader}>
          <div className={styles.secEyebrow}>CURATED WORK</div>
          <div className={styles.secTitle}>Work that moved the needle</div>
        <div className={styles.workPills}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.wpill} ${active === f ? styles.on : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.workGrid}>
        {visible.map((project, index) => (
          <div key={project.id} className={styles.proj}>
            <div className={styles.projNum}>{String(index + 1).padStart(2, "0")}</div>
            <div className={styles.projTags}>
              {categorize(project).filter((c) => c !== "ALL").slice(0, 2).map((c) => (
                <span key={c} className={styles.ptag}>{c}</span>
              ))}
            </div>
            <div className={styles.projName}>{project.title}</div>
            <div className={styles.projDesc}>{project.description}</div>
            {project.technologies && (
              <div className={styles.projStack}>
                {project.technologies.split(",").map((tech, i) => (
                  <span key={i} className={styles.pstk}>{tech.trim()}</span>
                ))}
              </div>
            )}
            <div className={styles.projLink}>↗</div>
            <div className={styles.projLinks}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.projBtn}>
                  Live Demo →
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.projBtn} ${styles.projBtnGhost}`}>
                  Source →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className={styles.techStackSection}>
        <div className="container">
          <h2 className={styles.secTitle}>Tools of the Trade</h2>
          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <div key={index} className={styles.techItem}>
                <span className={styles.techIcon}>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.githubSection}>
        <div className="container">
          <div className={styles.githubCard}>
            <span className={styles.githubIcon}>⌥</span>
            <h2>Open Source Footprint</h2>
            <p>Explore contributions, experiments, and production-grade work on GitHub.</p>
            <PremiumButton href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer">
              Inspect Repository
            </PremiumButton>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
            <p className={styles.ctaText}>I&apos;m always open to discussing new opportunities and interesting projects.</p>
            <PremiumButton href="/contact" size="lg" className={styles.ctaButton}>Start a Conversation</PremiumButton>
          </div>
        </div>
      </section>
    </div>
  )
}
