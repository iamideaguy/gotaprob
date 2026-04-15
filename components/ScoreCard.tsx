'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { type ScoreCard as ScoreCardType, type ScoreBadges } from '@/lib/problems'

const TYPE_ICON: Record<string, string> = {
  reddit: 'r/', article: 'art', data: 'data', tool: 'tool', community: 'com', other: 'link',
}

function badgeStyle(score: number) {
  if (score >= 8) return { border: 'border-forest-200 bg-forest-50', text: 'text-forest-700', sub: 'Exceptional' }
  if (score >= 6) return { border: 'border-amber-200 bg-amber-50', text: 'text-amber-700', sub: 'Strong' }
  return { border: 'border-red-200 bg-red-50', text: 'text-red-700', sub: 'Moderate' }
}

function overallStyle(score: number) {
  if (score >= 75) return 'text-forest-600 border-forest-300 bg-forest-50'
  if (score >= 50) return 'text-amber-600 border-amber-300 bg-amber-50'
  return 'text-red-600 border-red-300 bg-red-50'
}

export function ScoreBadgeRow({ badges }: { badges: ScoreBadges }) {
  const items = [
    { label: 'Opportunity', value: badges.opportunity },
    { label: 'Pain Level',  value: badges.painLevel   },
    { label: 'Feasibility', value: badges.feasibility },
    { label: 'Timing',      value: badges.timing      },
  ]
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {items.map(({ label, value }) => {
        const s = badgeStyle(value)
        return (
          <div key={label} className={`border p-3 text-center rounded ${s.border}`}>
            <div className={`font-serif text-2xl font-bold leading-none mb-0.5 tabular-nums ${s.text}`}>{value}</div>
            <div className="text-2xs font-semibold text-ink">{label}</div>
            <div className={`text-2xs ${s.text}`}>{s.sub}</div>
          </div>
        )
      })}
    </div>
  )
}

export function ScoreCard({ scoreCard }: { scoreCard: ScoreCardType }) {
  const [tab, setTab] = useState<'score' | 'breakdown' | 'resources'>('score')
  const tabs = ['score', 'breakdown', 'resources'] as const

  return (
    <div className="border border-border bg-cream-50 overflow-hidden rounded">
      <div className="flex border-b border-border">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
              tab === t ? 'bg-forest-600 text-cream' : 'text-muted hover:text-ink hover:bg-cream-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'score' && (
        <div className="p-5 text-center">
          <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-3">Opportunity Score</p>
          <div className={`inline-flex items-center justify-center w-24 h-24 border-2 mx-auto mb-3 ${overallStyle(scoreCard.overall)}`}>
            <span className="font-serif text-4xl font-bold">{scoreCard.overall}</span>
          </div>
          <p className="text-xs text-muted leading-relaxed max-w-[200px] mx-auto">
            {scoreCard.overall >= 75 ? 'Strong signal — worth deep research.' :
             scoreCard.overall >= 50 ? 'Moderate — promising but competitive.' :
             'Early signal — needs more validation.'}
          </p>
          {scoreCard.lastResearched && (
            <p className="text-2xs text-muted/60 mt-3">Last verified: {scoreCard.lastResearched}</p>
          )}
        </div>
      )}

      {tab === 'breakdown' && (
        <div className="p-4 flex flex-col gap-4">
          {scoreCard.breakdown.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-ink">{item.dimension}</span>
                <span className="text-xs font-bold text-forest-600">{item.score}/10</span>
              </div>
              <div className="h-1 bg-cream-300 w-full overflow-hidden mb-1">
                <div
                  className={`h-full ${item.score >= 7 ? 'bg-forest-500' : item.score >= 5 ? 'bg-amber-400' : 'bg-red-400'}`}
                  style={{ width: `${item.score * 10}%` }}
                />
              </div>
              <p className="text-2xs text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'resources' && (
        <div className="p-3 flex flex-col gap-1.5">
          {scoreCard.resources.length === 0 ? (
            <p className="text-xs text-muted text-center py-4">No resources added yet.</p>
          ) : scoreCard.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 border border-border bg-white hover:bg-cream-100 transition-colors group rounded">
              <span className="font-mono text-2xs text-muted w-8">{TYPE_ICON[r.type] ?? '?'}</span>
              <span className="flex-1 text-xs text-ink group-hover:text-forest-600 line-clamp-1">{r.label}</span>
              <ExternalLink className="h-3 w-3 text-muted flex-shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
