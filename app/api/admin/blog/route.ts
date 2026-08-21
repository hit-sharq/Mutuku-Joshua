import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { generateSlug, ensureUniqueSlug } from "@/lib/slug"

export async function GET() {
  try {
    await requireAdmin()

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const { title, content, summary, image, published, slug } = await request.json()

    const baseSlug = slug && slug.trim() ? slug.trim() : generateSlug(title)
    const finalSlug = await ensureUniqueSlug(baseSlug, "blogPost")

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        content,
        summary,
        image,
        published: published || false,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
