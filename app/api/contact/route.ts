import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface RateLimitEntry {
  count: number
  firstAttempt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now })
    return true
  }

  if (now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const { name, email, phone, company, subject, message, website } = await request.json()

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    if (website && website.trim() !== "") {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 })
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 })
    }

    let contactRequest
    try {
      contactRequest = await prisma.contactRequest.create({
        data: {
          name,
          email,
          phone: phone || "",
          company: company || "",
          subject,
          message,
        },
      })
    } catch (dbError) {
      console.warn("Database save failed, proceeding with email only:", dbError)
      contactRequest = {
        id: `temp-${Date.now()}`,
        name,
        email,
        phone: phone || "",
        company: company || "",
        subject,
        message,
        createdAt: new Date(),
      }
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 0.5px solid rgba(184, 150, 12, 0.2);">
        <div style="background: #0f0f0f; border-bottom: 0.5px solid rgba(184, 150, 12, 0.2); padding: 2rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MUTUKU JOSHUA</div>
          <div style="font-size: 0.75rem; color: rgba(240, 232, 212, 0.5); letter-spacing: 0.15em; text-transform: uppercase;">Fullstack Developer</div>
        </div>

        <div style="padding: 2rem; background: #0a0a0a;">
          <div style="background: #141414; border: 0.5px solid rgba(184, 150, 12, 0.12); padding: 2rem;">
            <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.15em; color: #c8a820; text-transform: uppercase; margin-bottom: 1.5rem;">📋 Contact Details</div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div style="padding: 1rem; background: rgba(184, 150, 12, 0.04); border-left: 2px solid rgba(184, 150, 12, 0.2);">
                <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.25rem;">👤 Name</div>
                <div style="color: #faf7f2; font-size: 0.9375rem;">${name}</div>
              </div>

              <div style="padding: 1rem; background: rgba(184, 150, 12, 0.04); border-left: 2px solid rgba(184, 150, 12, 0.2);">
                <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.25rem;">📧 Email</div>
                <div style="color: #c8a820; font-size: 0.9375rem;">${email}</div>
              </div>

              ${phone ? `
              <div style="padding: 1rem; background: rgba(184, 150, 12, 0.04); border-left: 2px solid rgba(184, 150, 12, 0.2);">
                <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.25rem;">📞 Phone</div>
                <div style="color: #faf7f2; font-size: 0.9375rem;">${phone}</div>
              </div>
              ` : ''}

              ${company ? `
              <div style="padding: 1rem; background: rgba(184, 150, 12, 0.04); border-left: 2px solid rgba(184, 150, 12, 0.2);">
                <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.25rem;">🏢 Company</div>
                <div style="color: #faf7f2; font-size: 0.9375rem;">${company}</div>
              </div>
              ` : ''}
            </div>

            <div style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.5rem;">📋 Project Type</div>
              <div style="display: inline-block; padding: 0.375rem 0.75rem; background: rgba(184, 150, 12, 0.08); border: 0.5px solid rgba(184, 150, 12, 0.15); color: #c8a820; font-size: 0.8125rem; letter-spacing: 0.05em;">${subject}</div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase; margin-bottom: 0.5rem;">💬 Message</div>
              <div style="background: rgba(184, 150, 12, 0.03); border-left: 2px solid rgba(184, 150, 12, 0.3); padding: 1.25rem; color: rgba(240, 232, 212, 0.75); font-size: 0.9375rem; line-height: 1.7;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>

            <div style="background: rgba(93, 202, 165, 0.08); border: 0.5px solid rgba(93, 202, 165, 0.2); border-left: 2px solid #5dcaa5; padding: 1rem;">
              <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: #5dcaa5; text-transform: uppercase; margin-bottom: 0.5rem;">📅 Received</div>
              <div style="color: rgba(240, 232, 212, 0.7); font-size: 0.875rem;">${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</div>
              <div style="font-size: 0.75rem; color: rgba(240, 232, 212, 0.4); margin-top: 0.25rem;">Request ID: ${contactRequest.id}</div>
            </div>
          </div>
        </div>

        <div style="background: #0f0f0f; border-top: 0.5px solid rgba(184, 150, 12, 0.2); padding: 1.5rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.125rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.25rem;">Mutuku Joshua</div>
          <div style="color: rgba(240, 232, 212, 0.4); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Professional Fullstack Development Services · Nairobi, Kenya</div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "officialjoshua@lumyn.co.ke",
      subject: `New Contact Request: ${subject}`,
      html: emailHtml,
      replyTo: email,
    })

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 0.5px solid rgba(184, 150, 12, 0.2);">
        <div style="background: #0f0f0f; border-bottom: 0.5px solid rgba(184, 150, 12, 0.2); padding: 2rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MUTUKU JOSHUA</div>
          <div style="font-size: 0.75rem; color: rgba(240, 232, 212, 0.5); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;">Fullstack Developer</div>
          <div style="font-size: 0.875rem; color: #5dcaa5; letter-spacing: 0.05em;">✓ Contact Request Received</div>
        </div>

        <div style="padding: 2rem; background: #0a0a0a;">
          <div style="background: #141414; border: 0.5px solid rgba(184, 150, 12, 0.12); padding: 2rem;">
            <p style="color: rgba(240, 232, 212, 0.8); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1.5rem 0;">Dear <strong style="color: #faf7f2;">${name}</strong>,</p>
            
            <p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1.5rem 0;">
              Thank you for reaching out. We have received your message regarding "<strong style="color: #c8a820;">${subject}</strong>" and will review it promptly.
            </p>
            
            <p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1.5rem 0;">
              I typically respond to all inquiries within 24 hours during business days. If your matter is urgent, please don't hesitate to call me directly at <strong style="color: #faf7f2;">+254 794 773 452</strong>.
            </p>
            
            <div style="background: rgba(184, 150, 12, 0.04); border-left: 2px solid rgba(184, 150, 12, 0.3); padding: 1.25rem; margin: 1.5rem 0;">
              <div style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: #c8a820; text-transform: uppercase; margin-bottom: 0.75rem;">Your Message Summary</div>
              <div style="margin-bottom: 0.5rem;">
                <span style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase;">Project Type:</span>
                <span style="color: #faf7f2; font-size: 0.875rem; margin-left: 0.5rem;">${subject}</span>
              </div>
              <div>
                <span style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(240, 232, 212, 0.4); text-transform: uppercase;">Message:</span>
                <span style="color: rgba(240, 232, 212, 0.7); font-size: 0.875rem; margin-left: 0.5rem;">${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</span>
              </div>
            </div>
            
            <p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 0;">
              I look forward to discussing your project requirements and how I can help bring your ideas to life!
            </p>
            
            <p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 1.5rem 0 0 0;">
              Best regards,<br>
              <strong style="color: #faf7f2;">Mutuku Joshua</strong><br>
              <span style="color: rgba(240, 232, 212, 0.4); font-size: 0.8125rem;">Fullstack Developer</span>
            </p>
          </div>
        </div>
        
        <div style="background: #0f0f0f; border-top: 0.5px solid rgba(184, 150, 12, 0.2); padding: 1.5rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.125rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Mutuku Joshua</div>
          <div style="color: rgba(240, 232, 212, 0.4); font-size: 0.75rem; letter-spacing: 0.05em;">📧 officialjoshua@lumyn.co.ke · 📞 +254 794 773 452 · 📍 Nairobi, Kenya</div>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Mutuku Joshua - Fullstack Developer",
      html: confirmationHtml,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        id: contactRequest.id,
        dbSaved: !contactRequest.id.startsWith('temp-'),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing contact request:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again or contact us directly." },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contact requests:", error)
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 })
  }
}
