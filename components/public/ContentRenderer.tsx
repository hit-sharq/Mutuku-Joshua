export default function ContentRenderer({ content }: { content: string }) {
  if (!content) return null

  const trimmed = content.trim()
  const hasHtml = /<[a-z][\s\S]*>/i.test(trimmed)

  if (hasHtml) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    )
  }

  return (
    <div>
      {trimmed.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}
