import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import GalleryGrid from "@/components/GalleryGrid"
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site-config"

const TITLE = "Gallery"
const DESCRIPTION =
  "A visual gallery of web applications, mobile apps and digital products designed and built by Mutuku Joshua."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gallery`,
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
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
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

async function getGalleryImages() {
  return await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Gallery</h1>
        <p className="section-subtitle">
          A visual showcase of our achievements, awards, events, and milestones that reflect our commitment to
          excellence in legal practice.
        </p>

        <GalleryGrid images={images} />

        {images.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h3>Gallery Coming Soon</h3>
            <p>We are currently building our gallery. Check back soon to see our achievements and milestones.</p>
          </div>
        )}

        <div
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Celebrating Success Together</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.9" }}>
            Every achievement in our gallery represents a successful outcome for our clients. Let us help you achieve
            your legal goals.
          </p>
          <a href="/contact" className="cta-button">
            Start Your Success Story
          </a>
        </div>
      </div>
    </div>
  )
}
