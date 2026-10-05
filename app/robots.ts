import { MetadataRoute } from 'next'
import { SITE_URL } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not block /_next/: several pages are client components, so Googlebot
        // needs the JS and CSS bundles to render them.
        disallow: [
          '/admin/',
          '/api/',
          '/sign-in',
          '/sign-up',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}