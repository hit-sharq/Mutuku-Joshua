
"use client"

import type React from "react"
import { useState } from "react"

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
    <div className="section">
      <div className="container">
        {/* Hero Section - Enhanced */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "4rem",
          background: "linear-gradient(135deg, #1a365d 0%, #2d4a7c 50%, #1a365d 100%)",
          padding: "4rem 2rem",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(26, 54, 93, 0.3)"
        }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>💻</div>
            <h1 style={{ color: "white", fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>Contact Mutuku Joshua</h1>
            <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "1.1rem", lineHeight: "1.6" }}>
              Ready to start your next project? Get in touch with me today to discuss your development needs and learn how I
              can help bring your ideas to life with clean, efficient code.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "20px", color: "white", fontSize: "0.9rem", backdropFilter: "blur(10px)" }}>🚀 Fast Response</span>
              <span style={{ background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "20px", color: "white", fontSize: "0.9rem", backdropFilter: "blur(10px)" }}>💼 Professional Service</span>
              <span style={{ background: "rgba(255,255,255,0.2)", padding: "0.5rem 1rem", borderRadius: "20px", color: "white", fontSize: "0.9rem", backdropFilter: "blur(10px)" }}>✅ Quality Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: "4rem", alignItems: "start" }}>
          {/* Contact Form */}
          <div className="card" style={{ position: "relative", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
            {isSubmitting && (
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: "rgba(255, 255, 255, 0.95)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: "16px", 
                zIndex: 10 
              }}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "4px solid #e2e8f0",
                      borderTop: "4px solid #1a365d",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto 1rem",
                    }}
                  ></div>
                  <p style={{ color: "#1a365d", fontWeight: "600", fontSize: "1.1rem" }}>Sending your message...</p>
                </div>
              </div>
            )}

            <div className={isSubmitting ? "form-disabled" : ""}>
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📨</div>
                <h3 style={{ color: "#1a365d", marginBottom: "0.5rem", fontSize: "1.5rem", fontWeight: "700" }}>Send a Message</h3>
                <p style={{ color: "#64748b" }}>Fill out the form below and I'll get back to you within 24 hours.</p>
              </div>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    marginBottom: "2rem",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎉</div>
                  <h4 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "700" }}>Message Sent Successfully!</h4>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: "0.95rem" }}>
                    Thank you for reaching out. I'll review your message and respond within 24 hours.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    marginBottom: "2rem",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚠️</div>
                  <h4 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: "700" }}>Error Sending Message</h4>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: "0.95rem" }}>
                    {errorMessage || "There was an error. Please try again or contact me directly."}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="grid grid-2" style={{ gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="name" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
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
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc"
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#1a365d"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="email" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
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
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc"
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#1a365d"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>
                </div>

                <div className="grid grid-2" style={{ gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="phone" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
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
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc"
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#1a365d"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="company" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
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
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "10px",
                        border: "2px solid #e2e8f0",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc"
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#1a365d"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="subject" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
                    Project Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    style={{
                      padding: "0.875rem 1rem",
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      background: "#f8fafc",
                      cursor: "pointer"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#1a365d"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
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

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="message" style={{ color: "#1e293b", fontWeight: "600", fontSize: "0.9rem" }}>
                    Message <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your project requirements in detail. Include information about your goals, timeline, budget, and any specific features you need..."
                    rows={6}
                    disabled={isSubmitting}
                    style={{
                      padding: "1rem",
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                      outline: "none",
                      background: "#f8fafc",
                      resize: "vertical",
                      minHeight: "150px",
                      fontFamily: "inherit"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#1a365d"; e.target.style.background = "#fff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "1rem 2rem",
                    background: isSubmitting ? "#94a3b8" : "linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isSubmitting ? "none" : "0 4px 15px rgba(26, 54, 93, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                  onMouseOver={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(26, 54, 93, 0.4)"; }}}
                  onMouseOut={(e) => { if (!isSubmitting) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(26, 54, 93, 0.3)"; }}}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ opacity: 0.8 }}>Sending...</span>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                    </>
                  ) : (
                    <>
                      <span>🚀</span> Send Message
                    </>
                  )}
                </button>
              </form>

              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  color: "#0369a1",
                  textAlign: "center",
                  border: "1px solid #bae6fd"
                }}
              >
                <p style={{ margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  🔒 Your information is secure. I respect your privacy and will never share your details.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Contact Info Card */}
            <div className="card" style={{ padding: "2rem", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📬</div>
                <h3 style={{ color: "#1a365d", fontSize: "1.5rem", fontWeight: "700" }}>Get in Touch</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%)",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "12px",
                      fontSize: "1.25rem",
                      minWidth: "50px",
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(26, 54, 93, 0.3)"
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <h4 style={{ color: "#1e293b", marginBottom: "0.25rem", fontWeight: "600" }}>Email</h4>
                    <p style={{ margin: 0, marginBottom: "0.25rem" }}>
                      <a href="mailto:officialjoshuamwendwa@gmail.com" style={{ color: "#1a365d", textDecoration: "none", fontWeight: "500" }}>
                        officialjoshuamwendwa@gmail.com
                      </a>
                    </p>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>I typically respond within 24 hours</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%)",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "12px",
                      fontSize: "1.25rem",
                      minWidth: "50px",
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(26, 54, 93, 0.3)"
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <h4 style={{ color: "#1e293b", marginBottom: "0.25rem", fontWeight: "600" }}>Phone</h4>
                    <p style={{ margin: 0, marginBottom: "0.25rem" }}>
                      <a href="tel:+254794773452" style={{ color: "#1a365d", textDecoration: "none", fontWeight: "500" }}>
                        +254 794 773 452
                      </a>
                    </p>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Available Mon-Sat, 9AM-7PM</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%)",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "12px",
                      fontSize: "1.25rem",
                      minWidth: "50px",
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(26, 54, 93, 0.3)"
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <h4 style={{ color: "#1e293b", marginBottom: "0.25rem", fontWeight: "600" }}>Location</h4>
                    <p style={{ margin: 0, lineHeight: "1.6", color: "#475569" }}>
                      Nairobi, Kenya
                      <br />
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Available for remote work worldwide</span>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%)",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "12px",
                      fontSize: "1.25rem",
                      minWidth: "50px",
                      textAlign: "center",
                      boxShadow: "0 4px 10px rgba(26, 54, 93, 0.3)"
                    }}
                  >
                    🕒
                  </div>
                  <div>
                    <h4 style={{ color: "#1e293b", marginBottom: "0.5rem", fontWeight: "600" }}>Availability</h4>
                    <div style={{ color: "#475569", fontSize: "0.9rem" }}>
                      <p style={{ margin: "0.25rem 0" }}>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p style={{ margin: "0.25rem 0" }}>Sunday: By Appointment</p>
                      <p style={{ margin: "0.75rem 0 0", color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.2rem" }}>✅</span> Open for freelance projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="card" style={{ padding: "2rem", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔗</div>
                <h3 style={{ color: "#1a365d", fontSize: "1.25rem", fontWeight: "700" }}>Connect With Me</h3>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href="https://github.com/hit-sharq"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "#1e293b",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🐙</span> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "#0077b5",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
                >
                  <span style={{ fontSize: "1.2rem" }}>💼</span> LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/j_lee087"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
                >
                  <span style={{ fontSize: "1.2rem" }}>📷</span> Instagram
                </a>
                <a
                  href="https://wa.me/+25492687584"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    background: "#25d366",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
                >
                  <span style={{ fontSize: "1.2rem" }}>💬</span> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Projects Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            padding: "4rem 2rem",
            borderRadius: "20px",
            textAlign: "center",
            marginTop: "4rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)"
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚡</div>
            <h3 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "700" }}>Have an Urgent Project?</h3>
            <p style={{ fontSize: "1.15rem", marginBottom: "2rem", opacity: "0.95", maxWidth: "600px", margin: "0 auto 2rem" }}>
              Got a tight deadline? I specialize in delivering quality work on time. Reach out and let's discuss your timeline.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="tel:+254794773452"
                style={{
                  background: "white",
                  color: "#059669",
                  padding: "1rem 2rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)"; }}
              >
                📞 Call: +254 794 773 452
              </a>
              <a
                href="mailto:officialjoshuamwendwa@gmail.com"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  border: "2px solid white",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
              >
                📧 Quick Email
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>❓</div>
            <h2 style={{ color: "#1a365d", fontSize: "2rem", fontWeight: "700" }}>Frequently Asked Questions</h2>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>Quick answers to common questions</p>
          </div>
          <div className="grid grid-2" style={{ gap: "2rem" }}>
            <div className="card" style={{ padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏱️</div>
              <h4 style={{ color: "#1e293b", marginBottom: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>How quickly can you start on my project?</h4>
              <p style={{ color: "#64748b", margin: 0, lineHeight: "1.7" }}>
                I can typically begin within 1-2 days of project confirmation. For urgent projects, I can start immediately upon discussion.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌍</div>
              <h4 style={{ color: "#1e293b", marginBottom: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>Do you work with international clients?</h4>
              <p style={{ color: "#64748b", margin: 0, lineHeight: "1.7" }}>
                Absolutely! I work with clients worldwide remotely. I'm comfortable with different time zones and communication preferences.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📅</div>
              <h4 style={{ color: "#1e293b", marginBottom: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>
                What is your typical project timeline?
              </h4>
              <p style={{ color: "#64748b", margin: 0, lineHeight: "1.7" }}>
                Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex applications may take 1-3 months. I'll provide a detailed timeline after understanding your requirements.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔧</div>
              <h4 style={{ color: "#1e293b", marginBottom: "1rem", fontWeight: "600", fontSize: "1.1rem" }}>Do you offer post-development support?</h4>
              <p style={{ color: "#64748b", margin: 0, lineHeight: "1.7" }}>
                Yes! I offer ongoing maintenance and support packages to ensure your application runs smoothly after launch.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .form-disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

