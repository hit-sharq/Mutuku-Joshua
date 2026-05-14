import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "3")
    const featured = searchParams.get("featured") === "true"

    const whereClause: any = {
      published: true,
    }

    if (featured) {
      whereClause.featured = true
    }

    const newsItems = await prisma.news.findMany({
      where: whereClause,
      orderBy: featured ? { order: "desc" } : { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        image: true,
        link: true,
        featured: true,
        order: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ news: newsItems })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}
