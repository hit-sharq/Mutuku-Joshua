'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import PremiumButton from '@/components/PremiumButton'
import BlogCard from '@/components/BlogCard'
import NewsCard from '@/components/NewsCard'
import ProjectCard from '@/components/ProjectCard'
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
  const [projectCount, setProjectCount] = useState(0)
  const statsRef = useRef(null)

  // Calculate years since 2024 (bootcamp graduation)
  const currentYear = new Date().getFullYear()
  const yearsExperience = currentYear - 2024 // 2024 to 2026 = 2 years

  // Stats will be updated after data loads
  const stats: Stat[] = [
    { number: yearsExperience, label: 'Years Experience', suffix: '+', icon: '📅' },
    { number: projectCount, label: 'Projects Delivered', suffix: '+', icon: '🚀' },
    { number: 100, label: 'Client Satisfaction', suffix: '%', icon: '⭐' },
    { number: 24, label: 'Awards Won', suffix: '', icon: '🏆' },
  ]

  // Trigger stats animation once on mount (after initial render)
  useEffect(() => {
    setStatsVisible(true)
  }, [setStatsVisible])




  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        // Fetch projects with full list to count
        const [projectsRes, blogRes, newsRes] = await Promise.all([
          // projects list is limited for the homepage, but projectsData.totalCount gives the full count
          fetch('/api/projects?limit=3'),
          fetch('/api/blog?limit=3'),
          fetch('/api/news?limit=3')
        ])


        const [projectsData, blogData, newsData] = await Promise.all([
          projectsRes.json(),
          blogRes.json(),
          newsRes.json()
        ])

        if (projectsData.projects) {
          setProjects(projectsData.projects)
          // Also set total count
          setProjectCount(projectsData.totalCount ?? projectsData.projects.length)

        }
        if (blogData.posts) {
          setBlogPosts(blogData.posts)
        }
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
    // Deterministic rendering: when stats are visible, always render the final value.
    // This avoids any timing/animation state bugs that cause 0 to be displayed.
    if (!statsVisible) return <span>0{suffix}</span>
    return <span>{to}{suffix}</span>
  }



  return (
    <div className={styles.page}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.span
            className={styles.heroTag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FULL-STACK DEVELOPER & DESIGNER
          </motion.span>

          <motion.h1
            className={styles.heroH}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            I build things<br />that <em>work</em><br />and look good.
          </motion.h1>

          <motion.p
            className={styles.heroP}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            React · Next.js · Node · Django · Laravel. Based in Nairobi — building for the world. Founder of Lumyn Technologies.
          </motion.p>

          <motion.div
            className={styles.heroBtns}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <PremiumButton href="/projects" size="lg">
              VIEW MY WORK
            </PremiumButton>
            <PremiumButton href="/contact" variant="secondary" size="lg">
              LET&apos;S TALK
            </PremiumButton>
          </motion.div>

          <motion.div
            className={styles.stackRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className={styles.stk}>REACT</span>
            <span className={styles.stk}>NEXT.JS</span>
            <span className={styles.stk}>NODE</span>
            <span className={styles.stk}>DJANGO</span>
            <span className={styles.stk}>LARAVEL</span>
            <span className={styles.stk}>TYPESCRIPT</span>
            <span className={styles.stk}>POSTGRES</span>
            <span className={styles.stk}>M-PESA</span>
          </motion.div>
        </div>

        <div className={styles.heroRight}>
          <div style={{ textAlign: "center" }}>
            <div className={styles.heroAv}>
              JM
              <div className={styles.heroAvBadge}>AVAILABLE</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--cream4)", marginTop: 16, letterSpacing: "1.5px" }}>MUTUKU JOSHUA</div>
            <div style={{ fontSize: 11, color: "var(--primary)", marginTop: 4, letterSpacing: "1px" }}>NAIROBI, KENYA</div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className={styles.heroScroll}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={styles.heroStat}>
            <div className={styles.hStatN}>
              <Counter to={stat.number} suffix={stat.suffix} />
            </div>
            <div className={styles.hStatL}>{stat.label}</div>
            {index < stats.length - 1 && <div className={styles.hStatSep} />}
          </div>
        ))}
      </div>

      {/* STATS SECTION */}
      <section
        ref={statsRef}
        className={styles.statsSection}
        onMouseEnter={() => {
          if (!loading) {
            setStatsVisible(true)
          }
        }}
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
      {loading ? (
        <section className={styles.projectsSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
              <p className={styles.sectionSubtitle}>
                A selection of my recent work showcasing modern web development
              </p>
            </AnimatedSection>
            <div className={styles.projectsGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonTextShort} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : projects.length > 0 && (
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
      {loading ? (
        <section className={styles.section}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Latest Blog Posts</h2>
              <p className={styles.sectionSubtitle}>
                Insights, tutorials, and thoughts on modern web development
              </p>
            </AnimatedSection>
            <div className={styles.projectsGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonTextShort} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : blogPosts.length > 0 && (
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
      {loading ? (
        <section className={styles.section}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Recent News</h2>
              <p className={styles.sectionSubtitle}>
                Stay updated with the latest announcements and industry trends
              </p>
            </AnimatedSection>
            <div className={styles.projectsGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonText} />
                    <div className={styles.skeletonTextShort} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : newsItems.length > 0 && (
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
