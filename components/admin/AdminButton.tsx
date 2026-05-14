"use client"

import { ReactNode } from "react"

interface AdminButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  icon?: ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
}

export default function AdminButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  className = "",
  type = "button"
}: AdminButtonProps) {
  const baseClasses = "btn"
  const variantClass = `btn-${variant}`
  const sizeClass = size !== "md" ? `btn-${size}` : ""

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        onClick={onClick}
        style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.5 : 1 }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
