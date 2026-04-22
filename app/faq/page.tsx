import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about gotaprob, what it is, how problems are chosen, and how to get involved.',
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-3">Help</p>
      <h1 className="font-serif text-4xl text-ink mb-10">Frequently asked questions</h1>
      <FAQAccordion />
      <div className="mt-12 border border-border rounded p-6 bg-white">
        <p className="font-medium text-ink mb-1">Still have a question?</p>
        <p className="text-sm text-muted mb-4">We are happy to help.</p>
        <Link href="/contact" className="text-sm font-semibold text-forest-600 underline underline-offset-4 hover:text-forest-700">
          Get in touch
        </Link>
      </div>
    </div>
  )
}
