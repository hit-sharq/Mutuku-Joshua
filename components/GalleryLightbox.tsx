"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface GalleryImage {
  id: string
  imageUrl: string | null
  title: string
  description: string | null
}

interface GalleryLightboxProps {
  images: GalleryImage[]
  isOpen: boolean
  initialIndex: number
  onClose: () => void
}

export default function GalleryLightbox({ images, isOpen, initialIndex, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") goToPrev()
    if (e.key === "ArrowRight") goToNext()
  }, [isOpen])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!isOpen || !images[currentIndex]) return null

  const current = images[currentIndex]
  const imageUrl = current.imageUrl?.includes("res.cloudinary.com")
    ? current.imageUrl.replace("/upload/", "/upload/w_1200,h_900,c_fit/")
    : current.imageUrl || "/placeholder.svg"

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>×</button>
      <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goToPrev() }}>‹</button>
      <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goToNext() }}>›</button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-wrapper">
          <Image
            src={imageUrl}
            alt={current.title}
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="lightbox-info">
          <h3>{current.title}</h3>
          {current.description && <p>{current.description}</p>}
          <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>
        </div>
      </div>
    </div>
  )
}
