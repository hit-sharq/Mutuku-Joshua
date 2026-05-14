"use client"

import { ReactNode } from "react"
import AdminButton from "./AdminButton"

interface AdminPageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  backUrl?: string
}

export default function AdminPageHeader({
  title,
  description,
  actions,
  backUrl
}: AdminPageHeaderProps) {
  return (
    <div className="admin-header">
      <div className="admin-header-left">
        {backUrl && (
          <AdminButton
            href={backUrl}
            variant="ghost"
            size="sm"
            style={{ marginRight: "0.75rem" }}
          >
            ← Back
          </AdminButton>
        )}
        <div>
          <h1>{title}</h1>
          {description && (
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.9375rem",
                color: "var(--admin-text-secondary)",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="admin-header-actions">{actions}</div>}
    </div>
  )
}
