import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { getProblemCount } from '@/lib/problems'

export const metadata: Metadata = {
  title: {
    default: 'gotaprob — Real problems worth solving',
    template: '%s | gotaprob',
  },
  description: 'A curated collection of real problems from every corner of life. We surface the itch — your job is to scratch it.',
  keywords: ['problems', 'startup ideas', 'entrepreneurship', 'market gaps', 'opportunities'],
  openGraph: { type: 'website', siteName: 'gotaprob' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const count = getProblemCount()

  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-cream text-ink antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZMY1MLRXMH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZMY1MLRXMH');
        `}</Script>
        <div className="border-b border-border bg-cream flex justify-center py-2">
          <AdUnit size="leaderboard" slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER} />
        </div>
        <Header problemCount={count} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
