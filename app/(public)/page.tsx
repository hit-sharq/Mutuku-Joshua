'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import PremiumButton from '@/components/PremiumButton'
import BlogCard from '@/components/BlogCard'
import NewsCard from '@/components/NewsCard'
import ProjectCard from '@/components/ProjectCard'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

type Project = {
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

type Stat = {
  number: number
  label: string
  suffix?: string
  icon: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [statsVisible, setStatsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const statsRef = useRef(null)

  const stats: Stat[] = [
    { number: 15, label: 'Years Experience', suffix: '+', icon: '📅' },
    { number: 120, label: 'Projects Delivered', suffix: '+', icon: '🚀' },
    { number: 98, label: 'Client Satisfaction', suffix: '%', icon: '⭐' },
    { number: 24, label: 'Awards Won', suffix: '', icon: '🏆' },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // Fetch projects
        const projectsRes = await fetch('/api/projects?limit=3')
        const projectsData = await projectsRes.json()
        if (projectsData.projects) {
          setProjects(projectsData.projects)
        }

        // Fetch blog posts (latest 3)
        const blogRes = await fetch('/api/blog?limit=3')
        const blogData = await blogRes.json()
        if (blogData.posts) {
          setBlogPosts(blogData.posts)
        }

        // Fetch news
        const newsRes = await fetch('/api/news?limit=3&featured=true')
        const newsData = await newsRes.json()
        if (newsData.news) {
          setNewsItems(newsData.news)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Stats counter animation
  function Counter({ to, suffix = '' }: { to: number, suffix?: string }) {
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
      if (statsVisible && !started) {
        setStarted(true)
        let start = 0
        const duration = 2000
        const increment = to / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start >= to) {
            setCount(to)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
        return () => clearInterval(timer)
      }
    }, [statsVisible, started, to])

    return <span>{count}{suffix}</span>
  }

  return (
    <div className={styles.page}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        {/* Background orbs */}
        <div className={styles.heroBg}>
          <div className={`${styles.floatingCode} ${styles.code1}`}>{'{ }'}</div>
          <div className={`${styles.floatingCode} ${styles.code2}`}>{"<code>"}</div>
          <div className={`${styles.floatingCode} ${styles.code3}`}>{"</div>"}</div>
          <div className={`${styles.floatingCode} ${styles.code4}`}>{"const"}</div>
          <div className={`${styles.floatingCode} ${styles.code5}`}>{"return"}</div>
        </div>

        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Fullstack Developer & Entrepreneur
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Mutuku Joshua
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Founder of Lumyn Technologies
          </motion.p>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Passionate fullstack developer committed to building scalable web applications
            and digital solutions with clean, efficient code and modern technologies.
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <PremiumButton href="/projects" size="lg">
              View My Work
            </PremiumButton>
            <PremiumButton href="/contact" variant="secondary" size="lg">
              Get In Touch
            </PremiumButton>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageGlow} />
            <Image
              src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
              alt="Mutuku Joshua - Fullstack Developer"
              fill
              className={styles.heroImage}
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section
        ref={statsRef}
        className={styles.statsSection}
        onMouseEnter={() => setStatsVisible(true)}
      >
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>By The Numbers</h2>
            <p className={styles.sectionSubtitle}>
              A track record of delivering quality solutions and building lasting partnerships
            </p>
          </AnimatedSection>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <h3 className={styles.statNumber}>
                    <Counter to={stat.number} suffix={stat.suffix} />
                  </h3>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>What I Do</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive development services tailored to your business needs
            </p>
          </AnimatedSection>

          <div className={styles.servicesGrid}>
            {[
              {
                icon: '🌐',
                title: 'Web Development',
                desc: 'Building custom web applications with modern frameworks and best practices.',
                items: ['Custom web applications', 'E-commerce platforms', 'SaaS applications', 'Portfolio websites'],
              },
              {
                icon: '📱',
                title: 'Mobile Development',
                desc: 'Creating cross-platform mobile applications that delight users.',
                items: ['React Native apps', 'Cross-platform solutions', 'Responsive designs', 'App maintenance'],
              },
              {
                icon: '🔌',
                title: 'API Development',
                desc: 'Designing and building robust APIs for seamless integrations.',
                items: ['RESTful APIs', 'GraphQL APIs', 'Third-party integrations', 'Authentication systems'],
              },
              {
                icon: '🗄️',
                title: 'Database Solutions',
                desc: 'Designing efficient database architectures for scalability.',
                items: ['Database design', 'Query optimization', 'Data migration', 'Performance tuning'],
              },
            ].map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <ul className={styles.serviceList}>
                    {service.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      {projects.length > 0 && (
        <section className={styles.projectsSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
              <p className={styles.sectionSubtitle}>
                A selection of my recent work showcasing modern web development
              </p>
            </AnimatedSection>

            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <PremiumButton href="/projects" size="lg">
                View All Projects
              </PremiumButton>
            </div>
          </div>
        </section>
      )}

      {/* BLOG SECTION */}
      {blogPosts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Latest Blog Posts</h2>
              <p className={styles.sectionSubtitle}>
                Insights, tutorials, and thoughts on modern web development
              </p>
            </AnimatedSection>

            <div className={styles.projectsGrid}>
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <PremiumButton href="/blog" variant="secondary" size="lg">
                View All Blog Posts
              </PremiumButton>
            </div>
          </div>
        </section>
      )}

      {/* NEWS SECTION */}
      {newsItems.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Recent News</h2>
              <p className={styles.sectionSubtitle}>
                Stay updated with the latest announcements and industry trends
              </p>
            </AnimatedSection>

            <div className={styles.projectsGrid}>
              {newsItems.map((news, index) => (
                <AnimatedSection key={news.id} delay={index * 0.1}>
                  <NewsCard news={news} />
                </AnimatedSection>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <PremiumButton href="/news" variant="secondary" size="lg">
                View All News
              </PremiumButton>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to <span className={styles.ctaHighlight}>Transform</span> Your Business?
              </h2>
              <p className={styles.ctaText}>
                Partner with Lumyn and let's build the future together.
              </p>
              <div className={styles.ctaButtons}>
                <PremiumButton href="/contact" size="lg">
                  Start a Project
                </PremiumButton>
                <PremiumButton href="/about" variant="secondary" size="lg">
                  Learn About Me
                </PremiumButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
