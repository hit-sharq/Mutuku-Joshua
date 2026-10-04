import type { Metadata } from "next"
import type React from "react"
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site-config"

const TITLE = "Projects"
const DESCRIPTION =
  "Selected work by Mutuku Joshua: production web platforms, e-commerce systems, SaaS dashboards and APIs built with React, Next.js, Node.js, Django and PostgreSQL."

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/projects`,
    title: `${TITLE} | Mutuku Joshua`,
    description: DESCRIPTION,
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
    title: `${TITLE} | Mutuku Joshua`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}