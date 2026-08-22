import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
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

async function sendBlogNotification(post: { title: string; slug: string; summary: string | null }) {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { active: true },
    select: { email: true },
  })

  if (subscribers.length === 0) return

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.lumyn.co.ke"
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const subject = `New Blog Post: ${post.title}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 0.5px solid rgba(184, 150, 12, 0.2);">
      <div style="background: #0f0f0f; border-bottom: 0.5px solid rgba(184, 150, 12, 0.2); padding: 2rem; text-align: center;">
        <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">MUTUKU JOSHUA</div>
        <div style="font-size: 0.75rem; color: rgba(240, 232, 212, 0.5); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;">Fullstack Developer</div>
        <div style="font-size: 0.875rem; color: #5dcaa5; letter-spacing: 0.05em;">📝 New Blog Post Published</div>
      </div>
      
      <div style="padding: 2rem; background: #0a0a0a;">
        <div style="background: #141414; border: 0.5px solid rgba(184, 150, 12, 0.12); padding: 2rem;">
          <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 400; color: #c8a820; margin: 0 0 1rem 0; line-height: 1.3;">
            ${post.title}
          </h2>
          
          ${post.summary ? `<p style="color: rgba(240, 232, 212, 0.7); font-size: 0.9375rem; line-height: 1.7; margin: 0 0 1.5rem 0;">${post.summary}</p>` : ""}
          
          <div style="margin-bottom: 1.5rem;">
            <a href="${postUrl}" style="display: inline-block; padding: 0.75rem 1.5rem; background: #c8a820; color: #0f0f0f; text-decoration: none; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
              Read Full Article
            </a>
          </div>
          
          <p style="color: rgba(240, 232, 212, 0.5); font-size: 0.8125rem; line-height: 1.6; margin: 0;">
            Thanks for being part of the community. Feel free to reply to this email with your thoughts or questions.
          </p>
        </div>
      </div>
      
      <div style="background: #0f0f0f; border-top: 0.5px solid rgba(184, 150, 12, 0.2); padding: 1.5rem; text-align: center;">
        <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.125rem; font-weight: 400; color: #c8a820; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Mutuku Joshua</div>
        <div style="color: rgba(240, 232, 212, 0.4); font-size: 0.75rem; letter-spacing: 0.05em;">
          📧 officialjoshua@lumyn.co.ke · 📞 +254 794 773 452 · 📍 Nairobi, Kenya
        </div>
      </div>
    </div>
  `

  const sendPromises = subscribers.map((subscriber) =>
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: subscriber.email,
      subject,
      html,
    }).catch((error) => {
      console.error(`Failed to send newsletter to ${subscriber.email}:`, error)
    })
  )

  await Promise.all(sendPromises)
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    const total = await prisma.newsletterSubscriber.count({
      where: { active: true },
    })

    return NextResponse.json({ subscribers, total })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const { title, postUrl } = await request.json()

    if (!title || !postUrl) {
      return NextResponse.json(
        { error: "Title and postUrl are required" },
        { status: 400 }
      )
    }

    const post = { title, slug: postUrl.split("/blog/").pop() || postUrl, summary: null }

    await sendBlogNotification(post)

    return NextResponse.json(
      { message: "Newsletter sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json(
      { error: "Failed to send newsletter" },
      { status: 500 }
    )
  }
}
