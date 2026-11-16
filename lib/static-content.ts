import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

export type StaticBlogPost = {
  slug: string
  title: string
  summary: string | null
  content: string
  html: string
  image: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export type StaticNewsItem = {
  slug: string
  title: string
  excerpt: string | null
  content: string
  html: string
  image: string | null
  link: string | null
  featured: boolean
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

function contentDir(type: "blog" | "news") {
  return path.join(process.cwd(), "content", type)
}

function readMarkdownFiles(type: "blog" | "news"): string[] {
  const dir = contentDir(type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file))
}

export function getStaticBlogPosts(): StaticBlogPost[] {
  return readMarkdownFiles("blog")
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(raw)
      if (data.published === false) return null
      const slug = (data.slug as string) || path.basename(filePath, ".md")
      return {
        slug,
        title: (data.title as string) || slug,
        summary: (data.summary as string) || null,
        content,
        html: marked.parse(content) as string,
        image: (data.image as string) || null,
        published: data.published !== false,
        createdAt: new Date((data.createdAt as string) || Date.now()),
        updatedAt: new Date((data.updatedAt as string) || Date.now()),
      }
    })
    .filter((post): post is StaticBlogPost => post !== null)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getStaticBlogPost(slug: string): StaticBlogPost | null {
  return getStaticBlogPosts().find((post) => post.slug === slug) || null
}

export function getStaticNewsItems(): StaticNewsItem[] {
  return readMarkdownFiles("news")
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(raw)
      if (data.published === false) return null
      const slug = (data.slug as string) || path.basename(filePath, ".md")
      return {
        slug,
        title: (data.title as string) || slug,
        excerpt: (data.excerpt as string) || null,
        content,
        html: marked.parse(content) as string,
        image: (data.image as string) || null,
        link: (data.link as string) || null,
        featured: Boolean(data.featured),
        order: Number(data.order ?? 0),
        published: data.published !== false,
        createdAt: new Date((data.createdAt as string) || Date.now()),
        updatedAt: new Date((data.updatedAt as string) || Date.now()),
      }
    })
    .filter((item): item is StaticNewsItem => item !== null)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      if (a.order !== b.order) return a.order - b.order
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
}

export function getStaticNewsItem(slug: string): StaticNewsItem | null {
  return getStaticNewsItems().find((item) => item.slug === slug) || null
}
