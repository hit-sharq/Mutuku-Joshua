'use client'

import { motion } from 'framer-motion'
import styles from './PremiumButton.module.css'
import Link from 'next/link'

interface PremiumButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export default function PremiumButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: PremiumButtonProps) {
  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </motion.button>
  )

  if (href) {
    return (
      <Link href={href} className={styles.linkWrapper}>
        {buttonContent}
      </Link>
    )
  }

  return buttonContent
}
