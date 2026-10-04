import type React from "react"
import type { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"
import DbKeepAlive from "@/components/DbKeepAlive"
import FloatingContact from "@/components/FloatingContact"
import NoiseOverlay from "@/components/NoiseOverlay"
import CookieConsent from "@/components/CookieConsent"
import BackToTop from "@/components/BackToTop"
import JsonLd from "@/components/JsonLd"
import { baseSchemas } from "@/lib/schema"
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  PERSON,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const BRAND_NAME = "Lumyn Technologies"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: BRAND_NAME,
  category: "technology",
  keywords: [
    "Mutuku Joshua",
    "fullstack developer Kenya",
    "fullstack developer Nairobi",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "Django developer",
    "hire web developer Kenya",
    "portfolio",
    "Lumyn Technologies",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-KE" suppressHydrationWarning={true} className={`dark ${inter.variable}`}>
      <body className={`${inter.className} premium-bg`} suppressHydrationWarning={true}>
        <ClerkProvider>
          <JsonLd data={baseSchemas} />
          <NoiseOverlay />
          {children}
          <FloatingContact />
          <CookieConsent />
          <BackToTop />
        </ClerkProvider>
        <DbKeepAlive />
      </body>
    </html>
  )
}