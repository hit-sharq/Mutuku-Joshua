"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface NewsItemType {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  image: string | null
  link: string | null
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

interface NewsCardProps {
  news: NewsItemType
}

export default function NewsCard({ news }: NewsCardProps) {
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
      <div className="card news-card-small">
        <div className="news-card-image-wrapper">
          <Image
            src={news.image || "/placeholder.svg?height=150&width=200"}
            alt={news.title}
            width={200}
            height={150}
            className="news-card-image"
          />
        </div>
        <div className="news-card-content">
          <div className="news-meta">{formatDate(news.createdAt)}</div>
          <h3 className="news-card-title">{news.title}</h3>
          {news.excerpt && (
            <p className="news-card-excerpt">{news.excerpt.substring(0, 80)}...</p>
          )}
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
          {news.image && (
            <div className="slide-panel-image">
              <Image
                src={news.image}
                alt={news.title}
                width={600}
                height={300}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          )}
          <div className="slide-panel-text">
            <div className="news-meta">{formatDate(news.createdAt)}</div>
            <h2 className="slide-panel-title">{news.title}</h2>
            <div className="slide-panel-body">
              {news.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
             {news.link && (
               <div style={{ marginTop: "2rem" }}>
                 <a 
                   href={news.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="read-more-btn"
                   style={{
                     display: 'inline-block',
                     padding: '0.5rem 1rem',
                     borderRadius: '6px',
                     fontSize: '0.875rem',
                     fontWeight: '600',
                     textDecoration: 'none',
                     background: 'var(--primary)',
                     color: 'var(--primary-foreground)',
                     transition: 'all 0.2s ease',
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-2px)';
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(109, 129, 150, 0.4)';
                   }}
                   onMouseOut={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}
                 >
                   View Project
                 </a>
               </div>
             )}
          </div>
        </div>
      </div>

      <style jsx>{`
         .news-card-small {
           padding: 0.75rem;
           cursor: pointer;
           transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
           background: var(--card);
           border: 1px solid var(--border);
           border-radius: 20px;
         }

         .news-card-small:hover {
           transform: translateY(-6px);
           border-color: rgba(109, 129, 150, 0.25);
           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
         }

         .news-card-image-wrapper {
           width: 100%;
           aspect-ratio: 4/3;
           overflow: hidden;
           border-radius: 12px;
           margin-bottom: 0.75rem;
         }

         .news-card-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
         }

         .news-card-small:hover .news-card-image {
           transform: scale(1.05);
         }

         .news-card-content {
           padding: 0.25rem;
         }

         .news-meta {
           font-size: 0.75rem;
           color: var(--muted-foreground);
           margin-bottom: 0.5rem;
           text-transform: uppercase;
           letter-spacing: 0.05em;
         }

         .news-card-title {
           font-size: 0.9rem;
           margin-bottom: 0.5rem;
           line-height: 1.3;
           color: var(--foreground);
           display: -webkit-box;
           -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
           overflow: hidden;
         }

         .news-card-excerpt {
           font-size: 0.875rem;
           color: var(--muted-foreground);
           margin-bottom: 0.75rem;
           line-height: 1.5;
         }

         .read-more-btn {
           background: var(--primary);
           color: var(--primary-foreground);
           border: none;
           padding: 0.4rem 0.75rem;
           border-radius: 6px;
           font-size: 0.75rem;
           font-weight: 600;
           cursor: pointer;
           transition: all 0.2s ease;
         }

         .read-more-btn:hover {
           transform: translateY(-2px);
           box-shadow: 0 4px 12px rgba(109, 129, 150, 0.4);
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
