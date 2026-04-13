import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertise',
  description: 'Reach an audience of founders, operators, and curious problem-solvers on gotaprob.',
}

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl text-ink mb-4">Advertise on gotaprob</h1>
      <p className="text-muted mb-8 leading-relaxed">
        gotaprob reaches founders, indie hackers, product managers, and curious people who are actively looking for problems worth solving. If your product is built for builders, we're the right audience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mb-10">
        {[
          { stat: '200+', label: 'Problems catalogued' },
          { stat: 'Weekly', label: 'Newsletter digest' },
          { stat: 'Growing', label: 'Organic search traffic' },
        ].map(({ stat, label }) => (
          <div key={label} className="bg-white p-6 text-center">
            <div className="font-serif text-2xl font-bold text-forest-600 mb-1">{stat}</div>
            <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted mb-6 leading-relaxed">
        We offer newsletter sponsorships, sidebar placements, and problem-page features. Get in touch to discuss options and pricing.
      </p>

      <a
        href="mailto:advertise@gotaprob.com?subject=Advertising enquiry"
        className="inline-block bg-forest-600 text-cream px-6 py-3 text-sm font-medium hover:bg-forest-500 transition-colors"
      >
        Get in touch →
      </a>
    </div>
  )
}
