"use client"

import { SelectHTMLAttributes, forwardRef } from "react"

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="admin-select-wrapper">
        {label && (
          <label className="admin-label">
            {label}
            {props.required && <span style={{ color: "var(--admin-danger)" }}> *</span>}
          </label>
        )}
        <div className="admin-select-container">
          <select
            ref={ref}
            className={`admin-select admin-input ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

AdminSelect.displayName = "AdminSelect"
