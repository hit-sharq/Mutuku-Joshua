import type React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "@/app/luxury.css"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="luxury">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
