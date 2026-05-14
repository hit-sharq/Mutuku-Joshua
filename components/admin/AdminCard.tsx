"use client"

import { ReactNode } from "react"

interface AdminCardProps {
  children: ReactNode
  title?: string
  className?: string
  actions?: ReactNode
  noPadding?: boolean
}

export default function AdminCard({
  children,
  title,
  className = "",
  actions,
  noPadding = false
}: AdminCardProps) {
  return (
    <div className={`admin-card ${className}`}>
      {(title || actions) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: title ? "1rem" : 0,
            paddingBottom: title ? "0.75rem" : 0,
            borderBottom: "1px solid var(--admin-border-color)",
          }}
        >
          {title && <h2>{title}</h2>}
          {actions && <div className="admin-card-actions">{actions}</div>}
        </div>
      )}
      <div style={noPadding ? {} : { paddingTop: title ? "0" : "0" }}>
        {children}
      </div>
    </div>
  )
}
