"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Link2, Twitter, Linkedin, MessageCircle, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import styles from "./ShareButton.module.css"

interface ShareButtonProps {
  post: {
    title: string
    slug: string
    summary?: string | null
  }
}

export default function ShareButton({ post }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${post.slug}`
    : `/blog/${post.slug}`

  const shareText = post.summary
    ? `${post.title}\n\n${post.summary}`
    : post.title

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
          url,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Blog link copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      })
    }
    setIsOpen(false)
  }

  function shareToTwitter() {
    const text = encodeURIComponent(shareText)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    )
    setIsOpen(false)
  }

  function shareToLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=550,height=420"
    )
    setIsOpen(false)
  }

  function shareToWhatsApp() {
    const text = encodeURIComponent(`${shareText}\n\n${url}`)
    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    )
    setIsOpen(false)
  }

  return (
    <div className={styles.shareButtonWrapper} ref={dropdownRef}>
      <button
        onClick={handleNativeShare}
        className={styles.shareButton}
        title="Share this blog post"
      >
        <Share2 size={18} />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className={styles.shareDropdown}>
          <button onClick={copyToClipboard} className={styles.shareOption}>
            {copied ? <Check size={16} /> : <Link2 size={16} />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <button onClick={shareToTwitter} className={styles.shareOption}>
            <Twitter size={16} />
            <span>Share on X</span>
          </button>
          <button onClick={shareToLinkedIn} className={styles.shareOption}>
            <Linkedin size={16} />
            <span>Share on LinkedIn</span>
          </button>
          <button onClick={shareToWhatsApp} className={styles.shareOption}>
            <MessageCircle size={16} />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  )
}
