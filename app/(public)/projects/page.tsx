import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"
import ProjectsListingClient from "./ProjectsListingClient"
import JsonLd from "@/components/JsonLd"
import { itemListSchema } from "@/lib/schema"

const TITLE = "Projects"
const DESCRIPTION =
  "Portfolio of selected projects by Mutuku Joshua Mwendwa: web applications, mobile apps, APIs, and digital products built with React, Next.js, Node.js, Django, and PostgreSQL."

export const revalidate = 0

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/projects`,
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
    description: DESCRIPTION,
    siteName: "Mutuku Joshua Mwendwa",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

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

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      technologies: true,
      demoUrl: true,
      githubUrl: true,
      featured: true,
      order: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const projectItems = projects.map((p) => ({
    name: p.title,
    path: `/projects/${p.id}`,
  }))

  return (
    <>
      <JsonLd data={itemListSchema("Portfolio Projects", "/projects", projectItems)} />
      <ProjectsListingClient initialProjects={projects} />
    </>
  )
}