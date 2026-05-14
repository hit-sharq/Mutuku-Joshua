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
              <a href="mailto:officialjoshuamwendwa@gmail.com" target="_blank" rel="noopener noreferrer" title="Email" className={styles.socialLink}>
                📧
              </a>
              <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={styles.socialLink}>
                💼
              </a>
              <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer" title="GitHub" className={styles.socialLink}>
                🐙
              </a>
              <a href="https://wa.me/+25492687584" target="_blank" rel="noopener noreferrer" title="WhatsApp" className={styles.socialLink}>
                💬
              </a>
              <a href="https://www.instagram.com/j_lee087" target="_blank" rel="noopener noreferrer" title="Instagram" className={styles.socialLink}>
                📷
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Services</h4>
            <nav className={styles.footerLinks}>
              <Link href="/services">Web Development</Link>
              <Link href="/services">Mobile Apps</Link>
              <Link href="/services">API Development</Link>
              <Link href="/services">Database Design</Link>
              <Link href="/services">Cloud Solutions</Link>
              <Link href="/services">View All</Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <nav className={styles.footerLinks}>
              <Link href="/about">About Me</Link>
              <Link href="/services">Services</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/news">News</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Technologies */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Technologies</h4>
            <div className={styles.techList}>
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>TypeScript</span>
              <span>PostgreSQL</span>
              <span>AWS</span>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2025 Mutuku Joshua. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
