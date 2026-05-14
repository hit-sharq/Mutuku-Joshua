'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import BlogCard from '@/components/BlogCard'
import PremiumButton from '@/components/PremiumButton'
import styles from './blog.module.css'

type BlogPost = {
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

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog?limit=100')
        const data = await res.json()
        if (data.posts) {
          setPosts(data.posts)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>Loading blog posts...</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection>
            <h1 className={styles.sectionTitle}>Tech Blog</h1>
            <p className={styles.sectionSubtitle}>
              Stay updated with my latest articles on programming, web development, technology trends, and coding best practices.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className={styles.section}>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyStateIcon}>✍️</span>
              <h3>Blog Posts Coming Soon</h3>
              <p>I'm currently working on my first tech articles. Check back soon for programming tutorials and insights.</p>
            </div>
          ) : (
            <>
              {/* Posts Grid */}
              <div className={styles.blogGrid}>
                {currentPosts.map((post, index) => (
                  <AnimatedSection key={post.id} delay={index * 0.05}>
                    <BlogCard post={post} />
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
      {posts.length > 0 && (
        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterCta}>
              <h3>Stay Updated</h3>
              <p>Subscribe to my newsletter to receive the latest tech articles and coding tips directly in your inbox.</p>
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
