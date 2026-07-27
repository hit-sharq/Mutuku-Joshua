"use client"

import AdminAiChat from "@/components/admin/AdminAiChat"
import AdminPage from "@/components/admin/AdminPage"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import AdminCard from "@/components/admin/AdminCard"

export default function AiPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        title="AI Assistant"
        description="Get help managing your website, content, and admin features."
      />

      <AdminCard noPadding>
        <AdminAiChat />
      </AdminCard>
    </AdminPage>
  )
}