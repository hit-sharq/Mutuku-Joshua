"use client"

import { InputHTMLAttributes, forwardRef } from "react"

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="admin-input-wrapper">
        {label && (
          <label className="admin-label">
            {label}
            {props.required && <span style={{ color: "var(--admin-danger)" }}> *</span>}
          </label>
        )}
        <div className="admin-input-container">
          {icon && <div className="admin-input-icon">{icon}</div>}
          <input
            ref={ref}
            className={`admin-input ${icon ? "has-icon" : ""} ${error ? "has-error" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <div className="admin-input-error" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  }
)

AdminInput.displayName = "AdminInput"
