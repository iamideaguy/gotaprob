'use client'

import { useState } from 'react'

export function SidebarNewsletter() {
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

  return (
    <div className="border border-border bg-forest-600 p-5 text-cream rounded">
      <p className="text-2xs font-medium uppercase tracking-widest text-cream-200 mb-2">Stay curious</p>
      <h3 className="font-serif text-xl mb-2">One problem,<br />every Tuesday.</h3>
      {state === 'done' ? (
        <p className="text-sm text-cream-200 py-2">You are subscribed. See you next Tuesday.</p>
      ) : (
        <>
          <p className="text-sm text-cream-200 leading-relaxed mb-4">
            The most interesting problem of the week, straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={state === 'loading'}
              className="w-full bg-forest-500 border border-forest-400 rounded px-3 py-2.5 text-sm text-cream placeholder-cream-200/50 outline-none focus:border-cream-200 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full bg-cream text-forest-600 rounded py-2.5 text-sm font-semibold hover:bg-cream-200 transition-colors disabled:opacity-60"
            >
              {state === 'loading' ? 'Subscribing...' : 'Subscribe free'}
            </button>
          </form>
          {state === 'error' && <p className="text-red-300 text-xs mt-2">Something went wrong. Try again.</p>}
          <p className="text-2xs text-cream-200/60 mt-2">No spam. Unsubscribe anytime.</p>
        </>
      )}
    </div>
  )
}
