'use client'

import { useState } from 'react'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="ml-auto text-xs font-medium text-ink hover:text-forest-600 transition-colors"
    >
      {copied ? 'Copied ✓' : 'Share ↗'}
    </button>
  )
}
