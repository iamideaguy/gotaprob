'use client'

const ITEMS = [
  '🔥 New problem: Freelancer income reconciliation',
  '⚡ 200+ real problems catalogued',
  '🌿 Browse by category — 20+ verticals',
  '📬 Weekly digest — one problem every Tuesday',
  '🔍 Proof signals, score cards, research links',
  '💡 Not startup ideas — raw problems worth solving',
  '🌿 New problem: Landlord maintenance tracking',
  '⚡ Every problem scored on opportunity, pain & timing',
]

export function TickerBar() {
  return (
    <div className="border-b border-border bg-cream-100 overflow-hidden py-2.5">
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="text-xs text-muted font-medium shrink-0">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .ticker-track {
          animation: ticker 40s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
