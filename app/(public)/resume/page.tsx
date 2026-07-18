'use client'

import AnimatedSection from '@/components/AnimatedSection'
import styles from './resume.module.css'

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.header}>
            <div className={styles.eyebrow}>CURRICULUM VITAE</div>
            <h1 className={styles.title}>JOSHUA MWENDWA</h1>
            <p className={styles.subtitle}>Full-Stack Developer</p>
            <div className={styles.tags}>
              {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Django', 'Laravel/PHP', 'PostgreSQL', 'Daraja API', 'Mini Program Studio'].map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.contactRow}>
              <a href="tel:+254794773452">+254 794 773 452</a>
              <span>·</span>
              <a href="mailto:joshua@lumyn.co.ke">joshua@lumyn.co.ke</a>
              <span>·</span>
              <span>Nairobi, Kenya</span>
              <span>·</span>
              <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>·</span>
              <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>·</span>
              <a href="https://mutuku-joshua.vercel.app" target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
          </div>
        </AnimatedSection>

        <div className={styles.content}>
          <div className={styles.main}>
            <AnimatedSection delay={0.1}>
              <div className={styles.section}>
                <h2>PROFESSIONAL SUMMARY</h2>
                <p>
                  Full-Stack Developer with hands-on experience building and shipping responsive web applications across the full
                  development lifecycle. Proficient in React.js, Next.js, TypeScript, Node.js, Django, Laravel/PHP, and PostgreSQL —
                  comfortable across frontend UI, backend APIs, database management, and deployment. Founder of Lumyn
                  Technologies. Moringa School certified. Passionate about clean code, fintech integrations, and building digital products
                  that create real impact.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className={styles.section}>
                <h2>WORK EXPERIENCE</h2>
                <div className={styles.experience}>
                  <div className={styles.expItem}>
                    <div className={styles.expHeader}>
                      <div>
                        <div className={styles.expTitle}>Developer</div>
                        <div className={styles.expCompany}>Gemark International Kenya Limited</div>
                      </div>
                      <div className={styles.expPeriod}>Feb 2026 – Mar 2026 · Nairobi</div>
                    </div>
                    <ul>
                      <li>Built and shipped full-stack web applications using React.js and Node.js, from UI through backend integration and deployment.</li>
                      <li>Integrated third-party REST APIs and backend services, improving data accuracy and platform reliability.</li>
                      <li>Managed PostgreSQL database queries and schema updates supporting core platform functionality.</li>
                      <li>Led debugging and maintenance cycles, resolving production issues and maintaining consistent uptime.</li>
                    </ul>
                  </div>
                  <div className={styles.expItem}>
                    <div className={styles.expHeader}>
                      <div>
                        <div className={styles.expTitle}>Developer</div>
                        <div className={styles.expCompany}>Lixnet Technologies</div>
                      </div>
                      <div className={styles.expPeriod}>Nov 2025 – Jan 2026 · Nairobi</div>
                    </div>
                    <ul>
                      <li>Developed responsive web platforms for local and international clients using React.js, Next.js, Tailwind CSS, and TypeScript.</li>
                      <li>Integrated Laravel/PHP backend services and REST APIs, handling JSON data and HTTP request/response flows.</li>
                      <li>Wrote and optimized PostgreSQL queries across multiple client projects.</li>
                      <li>Supported CI/CD deployment, troubleshooting, and performance optimization on live platforms.</li>
                    </ul>
                  </div>
                  <div className={styles.expItem}>
                    <div className={styles.expHeader}>
                      <div>
                        <div className={styles.expTitle}>Full-Stack Engineer</div>
                        <div className={styles.expCompany}>Lumyn Technologies</div>
                      </div>
                      <div className={styles.expPeriod}>Jul 2025 – Oct 2025 · Nairobi</div>
                    </div>
                    <ul>
                      <li>Led end-to-end development of business platforms — React.js/Next.js frontends, Node.js/Django backends, PostgreSQL/MySQL databases.</li>
                      <li>Built reusable UI component libraries with React Hooks and Context API, reducing build time across projects.</li>
                      <li>Designed and consumed RESTful APIs, managing JSON payloads between frontend and backend services.</li>
                      <li>Delivered complete project workflows independently from scoping and architecture through production deployment.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.section}>
                <h2>PROJECTS</h2>
                <div className={styles.projects}>
                  <div className={styles.project}>
                    <div className={styles.projectHeader}>
                      <div className={styles.projectTitle}>DueSphere Limited</div>
                      <a href="https://duespherelimited.co.ke" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>duespherelimited.co.ke</a>
                    </div>
                    <div className={styles.projectDesc}>Due Diligence & Compliance Platform</div>
                    <p>Audit and compliance workflow platform with dynamic data handling and secure backend integrations.</p>
                    <div className={styles.projectTech}>React.js · Node.js · PostgreSQL</div>
                  </div>
                  <div className={styles.project}>
                    <div className={styles.projectHeader}>
                      <div className={styles.projectTitle}>Gemark International</div>
                      <a href="https://gemarkart.co.ke" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>gemarkart.co.ke</a>
                    </div>
                    <div className={styles.projectDesc}>E-Commerce Platform</div>
                    <p>Full e-commerce platform with product management, cart flows, and backend API integrations.</p>
                    <div className={styles.projectTech}>React.js · Laravel/PHP · MySQL</div>
                  </div>
                  <div className={styles.project}>
                    <div className={styles.projectHeader}>
                      <div className={styles.projectTitle}>Enkaji Platform</div>
                      <a href="https://enkaji.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>enkaji.vercel.app</a>
                    </div>
                    <div className={styles.projectDesc}>B2B Business Connection Platform</div>
                    <p>Scalable B2B platform with real-time data, REST APIs, and PostgreSQL backend architecture.</p>
                    <div className={styles.projectTech}>React.js · Node.js · Firebase</div>
                  </div>
                  <div className={styles.project}>
                    <div className={styles.projectHeader}>
                      <div className={styles.projectTitle}>Musa & Musa Advocates</div>
                      <a href="https://musadvocates.co.ke" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>musadvocates.co.ke</a>
                    </div>
                    <div className={styles.projectDesc}>Professional Law Firm Website</div>
                    <p>Modern responsive corporate website with strong UI/UX and mobile-first design.</p>
                    <div className={styles.projectTech}>React.js · Next.js · Tailwind CSS</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className={styles.sidebar}>
            <AnimatedSection delay={0.1}>
              <div className={styles.sidebarSection}>
                <h3>TECHNICAL SKILLS</h3>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Frontend</div>
                  <div className={styles.skillItems}>
                    {['React.js (v18+, Hooks, Context API)', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material-UI', 'AXML', 'ACSS'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Backend</div>
                  <div className={styles.skillItems}>
                    {['Node.js', 'Express.js', 'Django (Python)', 'PHP', 'Laravel', 'Flask', 'REST APIs', 'Webhooks'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Databases</div>
                  <div className={styles.skillItems}>
                    {['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Prisma', 'SQL Scripting'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Fintech</div>
                  <div className={styles.skillItems}>
                    {['M-PESA Daraja API', 'STK Push', 'B2C/C2B Flows', 'Webhooks', 'Mini Program Studio', 'Safaricom UX Guidelines'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Tools & DevOps</div>
                  <div className={styles.skillItems}>
                    {['Git', 'GitHub', 'Postman', 'CI/CD Pipelines', 'Linux/Unix', 'Docker (familiar)', 'Jira', 'Deployment Workflows'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.skillGroup}>
                  <div className={styles.skillLabel}>Soft Skills</div>
                  <div className={styles.skillItems}>
                    {['Problem Solving', 'Agile Collaboration', 'Code Reviews', 'Documentation', 'Team Collaboration'].map(skill => (
                      <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className={styles.sidebarSection}>
                <h3>EDUCATION</h3>
                <div className={styles.eduItem}>
                  <div className={styles.eduYear}>Jun 2024 – Nov 2024</div>
                  <div className={styles.eduDegree}>Certificate in Software Engineering</div>
                  <div className={styles.eduSchool}>Moringa School</div>
                  <div className={styles.eduDetail}>Certified Full-Stack Engineer — JavaScript, React.js, Django, Node.js, REST APIs, PostgreSQL, Git, M-PESA Daraja API.</div>
                </div>
                <div className={styles.eduItem}>
                  <div className={styles.eduYear}>Expected Dec 2026</div>
                  <div className={styles.eduDegree}>Diploma in Software Engineering</div>
                  <div className={styles.eduSchool}>Zetech University</div>
                </div>
                <div className={styles.eduItem}>
                  <div className={styles.eduYear}>2019 – 2022</div>
                  <div className={styles.eduDegree}>Kenya Certificate of Secondary Education</div>
                  <div className={styles.eduSchool}>Kasikeu Boys' High School</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.sidebarSection}>
                <h3>LEADERSHIP</h3>
                <p className={styles.leadershipText}>
                  Founded and led a developer community focused on mentorship, technical growth, and portfolio development — helping
                  junior developers build real-world project experience and career readiness.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={styles.sidebarSection}>
                <h3>REFERENCES</h3>
                <div className={styles.refItem}>
                  <div className={styles.refName}>Musa Mutuku</div>
                  <div className={styles.refTitle}>Senior Counsel, Musa & Musa Advocates</div>
                  <a href="tel:+254758251399">+254 758 251 399</a>
                </div>
                <div className={styles.refItem}>
                  <div className={styles.refName}>Euniter Mumbua</div>
                  <div className={styles.refTitle}>Administrator, Majib Al Futtaim</div>
                  <a href="tel:+254726930726">+254 726 930 726</a>
                </div>
                <div className={styles.refItem}>
                  <div className={styles.refName}>Lilian Ndanu</div>
                  <div className={styles.refTitle}>Administrator, Forbes Global Kenya</div>
                  <a href="tel:+254794378010">+254 794 378 010</a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.5}>
          <div className={styles.footer}>
            <p>Joshua Mwendwa · <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer">github.com/hit-sharq</a> · <a href="https://mutuku-joshua.vercel.app" target="_blank" rel="noopener noreferrer">mutuku-joshua.vercel.app</a> · +254 794 773 452</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
