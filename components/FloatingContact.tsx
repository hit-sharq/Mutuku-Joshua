"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Mail, Phone, Send } from "lucide-react"

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'var(--primary)',
          boxShadow: '0 4px 20px rgba(109, 129, 150, 0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <MessageCircle className="w-6 h-6" style={{ color: 'var(--primary-foreground)' }} />
      </motion.button>

      {/* Contact panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-28 right-8 z-50 w-80 rounded-2xl p-6 shadow-2xl"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Get in Touch</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:officialjoshua@lumyn.co.ke"
                className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                style={{
                  background: 'var(--secondary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(109, 129, 150, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--secondary)'}
              >
                <Mail className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Email</span>
              </a>
              <a
                href="tel:+254794773452"
                className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                style={{
                  background: 'var(--secondary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(109, 129, 150, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--secondary)'}
              >
                <Phone className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Call</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}