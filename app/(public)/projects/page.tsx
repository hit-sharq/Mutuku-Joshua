'use client'

import AnimatedSection from "@/components/AnimatedSection"
import PremiumButton from "@/components/PremiumButton"
import ProjectCard from "@/components/ProjectCard"
import Image from "next/image"
import Link from "next/link"
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

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

  if (loading) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.sectionTitle}>Loading Projects...</h1>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.sectionTitle}>My Projects</h1>
            <p className={styles.sectionSubtitle}>
              A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with modern technologies.
            </p>
          </div>
        </section>

        <div className={styles.errorState}>
          <div className={styles.errorCard}>
            <span className={styles.errorStateIcon}>⚠️</span>
            <h3>Unable to Load Projects</h3>
            <p>
              We're having trouble connecting to the database. This might be a temporary issue or a configuration problem.
            </p>
            <div className={styles.buttonGroup}>
              <button 
                onClick={() => window.location.reload()} 
                className="btn"
                style={{
                  padding: '12px 24px',
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              <PremiumButton href="/contact" variant="secondary">
                Contact Me
              </PremiumButton>
            </div>
          </div>
        </div>

        <section className={styles.techStackSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Technologies I Use</h2>
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
              <p className={styles.ctaText}>
                I'm always open to discussing new opportunities and interesting projects.
              </p>
              <PremiumButton href="/contact" className={styles.ctaButton}>
                Start a Conversation
              </PremiumButton>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.sectionTitle}>My Projects</h1>
            <p className={styles.sectionSubtitle}>
              A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with modern technologies.
            </p>
          </div>
        </section>

        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🚀</span>
          <h3>Projects Coming Soon</h3>
          <p>
            I am currently building my project portfolio. Check back soon to see my latest work!
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
            Project showcase will appear here once added through the admin panel.
          </p>
        </div>

        <section className={styles.techStackSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Technologies I Use</h2>
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
              <p className={styles.ctaText}>
                I'm always open to discussing new opportunities and interesting projects.
              </p>
              <PremiumButton href="/contact" className={styles.ctaButton}>
                Start a Conversation
              </PremiumButton>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection>
            <h1 className={styles.sectionTitle}>My Projects</h1>
            <p className={styles.sectionSubtitle}>
              A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with
              modern technologies and best practices.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className={styles.techStackSection}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Technologies I Use</h2>
            <p className={styles.sectionSubtitle}>
              A modern tech stack for building scalable, performant applications
            </p>
          </AnimatedSection>

          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB CTA */}
      <section className={styles.githubSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.githubCard}>
              <span className={styles.githubIcon}>🐙</span>
              <h2>Check Out My GitHub</h2>
              <p>Explore more of my projects, contributions, and open-source work on GitHub.</p>
              <PremiumButton 
                href="https://github.com/hit-sharq" 
                target="_blank" 
                rel="noopener noreferrer"
                size="lg"
              >
                Visit GitHub Profile
              </PremiumButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
              <p className={styles.ctaText}>
                I'm always open to discussing new opportunities and interesting projects.
              </p>
              <PremiumButton href="/contact" size="lg" className={styles.ctaButton}>
                Start a Conversation
              </PremiumButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
