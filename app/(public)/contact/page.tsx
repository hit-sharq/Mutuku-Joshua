'use client'

import { useState } from "react"
import styles from "./contact.module.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.contactGrid}>
        {/* LEFT: info */}
        <div className={styles.contactLeft}>
        <div className={styles.secEyebrow}>ENGAGE</div>
        <div className={styles.secTitle}>Let&apos;s build something<br />that outlasts us.</div>
          <p className={styles.aboutP} style={{ marginTop: 8 }}>
            Whether you need a website, a web app, a design system, or a full product — I&apos;m available for freelance projects, full-time roles, and collaborations.
          </p>
          <div className={styles.availBadge}><span className={styles.availDot}></span>Accepting engagements</div>

          <div className={styles.cInfoRows}>
            <div className={styles.cRow}>
              <div className={styles.cIcon}>✉</div>
              <div>
                <div className={styles.cLabel}>DIRECT LINE</div>
                <div className={styles.cVal}>officialjoshuamwendwa@gmail.com</div>
              </div>
            </div>
            <div className={styles.cRow}>
              <div className={styles.cIcon}>⚲</div>
              <div>
                <div className={styles.cLabel}>COORDINATES</div>
                <div className={styles.cVal}>Nairobi, Kenya · Available remotely</div>
              </div>
            </div>
            <div className={styles.cRow}>
              <div className={styles.cIcon}>◍</div>
              <div>
                <div className={styles.cLabel}>DIGITAL FOOTPRINT</div>
                <div className={styles.cVal}>lumyn.co.ke</div>
              </div>
            </div>
          </div>

          <div className={styles.socialRow}>
            <a href="https://github.com/hit-sharq" target="_blank" rel="noopener noreferrer" className={styles.socBtn} title="GitHub">⌥</a>
            <a href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/" target="_blank" rel="noopener noreferrer" className={styles.socBtn} title="LinkedIn">in</a>
            <a href="https://www.instagram.com/j_lee087" target="_blank" rel="noopener noreferrer" className={styles.socBtn} title="Instagram">◎</a>
            <a href="https://wa.me/+25492687584" target="_blank" rel="noopener noreferrer" className={styles.socBtn} title="WhatsApp">✆</a>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className={styles.contactRight}>
          <div className={styles.secEyebrow} style={{ marginBottom: 16 }}>TRANSMIT</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.fLabel}>YOUR NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Mutuku Joshua"
                  disabled={isSubmitting}
                  className={styles.fInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.fLabel}>EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="officialjoshuamwendwa@gmail.com"
                  disabled={isSubmitting}
                  className={styles.fInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.fLabel}>PROJECT TYPE</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={styles.fInput}
                style={{ appearance: "none", cursor: "pointer" }}
              >
                <option value="">What&apos;s this about?</option>
                <option value="Web Development">🌐 Web Development</option>
                <option value="Mobile App">📱 Mobile App</option>
                <option value="API Development">🔌 API Development</option>
                <option value="Database Design">🗄️ Database Design</option>
                <option value="E-commerce">🛒 E-commerce</option>
                <option value="SaaS Application">☁️ SaaS Application</option>
                <option value="Consulting">💡 Technical Consulting</option>
                <option value="Maintenance">🔧 App Maintenance</option>
                <option value="Other">📋 Other Project</option>
              </select>
            </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.fLabel}>BRIEF</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                      rows={5}
                      disabled={isSubmitting}
                      className={styles.fInput}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className={styles.successMessage}>✓ Message received. I&apos;ll respond within 24 hours.</div>
                  )}
                  {submitStatus === "error" && (
                    <div className={styles.errorMessage}>✕ {errorMessage || "Something went wrong. Please try again."}</div>
                  )}

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? "TRANSMITTING…" : "TRANSMIT →"}
                  </button>
          </form>
        </div>
      </div>
    </div>
  )
}
