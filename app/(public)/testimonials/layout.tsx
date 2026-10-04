import type { Metadata } from "next"
import type React from "react"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"

const TITLE = "Testimonials"
const DESCRIPTION =
  "What clients and collaborators say about working with Mutuku Joshua on web platforms, e-commerce builds and API projects."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/testimonials`,
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

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}