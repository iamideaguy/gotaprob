import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'gotaprob surfaces real problems from everyday life — not to hand you a business plan, but to spark curiosity.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-6">About gotaprob</h1>
      <div className="prose-style space-y-5 text-base leading-relaxed text-ink">
        <p>
          gotaprob is a curated catalogue of real problems from everyday life. Not startup ideas, not business plans, just the itch. The friction. The thing that makes people mutter "why isn't there something for this?"
        </p>
        <p>
          We research each problem before publishing it: we look for proof signals across Reddit, forums, and communities; we score it on opportunity, pain level, feasibility, and timing; and we provide research links so you can go verify it yourself.
        </p>
        <p>
          The site exists because most "startup idea" content is either too abstract or too prescriptive. We're trying to sit in the middle, concrete enough to be useful, open-ended enough to let you think.
        </p>
        <p>
          If you spot a problem worth cataloguing, <a href="/submit" className="text-forest-600 underline">submit it here</a>. If you want to reach us, <a href="/contact" className="text-forest-600 underline">get in touch</a>.
        </p>
      </div>
    </div>
  )
}
