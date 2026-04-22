'use client'

import { useState } from 'react'

export function BeehiivForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const url = `https://gotaprob.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-cream-200 text-sm py-4">
        Check the new tab to confirm your subscription.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-forest-500 border border-forest-400 rounded px-4 py-3 text-sm text-cream placeholder-cream-200/50 outline-none focus:border-cream-200"
      />
      <button
        type="submit"
        className="bg-cream text-forest-600 rounded px-6 py-3 text-sm font-semibold hover:bg-cream-200 transition-colors whitespace-nowrap"
      >
        Subscribe free
      </button>
    </form>
  )
}
