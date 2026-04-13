'use client'

import { useEffect } from 'react'

type AdSize = 'rectangle' | 'leaderboard' | 'infeed' | 'halfpage'

export function AdUnit({ size, slot, className = '' }: {
  size: AdSize
  slot?: string
  className?: string
}) {
  const id = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (id && slot) {
      try { (window as any).adsbygoogle = (window as any).adsbygoogle || []; (window as any).adsbygoogle.push({}) } catch {}
    }
  }, [id, slot])

  if (!id || !slot) return null

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={id}
        data-ad-slot={slot}
        data-ad-format={size === 'infeed' ? 'fluid' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
