import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for gotaprob.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-2">Terms of Service</h1>
      <p className="text-xs text-muted mb-10">Last updated: April 2025</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-serif text-xl mb-3">Use of the site</h2>
          <p className="text-muted">
            gotaprob is an informational resource. The content on this site is provided for educational and research purposes only. By using this site, you agree not to misuse it or attempt to disrupt its operation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">No business advice</h2>
          <p className="text-muted">
            Nothing on gotaprob constitutes business, legal, or financial advice. We surface problems worth investigating — not validated business opportunities. Any decisions you make based on content from this site are your own responsibility.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Intellectual property</h2>
          <p className="text-muted">
            The content, design, and code of gotaprob are owned by gotaprob and may not be reproduced without permission. Problem submissions you send to us may be edited and published at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Limitation of liability</h2>
          <p className="text-muted">
            gotaprob is provided "as is" without warranty of any kind. We are not liable for any losses or damages arising from your use of the site or reliance on its content.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Changes</h2>
          <p className="text-muted">
            We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Contact</h2>
          <p className="text-muted">
            Questions? Email <a href="mailto:iamideaguy@gmail.com" className="text-forest-600 underline">iamideaguy@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
