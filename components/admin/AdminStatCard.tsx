"use client"

import { ReactNode } from "react"

interface AdminStatCardProps {
  number: number | string
  label: string
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export default function AdminStatCard({
  number,
  label,
  icon,
  trend,
  className = ""
}: AdminStatCardProps) {
  return (
    <div className={`stat-card ${className}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: trend.isPositive ? "var(--admin-success)" : "var(--admin-danger)",
          }}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  )
}
