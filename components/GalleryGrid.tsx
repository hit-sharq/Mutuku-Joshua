"use client"

import Image from "next/image"
import React, { useState } from "react"
import GalleryLightbox from "./GalleryLightbox"

interface GalleryImage {
  id: string
  imageUrl: string | null
  title: string
  description: string | null
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div
        className="gallery-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {images.map((image, index) => {
          const imageUrl = image.imageUrl?.includes("res.cloudinary.com")
            ? image.imageUrl.replace("/upload/", "/upload/w_300,h_240,c_fit/")
            : image.imageUrl || "/placeholder.svg"
          return (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.5rem",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#c8a820"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <Image
                src={imageUrl}
                alt={image.title}
                width={300}
                height={240}
                style={{ objectFit: "contain", borderRadius: "8px" }}
                className="gallery-image"
              />
              <div
                className="gallery-overlay"
                style={{ textAlign: "center", marginTop: "0.5rem" }}
              >
                <h4 style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  {image.title}
                </h4>
                {image.description && (
                  <p style={{ fontSize: "0.8rem" }}>{image.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <GalleryLightbox
        images={images}
        isOpen={lightboxOpen}
        initialIndex={selectedIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
