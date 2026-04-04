'use client'

import { useEffect } from 'react'

type AdSize = 'rectangle' | 'leaderboard' | 'infeed' | 'halfpage'

const SIZE_MAP: Record<AdSize, { w: number; h: number; label: string }> = {
  rectangle: { w: 300, h: 250,  label: '300 × 250' },
  leaderboard: { w: 728, h: 90, label: '728 × 90' },
  infeed:    { w: 0,   h: 0,    label: 'In-Feed Native' },
  halfpage:  { w: 300, h: 600,  label: '300 × 600' },
}

export function AdUnit({ size, slot, className = '' }: {
  size: AdSize
  slot?: string
  className?: string
}) {
  const { h, label } = SIZE_MAP[size]
  const id = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (id && slot) {
      try { (window as any).adsbygoogle = (window as any).adsbygoogle || []; (window as any).adsbygoogle.push({}) } catch {}
    }
  }, [id, slot])

  if (!id || !slot) {
    return (
      <div
        className={`flex flex-col items-center justify-center border border-dashed border-border bg-cream-200 text-center ${className}`}
        style={{ minHeight: h || 80 }}
      >
        <p className="text-2xs font-medium uppercase tracking-widest text-muted">Advertisement</p>
        <p className="mt-1 text-xs text-muted/60">{label}</p>
      </div>
    )
  }

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
