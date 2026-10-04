import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AnimatedSection from "@/components/AnimatedSection"
import PremiumButton from "@/components/PremiumButton"
import ContentRenderer from "@/components/public/ContentRenderer"
import type { Metadata } from "next"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, webPageSchema } from "@/lib/schema"
import { SITE_NAME, truncate } from "@/lib/site-config"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    return { title: "Project Not Found", robots: { index: false, follow: false } }
  }

  const description = truncate(project.description)
  const path = `/projects/${project.id}`

  return {
    title: project.title,
    description,
    keywords: [
      project.title,
      "portfolio project",
      "web development",
      ...(project.technologies?.split(",").map((t) => t.trim()) || []),
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: project.title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: project.imageUrl || "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.imageUrl || "/og-image.png"],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    notFound()
  }

  const technologies = project.technologies?.split(",").map(t => t.trim()).filter(Boolean) || []

  const description = truncate(project.description)
  const path = `/projects/${project.id}`

  return (
    <div className="section">
      <JsonLd
        data={[
          webPageSchema(project.title, path, description),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path },
          ]),
        ]}
      />
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
              <ContentRenderer content={project.description} />

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
