import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getTopProblems, getRecentProblems, getAllCategories, CATEGORY_EMOJI } from '@/lib/problems'
import { AdUnit } from './AdUnit'
import { ProblemRow } from './ProblemCard'
import { SidebarNewsletter } from './SidebarNewsletter'

export function Sidebar() {
  const top = getTopProblems(5)
  const recent = getRecentProblems(4)
  const categories = getAllCategories().slice(0, 8)

  return (
    <div className="flex flex-col gap-8">

      {/* Top scored */}
      <div className="border border-border bg-white p-5 rounded">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xs font-semibold uppercase tracking-widest text-muted">Top Scored</h3>
          <Link href="/browse?sort=top" className="inline-flex items-center gap-0.5 text-xs text-forest-600 hover:underline">
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div>
          {top.map((p, i) => <ProblemRow key={p.slug} problem={p} index={i} />)}
        </div>
      </div>

      {/* Ad */}
      <AdUnit size="rectangle" slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_1} />

      <SidebarNewsletter />

      {/* Most recent */}
      <div className="border border-border bg-white p-5 rounded">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xs font-semibold uppercase tracking-widest text-muted">Most Recent</h3>
          <Link href="/browse?sort=recent" className="inline-flex items-center gap-0.5 text-xs text-forest-600 hover:underline">
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div>
          {recent.map((p, i) => <ProblemRow key={p.slug} problem={p} index={i} />)}
        </div>
      </div>

      {/* Categories */}
      <div className="border border-border bg-white p-5 rounded">
        <h3 className="text-2xs font-semibold uppercase tracking-widest text-muted mb-4">Browse by Category</h3>
        <ul className="flex flex-col">
          {categories.map(({ name, count }) => (
            <li key={name}>
              <Link
                href={`/categories/${name.toLowerCase().replace(/ /g, '-')}`}
                className="flex justify-between items-center py-2.5 border-b border-border last:border-0 text-sm text-ink hover:text-forest-600 transition-colors"
              >
                <span>{CATEGORY_EMOJI[name] ?? '📌'} {name}</span>
                <span className="text-xs text-muted">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Half-page ad */}
      <AdUnit size="halfpage" slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_2} />

    </div>
  )
}
