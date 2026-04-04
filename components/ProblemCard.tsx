import Link from 'next/link'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { type ProblemMeta, CATEGORY_EMOJI } from '@/lib/problems'
import { HeatBadge } from './HeatBadge'
import { formatDateShort, scoreColor } from '@/lib/utils'

// Large featured card — used for hero/featured problem
export function FeaturedCard({ problem }: { problem: ProblemMeta }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group block border border-border bg-white hover:bg-cream-100 transition-colors p-8 md:p-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xs font-semibold uppercase tracking-widest text-forest-600">
          {problem.categories[0]}
        </span>
        <span className="text-2xs text-muted">Featured</span>
        {problem.scoreCard && (
          <span className={`ml-auto text-sm font-bold font-serif ${scoreColor(problem.scoreCard.overall)}`}>
            {problem.scoreCard.overall}/100
          </span>
        )}
      </div>

      <h2 className="font-serif text-3xl md:text-4xl leading-tight text-ink mb-4 group-hover:underline group-hover:underline-offset-4">
        {problem.title}
      </h2>

      <p className="text-muted leading-relaxed max-w-2xl mb-6">{problem.standfirst}</p>

      <div className="flex items-center gap-4 flex-wrap">
        <HeatBadge heat={problem.heat} />
        <span className="text-sm text-muted">{formatDateShort(problem.dateAdded)}</span>
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-forest-600 transition-colors">
          Read the full breakdown
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

// Standard card — used in grid/feed
export function ProblemCard({ problem, showScore = false }: { problem: ProblemMeta; showScore?: boolean }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group flex flex-col border border-border bg-white hover:bg-cream-100 transition-colors p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xs font-semibold uppercase tracking-wider text-forest-600">
          {CATEGORY_EMOJI[problem.categories[0]] ?? ''} {problem.categories[0]}
        </span>
        <div className="flex items-center gap-2">
          {problem.heat === 'burning' && <TrendingUp className="h-3.5 w-3.5 text-red-500" />}
          {showScore && problem.scoreCard && (
            <span className={`text-xs font-bold ${scoreColor(problem.scoreCard.overall)}`}>
              {problem.scoreCard.overall}
            </span>
          )}
        </div>
      </div>

      <h3 className="font-serif text-xl leading-snug text-ink mb-3 flex-1 group-hover:underline group-hover:underline-offset-2">
        {problem.title}
      </h3>

      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{problem.excerpt}</p>

      <div className="flex items-center gap-3 mt-auto">
        <HeatBadge heat={problem.heat} />
        <span className="text-xs text-muted ml-auto">{formatDateShort(problem.dateAdded)}</span>
      </div>
    </Link>
  )
}

// Compact row — used in sidebar top problems list
export function ProblemRow({ problem, index }: { problem: ProblemMeta; index: number }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group flex items-start gap-3 py-4 border-b border-border last:border-0 hover:bg-cream-100 -mx-4 px-4 transition-colors"
    >
      <span className="font-serif text-2xl text-cream-300 leading-none mt-0.5 min-w-[28px]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink leading-snug group-hover:underline group-hover:underline-offset-2 line-clamp-2">
          {problem.title}
        </p>
        <p className="text-xs text-muted mt-1">
          {problem.categories.slice(0, 2).join(' · ')}
          {problem.scoreCard && (
            <span className={`ml-2 font-semibold ${scoreColor(problem.scoreCard.overall)}`}>
              {problem.scoreCard.overall}/100
            </span>
          )}
        </p>
      </div>
    </Link>
  )
}

// List row — used in /browse full list
export function ProblemListRow({ problem }: { problem: ProblemMeta }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group flex items-start justify-between gap-6 py-5 border-b border-border hover:bg-cream-100 -mx-6 px-6 transition-colors"
    >
      <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
        <span className="shrink-0 w-28 text-2xs font-semibold uppercase tracking-wider text-forest-600">
          {problem.categories[0]}
        </span>
        <h3 className="flex-1 font-medium text-ink group-hover:underline group-hover:underline-offset-2">
          {problem.title}
        </h3>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <HeatBadge heat={problem.heat} />
        {problem.scoreCard && (
          <span className={`text-sm font-bold ${scoreColor(problem.scoreCard.overall)}`}>
            {problem.scoreCard.overall}
          </span>
        )}
        <span className="text-xs text-muted hidden md:block">{formatDateShort(problem.dateAdded)}</span>
      </div>
    </Link>
  )
}
