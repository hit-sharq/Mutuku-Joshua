import Link from "next/link"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Mutuku Joshua</h3>
            <p className={styles.footerText}>Fullstack Developer</p>
            <p className={styles.footerDesc}>
              Crafting Code That Works. Building scalable web applications and digital solutions with modern technologies.
            </p>
            <div className={styles.socialLinks}>
              <a href="mailto:officialjoshua@lumyn.co.ke" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Email">
                📧
              </a>
              <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="LinkedIn">
                💼
              </a>
              <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="GitHub">
                🐙
              </a>
              <a href="https://wa.me/+25492687584" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="WhatsApp">
                💬
              </a>
              <a href="https://www.instagram.com/j_lee087" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Instagram">
                📷
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Services</h4>
            <nav className={styles.footerLinks}>
              <Link href="/services" className={styles.navLink}>Web Development</Link>
              <Link href="/services" className={styles.navLink}>Mobile Apps</Link>
              <Link href="/services" className={styles.navLink}>API Development</Link>
              <Link href="/services" className={styles.navLink}>Database Design</Link>
              <Link href="/services" className={styles.navLink}>Cloud Solutions</Link>
              <Link href="/services" className={styles.navLink}>View All</Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <nav className={styles.footerLinks}>
              <Link href="/about" className={styles.navLink}>About Me</Link>
              <Link href="/services" className={styles.navLink}>Services</Link>
              <Link href="/blog" className={styles.navLink}>Blog</Link>
              <Link href="/news" className={styles.navLink}>News</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </nav>
          </div>

          {/* Technologies */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Technologies</h4>
            <div className={styles.techList}>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>React</a>
              <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Next.js</a>
              <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Vue</a>
              <a href="https://angular.io/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Angular</a>
              <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Svelte</a>
              <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>TypeScript</a>
              <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Node.js</a>
              <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>NestJS</a>
              <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Python</a>
              <a href="https://dotnet.microsoft.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>.NET</a>
              <a href="https://go.dev/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Go</a>
              <a href="https://reactnative.dev/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>React Native</a>
              <a href="https://flutter.dev/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Flutter</a>
              <a href="https://developer.apple.com/swift/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Swift</a>
              <a href="https://kotlinlang.org/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Kotlin</a>
              <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>AWS</a>
              <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>GCP</a>
              <a href="https://azure.microsoft.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Azure</a>
              <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Docker</a>
              <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Kubernetes</a>
              <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className={styles.techBadge}>Vercel</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Under All Columns */}
        <div className={styles.footerBottom}>
          <p className={styles.managedBy}>
            System managed by <a href="https://www.lumyn.co.ke/" target="_blank" rel="noopener noreferrer" className={styles.managedLink}>Lumyn Technologies</a>
          </p>
          <p className={styles.copyright}>© 2025 Mutuku Joshua. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.legalDivider}>·</span>
            <Link href="/terms-of-use" className={styles.legalLink}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
