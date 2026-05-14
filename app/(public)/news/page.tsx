'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import NewsCard from '@/components/NewsCard'
import PremiumButton from '@/components/PremiumButton'
import styles from './news.module.css'

type NewsItem = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  image: string | null
  link: string | null
  featured: boolean
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const POSTS_PER_PAGE = 6

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news?limit=100')
        const data = await res.json()
        if (data.news) {
          setNewsItems(data.news)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const totalPages = Math.ceil(newsItems.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentItems = newsItems.slice(startIndex, startIndex + POSTS_PER_PAGE)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>Loading news...</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection>
            <h1 className={styles.sectionTitle}>News & Updates</h1>
            <p className={styles.sectionSubtitle}>
              Stay updated with my latest projects, achievements, and professional news.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* NEWS CONTENT */}
      <section className={styles.section}>
        <div className={styles.container}>
          {newsItems.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyStateIcon}>📰</span>
              <h3>No News Yet</h3>
              <p>Check back soon for updates on my latest projects and achievements.</p>
            </div>
          ) : (
            <>
              {/* News Items Grid */}
              <div className={styles.newsGrid}>
                {currentItems.map((item, index) => (
                  <AnimatedSection key={item.id} delay={index * 0.05}>
                    <NewsCard news={item} />
                  </AnimatedSection>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={currentPage === page ? styles.active : ''}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      {newsItems.length > 0 && (
        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterCta}>
              <h3>Stay Updated</h3>
              <p>Subscribe to my newsletter to receive the latest news and updates directly in your inbox.</p>
              <PremiumButton href="/contact" size="lg">
                Get in Touch
              </PremiumButton>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
