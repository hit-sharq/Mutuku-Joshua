"use client"

import { useEffect } from "react"
import { personSchema, organizationSchema, websiteSchema } from "@/lib/schema"

export default function SchemaScripts() {
  useEffect(() => {
    const schemas = [personSchema, organizationSchema, websiteSchema]
    
    schemas.forEach((schema) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [])

  return null
}
