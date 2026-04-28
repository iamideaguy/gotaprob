import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a Problem',
  description: 'Know a real problem that deserves to be on gotaprob? Tell us about it.',
}

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-4">Submit a Problem</h1>
      <p className="text-muted mb-8 leading-relaxed">
        Know a problem that deserves a spot on gotaprob? We're looking for real, specific friction — not vague frustrations, but the kind of thing where you've seen multiple people say "why doesn't this exist?"
      </p>
      <div className="border border-border bg-cream-200 p-6 mb-8 text-sm text-muted leading-relaxed rounded">
        <p className="font-semibold text-ink mb-2">What makes a good submission</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Specific — not "healthcare is broken" but "patients can't track their prescriptions across providers"</li>
          <li>Observable — you've seen it discussed somewhere, not just a hunch</li>
          <li>Unsolved — existing tools either don't exist or don't solve it well</li>
        </ul>
      </div>
      <a
        href="https://tally.so/r/mKWaKA"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-forest-600 text-cream px-6 py-3 text-sm font-medium hover:bg-forest-500 transition-colors rounded"
      >
        Submit via form →
      </a>
    </div>
  )
}
