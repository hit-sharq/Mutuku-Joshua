import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function NewsIdRedirect({
  params,
}: {
  params: { id: string }
}) {
  const newsItem = await prisma.news.findUnique({
    where: { id: params.id },
    select: { slug: true },
  })

  if (!newsItem) {
    notFound()
  }

  redirect(`/news/${newsItem.slug}`)
}
