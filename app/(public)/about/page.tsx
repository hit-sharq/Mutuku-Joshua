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

const VALUES = [
  { icon: "⌘", title: "Precision Engineering", desc: "Readable, maintainable, and well-documented. Always." },
  { icon: "▦", title: "Aesthetic Intuition", desc: "I design before I code. UX is not an afterthought." },
  { icon: "↗", title: "Relentless Execution", desc: "I build MVPs fast and iterate with real users in mind." },
]

const TIMELINE = [
  { yr: "2024", title: "Founder & Principal Engineer — Lumyn Technologies", sub: "Digital engineering & design · Global" },
  { yr: "2024", title: "Independent Operator", sub: "Real estate, e-commerce, SaaS clients" },
  { yr: "2023", title: "Moringa School — Engineering Certification", sub: "Software Engineering · Nairobi" },
  { yr: "2023", title: "Zetech University — Software Engineering", sub: "Diploma program · In progress" },
  { yr: "2022", title: "Design & Frontend Practice", sub: "Independent projects · Kenya" },
]

const SKILLS = [
  {
    cat: "FRONTEND",
    items: [
      { name: "React / Next.js", pct: 95 },
      { name: "TypeScript", pct: 88 },
      { name: "Tailwind CSS", pct: 92 },
      { name: "Framer Motion", pct: 80 },
    ],
  },
  {
    cat: "BACKEND",
    items: [
      { name: "Node.js", pct: 90 },
      { name: "Django / Python", pct: 82 },
      { name: "Laravel / PHP", pct: 78 },
      { name: "PostgreSQL", pct: 85 },
    ],
  },
  {
    cat: "DESIGN & OTHER",
    items: [
      { name: "UI/UX Design", pct: 88 },
      { name: "Figma", pct: 85 },
      { name: "M-Pesa Daraja API", pct: 90 },
      { name: "REST / GraphQL APIs", pct: 87 },
    ],
  },
]

const TOOLS = [
  { icon: "⌥", name: "GIT / GITHUB" },
  { icon: "⛁", name: "POSTGRESQL" },
  { icon: "☁", name: "VERCEL" },
  { icon: "▢", name: "DOCKER" },
  { icon: "◈", name: "FIGMA" },
  { icon: "⎔", name: "REST APIS" },
  { icon: "▶", name: "M-PESA" },
  { icon: "›_", name: "LINUX / CLI" },
]

export default async function AboutPage() {
  const { profile, teamMembers } = await getAboutData()

  return (
    <div className="about-page">
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.secEyebrow}>ABOUT ME</div>
          <h1 className={styles.heroH}>
            Dev who designs.<br /><span className={styles.heroHEm}>Designer who ships.</span>
          </h1>
          <p className={styles.aboutP}>
            {profile?.bio ||
              `Passionate fullstack developer committed to building scalable web applications
              and digital solutions with clean, efficient code and modern technologies.`}
          </p>
          <div className={styles.aboutVals}>
            {VALUES.map((v) => (
              <div key={v.title} className={styles.aval}>
                <div className={styles.avalIcon}>{v.icon}</div>
                <div>
                  <div className={styles.avalTitle}>{v.title}</div>
                  <div className={styles.avalDesc}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroAvatar}>
            <Image
              src="/jm.png"
              alt="Mutuku Joshua - Fullstack Developer"
              fill
              className={styles.heroAvatarImg}
              priority
            />
            <div className={styles.heroAvBadge}>AVAILABLE</div>
          </div>
          <div className={styles.heroName}>MUTUKU JOSHUA</div>
          <div className={styles.heroLoc}>NAIROBI, KENYA</div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className={styles.aboutGrid}>
        <div className={styles.aboutLeft}>
          <div className={styles.secEyebrow}>ABOUT ME</div>
          <div className={styles.secTitle}>Dev who designs. Designer who ships.</div>
          <p className={styles.aboutP}>
            I&apos;m Joshua Mwendwa — a full-stack developer and UI/UX designer based in Nairobi, Kenya.
            I build digital products that are fast, beautiful, and actually useful.
          </p>
          <p className={styles.aboutP}>
            Founder of Lumyn Technologies, a digital engineering company operating globally. Moringa School
            certified engineer, currently pursuing a Diploma in Software Engineering at Zetech University.
          </p>
          <p className={styles.aboutP}>
            I specialize in React/Next.js frontends, Django and Laravel backends, and Kenya-specific integrations like M-Pesa Daraja. I care deeply about design systems, product thinking, and code quality.
          </p>
        </div>
        <div className={styles.aboutRight}>
          <div className={styles.secEyebrow}>EXPERIENCE</div>
          <div className={styles.timeline}>
            {TIMELINE.map((t) => (
              <div key={t.title} className={styles.tlItem}>
                <div className={styles.tlYr}>{t.yr}</div>
                <div>
                  <div className={styles.tlTitle}>{t.title}</div>
                  <div className={styles.tlSub}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className={styles.skillsWrap}>
        <div className={styles.secEyebrow}>EXPERTISE</div>
        <div className={styles.secTitle}>Stack & tools</div>
        <div className={styles.skillsGrid}>
          {SKILLS.map((group) => (
            <div key={group.cat} className={styles.skillCat}>
              <div className={styles.scTitle}>{group.cat}</div>
              <div className={styles.skillList}>
                {group.items.map((s) => (
                  <div key={s.name} className={styles.skillItem}>
                    <div className={styles.skillName}>
                      {s.name} <span className={styles.skillPct}>{s.pct}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div className={styles.skillFill} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.secEyebrow} style={{ marginTop: 32, marginBottom: 0 }}>TOOLS I USE DAILY</div>
        <div className={styles.toolsGrid}>
          {TOOLS.map((tool) => (
            <div key={tool.name} className={styles.toolChip}>
              <div className={styles.toolIcon}>{tool.icon}</div>
              <div className={styles.toolName}>{tool.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LUMYN TECHNOLOGIES */}
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
            <PremiumButton href="https://lumyn-tech.vercel.app/" target="_blank" rel="noopener noreferrer" size="lg">
              Visit Lumyn Website →
            </PremiumButton>
          </AnimatedSection>
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

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <span className={styles.ctaBadge}>Engage</span>
              <h2 className={styles.ctaTitle}>Let&apos;s Build Something That Outlasts the Noise</h2>
              <p className={styles.ctaText}>
                Have a project in mind? Let&apos;s collaborate and turn your ideas into reality.
                Contact me today to discuss your project needs.
              </p>
              <div className={styles.ctaButtons}>
                <PremiumButton href="/contact" size="lg">Start a Project</PremiumButton>
                <PremiumButton href="/projects" variant="secondary" size="lg">View My Work</PremiumButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
