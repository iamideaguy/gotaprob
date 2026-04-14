import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the gotaprob team.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-4">Contact</h1>
      <p className="text-muted mb-8 leading-relaxed">
        Have a question, a tip, or want to talk about the site? We'd love to hear from you.
      </p>
      <a
        href="mailto:iamideaguy@gmail.com"
        className="inline-block bg-forest-600 text-cream px-6 py-3 text-sm font-medium hover:bg-forest-500 transition-colors"
      >
        hello@gotaprob.com
      </a>
    </div>
  )
}
