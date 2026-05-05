import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mutuku Joshua - Fullstack Developer",
  description: "Crafting Code That Works. Professional fullstack development services with modern technologies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en" suppressHydrationWarning={true}>
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body className={inter.className} suppressHydrationWarning={true}>
    <ClerkProvider>{children}</ClerkProvider>
  </body>
</html>
  )
}
