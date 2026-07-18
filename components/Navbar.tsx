"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import SearchBar from "./SearchBar"
import styles from "./Navbar.module.css"

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "RESUME", href: "/resume" },
  { label: "CONTACT", href: "/contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    }
  }, [isSignedIn])

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false) }}>
          J·<em>M</em>
        </Link>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.mobileOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false) }}>
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link href="/admin" className={styles.adminLink} onClick={() => setIsMenuOpen(false)}>
                ADMIN
              </Link>
            </li>
          )}
          {isSignedIn ? (
            <li>
              <UserButton />
            </li>
          ) : (
            <li>
              <SignInButton mode="modal" />
            </li>
          )}
        </ul>

        <div className={styles.navRight}>
          <div className={styles.searchWrapper}>
            <button
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              🔍
            </button>
            {isSearchOpen && (
              <div className={styles.searchDropdown}>
                <SearchBar />
              </div>
            )}
          </div>

          <Link href="/contact" className={styles.navCta} onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false) }}>
            HIRE ME
          </Link>
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </nav>
    </header>
  )
}
