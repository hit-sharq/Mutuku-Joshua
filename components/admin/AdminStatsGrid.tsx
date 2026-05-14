"use client"

import { ReactNode } from "react"

interface AdminStatsGridProps {
  children: ReactNode
  className?: string
}

export default function AdminStatsGrid({
  children,
  className = ""
}: AdminStatsGridProps) {
  return (
    <div className={`admin-stats ${className}`}>
      {children}
    </div>
  )
}
