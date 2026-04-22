import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about gotaprob — what it is, how problems are chosen, and how to get involved.',
}

const FAQS = [
  {
    q: 'What is gotaprob?',
    a: 'gotaprob is a curated catalogue of real problems from everyday life. We research and score each problem so you can quickly assess whether it\'s worth exploring further — whether you\'re a builder, researcher, or just curious.',
  },
  {
    q: 'How are problems chosen?',
    a: 'We look for problems with evidence of real frustration: Reddit threads, forum posts, community complaints, data. We don\'t publish hunches — every problem needs proof signals before it makes the cut.',
  },
  {
    q: 'What does the Opportunity Score mean?',
    a: 'Each problem is scored out of 100 based on four dimensions: pain level (how much people suffer), opportunity size (how many people have it), feasibility (how hard it is to solve), and timing (whether the moment is right). The overall score combines these into a single signal.',
  },
  {
    q: 'Is this a list of startup ideas?',
    a: 'Not exactly. We surface the problem, not the solution. What you do with it — whether you build a product, write about it, or just stay curious — is up to you. We deliberately avoid prescribing solutions.',
  },
  {
    q: 'Can I submit a problem?',
    a: 'Yes. If you\'ve spotted a real friction point that deserves attention, submit it and we\'ll review it. We can\'t publish everything, but good evidence goes a long way.',
  },
  {
    q: 'How often are new problems added?',
    a: 'We aim to add new problems regularly. Subscribe to the newsletter to get notified when a new one drops — one problem per week, straight to your inbox.',
  },
  {
    q: 'Is gotaprob free?',
    a: 'Yes, completely free. The site is supported by advertising.',
  },
  {
    q: 'How do I advertise on gotaprob?',
    a: 'We offer sponsored placements for tools, products, and services relevant to builders and problem-solvers. Reach out via the advertise page.',
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-3">Help</p>
      <h1 className="font-serif text-4xl text-ink mb-10">Frequently asked questions</h1>

      <div className="flex flex-col divide-y divide-border">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="py-6">
            <h2 className="font-serif text-lg text-ink mb-2">{q}</h2>
            <p className="text-base leading-relaxed text-muted">{a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-border rounded p-6 bg-white">
        <p className="font-medium text-ink mb-1">Still have a question?</p>
        <p className="text-sm text-muted mb-4">We're happy to help.</p>
        <Link href="/contact" className="text-sm font-semibold text-forest-600 underline underline-offset-4 hover:text-forest-700">
          Get in touch →
        </Link>
      </div>
    </div>
  )
}
