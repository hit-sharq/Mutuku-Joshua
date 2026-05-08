"use client"

import { useEffect } from "react"
import { initDbKeepAlive } from "@/lib/keep-alive"

export default function DbKeepAlive() {
  useEffect(() => {
    initDbKeepAlive()
  }, [])

  return null
}
