import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
        <Header problemCount={count} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
