"use client"

import { TextareaHTMLAttributes, forwardRef } from "react"

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="admin-textarea-wrapper">
        {label && (
          <label className="admin-label">
            {label}
            {props.required && <span style={{ color: "var(--admin-danger)" }}> *</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`admin-textarea ${error ? "has-error" : ""} ${className}`}
          {...props}
        />
        {error && (
          <div className="admin-input-error" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  }
)

AdminTextarea.displayName = "AdminTextarea"
