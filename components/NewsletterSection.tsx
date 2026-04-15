'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section className="border-y border-border bg-forest-600">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mx-auto max-w-xl text-center text-cream">
          <p className="text-2xs font-medium uppercase tracking-widest text-cream-200 mb-3">Stay curious</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">New problems, every week</h2>
          <p className="text-cream-200 leading-relaxed mb-8">
            A short digest of real problems worth exploring. No spam, no business plans — just the raw itch.
          </p>
          {done ? (
            <p className="font-medium text-cream">You're in. Check your inbox.</p>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 border border-cream-200/40 bg-forest-500 rounded px-3 py-3 text-cream placeholder-cream-200/50 focus:border-cream focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-cream text-forest-600 rounded px-6 py-3 text-sm font-semibold hover:bg-cream-200 transition-colors"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
