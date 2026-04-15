import { BeehiivForm } from './BeehiivForm'

export function NewsletterSection() {
  return (
    <section className="border-y border-border bg-forest-600">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mx-auto max-w-xl text-center text-cream">
          <p className="text-2xs font-medium uppercase tracking-widest text-cream-200 mb-3">Stay curious</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">New problems, every week</h2>
          <p className="text-cream-200 leading-relaxed mb-8">
            A short digest of real problems worth exploring. No spam, no business plans — just the raw itch.
          </p>
          <BeehiivForm />
        </div>
      </div>
    </section>
  )
}
