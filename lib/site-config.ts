export const SITE_URL = "https://mutukujoshua.lumyn.co.ke"

export const BRAND_URL = "https://www.lumyn.co.ke"

export const SITE_NAME = "Mutuku Joshua"

export const SITE_TAGLINE = "Fullstack Developer"

export const BRAND_NAME = "Lumyn Technologies"

export const DEFAULT_TITLE = "Mutuku Joshua | Fullstack Developer in Nairobi, Kenya"

export const DEFAULT_DESCRIPTION =
  "Mutuku Joshua is a fullstack developer in Nairobi, Kenya, building fast, scalable web applications with React, Next.js, Node.js, Django, and PostgreSQL. Founder of Lumyn Technologies. Available for hire."

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Mutuku Joshua - Fullstack Developer in Nairobi, Kenya",
}

export const PERSON = {
  name: "Mutuku Joshua",
  jobTitle: "Fullstack Developer",
  email: "officialjoshua@lumyn.co.ke",
  phone: "+254794773452",
  city: "Nairobi",
  region: "Nairobi County",
  country: "Kenya",
  timezone: "EAT (UTC+3)",
  avatar: "/Mutuku.JPG",
} as const

export const SOCIAL_LINKS = [
  "https://github.com/hit-sharq",
  "https://www.linkedin.com/in/joshua-mwendwa-b183b5287/",
  "https://www.instagram.com/j_lee087",
] as const

export function absoluteUrl(path: string = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

export function truncate(text: string, length: number = 160): string {
  const clean = stripHtml(text)
  if (clean.length <= length) return clean
  return `${clean.slice(0, length - 1).replace(/\s+\S*$/, "")}…`
}