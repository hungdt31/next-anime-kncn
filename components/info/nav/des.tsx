"use client"
interface DesProps {
  content: string
}
export default function Des({
  content
} : DesProps) {
  return (
    <div
      className="p-3"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}