import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import ProjectCard from "@/components/ProjectCard"
import "./projects.css"

type ProjectType = {
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

async function getProjects(): Promise<{ projects: ProjectType[]; error: boolean }> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    })
    return { projects, error: false }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { projects: [], error: true }
  }
}

export default async function ProjectsPage() {
  const { projects, error } = await getProjects()

  // Error state - database connection failed
  if (error) {
    return (
      <div className="section projects-page">
        <div className="container">
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 className="section-title">My Projects</h1>
            <p className="section-subtitle">
              A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with
              modern technologies and best practices.
            </p>
          </div>

          {/* Error State */}
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", border: "2px solid #fc8181", background: "#fff5f5" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
            <h3 style={{ color: "#c53030", marginBottom: "1rem" }}>Unable to Load Projects</h3>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              We're having trouble connecting to the database. This might be a temporary issue or a configuration problem.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Try Again
              </button>
              <Link href="/contact" className="btn btn-secondary">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Tech Stack Summary */}
          <section style={{ marginBottom: "5rem", marginTop: "4rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
                color: "white",
                padding: "3rem 2rem",
                borderRadius: "15px",
              }}
            >
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Technologies I Use</h2>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {[
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
                ].map((tech, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    <span>{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GitHub Section */}
          <section style={{ marginBottom: "4rem" }}>
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐙</div>
              <h2 style={{ color: "#1a365d", marginBottom: "1rem" }}>Check Out My GitHub</h2>
              <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
                Explore more of my projects, contributions, and open-source work on GitHub.
              </p>
              <a
                href="https://github.com/hit-sharq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit GitHub Profile
              </a>
            </div>
          </section>

          {/* CTA Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
              color: "white",
              padding: "3rem 2rem",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Have a Project in Mind?</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <Link href="/contact" className="cta-button" style={{ background: "white", color: "#38a169" }}>
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Empty state - no projects in database
  if (projects.length === 0) {
    return (
      <div className="section projects-page">
        <div className="container">
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 className="section-title">My Projects</h1>
            <p className="section-subtitle">
              A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with
              modern technologies and best practices.
            </p>
          </div>

          {/* Empty State */}
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
            <h3>Projects Coming Soon</h3>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              I am currently building my project portfolio. Check back soon to see my latest work!
            </p>
            <p style={{ color: "#999", fontSize: "0.9rem" }}>
              Project showcase will appear here once added through the admin panel.
            </p>
          </div>

          {/* Tech Stack Summary */}
          <section style={{ marginBottom: "5rem", marginTop: "4rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
                color: "white",
                padding: "3rem 2rem",
                borderRadius: "15px",
              }}
            >
              <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Technologies I Use</h2>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {[
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
                ].map((tech, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    <span>{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GitHub Section */}
          <section style={{ marginBottom: "4rem" }}>
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐙</div>
              <h2 style={{ color: "#1a365d", marginBottom: "1rem" }}>Check Out My GitHub</h2>
              <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
                Explore more of my projects, contributions, and open-source work on GitHub.
              </p>
              <a
                href="https://github.com/hit-sharq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit GitHub Profile
              </a>
            </div>
          </section>

          {/* CTA Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
              color: "white",
              padding: "3rem 2rem",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Have a Project in Mind?</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <Link href="/contact" className="cta-button" style={{ background: "white", color: "#38a169" }}>
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Normal state - projects loaded successfully
  return (
    <div className="section projects-page">
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="section-title">My Projects</h1>
          <p className="section-subtitle">
            A showcase of my fullstack development work, featuring web applications, APIs, and digital solutions built with
            modern technologies and best practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="project-cards-grid">
          {projects.map((project: ProjectType) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Tech Stack Summary */}
        <section style={{ marginBottom: "5rem", marginTop: "4rem" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
              color: "white",
              padding: "3rem 2rem",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Technologies I Use</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              {[
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
              ].map((tech, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section style={{ marginBottom: "4rem" }}>
          <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐙</div>
            <h2 style={{ color: "#1a365d", marginBottom: "1rem" }}>Check Out My GitHub</h2>
            <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Explore more of my projects, contributions, and open-source work on GitHub.
            </p>
            <a
              href="https://github.com/hit-sharq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit GitHub Profile
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Have a Project in Mind?</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <Link href="/contact" className="cta-button" style={{ background: "white", color: "#38a169" }}>
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  )
}

