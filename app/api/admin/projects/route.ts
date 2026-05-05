import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, technologies, demoUrl, githubUrl, featured, order } = body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        technologies: technologies || null,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        order: order || 0,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
