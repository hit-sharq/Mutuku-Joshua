"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ProjectType {
  id: string
  title: string
  description: string
  imageUrl: string
  technologies: string | null
  demoUrl: string | null
  githubUrl: string | null
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

interface ProjectCardProps {
  project: ProjectType
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
      <div className="card project-card-small">
        <div className="blog-card-image-wrapper">
          <Image
            src={project.imageUrl || "/placeholder.svg?height=150&width=200"}
            alt={project.title}
            width={200}
            height={150}
            className="blog-card-image"
          />
        </div>
        <div className="blog-card-content">
          {project.featured && (
            <span className="badge badge-success" style={{ marginBottom: "0.5rem" }}>
              Featured
            </span>
          )}
          <h3 className="blog-card-title">{project.title}</h3>
          <button 
            className="read-more-btn"
            onClick={handleOpen}
          >
            View Details
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
              src={project.imageUrl || "/placeholder.svg?height=300&width=600"}
              alt={project.title}
              width={600}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="slide-panel-text">
            <div className="blog-meta">{formatDate(project.createdAt)}</div>
            <h2 className="slide-panel-title">{project.title}</h2>

            {project.technologies && (
              <div className="project-tech-list">
                <strong>Technologies:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {project.technologies.split(",").map((tech: string, index: number) => (
                    <span key={index} className="tech-badge">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="slide-panel-body">
              <p>{project.description}</p>

              <div className="project-links-panel">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-card-small {
          padding: 0.75rem;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card-small:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .blog-card-image-wrapper {
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }

        .blog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card-small:hover .blog-card-image {
          transform: scale(1.05);
        }

        .blog-card-content {
          padding: 0.25rem;
        }

        .blog-card-title {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          color: var(--primary-color);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-btn {
          background: linear-gradient(135deg, var(--accent-color), #b8860b);
          color: white;
          border: none;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .read-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
        }

        .project-tech-list {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 8px;
        }

        .tech-badge {
          background: linear-gradient(135deg, var(--primary-color), #2d3748);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .project-links-panel {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
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
          background: white;
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
          background: rgba(255, 255, 255, 0.9);
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
          transition: background 0.2s ease;
        }

        .slide-panel-close:hover {
          background: white;
        }

        .slide-panel-image {
          width: 100%;
          aspect-ratio: 2/1;
          overflow: hidden;
        }

        .slide-panel-text {
          padding: 2rem;
        }

        .slide-panel-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
          line-height: 1.3;
        }

        .slide-panel-body {
          color: var(--text-color);
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

