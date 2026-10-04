import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

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

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (!existing.active) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { active: true },
        })
        return NextResponse.json(
          { message: "Welcome back! Your subscription has been reactivated." },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { message: "You're already subscribed! Watch for updates." },
        { status: 200 }
      )
    }

    await prisma.newsletterSubscriber.create({
      data: { email },
    })

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 0.5px solid rgba(184, 150, 12, 0.2);">
        <div style="background: #0f0f0f; border-bottom: 0.5px solid rgba(184, 150, 12, 0.2); padding: 2rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MUTUKU JOSHUA</div>
          <div style="font-size: 0.75rem; color: rgba(240, 232, 212, 0.5); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;">Fullstack Developer</div>
          <div style="font-size: 0.875rem; color: #5dcaa5; letter-spacing: 0.05em;">✓ Welcome to the Newsletter</div>
        </div>
        
        <div style="padding: 2rem; background: #0a0a0a;">
          <div style="background: #141414; border: 0.5px solid rgba(184, 150, 12, 0.12); padding: 2rem;">
            <p style="color: rgba(240, 232, 212, 0.8); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1.5rem 0;">Thank you for subscribing!</p>
            
            <p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1rem 0;">You'll receive updates about:</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; color: rgba(240, 232, 212, 0.75); font-size: 0.875rem;">
                <span style="color: #c8a820;">→</span> Latest blog posts and tutorials
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem; color: rgba(240, 232, 212, 0.75); font-size: 0.875rem;">
                <span style="color: #c8a820;">→</span> Project showcases and case studies
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem; color: rgba(240, 232, 212, 0.75); font-size: 0.875rem;">
                <span style="color: #c8a820;">→</span> Industry insights and best practices
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem; color: rgba(240, 232, 212, 0.75); font-size: 0.875rem;">
                <span style="color: #c8a820;">→</span> Exclusive tips and resources
              </div>
            </div>
            
            <p style="color: rgba(240, 232, 212, 0.5); font-size: 0.8125rem; line-height: 1.6; margin: 0;">We respect your privacy and won't spam you. Unsubscribe anytime.</p>
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

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    )
  }
}
