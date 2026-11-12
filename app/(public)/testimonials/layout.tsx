import type { Metadata } from "next"
import type React from "react"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, webPageSchema } from "@/lib/schema"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"

const TITLE = "Testimonials"
const DESCRIPTION =
  "What clients and collaborators say about working with Mutuku Joshua Mwendwa on web platforms, e-commerce builds and API projects."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/testimonials`,
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
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
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(TITLE, "/testimonials", DESCRIPTION),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
        ]}
      />
      {children}
    </>
  )
}