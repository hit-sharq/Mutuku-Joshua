"use client"

import { ReactNode } from "react"

interface AdminBadgeProps {
  children: ReactNode
  variant?: "success" | "warning" | "danger" | "info" | "neutral"
  className?: string
}

export default function AdminBadge({
  children,
  variant = "neutral",
  className = ""
}: AdminBadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  )
}
