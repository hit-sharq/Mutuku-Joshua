import { prisma } from "@/lib/prisma"
import NewsListingClient, {
  type NewsListingItem,
} from "../NewsListingClient"

export const revalidate = 300

export default async function NewsPage() {
  let newsItems: NewsListingItem[] = []

  try {
    const rows = await prisma.news.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    })
    newsItems = rows as unknown as NewsListingItem[]
  } catch (error) {
    // The client component falls back to the /api/news route.
    console.error("Error fetching news for the news index:", error)
  }

  return <NewsListingClient initialNewsItems={newsItems} />
}