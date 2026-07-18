import { type NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 2rem; text-align: center;">
          <h2>💻 Mutuku Joshua</h2>
          <h3>Welcome to the Newsletter</h3>
          <p>You&apos;ve been successfully subscribed to our newsletter</p>
        </div>
        
        <div style="padding: 2rem; background: #f7fafc;">
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p>Thank you for subscribing!</p>
            
            <p>You&apos;ll receive updates about:</p>
            <ul>
              <li>Latest blog posts and tutorials</li>
              <li>Project showcases and case studies</li>
              <li>Industry insights and best practices</li>
              <li>Exclusive tips and resources</li>
            </ul>
            
            <p>We respect your privacy and won&apos;t spam you. Unsubscribe anytime.</p>
          </div>
        </div>
        
        <div style="background: #1a365d; color: white; padding: 1rem; text-align: center;">
          <p style="margin: 0;">📧 joshua@lumyn.co.ke | 📞 +254 794 773 452</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Mutuku Joshua's Newsletter",
      html: confirmationHtml,
    })

    return NextResponse.json(
      { message: "Successfully subscribed! Check your email for confirmation." },
      { status: 201 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    )
  }
}
