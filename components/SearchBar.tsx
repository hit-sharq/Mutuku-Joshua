"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: "blog" | "practice-area" | "team"
  url: string
  excerpt?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Optimized search function with proper cleanup
  const searchContent = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      setIsOpen(false)
      setIsLoading(false)
      setIsSpinning(false)
      return
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    // Delay showing spinner to avoid flicker on fast searches
    const spinnerTimer = setTimeout(() => {
      setIsSpinning(true)
    }, 150)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`, {
        signal: abortControllerRef.current.signal
      })
      
      clearTimeout(spinnerTimer)
      
      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setIsOpen(data.length > 0)
      } else {
        setResults([])
        setIsOpen(false)
      }
    } catch (error) {
      // Don't show error for aborted requests
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error("Search error:", error)
      }
      setResults([])
      setIsOpen(false)
    } finally {
      clearTimeout(spinnerTimer)
      setIsLoading(false)
      setIsSpinning(false)
    }
  }, [])

  // Debounced search effect
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new debounced timer
    debounceTimerRef.current = setTimeout(() => {
      searchContent(query)
    }, 300)

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query, searchContent])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog":
        return "📝"
      case "practice-area":
        return "⚖️"
      case "team":
        return "👥"
      default:
        return "📄"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "blog":
        return "Blog Post"
      case "practice-area":
        return "Practice Area"
      case "team":
        return "Team Member"
      default:
        return "Page"
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search our website..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#1a365d"
            if (query.length >= 2 && results.length > 0) {
              setIsOpen(true)
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0"
          }}
          style={{
            width: "100%",
            padding: "0.75rem 1rem 0.75rem 2.5rem",
            border: "2px solid #e2e8f0",
            borderRadius: "25px",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s ease",
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666",
            fontSize: "1.2rem",
            pointerEvents: "none",
          }}
        >
          🔍
        </div>
        {isSpinning && (
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #1a365d",
              borderRadius: "50%",
              animation: "searchSpin 0.8s linear infinite",
            }}
          />
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {results.length === 0 && !isLoading && (
            <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
              {query.length >= 2 ? "No results found" : "Start typing to search..."}
            </div>
          )}

          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              onClick={handleResultClick}
              style={{
                display: "block",
                padding: "1rem",
                borderBottom: "1px solid #f7fafc",
                textDecoration: "none",
                color: "inherit",
                transition: "background-color 0.15s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f7fafc"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{getTypeIcon(result.type)}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "600", color: "#1a365d", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {result.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.25rem" }}>
                    {getTypeLabel(result.type)}
                  </div>
                  {result.excerpt && (
                    <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {result.excerpt}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes searchSpin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

