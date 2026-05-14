"use client"

import { ReactNode } from "react"

interface AdminPageProps {
  children: ReactNode
  className?: string
}

export default function AdminPage({ children, className = "" }: AdminPageProps) {
  return (
    <div className={`admin-main admin-page ${className}`}>
      {children}
    </div>
  )
}
