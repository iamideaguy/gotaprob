'use client'

import { useState } from 'react'

export function BeehiivForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setState(res.ok ? 'done' : 'error')
  }

  if (state === 'done') {
    return <p className="text-cream-200 text-sm py-3">You are subscribed. See you next Tuesday.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={state === 'loading'}
        className="flex-1 bg-forest-500 border border-forest-400 rounded px-4 py-3 text-sm text-cream placeholder-cream-200/50 outline-none focus:border-cream-200 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-cream text-forest-600 rounded px-6 py-3 text-sm font-semibold hover:bg-cream-200 transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {state === 'loading' ? 'Subscribing...' : 'Subscribe free'}
      </button>
      {state === 'error' && <p className="text-red-300 text-xs mt-1 sm:col-span-2">Something went wrong. Try again.</p>}
    </form>
  )
}
