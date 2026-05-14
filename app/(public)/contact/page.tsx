'use client'

import { useState } from "react"
import AnimatedSection from "@/components/AnimatedSection"
import PremiumButton from "@/components/PremiumButton"
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
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection>
            <div className={styles.heroIcon}>💻</div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className={styles.heroTitle}>Get In Touch</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className={styles.heroSubtitle}>
              Ready to start your next project? Let's discuss your development needs.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>🚀 Fast Response</span>
              <span className={styles.heroBadge}>💼 Professional Service</span>
              <span className={styles.heroBadge}>✅ Quality Guaranteed</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contactLayout}>
            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <div className={styles.formIcon}>📨</div>
                  <h3>Send a Message</h3>
                  <p>Fill out the form below and I'll get back to you within 24 hours.</p>
                </div>

                {submitStatus === "success" && (
                  <div className={styles.successMessage}>
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. I'll review your message and respond within 24 hours.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className={styles.errorMessage}>
                    <h4>Error Sending Message</h4>
                    <p>{errorMessage || "There was an error. Please try again or contact me directly."}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Full Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Mutuku Joshua"
                        disabled={isSubmitting}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="officialjoshuamwendwa@gmail.com"
                        disabled={isSubmitting}
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 700 000 000"
                        disabled={isSubmitting}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.formLabel}>
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company (optional)"
                        disabled={isSubmitting}
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      Project Type <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={styles.formSelect}
                    >
                      <option value="">Select your project type</option>
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
                    <label htmlFor="message" className={styles.formLabel}>
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your project requirements in detail..."
                      rows={6}
                      disabled={isSubmitting}
                      className={styles.formTextarea}
                    />
                  </div>

                  <PremiumButton
                    type="submit"
                    size="lg"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : '🚀 Send Message'}
                  </PremiumButton>

                  <div className={styles.securityNotice}>
                    <span>🔒</span>
                    <span>Your information is secure. I respect your privacy and will never share your details.</span>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Contact Info */}
              <AnimatedSection delay={0.3}>
                <div className={styles.infoCard}>
                  <div className={styles.infoHeader}>
                    <div className={styles.infoIcon}>📬</div>
                    <h3>Get in Touch</h3>
                  </div>

                  <div className={styles.infoItems}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoIconBox}>📧</div>
                      <div className={styles.infoContent}>
                        <h4>Email</h4>
                        <p><a href="mailto:officialjoshuamwendwa@gmail.com">officialjoshuamwendwa@gmail.com</a></p>
                        <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Response within 24 hours</span>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className={styles.infoIconBox}>📞</div>
                      <div className={styles.infoContent}>
                        <h4>Phone</h4>
                        <p><a href="tel:+254794773452">+254 794 773 452</a></p>
                        <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Mon-Sat, 9AM-7PM</span>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className={styles.infoIconBox}>📍</div>
                      <div className={styles.infoContent}>
                        <h4>Location</h4>
                        <p>Nairobi, Kenya<br />
                        <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Available for remote work worldwide</span></p>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className={styles.infoIconBox}>🕒</div>
                      <div className={styles.infoContent}>
                        <h4>Availability</h4>
                        <p style={{ fontSize: "0.9375rem", lineHeight: "1.5" }}>
                          Mon – Sat: 9:00 AM – 7:00 PM EAT<br />
                          Sun: By appointment
                        </p>
                        <div className={styles.availabilityStatus}>
                          <span style={{ fontSize: "1.1rem" }}>✅</span>
                          Open for freelance projects
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection delay={0.4}>
                <div className={styles.socialCard}>
                  <div className={styles.socialHeader}>
                    <div className={styles.socialIcon}>🔗</div>
                    <h3>Connect With Me</h3>
                  </div>

                  <div className={styles.socialLinks}>
                    <a
                      href="https://github.com/hit-sharq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ background: "#1e293b" }}
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ background: "#0077b5" }}
                    >
                      💼 LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/j_lee087"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                    >
                      📷 Instagram
                    </a>
                    <a
                      href="https://wa.me/+25492687584"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ background: "#25d366" }}
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* URGENT CTA */}
      <section className={styles.urgentCta}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.urgentContent}>
              <div className={styles.urgentIcon}>⚡</div>
              <h3>Have an Urgent Project?</h3>
              <p>Got a tight deadline? I specialize in delivering quality work on time. Reach out and let's discuss your timeline.</p>
              <div className={styles.urgentButtons}>
                <PremiumButton
                  href="tel:+254794773452"
                  className={styles.urgentButtonWhite}
                  size="lg"
                >
                  📞 Call: +254 794 773 452
                </PremiumButton>
                <PremiumButton
                  href="mailto:officialjoshuamwendwa@gmail.com"
                  variant="secondary"
                  className={styles.urgentButtonOutline}
                  size="lg"
                >
                  📧 Quick Email
                </PremiumButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.faqSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.faqHeader}>
              <div className={styles.faqIcon}>❓</div>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions</p>
            </div>
          </AnimatedSection>

          <div className={styles.faqGrid}>
            <AnimatedSection delay={0.1}>
              <div className={styles.faqCard}>
                <div className={styles.faqIconCard}>⏱️</div>
                <h4>How quickly can you start on my project?</h4>
                <p>I can typically begin within 1-2 days of project confirmation. For urgent projects, I can start immediately upon discussion.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className={styles.faqCard}>
                <div className={styles.faqIconCard}>🌍</div>
                <h4>Do you work with international clients?</h4>
                <p>Absolutely! I work with clients worldwide remotely. I'm comfortable with different time zones and communication preferences.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={styles.faqCard}>
                <div className={styles.faqIconCard}>📅</div>
                <h4>What is your typical project timeline?</h4>
                <p>Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex applications may take 1-3 months.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={styles.faqCard}>
                <div className={styles.faqIconCard}>🔧</div>
                <h4>Do you offer post-development support?</h4>
                <p>Yes! I offer ongoing maintenance and support packages to ensure your application runs smoothly after launch.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
