"use client"

import { useState } from "react"

function truncateId(id: string) {
  const parts = id.split(":")
  if (parts.length === 2) {
    return `${parts[0]}:${parts[1].slice(0, 4)}...`
  }
  return id.length > 10 ? `${id.slice(0, 8)}...` : id
}

export function CopyId({ id, className }: { id: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleCopy}
      onKeyDown={(e) => { if (e.key === "Enter") handleCopy(e as unknown as React.MouseEvent) }}
      className={`font-mono text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-pointer inline-flex items-center gap-1 ${className ?? ""}`}
      title={id}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-40"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      {copied ? "copied!" : truncateId(id)}
    </span>
  )
}
