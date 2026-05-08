
import Link from "next/link"
import Image from "next/image"
import TestimonialsSection from "@/components/TestimonialsSection"
import { prisma } from "@/lib/prisma"
import BlogCard from "@/components/BlogCard"
import NewsCard from "@/components/NewsCard"
import "./home.css"

type BlogPostType = {
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

type NewsItemType = {
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

type PracticeAreaType = {
  id: string
  title: string
  description: string
  icon: string | null
}

type StaticServiceType = {
  id: string
  title: string
  description: string
  icon: string
}

// Static services for homepage preview
const staticServices: StaticServiceType[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Custom web applications built with React, Next.js, and Node.js.",
    icon: "🌐",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native.",
    icon: "📱",
  },
  {
    id: "api",
    title: "API Development",
    description: "RESTful and GraphQL APIs with seamless integrations.",
    icon: "🔌",
  },
]

// Static skills for homepage
const skills = [
  {
    icon: "⚛️",
    title: "Frontend",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"]
  },
  {
    icon: "🟢",
    title: "Backend",
    skills: ["Node.js / Express", "Python", "PostgreSQL", "MongoDB"]
  },
  {
    icon: "☁️",
    title: "DevOps",
    skills: ["Git / GitHub", "Docker", "AWS", "CI/CD"]
  }
]

async function getHomeData(): Promise<{ 
  practiceAreas: PracticeAreaType[], 
  recentPosts: BlogPostType[],
  latestNews: NewsItemType[]
}> {
  let practiceAreas: PracticeAreaType[] = []
  let recentPosts: BlogPostType[] = []
  let latestNews: NewsItemType[] = []

  try {
    practiceAreas = await prisma.practiceArea.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.warn("Could not fetch practice areas, using static data")
  }

  try {
    recentPosts = await prisma.blogPost.findMany({
      take: 3,
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.warn("Could not fetch blog posts")
  }

  try {
    latestNews = await prisma.news.findMany({
      take: 3,
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.warn("Could not fetch news items")
  }

  return { practiceAreas, recentPosts, latestNews }
}

export const dynamic = "force-dynamic"

export default async function Home() {
  const { practiceAreas, recentPosts, latestNews } = await getHomeData()

  // Use static services if no practice areas exist
  const services = practiceAreas.length > 0 ? practiceAreas : staticServices

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="home-hero-bg">
          <div className="floating-code code-1">{"<code>"}</div>
          <div className="floating-code code-2">{"{ }"}</div>
          <div className="floating-code code-3">{"</div>"}</div>
          <div className="floating-code code-4">{"const"}</div>
          <div className="floating-code code-5">{"return"}</div>
        </div>
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: "3rem" }}>
            <div>
              <span className="hero-badge">Fullstack Developer</span>
              <h1>Mutuku Joshua</h1>
              <p className="hero-subtitle">Founder of Lumyn Technologies</p>
              <p style={{ 
                fontSize: "1rem", 
                marginBottom: "1.5rem", 
                opacity: "0.9", 
                fontWeight: "500",
                color: "var(--primary-color)",
                display: "inline-block",
                background: "rgba(59, 130, 246, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "20px"
              }}>
                ✨ Building Digital Experiences That Matter
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: "0.95", lineHeight: "1.7" }}>
                Passionate fullstack developer and tech entrepreneur committed to building scalable web applications
                and digital solutions with clean, efficient code and modern technologies.
              </p>
              <div className="hero-cta-group">
                <Link href="/projects" className="cta-button">
                  View My Projects
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Hire Me
                </Link>
              </div>

            </div>
            <div style={{ textAlign: "center" }}>
              <div className="profile-image-wrapper">
                <div className="profile-glow"></div>
                <div style={{ position: "relative", zIndex: "1", borderRadius: "10px", overflow: "hidden" }}>
                  <Image
                    src="/Mutuku.JPG"
                    alt="Mutuku Joshua"
                    width={400}
                    height={400}
                    className="hero-image"
                    priority
                    style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="section-badge">About Me</span>
              <h2 style={{ marginBottom: "1.5rem" }}>Fullstack Developer & Technology Enthusiast</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#666", lineHeight: "1.8" }}>
                I am a passionate Fullstack Developer with expertise in building modern web applications.
                My dedication to clean code, best practices, and continuous learning has established me as a
                reliable developer for projects of any scale.
              </p>
              <p style={{ marginBottom: "2rem", color: "#666", lineHeight: "1.8" }}>
                Specializing in the MERN stack, Python, and cloud technologies, I bring a wealth of knowledge and a
                proven track record of successful project deliveries to every challenge.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/about" className="cta-button">
                  Learn More About Me
                </Link>
                <Link href="/projects" className="btn btn-secondary">
                  View My Work
                </Link>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="about-image-wrapper">
                <div className="about-glow"></div>
                <Image
                  src="/1.png"
                  alt="Mutuku Joshua - Fullstack Developer"
                  width={400}
                  height={350}
                  style={{ borderRadius: "10px", width: "100%", height: "auto", position: "relative", zIndex: "1" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="skills-section">
        <div className="container">
          <span className="section-badge" style={{ display: "block", textAlign: "center" }}>Expertise</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>What I Do</h2>
          <p className="section-subtitle">Comprehensive development services tailored to bring your digital ideas to life</p>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <ul className="skill-list">
                  {skill.skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <span className="section-badge" style={{ display: "block", textAlign: "center" }}>Services</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>My Services</h2>
          <p className="section-subtitle">Comprehensive development services tailored to bring your digital ideas to life</p>

          <div className="services-grid">
            {services.map((service: PracticeAreaType | StaticServiceType) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <div className="service-icon">{(service as PracticeAreaType).icon || (service as StaticServiceType).icon || "💻"}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href="/services" className="btn btn-secondary" style={{ marginTop: "0.5rem" }}>
                  Learn More
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/services" className="cta-button">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="section" style={{ background: "#f7fafc" }}>
          <div className="container">
            <span className="section-badge" style={{ display: "block", textAlign: "center" }}>Blog</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Latest Blog Posts</h2>
            <p className="section-subtitle">Stay updated with my latest articles on technology, development, and programming</p>

            <div className="blog-cards-grid">
              {recentPosts.map((post: BlogPostType) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" className="btn btn-primary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="section">
          <div className="container">
            <span className="section-badge" style={{ display: "block", textAlign: "center" }}>News & Updates</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Latest News</h2>
            <p className="section-subtitle">Check out my recent projects, achievements, and updates</p>

            <div className="blog-cards-grid">
              {latestNews.map((news: NewsItemType) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/news" className="btn btn-primary">
                View All News
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="cta-bg-pattern" style={{ borderRadius: "15px" }}></div>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "15px",
              textAlign: "center",
              position: "relative",
              zIndex: "1",
            }}
          >
            <span className="cta-badge">Get In Touch</span>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "white" }}>Ready to Build Something Amazing?</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: "0.9", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Let's collaborate on your next project. Contact me today and let's turn your ideas into reality.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-button">
                Start a Project
              </Link>
              <Link href="/projects" className="btn btn-secondary cta-secondary">
                View My Work
              </Link>
            </div>
            <div className="cta-contact">
              <a href="mailto:officialjoshuamwendwa@gmail.com" className="cta-contact-link">
                <span>📧</span> officialjoshuamwendwa@gmail.com
              </a>
              <a href="tel:+254794773452" className="cta-contact-link">
                <span>📞</span> +254 794 773 452
              </a>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
              <a
                href="https://github.com/hit-sharq"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=github" alt="GitHub" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://www.instagram.com/j_lee087"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=instagram" alt="Instagram" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://wa.me/+25492687584"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: "24px", height: "24px" }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

