"use client"

import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>
          This site uses cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <a href="/privacy-policy">Learn more</a>
        </p>
        <div className="cookie-actions">
          <button onClick={decline} className="cookie-btn cookie-decline">Decline</button>
          <button onClick={accept} className="cookie-btn cookie-accept">Accept</button>
        </div>
      </div>
    </div>
  )
}
