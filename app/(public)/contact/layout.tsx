import type { Metadata } from "next"
import type React from "react"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema"
import { OG_IMAGE, PERSON, SITE_URL } from "@/lib/site-config"

const TITLE = "Contact"
const DESCRIPTION = `Get in touch with ${PERSON.name}, a fullstack developer in ${PERSON.city}, ${PERSON.country}. Available for freelance, contract and full-time web development work. Email ${PERSON.email} or call ${PERSON.phone}.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: `${TITLE} | ${PERSON.name}`,
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
    title: `${TITLE} | ${PERSON.name}`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={[
          contactPageSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      {children}
    </>
  )
}