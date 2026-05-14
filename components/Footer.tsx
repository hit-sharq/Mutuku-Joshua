import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mutuku Joshua</h3>
            <p className="text-sm opacity-90">Fullstack Developer</p>
            <p>Crafting Code That Works</p>
            <p>Building scalable web applications and digital solutions with modern technologies.</p>
            <div className="mt-4" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <a
                href="mailto:officialjoshuamwendwa@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Gmail"
              >
                <img src="https://skillicons.dev/icons?i=gmail" alt="Gmail" style={{ width: "20px", height: "20px" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" style={{ width: "20px", height: "20px" }} />
              </a>
              <a
                href="https://github.com/hit-sharq"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <img src="https://skillicons.dev/icons?i=github" alt="GitHub" style={{ width: "20px", height: "20px" }} />
              </a>
              <a
                href="https://wa.me/+25492687584"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: "20px", height: "20px" }} />
              </a>
              <a
                href="https://www.instagram.com/j_lee087"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <img src="https://skillicons.dev/icons?i=instagram" alt="Instagram" style={{ width: "20px", height: "20px" }} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <p>
              <Link href="/services">Web Development</Link>
            </p>
            <p>
              <Link href="/services">Mobile Apps</Link>
            </p>
            <p>
              <Link href="/services">API Development</Link>
            </p>
            <p>
              <Link href="/services">Database Design</Link>
            </p>
            <p>
              <Link href="/services">Cloud Solutions</Link>
            </p>
            <p>
              <Link href="/services">View All Services</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>
              <Link href="/about">About Me</Link>
            </p>
            <p>
              <Link href="/services">Services</Link>
            </p>
            <p>
              <Link href="/blog">Blog</Link>
            </p>
            <p>
              <Link href="/news">News</Link>
            </p>
            <p>
              <Link href="/contact">Contact</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>All Technologies</h3>
            <div style={{ fontSize: "0.75rem" }}>
              <p style={{ margin: "0.25rem 0" }}><strong>Frontend:</strong> <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a> | <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a> | <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue</a> | <a href="https://angular.io" target="_blank" rel="noopener noreferrer">Angular</a> | <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a> | <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">TypeScript</a> | <a href="https://www.javascript.com" target="_blank" rel="noopener noreferrer">JavaScript</a> | <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a></p>
              <p style={{ margin: "0.25rem 0" }}><strong>Backend:</strong> <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a> | <a href="https://expressjs.com" target="_blank" rel="noopener noreferrer">Express</a> | <a href="https://nestjs.com" target="_blank" rel="noopener noreferrer">NestJS</a> | <a href="https://www.python.org" target="_blank" rel="noopener noreferrer">Python</a> | <a href="https://www.java.com" target="_blank" rel="noopener noreferrer">Java</a> | <a href="https://dotnet.microsoft.com" target="_blank" rel="noopener noreferrer">.NET</a> | <a href="https://go.dev" target="_blank" rel="noopener noreferrer">Go</a> | <a href="https://www.php.net" target="_blank" rel="noopener noreferrer">PHP</a></p>
              <p style={{ margin: "0.25rem 0" }}><strong>Mobile:</strong> <a href="https://reactnative.dev" target="_blank" rel="noopener noreferrer">React Native</a> | <a href="https://flutter.dev" target="_blank" rel="noopener noreferrer">Flutter</a> | <a href="https://developer.apple.com/swift" target="_blank" rel="noopener noreferrer">Swift</a> | <a href="https://kotlinlang.org" target="_blank" rel="noopener noreferrer">Kotlin</a></p>
              <p style={{ margin: "0.25rem 0" }}><strong>Database &amp; Auth:</strong> <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer">Prisma ORM</a> | <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer">PostgreSQL</a> | <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer">MongoDB</a> | <a href="https://neon.tech" target="_blank" rel="noopener noreferrer">Neon</a> | <a href="https://clerk.com" target="_blank" rel="noopener noreferrer">Clerk</a></p>
              <p style={{ margin: "0.25rem 0" }}><strong>DevOps &amp; Cloud:</strong> <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">AWS</a> | <a href="https://cloud.google.com" target="_blank" rel="noopener noreferrer">GCP</a> | <a href="https://azure.microsoft.com" target="_blank" rel="noopener noreferrer">Azure</a> | <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer">Docker</a> | <a href="https://kubernetes.io" target="_blank" rel="noopener noreferrer">Kubernetes</a> | <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a> | <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">Git</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Mutuku Joshua. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Fullstack Developer | Building Digital Solutions
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms-of-use" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
