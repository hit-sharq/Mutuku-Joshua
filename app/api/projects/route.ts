import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const featured = searchParams.get("featured") === "true"

    const whereClause: any = {}

    if (featured) {
      whereClause.featured = true
    }

    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        orderBy: featured ? { order: "desc" } : { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          technologies: true,
          demoUrl: true,
          githubUrl: true,
          featured: true,
          order: true,
          createdAt: true,
        },
      }),
      prisma.project.count({ where: whereClause }),
    ])

    return NextResponse.json({ projects, totalCount })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}
