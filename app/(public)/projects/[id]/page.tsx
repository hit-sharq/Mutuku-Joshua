import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AnimatedSection from "@/components/AnimatedSection"
import PremiumButton from "@/components/PremiumButton"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} - Projects | Mutuku Joshua`,
    description: project.description.slice(0, 160),
    keywords: 'Projects, Web Development, Portfolio, Lumyn Technologies',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://www.lumyn.co.ke/projects/${params.id}`,
      title: project.title,
      description: project.description.slice(0, 160),
      siteName: 'Lumyn Technologies',
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  if (!project) {
    notFound()
  }

  const technologies = project.technologies?.split(",").map(t => t.trim()).filter(Boolean) || []

  return (
    <div className="section">
      <div className="container">
        <AnimatedSection>
          <Link href="/projects" className="btn btn-secondary" style={{ marginBottom: "2rem", display: "inline-block" }}>
            ← Back to Projects
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ marginBottom: "3rem" }}>
              {project.imageUrl && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "2rem", overflow: "hidden" }}>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1a365d", lineHeight: "1.2" }}>
                {project.title}
              </h1>
              <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                {project.description}
              </p>

              {technologies.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "0.375rem 0.75rem",
                        background: "#1a365d",
                        color: "white",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {project.demoUrl && (
                  <PremiumButton href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    View Live Demo
                  </PremiumButton>
                )}
                {project.githubUrl && (
                  <PremiumButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                    View Source
                  </PremiumButton>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
