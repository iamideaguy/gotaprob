import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for gotaprob.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted mb-10">Last updated: April 2025</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="font-serif text-xl mb-3">What we collect</h2>
          <p className="text-muted">
            gotaprob does not require account registration. If you subscribe to our newsletter, we collect your email address, which is stored and processed by Beehiiv in accordance with their privacy policy. If you contact us, we receive the information you choose to share. We use Google Analytics to understand aggregate site traffic and Google Search Console to monitor search performance. Both use cookies and collect anonymised usage data.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">How we use it</h2>
          <p className="text-muted">
            Email addresses collected via newsletter signup are stored with Beehiiv and used solely to send the gotaprob weekly digest. We do not sell or share your personal data with third parties, except as required by the services we use: Beehiiv for email delivery, Google Analytics and Google Search Console for site performance monitoring, and Google AdSense for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Advertising</h2>
          <p className="text-muted">
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" className="text-forest-600 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Cookies</h2>
          <p className="text-muted">
            We use cookies for analytics (Google Analytics) and advertising (Google AdSense). By continuing to use this site, you consent to these cookies. You can disable cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Your rights</h2>
          <p className="text-muted">
            You can unsubscribe from our newsletter at any time using the link in any email. To request deletion of any personal data we hold, contact us at <a href="mailto:iamideaguy@gmail.com" className="text-forest-600 underline">iamideaguy@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3">Contact</h2>
          <p className="text-muted">
            Questions about this policy? Email <a href="mailto:iamideaguy@gmail.com" className="text-forest-600 underline">iamideaguy@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
