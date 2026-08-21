import { prisma } from "./prisma"

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function ensureUniqueSlug(
  baseSlug: string,
  model: "blogPost" | "news",
  excludeId?: string
): Promise<string> {
  let slug = baseSlug
  let counter = 2
  const MAX_ATTEMPTS = 100

  while (counter <= MAX_ATTEMPTS) {
    const where: any = { slug }
    if (excludeId) {
      where.NOT = { id: excludeId }
    }
    const existing = await prisma[model].findFirst({ where })
    if (!existing) return slug
    slug = `${baseSlug}-${counter}`
    counter++
  }

  throw new Error(`Failed to generate unique slug for ${model} after ${MAX_ATTEMPTS} attempts`)
}
