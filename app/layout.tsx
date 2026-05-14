import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"
import DbKeepAlive from "@/components/DbKeepAlive"
import FloatingContact from "@/components/FloatingContact"
import NoiseOverlay from "@/components/NoiseOverlay"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: "Mutuku Joshua - Fullstack Developer | Lumyn Technologies",
  description: "Crafting Code That Works. Professional fullstack development services with modern technologies. Building scalable web applications, APIs, and digital solutions.",
  keywords: "Fullstack Developer, Web Development, React, Next.js, Node.js, Python, Lumyn Technologies, Kenya",
  authors: [{ name: "Mutuku Joshua" }],
  creator: "Mutuku Joshua",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumyn-tech.vercel.app",
    title: "Mutuku Joshua - Fullstack Developer",
    description: "Professional fullstack development services with modern technologies.",
    siteName: "Lumyn Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutuku Joshua - Fullstack Developer",
    description: "Crafting Code That Works. Professional fullstack development services.",
    creator: "@hit_sharq",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${inter.className} premium-bg`} suppressHydrationWarning={true}>
        <ClerkProvider>
          <NoiseOverlay />
          {children}
          <FloatingContact />
        </ClerkProvider>
        <DbKeepAlive />
      </body>
    </html>
  )
}
