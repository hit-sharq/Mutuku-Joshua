import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/Mutuku.JPG"
                alt="Mutuku Joshua"
                className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-gray-300"
              />
              <div>
                <h3>Mutuku Joshua</h3>
                <p className="text-sm opacity-90">Fullstack Developer</p>
              </div>
            </div>
            <p>Crafting Code That Works</p>
            <p>Building scalable web applications and digital solutions with modern technologies.</p>
            <div className="mt-4" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href="mailto:officialjoshuamwendwa@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Gmail"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "#f1f5f9", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=gmail" alt="Gmail" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "#f1f5f9", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://github.com/hit-sharq"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "#f1f5f9", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=github" alt="GitHub" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://wa.me/+25492687584"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "#f1f5f9", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: "24px", height: "24px" }} />
              </a>
              <a
                href="https://www.instagram.com/j_lee087"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "#f1f5f9", borderRadius: "8px", transition: "all 0.2s ease" }}
              >
                <img src="https://skillicons.dev/icons?i=instagram" alt="Instagram" style={{ width: "24px", height: "24px" }} />
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
              <Link href="/contact">Contact</Link>
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📧 officialjoshuamwendwa@gmail.com</p>
            <p>📞 +254 794 773 452</p>
            <p>📍 Nairobi, Kenya</p>
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Availability</h4>
              <p className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-sm">Sunday: By Appointment</p>
              <p className="text-sm" style={{ marginTop: "0.5rem", color: "#48bb78" }}>
                ✓ Open for freelance projects
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Tech Stack</h3>
            <div className="flex flex-col space-y-2">
              <p>
                <span style={{ marginRight: "0.5rem" }}>⚛️</span> React / Next.js
              </p>
              <p>
                <span style={{ marginRight: "0.5rem" }}>🟢</span> Node.js / Express
              </p>
              <p>
                <span style={{ marginRight: "0.5rem" }}>🐍</span> Python
              </p>
              <p>
                <span style={{ marginRight: "0.5rem" }}>🗄️</span> PostgreSQL / MongoDB
              </p>
              <p>
                <span style={{ marginRight: "0.5rem" }}>🐳</span> Docker / AWS
              </p>
              <p>
                <span style={{ marginRight: "0.5rem" }}>📱</span> React Native
              </p>
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
