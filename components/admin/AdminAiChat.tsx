"use client"

import { useState, useEffect, useRef, KeyboardEvent } from "react"
import AdminButton from "./AdminButton"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AdminAiChatProps {
  title?: string
  description?: string
  apiUrl?: string
  placeholder?: string
}

export default function AdminAiChat({
  title = "AI Assistant",
  description = "Ask me anything about your admin panel, content, or website management.",
  apiUrl = "/api/admin/ai",
  placeholder = "Type your message...",
}: AdminAiChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading || cooldown) return

    const userMessage: Message = {
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setCooldown(true)

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("AI chat error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setTimeout(() => setCooldown(false), 3000)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="admin-ai-chat">
      <div className="admin-ai-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="admin-ai-messages">
        {messages.length === 0 && (
          <div className="admin-ai-empty">
            <div className="admin-ai-empty-icon">🤖</div>
            <p>Start a conversation with the AI assistant</p>
            <span>Ask questions about your website, content, or admin features</span>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`admin-ai-message ${message.role}`}
          >
            <div className="admin-ai-message-avatar">
              {message.role === "user" ? "👤" : "🤖"}
            </div>
            <div className="admin-ai-message-content">
              <div className="admin-ai-message-bubble">
                {message.content}
              </div>
              <div className="admin-ai-message-time">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="admin-ai-message assistant">
            <div className="admin-ai-message-avatar">🤖</div>
            <div className="admin-ai-message-content">
              <div className="admin-ai-message-bubble">
                <div className="admin-ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="admin-ai-input-area">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={loading}
          className="admin-ai-input"
        />
        <AdminButton
          variant="primary"
          size="sm"
          onClick={sendMessage}
          disabled={loading || cooldown || !input.trim()}
          icon={
            loading ? (
              <span className="admin-ai-send-spinner" />
            ) : cooldown ? (
              <span className="admin-ai-cooldown-icon">⏳</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )
          }
        >
          {cooldown ? "Wait" : "Send"}
        </AdminButton>
      </div>
    </div>
  )
}