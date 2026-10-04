import {
  BRAND_NAME,
  BRAND_URL,
  PERSON,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
} from "@/lib/site-config"

const personId = `${SITE_URL}/#person`
const organizationId = `${SITE_URL}/#organization`
const websiteId = `${SITE_URL}/#website`

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: PERSON.name,
  url: SITE_URL,
  image: absoluteUrl(PERSON.avatar),
  jobTitle: PERSON.jobTitle,
  description:
    "Fullstack developer in Nairobi, Kenya specialising in React, Next.js, Node.js, Django, and PostgreSQL.",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Django",
    "Laravel",
    "TypeScript",
    "PostgreSQL",
    "REST APIs",
    "Cloud deployment",
  ],
  email: PERSON.email,
  telephone: PERSON.phone,
  worksFor: {
    "@type": "Organization",
    "@id": organizationId,
    name: BRAND_NAME,
    url: BRAND_URL,
  },
  founderOf: {
    "@type": "Organization",
    "@id": organizationId,
    name: BRAND_NAME,
    url: BRAND_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSON.city,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  sameAs: [...SOCIAL_LINKS],
}

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${SITE_NAME} — ${PERSON.jobTitle}`,
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
  dateCreated: "2024-01-01",
  inLanguage: "en",
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": organizationId,
  name: BRAND_NAME,
  url: BRAND_URL,
  logo: absoluteUrl("/jm.png"),
  image: absoluteUrl("/jm.png"),
  description: `Digital innovation studio founded by ${PERSON.name}, delivering bespoke web platforms, products, and digital experiences.`,
  founder: { "@id": personId },
  employee: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSON.city,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: PERSON.email,
      telephone: PERSON.phone,
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    },
  ],
  sameAs: [...SOCIAL_LINKS],
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: SITE_NAME,
  alternateName: `${SITE_NAME} Portfolio`,
  url: SITE_URL,
  description: `Portfolio of ${PERSON.name}, a fullstack developer in ${PERSON.city}, ${PERSON.country}.`,
  inLanguage: "en",
  publisher: { "@id": organizationId },
  author: { "@id": personId },
}

export const webPageSchema = (name: string, path: string, description?: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  isPartOf: { "@id": websiteId },
  about: { "@id": personId },
  inLanguage: "en",
})

export const contactPageSchema = {
  ...webPageSchema("Contact", "/contact"),
  "@type": "ContactPage",
}

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const blogPostingSchema = (post: {
  title: string
  description: string
  path: string
  image?: string | null
  createdAt: Date | string
  updatedAt: Date | string
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(post.path)}#article`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${absoluteUrl(post.path)}#webpage`,
  },
  headline: post.title,
  description: post.description,
  url: absoluteUrl(post.path),
  image: [post.image ? absoluteUrl(post.image) : absoluteUrl("/og-image.png")],
  datePublished: new Date(post.createdAt).toISOString(),
  dateModified: new Date(post.updatedAt).toISOString(),
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  author: { "@id": personId },
  publisher: { "@id": organizationId },
  mainEntity: { "@id": personId },
  keywords: "web development, React, Next.js, software engineering, Kenya",
})

export const newsArticleSchema = (item: {
  title: string
  description: string
  path: string
  image?: string | null
  createdAt: Date | string
  updatedAt: Date | string
}) => ({
  ...blogPostingSchema(item),
  "@type": "NewsArticle",
  "@id": `${absoluteUrl(item.path)}#newsarticle`,
})

export const faqPageSchema = (
  faqs: { question: string; answer: string }[],
  path = "/faq",
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  url: absoluteUrl(path),
  isPartOf: { "@id": websiteId },
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
})

export const itemListSchema = (
  name: string,
  path: string,
  items: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(path)}#list`,
  name,
  url: absoluteUrl(path),
  isPartOf: { "@id": websiteId },
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
})

export const baseSchemas = [
  personSchema,
  organizationSchema,
  websiteSchema,
  profilePageSchema,
]