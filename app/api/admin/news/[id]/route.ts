import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { ensureUniqueSlug } from "@/lib/slug"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const newsItem = await prisma.news.findUnique({
      where: { id: unwrappedParams.id },
    })

    if (!newsItem) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 })
    }

    return NextResponse.json(newsItem)
  } catch (error) {
    console.error("Error fetching news item:", error)
    return NextResponse.json({ error: "Failed to fetch news item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    const { title, content, excerpt, image, link, featured, published, order, slug } = await request.json()

    const existing = await prisma.news.findUnique({
      where: { id: unwrappedParams.id },
      select: { slug: true },
    })

    if (!existing) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 })
    }

    const finalSlug = slug
      ? await ensureUniqueSlug(slug, "news", unwrappedParams.id)
      : existing.slug

    const newsItem = await prisma.news.update({
      where: { id: unwrappedParams.id },
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt,
        image,
        link,
        featured,
        published,
        order,
      },
    })

    return NextResponse.json(newsItem)
  } catch (error) {
    console.error("Error updating news item:", error)
    return NextResponse.json({ error: "Failed to update news item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const unwrappedParams = await params

    await prisma.news.delete({
      where: { id: unwrappedParams.id },
    })

    return NextResponse.json({ message: "News item deleted successfully" })
  } catch (error) {
    console.error("Error deleting news item:", error)
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 })
  }
}
