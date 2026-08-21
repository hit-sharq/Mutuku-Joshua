import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { generateSlug, ensureUniqueSlug } from "@/lib/slug"

export async function GET() {
  try {
    await requireAdmin()

    const newsItems = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(newsItems)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, content, excerpt, image, link, featured, published, order, slug } = await request.json()

    const baseSlug = slug && slug.trim() ? slug.trim() : generateSlug(title)
    const finalSlug = await ensureUniqueSlug(baseSlug, "news")

    const newsItem = await prisma.news.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt,
        image,
        link,
        featured: featured || false,
        published: published || false,
        order: order || 0,
      },
    })

    return NextResponse.json(newsItem, { status: 201 })
  } catch (error) {
    console.error("Error creating news item:", error)
    return NextResponse.json({ error: "Failed to create news item" }, { status: 500 })
  }
}
