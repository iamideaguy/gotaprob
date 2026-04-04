'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV = [
  { name: 'Browse',          href: '/browse' },
  { name: 'Categories',      href: '/categories' },
  { name: 'Research Guide',  href: '/research-guide' },
  { name: 'About',           href: '/about' },
]

export function Header({ problemCount }: { problemCount: number }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-border bg-cream sticky top-0 z-50">
      <div className="border-b border-border bg-forest-600 px-6 py-1.5 text-center">
        <p className="text-2xs font-medium uppercase tracking-widest text-cream-100">
          {problemCount} real problems catalogued · Free forever · No business plans, just the itch
        </p>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl italic tracking-tight text-ink">
          gotaprob
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map(item => (
            <Link key={item.name} href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/submit"
            className="text-sm font-medium text-muted hover:text-ink transition-colors">
            Submit a problem
          </Link>
          <Link href="/browse"
            className="bg-forest-600 px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-500">
            Browse all →
          </Link>
        </div>

        <button className="md:hidden text-ink" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map(item => (
              <Link key={item.name} href={item.href}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/browse"
              className="mt-2 block bg-forest-600 px-4 py-2.5 text-center text-sm font-medium text-cream">
              Browse all problems →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
