"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CopyEmailButton({
  email,
  label,
  className = "",
}: {
  email: string
  /** Visible text; defaults to the address itself. */
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button type="button" onClick={copy} className={className} aria-label={`Copy ${email}`}>
      {copied && label ? "Copied" : (label ?? email)}
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  )
}
