import type { Metadata } from "next"
import type React from "react"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema"
import { faqs } from "@/lib/faqs"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"

const TITLE = "Frequently Asked Questions"
const DESCRIPTION =
  "Answers to common questions about hiring Mutuku Joshua: technologies he specialises in, project timelines, pricing, ongoing support, working with international clients and existing codebases."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
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

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(TITLE, "/faq", DESCRIPTION),
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      {children}
    </>
  )
}