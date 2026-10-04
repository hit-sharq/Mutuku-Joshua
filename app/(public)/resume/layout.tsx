import type { Metadata } from "next"
import type React from "react"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"

const TITLE = "Resume"
const DESCRIPTION =
  "Professional resume of Mutuku Joshua, fullstack developer in Nairobi, Kenya. Experience, technical skills across React, Next.js, Node.js, Django, Laravel and PostgreSQL, and a record of shipped projects."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/resume`,
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

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}