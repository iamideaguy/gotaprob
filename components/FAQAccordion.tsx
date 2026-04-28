'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What is gotaprob?',
    a: 'gotaprob is a curated catalogue of real problems from everyday life. We research and score each problem so you can quickly assess whether it is worth exploring further, whether you are a builder, researcher, or just curious.',
  },
  {
    q: 'How are problems chosen?',
    a: 'We look for problems with evidence of real frustration: Reddit threads, forum posts, community complaints, data. We do not publish hunches. Every problem needs proof signals before it makes the cut.',
  },
  {
    q: 'What does the Opportunity Score mean?',
    a: 'Each problem is scored out of 100 based on four dimensions: pain level (how much people suffer), opportunity size (how many people have it), feasibility (how hard it is to solve), and timing (whether the moment is right). The overall score combines these into a single signal.',
  },
  {
    q: 'What do the heat labels mean?',
    a: '🔥 Burning means the problem is urgent, widespread, and actively discussed right now. ⚡ Warm means it is real and growing but not yet at a peak. 🌿 Fresh means it is an emerging problem we are watching early. Heat is our editorial judgment based on the volume and intensity of signals we find.',
  },
  {
    q: 'Is this a list of startup ideas?',
    a: 'Not exactly. We surface the problem, not the solution. What you do with it, whether you build a product, write about it, or just stay curious, is up to you. We deliberately avoid prescribing solutions.',
  },
  {
    q: 'Can I submit a problem?',
    a: (
      <>
        Yes. If you have spotted a real friction point that deserves attention,{' '}
        <Link href="/submit" className="text-forest-600 underline underline-offset-2 hover:text-forest-700">
          submit it here
        </Link>{' '}
        and we will review it. We cannot publish everything, but good evidence goes a long way.
      </>
    ),
  },
  {
    q: 'How often are new problems added?',
    a: (
      <>
        We aim to add new problems every week. Subscribe to the{' '}
        <Link href="/newsletter" className="text-forest-600 underline underline-offset-2 hover:text-forest-700">
          weekly newsletter
        </Link>{' '}
        to get notified when a new one drops, one problem per week, straight to your inbox.
      </>
    ),
  },
  {
    q: 'Is gotaprob free?',
    a: 'Yes, completely free. The site is supported by advertising.',
  },
  {
    q: 'How do I advertise on gotaprob?',
    a: (
      <>
        We offer sponsored placements for tools, products, and services relevant to builders and problem-solvers.{' '}
        <Link href="/contact" className="text-forest-600 underline underline-offset-2 hover:text-forest-700">
          Reach out via the contact page
        </Link>{' '}
        and we will get back to you.
      </>
    ),
  },
]

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-serif text-lg text-ink group-hover:text-forest-600 transition-colors">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 border border-border rounded-sm flex items-center justify-center text-muted group-hover:border-forest-400 group-hover:text-forest-600 transition-colors text-sm">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-5 text-base leading-relaxed text-muted pr-10">
          {a}
        </div>
      )}
    </div>
  )
}

export function FAQAccordion() {
  return (
    <div className="flex flex-col">
      {FAQS.map(({ q, a }) => (
        <FAQItem key={q} q={q} a={a} />
      ))}
    </div>
  )
}
