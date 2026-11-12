import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { OG_IMAGE, SITE_URL } from "@/lib/site-config"
import NewsListingClient, {
  type NewsListingItem,
} from "../NewsListingClient"
import JsonLd from "@/components/JsonLd"
import { itemListSchema } from "@/lib/schema"

const TITLE = "News"
const DESCRIPTION =
  "Latest announcements, company updates, and industry insights from Mutuku Joshua Mwendwa and Lumyn Technologies. Stay updated with our web development journey."

export const revalidate = 0

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/news" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/news`,
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
    description: DESCRIPTION,
    siteName: "Mutuku Joshua Mwendwa",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Mutuku Joshua Mwendwa`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default async function NewsPage() {
  let newsItems: NewsListingItem[] = []

  try {
    const rows = await prisma.news.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    })
    newsItems = rows as unknown as NewsListingItem[]
  } catch (error) {
    console.error("Error fetching news for the news index:", error)
  }

  const newsListItems = newsItems.map((item) => ({
    name: item.title,
    path: `/news/${item.slug}`,
  }))

  return (
    <>
      <JsonLd data={itemListSchema("News & Updates", "/news", newsListItems)} />
      <NewsListingClient initialNewsItems={newsItems} />
    </>
  )
}