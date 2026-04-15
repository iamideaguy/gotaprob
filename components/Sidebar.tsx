import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getTopProblems, getRecentProblems, getAllCategories, CATEGORY_EMOJI } from '@/lib/problems'
import { AdUnit } from './AdUnit'
import { ProblemRow } from './ProblemCard'

export function Sidebar() {
  const top = getTopProblems(5)
  const recent = getRecentProblems(4)
  const categories = getAllCategories().slice(0, 8)

  return (
    <div className="flex flex-col gap-8">

      {/* Ad */}
      <AdUnit size="rectangle" slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_1} />

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

      {/* Newsletter */}
      <div className="border border-border bg-forest-600 p-5 text-cream rounded">
        <p className="text-2xs font-medium uppercase tracking-widest text-cream-200 mb-2">Stay curious</p>
        <h3 className="font-serif text-xl mb-2">One problem,<br />every Tuesday.</h3>
        <p className="text-sm text-cream-200 leading-relaxed mb-4">
          The most interesting problem of the week, straight to your inbox.
        </p>
        <form action="https://app.beehiiv.com/subscribe" method="post" target="_blank" className="flex flex-col gap-2">
          <input type="hidden" name="publication_id" value="cabb5be0-c7be-46f1-8c0d-ea79eb27f1c2" />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="w-full bg-forest-500 border border-forest-400 rounded px-3 py-2.5 text-sm text-cream placeholder-cream-200/50 outline-none focus:border-cream-200"
          />
          <button
            type="submit"
            className="w-full bg-cream text-forest-600 rounded py-2.5 text-sm font-semibold hover:bg-cream-200 transition-colors"
          >
            Subscribe free
          </button>
        </form>
        <p className="text-2xs text-cream-200/60 mt-2">No spam. Unsubscribe anytime.</p>
      </div>

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
