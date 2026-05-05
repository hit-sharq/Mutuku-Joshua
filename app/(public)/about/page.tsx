import Image from "next/image"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import "./about.css"

type UserType = {
  id: string
  name: string | null
  email: string
  bio: string | null
  image: string | null
  phone: string | null
  location: string | null
  createdAt: Date
  updatedAt: Date
}

type TeamMemberType = {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  order: number
}

async function getAboutData(): Promise<{ profile: UserType | null; teamMembers: TeamMemberType[] }> {
  const profile = await prisma.user.findFirst({
    where: {
      clerkId: process.env.ADMIN_USER_IDS?.split(",")[0] || "",
    },
  })

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  })

  return { profile, teamMembers }
}

export default async function AboutPage() {
  const { profile, teamMembers } = await getAboutData()

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <div className="floating-code code-1">{"<code>"}</div>
          <div className="floating-code code-2">{"{ }"}</div>
          <div className="floating-code code-3">{"</div>"}</div>
          <div className="floating-code code-4">{"const"}</div>
          <div className="floating-code code-5">{"return"}</div>
        </div>
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text fade-in">
              <span className="hero-badge">Fullstack Developer</span>
              <h1>Mutuku Joshua</h1>
              <p className="about-hero-subtitle">
                Founder of Lumyn Technologies
              </p>
              <p className="about-hero-description">
                {profile?.bio ||
                  `Passionate fullstack developer committed to building scalable web applications
                  and digital solutions with clean, efficient code and modern technologies.`}
              </p>
              <div className="hero-cta-group">
                <Link href="/contact" className="cta-button">
                  Let's Work Together
                </Link>
                <Link href="/projects" className="btn btn-secondary">
                  View Projects
                </Link>
              </div>
            </div>
            <div className="about-hero-image fade-in">
              <div className="profile-image-wrapper">
                <div className="profile-glow"></div>
                <div style={{ position: "relative", zIndex: "1", borderRadius: "50%", overflow: "hidden" }}>
                  <Image
                    src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                    alt="Coding Animation"
                    width={400}
                    height={400}
                    className="hero-profile-image"
                    priority
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lumyn Technologies Section */}
      <section className="about-lumyn section" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.1)",
              padding: "0.75rem 1.5rem",
              borderRadius: "50px",
              marginBottom: "1.5rem"
            }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>🏢 Lumyn Technologies</span>
            </div>

            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "white" }}>
              Building the Future of Digital Innovation
            </h2>

            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", opacity: "0.9", marginBottom: "1.5rem" }}>
              Lumyn is a forward-thinking tech company that designs and develops modern, high-performance digital experiences.
              We blend creativity, strategy, and engineering to help brands shine online — from sleek websites to intelligent web applications.
            </p>

            <Link
              href="https://lumyn-tech.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: "white", color: "var(--primary-color)", fontWeight: "600" }}
            >
              Visit Lumyn Website →
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-intro section">
        <div className="container">
          <div className="intro-content">
            <span className="section-badge">Mission & Vision</span>
            <h2>Our Purpose</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              marginTop: "2rem"
            }}>
              <div style={{
                padding: "2rem",
                borderRadius: "12px",
                background: "#f7fafc",
                border: "1px solid #e2e8f0",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎯</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem", color: "var(--primary-color)" }}>Our Mission</h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "#4a5568" }}>
                  To empower businesses and individuals with elegant, efficient, and scalable digital solutions.
                </p>
              </div>
              <div style={{
                padding: "2rem",
                borderRadius: "12px",
                background: "#f7fafc",
                border: "1px solid #e2e8f0",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔭</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem", color: "var(--primary-color)" }}>Our Vision</h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "#4a5568" }}>
                  To become a trusted digital partner for startups and enterprises seeking innovation and impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-intro section">
        <div className="container">
          <div className="intro-content">
            <span className="section-badge">Introduction</span>
            <h2>Fullstack Developer & Technology Enthusiast</h2>
            <div className="intro-text">
              <p>
                Mutuku Joshua is a skilled Fullstack Developer and tech entrepreneur. As the founder of Lumyn Technologies,
                he is dedicated to building scalable web applications and digital solutions with clean, efficient code and modern technologies.
              </p>
              <p>
                With a comprehensive understanding of the MERN stack, Python, and cloud technologies,
                Mutuku Joshua has successfully delivered projects ranging from dynamic web applications
                to RESTful APIs and database solutions, always prioritizing performance and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="about-credentials section">
        <div className="container">
          <span className="section-badge">Background</span>
          <h2>Education & Technical Experience</h2>
          <div className="credentials-grid">
            <div className="credential-card">
              <div className="credential-icon-wrapper">
                <div className="credential-icon">🎓</div>
              </div>
              <h3>Education & Certifications</h3>
              <div className="credential-list">
                <div className="credential-item">
                  <div className="credential-year">2024</div>
                  <h4>Computer Science / Software Engineering</h4>
                  <p>Zetech University</p>
                </div>
                <div className="credential-item">
                  <div className="credential-year">2024</div>
                  <h4>Fullstack Development Certification</h4>
                  <p>UNiAthena</p>
                </div>
                <div className="credential-item">
                  <div className="credential-year">2024</div>
                  <h4>Cloud Computing Certification</h4>
                  <p>AWS</p>
                </div>
                <div className="credential-item">
                  <div className="credential-year">2024</div>
                  <h4>Web Development Bootcamp</h4>
                  <p>Moringa School</p>
                </div>
                <div className="credential-item">
                  <div className="credential-year">2024</div>
                  <h4>AI for Software Engineering</h4>
                  <p>Power Learn Project (PLP)</p>
                </div>
              </div>
            </div>

            <div className="credential-card">
              <div className="credential-icon-wrapper">
                <div className="credential-icon">💻</div>
              </div>
              <h3>Technical Skills & Experience</h3>
              <div className="experience-timeline">
                <div className="experience-item">
                  <div className="experience-icon">⚛️</div>
                  <div className="experience-content">
                    <h4>Frontend Development</h4>
                    <p className="experience-company">React, Next.js, TypeScript, Tailwind CSS</p>
                    <div className="experience-details">
                      <span className="experience-tag">Responsive Design</span>
                      <span className="experience-tag">State Management</span>
                      <span className="experience-tag">SEO</span>
                      <span className="experience-tag">Performance</span>
                    </div>
                  </div>
                </div>
                <div className="experience-item">
                  <div className="experience-icon">🟢</div>
                  <div className="experience-content">
                    <h4>Backend Development</h4>
                    <p className="experience-company">Node.js, Express, Python, PostgreSQL, MongoDB</p>
                    <div className="experience-details">
                      <span className="experience-tag">RESTful APIs</span>
                      <span className="experience-tag">Database Design</span>
                      <span className="experience-tag">Authentication</span>
                      <span className="experience-tag">Microservices</span>
                    </div>
                  </div>
                </div>
                <div className="experience-item">
                  <div className="experience-icon">🛠️</div>
                  <div className="experience-content">
                    <h4>DevOps & Tools</h4>
                    <p className="experience-company">Git, Docker, CI/CD, AWS</p>
                    <div className="experience-details">
                      <span className="experience-tag">Version Control</span>
                      <span className="experience-tag">Containerization</span>
                      <span className="experience-tag">Cloud Deployment</span>
                      <span className="experience-tag">Agile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="about-expertise section">
        <div className="container">
          <span className="section-badge">Technologies</span>
          <h2>Tech Stack</h2>
          <div className="tech-stack-grid">
            <div className="tech-category">
              <div className="tech-category-header">
                <span className="tech-icon">🎨</span>
                <h3>Frontend</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-name">React</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "95%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Next.js</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "90%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">TypeScript</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "85%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Tailwind CSS</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "92%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">HTML5/CSS3</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "98%" }}></div></div>
                </div>
              </div>
            </div>
            <div className="tech-category">
              <div className="tech-category-header">
                <span className="tech-icon">⚙️</span>
                <h3>Backend</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-name">Node.js</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "90%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Express</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "88%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Python</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "82%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">PostgreSQL</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "85%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">MongoDB</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "87%" }}></div></div>
                </div>
              </div>
            </div>
            <div className="tech-category">
              <div className="tech-category-header">
                <span className="tech-icon">☁️</span>
                <h3>Cloud & DevOps</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item">
                  <span className="tech-name">AWS</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "78%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Docker</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "80%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Git/GitHub</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "95%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">Prisma ORM</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "88%" }}></div></div>
                </div>
                <div className="tech-item">
                  <span className="tech-name">CI/CD</span>
                  <div className="tech-bar"><div className="tech-progress" style={{ width: "75%" }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-memberships section">
        <div className="container">
          <span className="section-badge">Services</span>
          <h2>What I Do</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🌐</div>
              </div>
              <h3>Web Development</h3>
              <p>Building custom web applications with modern frameworks and best practices</p>
              <ul className="service-list">
                <li>Custom web applications</li>
                <li>E-commerce platforms</li>
                <li>SaaS applications</li>
                <li>Portfolio websites</li>
                <li>Landing pages</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">📱</div>
              </div>
              <h3>Mobile Development</h3>
              <p>Creating cross-platform mobile applications that delight users</p>
              <ul className="service-list">
                <li>React Native apps</li>
                <li>Cross-platform solutions</li>
                <li>Responsive designs</li>
                <li>App maintenance</li>
                <li>App store optimization</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🔌</div>
              </div>
              <h3>API Development</h3>
              <p>Designing and building robust APIs for seamless integrations</p>
              <ul className="service-list">
                <li>RESTful APIs</li>
                <li>GraphQL APIs</li>
                <li>Third-party integrations</li>
                <li>API documentation</li>
                <li>Authentication systems</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🗄️</div>
              </div>
              <h3>Database Solutions</h3>
              <p>Designing efficient database architectures for scalability</p>
              <ul className="service-list">
                <li>Database design</li>
                <li>Query optimization</li>
                <li>Data migration</li>
                <li>Backup strategies</li>
                <li>Performance tuning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Collaborations Section */}
      {teamMembers.length > 0 && (
        <section className="about-team section">
          <div className="container">
            <span className="section-badge">Collaborations</span>
            <h2>Working With Amazing People</h2>
            <p className="section-subtitle">Great projects come from great collaborations</p>

            <div className="team-grid">
              {teamMembers.map((member: TeamMemberType) => (
                <div key={member.id} className="team-member-card">
                  <div className="team-member-image">
                    <Image
                      src={member.image || "/placeholder.svg?height=100&width=100"}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="member-photo"
                    />
                  </div>
                  <div className="team-member-info">
                    <h3>{member.name}</h3>
                    <p className="member-title">{member.title}</p>
                    <p className="member-bio">{member.bio}</p>
                    <div className="member-social">
                      <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer" className="social-link">💼</a>
                      <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer" className="social-link">🐙</a>
                      <a href="mailto:officialjoshuamwendwa@gmail.com" className="social-link">📧</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="about-cta">
        <div className="cta-bg-pattern"></div>
        <div className="container">
          <div className="cta-content">
            <span className="cta-badge">Get In Touch</span>
            <h2>Let's Build Something Amazing</h2>
            <p>
              Have a project in mind? Let's collaborate and turn your ideas into reality.
              Contact me today to discuss your project needs.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-button">
                Start a Project
              </a>
              <a href="/projects" className="btn btn-secondary cta-secondary">
                View My Work
              </a>
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
    </div>
  )
}

