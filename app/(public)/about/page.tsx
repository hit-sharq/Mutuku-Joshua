import Image from "next/image"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import AnimatedSection from "@/components/AnimatedSection"
import PremiumButton from "@/components/PremiumButton"
import styles from "./about.module.css"

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
      {/* HERO SECTION */}
      <section className={styles.aboutHero}>
        <div className={styles.heroBg}>
          <div className={`${styles.floatingCode} ${styles.code1}`}>{'{ }'}</div>
          <div className={`${styles.floatingCode} ${styles.code2}`}>{'</code>'}</div>
          <div className={`${styles.floatingCode} ${styles.code3}`}>{'<div>'}</div>
          <div className={`${styles.floatingCode} ${styles.code4}`}>{'const'}</div>
           <div className={`${styles.floatingCode} ${styles.code5}`}>{'return'}</div>
        </div>

        <div className={styles.aboutHeroContent}>
          <div className={styles.aboutHeroText}>
            <AnimatedSection>
              <span className={styles.heroBadge}>Fullstack Developer & Entrepreneur</span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className={styles.aboutHeroName}>Mutuku Joshua</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className={styles.aboutHeroSubtitle}>
                Founder of Lumyn Technologies
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className={styles.aboutHeroDescription}>
                {profile?.bio ||
                  `Passionate fullstack developer committed to building scalable web applications
                  and digital solutions with clean, efficient code and modern technologies.`}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.aboutHeroImage}>
                <div className={styles.profileImageWrapper}>
                  <div className={styles.profileGlow} />
                  <Image
                    src="/jm.png"
                    alt="Mutuku Joshua - Fullstack Developer"
                    fill
                    className={styles.heroProfileImage}
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

           <AnimatedSection delay={0.3}>
             <div className={styles.aboutHeroImage}>
               <div className={styles.profileImageWrapper}>
                 <div className={styles.profileGlow} />
                 <Image
                   src="/Mutuku.JPG"
                   alt="Mutuku Joshua - Fullstack Developer"
                   fill
                   className={styles.heroProfileImage}
                   priority
                 />
               </div>
             </div>
           </AnimatedSection>
        </div>
      </section>

      {/* LUMYN TECHNOLOGIES SECTION */}
      <section className={styles.lumynSection}>
        <div className={styles.lumynContent}>
          <AnimatedSection>
            <div className={styles.lumynBadge}>🏢 Lumyn Technologies</div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2>Building the Future of Digital Innovation</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p>
              Lumyn is a forward-thinking tech company that designs and develops modern, high-performance digital experiences.
              We blend creativity, strategy, and engineering to help brands shine online — from sleek websites to intelligent web applications.
            </p>
          </AnimatedSection>

           <AnimatedSection delay={0.3}>
             <PremiumButton
               href="https://lumyn-tech.vercel.app/"
               target="_blank"
               rel="noopener noreferrer"
               size="lg"
             >
               Visit Lumyn Website →
             </PremiumButton>
           </AnimatedSection>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.introSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.introContent}>
              <span className={styles.sectionBadge}>Mission & Vision</span>
              <h2>Our Purpose</h2>
            </div>
          </AnimatedSection>

          <div className={styles.introGrid}>
            <AnimatedSection delay={0.1}>
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>🎯</div>
                <h3>Our Mission</h3>
                <p>To empower businesses and individuals with elegant, efficient, and scalable digital solutions.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>🔭</div>
                <h3>Our Vision</h3>
                <p>To become a trusted digital partner for startups and enterprises seeking innovation and impact.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className={styles.introSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.introContent}>
              <span className={styles.sectionBadge}>Introduction</span>
              <h2>Fullstack Developer & Technology Enthusiast</h2>
              <div className={styles.introText}>
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
          </AnimatedSection>
        </div>
      </section>

      {/* EDUCATION & EXPERIENCE */}
      <section className={styles.credentialsSection}>
        <div className="container">
          <AnimatedSection>
            <span className={styles.sectionBadge}>Background</span>
            <h2>Education & Technical Experience</h2>
          </AnimatedSection>

          <div className={styles.credentialsGrid}>
            {/* Education */}
            <AnimatedSection delay={0.1}>
              <div className={styles.credentialCard}>
                <div className={styles.credentialIconWrapper}>
                  <div className={styles.credentialIcon}>🎓</div>
                </div>
                <h3>Education & Certifications</h3>
                <div className={styles.credentialList}>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2024</div>
                    <h4>Computer Science / Software Engineering</h4>
                    <p>Zetech University</p>
                  </div>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2024</div>
                    <h4>Fullstack Development Certification</h4>
                    <p>UNiAthena</p>
                  </div>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2024</div>
                    <h4>Cloud Computing Certification</h4>
                    <p>AWS</p>
                  </div>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2024</div>
                    <h4>Web Development Bootcamp</h4>
                    <p>Moringa School</p>
                  </div>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2024</div>
                    <h4>AI for Software Engineering</h4>
                    <p>Power Learn Project (PLP)</p>
                  </div>
                  <div className={styles.credentialItem}>
                    <div className={styles.credentialYear}>2026</div>
                    <h4>Ethical Hacking Certification</h4>
                    <p>Cisco</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Skills & Experience */}
            <AnimatedSection delay={0.2}>
              <div className={styles.credentialCard}>
                <div className={styles.credentialIconWrapper}>
                  <div className={styles.credentialIcon}>💻</div>
                </div>
                <h3>Technical Skills & Experience</h3>
                <div className={styles.experienceTimeline}>
                  <div className={styles.experienceItem}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⚛️</div>
                    <h4>Frontend Development</h4>
                    <p className={styles.experienceCompany}>React, Next.js, TypeScript, Tailwind CSS</p>
                    <div className={styles.experienceDetails}>
                      <span className={styles.experienceTag}>Responsive Design</span>
                      <span className={styles.experienceTag}>State Management</span>
                      <span className={styles.experienceTag}>SEO</span>
                      <span className={styles.experienceTag}>Performance</span>
                    </div>
                  </div>
                  <div className={styles.experienceItem}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🟢</div>
                    <h4>Backend Development</h4>
                    <p className={styles.experienceCompany}>Node.js, Express, Python, PostgreSQL, MongoDB</p>
                    <div className={styles.experienceDetails}>
                      <span className={styles.experienceTag}>RESTful APIs</span>
                      <span className={styles.experienceTag}>Database Design</span>
                      <span className={styles.experienceTag}>Authentication</span>
                      <span className={styles.experienceTag}>Microservices</span>
                    </div>
                  </div>
                  <div className={styles.experienceItem}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🛠️</div>
                    <h4>DevOps & Tools</h4>
                    <p className={styles.experienceCompany}>Git, Docker, CI/CD, AWS</p>
                    <div className={styles.experienceDetails}>
                      <span className={styles.experienceTag}>Version Control</span>
                      <span className={styles.experienceTag}>Containerization</span>
                      <span className={styles.experienceTag}>Cloud Deployment</span>
                      <span className={styles.experienceTag}>Agile</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className={styles.techStackSection}>
        <div className="container">
          <AnimatedSection>
            <span className={styles.sectionBadge}>Technologies</span>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
          </AnimatedSection>

          <div className={styles.techStackGrid}>
            <AnimatedSection delay={0.1}>
              <div className={styles.techCategory}>
                <div className={styles.techCategoryHeader}>
                  <span className={styles.techIcon}>🎨</span>
                  <h3>Frontend</h3>
                </div>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>React / Next.js</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "95%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>TypeScript</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "85%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Tailwind CSS</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "92%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>HTML5 / CSS3</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "98%" }}></div></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className={styles.techCategory}>
                <div className={styles.techCategoryHeader}>
                  <span className={styles.techIcon}>⚙️</span>
                  <h3>Backend</h3>
                </div>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Node.js / Express</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "90%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Python</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "82%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>PostgreSQL</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "85%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>MongoDB</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "87%" }}></div></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.techCategory}>
                <div className={styles.techCategoryHeader}>
                  <span className={styles.techIcon}>☁️</span>
                  <h3>Cloud & DevOps</h3>
                </div>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>AWS</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "78%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Docker</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "80%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Git / GitHub</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "95%" }}></div></div>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techName}>Prisma ORM</span>
                    <div className={styles.techBar}><div className={styles.techProgress} style={{ width: "88%" }}></div></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.servicesSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.introContent}>
              <span className={styles.sectionBadge}>Services</span>
              <h2>What I Do</h2>
              <p className={styles.sectionSubtitle}>
                Comprehensive development services tailored to your business needs
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.servicesGrid}>
            {[
              {
                icon: '🌐',
                title: 'Web Development',
                desc: 'Building custom web applications with modern frameworks and best practices.',
                items: ['Custom web applications', 'E-commerce platforms', 'SaaS applications', 'Portfolio websites', 'Landing pages'],
              },
              {
                icon: '📱',
                title: 'Mobile Development',
                desc: 'Creating cross-platform mobile applications that delight users.',
                items: ['React Native apps', 'Cross-platform solutions', 'Responsive designs', 'App maintenance', 'App store optimization'],
              },
              {
                icon: '🔌',
                title: 'API Development',
                desc: 'Designing and building robust APIs for seamless integrations.',
                items: ['RESTful APIs', 'GraphQL APIs', 'Third-party integrations', 'API documentation', 'Authentication systems'],
              },
              {
                icon: '🗄️',
                title: 'Database Solutions',
                desc: 'Designing efficient database architectures for scalability.',
                items: ['Database design', 'Query optimization', 'Data migration', 'Backup strategies', 'Performance tuning'],
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

      {/* TEAM */}
      {teamMembers.length > 0 && (
        <section className={styles.teamSection}>
          <div className="container">
            <AnimatedSection>
              <div className={styles.introContent}>
                <span className={styles.sectionBadge}>Collaborations</span>
                <h2>Working With Amazing People</h2>
                <p className={styles.sectionSubtitle}>Great projects come from great collaborations</p>
              </div>
            </AnimatedSection>

            <div className={styles.teamGrid}>
              {teamMembers.map((member: TeamMemberType) => (
                <AnimatedSection key={member.id} delay={0.1}>
                  <div className={styles.teamMemberCard}>
                    <div className={styles.teamMemberImage}>
                      <Image
                        src={member.image || "/placeholder.svg?height=100&width=100"}
                        alt={member.name}
                        width={100}
                        height={100}
                        className={styles.memberPhoto}
                      />
                    </div>
                    <div className={styles.teamMemberInfo}>
                      <h3>{member.name}</h3>
                      <p className={styles.memberTitle}>{member.title}</p>
                      <p className={styles.memberBio}>{member.bio}</p>
                      <div className={styles.memberSocial}>
                        <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>💼</a>
                        <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>🐙</a>
                        <a href="mailto:officialjoshuamwendwa@gmail.com" className={styles.socialLink}>📧</a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <span className={styles.ctaBadge}>Get In Touch</span>
              <h2 className={styles.ctaTitle}>Let's Build Something Amazing</h2>
              <p className={styles.ctaText}>
                Have a project in mind? Let's collaborate and turn your ideas into reality.
                Contact me today to discuss your project needs.
              </p>
              <div className={styles.ctaButtons}>
                <PremiumButton href="/contact" size="lg">
                  Start a Project
                </PremiumButton>
                <PremiumButton href="/projects" variant="secondary" size="lg">
                  View My Work
                </PremiumButton>
              </div>

              <div className={styles.ctaContact}>
                <a href="mailto:officialjoshuamwendwa@gmail.com" className={styles.ctaContactLink}>
                  <span>📧</span> officialjoshuamwendwa@gmail.com
                </a>
                <a href="tel:+254794773452" className={styles.ctaContactLink}>
                  <span>📞</span> +254 794 773 452
                </a>
              </div>

              <div className={styles.ctaSocial}>
                <a
                  href="https://github.com/hit-sharq"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className={styles.ctaSocialLink}
                >
                  🐙
                </a>
                <a
                  href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className={styles.ctaSocialLink}
                >
                  💼
                </a>
                <a
                  href="https://www.instagram.com/j_lee087"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className={styles.ctaSocialLink}
                >
                  📷
                </a>
                <a
                  href="https://wa.me/+25492687584"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className={styles.ctaSocialLink}
                >
                  💬
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
