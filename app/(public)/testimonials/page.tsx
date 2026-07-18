'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import styles from './testimonials.module.css'

interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string
  content: string
  rating: number
  image?: string
  featured: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setTestimonials(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const displayTestimonials = filter === 'featured' ? testimonials.filter(t => t.featured) : testimonials

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : 'rgba(240, 232, 212, 0.2)' }}>★</span>
    ))
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.header}>
            <div className={styles.eyebrow}>TESTIMONIALS</div>
            <h1 className={styles.title}>What Clients<br />& Collaborators Say</h1>
            <p className={styles.subtitle}>
              Real feedback from real projects. Every partnership teaches something new.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({testimonials.length})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'featured' ? styles.active : ''}`}
              onClick={() => setFilter('featured')}
            >
              Featured ({testimonials.filter(t => t.featured).length})
            </button>
          </div>
        </AnimatedSection>

        {isLoading ? (
          <div className={styles.loading}>Loading testimonials...</div>
        ) : displayTestimonials.length === 0 ? (
          <div className={styles.empty}>
            <p>No testimonials yet. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {displayTestimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 0.05}>
                <div className={`${styles.card} ${testimonial.featured ? styles.featured : ''}`}>
                  {testimonial.featured && (
                    <div className={styles.featuredBadge}>Featured</div>
                  )}
                  <div className={styles.stars}>{renderStars(testimonial.rating)}</div>
                  <blockquote className={styles.quote}>
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className={styles.author}>
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.clientName}
                        className={styles.avatar}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {testimonial.clientName ? testimonial.clientName.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                    <div>
                      <div className={styles.name}>{testimonial.clientName || "Anonymous"}</div>
                      {testimonial.clientTitle && (
                        <div className={styles.title}>{testimonial.clientTitle}</div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection delay={0.3}>
          <div className={styles.cta}>
            <h2>Work with me?</h2>
            <p>Let&apos;s build something great together.</p>
            <a href="/contact" className={styles.ctaBtn}>Start a Project →</a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
