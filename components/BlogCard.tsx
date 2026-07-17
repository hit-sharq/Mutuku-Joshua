"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface BlogPostType {
  id: string
  title: string
  slug: string
  content: string
  summary: string | null
  image: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

interface BlogCardProps {
  post: BlogPostType
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
  }

  return (
    <>
      <div className="card blog-card-small">
        <div className="blog-card-image-wrapper">
          <Image
            src={post.image || "/placeholder.svg?height=150&width=200"}
            alt={post.title}
            width={200}
            height={150}
            className="blog-card-image"
          />
        </div>
        <div className="blog-card-content">
          <div className="blog-meta">{formatDate(post.createdAt)}</div>
          <h3 className="blog-card-title">{post.title}</h3>
          <button 
            className="read-more-btn"
            onClick={handleOpen}
          >
            Read More
          </button>
        </div>
      </div>

      {/* Slide-out Panel */}
      <div 
        className={`slide-panel ${isOpen ? "open" : ""}`}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="slide-panel-overlay" onClick={handleClose} />
        <div className="slide-panel-content">
          <button 
            className="slide-panel-close"
            onClick={handleClose}
          >
            <X size={24} />
          </button>
          <div className="slide-panel-image">
            <Image
              src={post.image || "/placeholder.svg?height=300&width=600"}
              alt={post.title}
              width={600}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="slide-panel-text">
            <div className="blog-meta">{formatDate(post.createdAt)}</div>
            <h2 className="slide-panel-title">{post.title}</h2>
            <div className="slide-panel-body">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
         .blog-card-small {
           padding: 0.75rem;
           cursor: pointer;
           transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
           background: var(--card);
           border: 1px solid var(--border);
           border-radius: 20px;
         }

         .blog-card-small:hover {
           transform: translateY(-6px);
           border-color: rgba(109, 129, 150, 0.25);
           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
         }

         .blog-card-image-wrapper {
           width: 100%;
           aspect-ratio: 4/3;
           overflow: hidden;
           border-radius: 12px;
           margin-bottom: 0.75rem;
         }

         .blog-card-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
         }

         .blog-card-small:hover .blog-card-image {
           transform: scale(1.05);
         }

         .blog-card-content {
           padding: 0.25rem;
         }

         .blog-meta {
           font-size: 0.75rem;
           color: var(--muted-foreground);
           margin-bottom: 0.5rem;
           text-transform: uppercase;
           letter-spacing: 0.05em;
         }

          .blog-card-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.15rem;
            margin-bottom: 0.75rem;
            line-height: 1.3;
            color: var(--foreground);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .read-more-btn {
            background: var(--primary);
            color: var(--primary-foreground);
            border: none;
            padding: 0.4rem 0.75rem;
            border-radius: 6px;
            font-size: 0.625rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .read-more-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(184, 150, 12, 0.4);
          }

         /* Slide Panel Styles */
         .slide-panel {
           position: fixed;
           top: 0;
           right: 0;
           width: 100%;
           height: 100vh;
           z-index: 9999;
         }

         .slide-panel.open {
           display: block !important;
         }

         .slide-panel-overlay {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: rgba(0, 0, 0, 0.6);
           backdrop-filter: blur(4px);
         }

         .slide-panel-content {
           position: absolute;
           top: 0;
           right: 0;
           width: 100%;
           max-width: 500px;
           height: 100%;
           background: var(--card);
           border-left: 1px solid var(--border);
           box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
           transform: translateX(100%);
           transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           overflow-y: auto;
         }

         .slide-panel.open .slide-panel-content {
           transform: translateX(0);
         }

         .slide-panel-close {
           position: absolute;
           top: 1rem;
           right: 1rem;
           background: var(--secondary);
           border: none;
           border-radius: 50%;
           width: 44px;
           height: 44px;
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
           z-index: 10;
           transition: all 0.2s ease;
           color: var(--foreground);
         }

         .slide-panel-close:hover {
           background: var(--border);
           transform: scale(1.05);
         }

         .slide-panel-image {
           width: 100%;
           aspect-ratio: 2/1;
           overflow: hidden;
         }

         .slide-panel-text {
           padding: 2rem;
           background: var(--background);
         }

         .slide-panel-title {
           font-size: 1.5rem;
           margin-bottom: 1.5rem;
           color: var(--foreground);
           line-height: 1.3;
         }

         .slide-panel-body {
           color: var(--muted-foreground);
           line-height: 1.8;
         }

         .slide-panel-body p {
           margin-bottom: 1rem;
         }

         @media (max-width: 640px) {
           .slide-panel-content {
             max-width: 100%;
           }

           .slide-panel-text {
             padding: 1.5rem;
           }

           .slide-panel-title {
             font-size: 1.25rem;
           }
         }
       `}</style>
    </>
  )
}

