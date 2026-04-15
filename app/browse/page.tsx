import { getAllProblems, getTopProblems, getAllCategories, HEAT_CONFIG } from '@/lib/problems'
import { ProblemListRow } from '@/components/ProblemCard'
import { Sidebar } from '@/components/Sidebar'
import { AdUnit } from '@/components/AdUnit'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Browse Problems — gotaprob' }

const HEAT_FILTERS = [
  { value: 'all',     label: 'All heat levels' },
  { value: 'burning', label: '🔥 Burning' },
  { value: 'warm',    label: '⚡ Warm' },
  { value: 'fresh',   label: '🌱 Fresh' },
]

export default function BrowsePage({
  searchParams,
}: {
  searchParams: { sort?: string; heat?: string; category?: string }
}) {
  const sort     = searchParams.sort     === 'top'  ? 'top'  : 'recent'
  const heat     = searchParams.heat     ?? 'all'
  const category = searchParams.category ?? 'all'

  let problems = sort === 'top' ? getTopProblems(200) : getAllProblems()

  if (heat !== 'all')     problems = problems.filter(p => p.heat === heat)
  if (category !== 'all') problems = problems.filter(p =>
    p.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())
  )

  const categories = getAllCategories()
  const total      = problems.length

  function filterUrl(params: Record<string, string>) {
    const base = { sort, heat, category, ...params }
    const qs   = Object.entries(base)
      .filter(([, v]) => v && v !== 'all' && v !== 'recent')
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    return `/browse${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-12 py-10 lg:grid-cols-[1fr_300px]">
        <div>
          {/* Filter bar — HiringCafe inspired */}
          <div className="mb-6 flex flex-wrap gap-2 pb-5 border-b border-border">
            {/* Sort */}
            <div className="flex gap-1.5 mr-2">
              {(['recent', 'top'] as const).map(s => (
                <a key={s} href={filterUrl({ sort: s })}
                  className={`text-xs px-3 py-1.5 border transition-colors ${
                    sort === s
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-white text-muted border-border hover:border-ink hover:text-ink'
                  } rounded-sm`}>
                  {s === 'top' ? 'Top scored' : 'Most recent'}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px bg-border self-stretch mx-1" />

            {/* Heat filter */}
            {HEAT_FILTERS.map(f => (
              <a key={f.value} href={filterUrl({ heat: f.value })}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  heat === f.value
                    ? 'bg-forest-600 text-cream border-forest-600'
                    : 'bg-white text-muted border-border hover:border-forest-400 hover:text-ink'
                } rounded-sm`}>
                {f.label}
              </a>
            ))}

            {/* Divider */}
            <div className="w-px bg-border self-stretch mx-1" />

            {/* Category filter */}
            <a href={filterUrl({ category: 'all' })}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                category === 'all'
                  ? 'bg-forest-600 text-cream border-forest-600'
                  : 'bg-white text-muted border-border hover:border-forest-400 hover:text-ink'
              }`}>
              All categories
            </a>
            {categories.slice(0, 8).map(({ name }) => (
              <a key={name} href={filterUrl({ category: name })}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  category === name
                    ? 'bg-forest-600 text-cream border-forest-600'
                    : 'bg-white text-muted border-border hover:border-forest-400 hover:text-ink'
                } rounded-sm`}>
                {name}
              </a>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-muted mb-4">
            {total} {total === 1 ? 'problem' : 'problems'}
            {heat !== 'all' && ` · ${heat}`}
            {category !== 'all' && ` · ${category}`}
          </p>

          {/* Problem list */}
          {problems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif italic text-muted text-lg mb-2">No problems match these filters.</p>
              <a href="/browse" className="text-sm text-forest-600 hover:underline">Clear filters</a>
            </div>
          ) : (
            <div className="border border-border bg-white overflow-hidden">
              {problems.map((p, i) => (
                <div key={p.slug}>
                  <ProblemListRow problem={p} />
                  {(i + 1) % 10 === 0 && (
                    <div className="px-6 py-4 border-b border-border">
                      <AdUnit size="infeed" slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} className="w-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Sidebar />
        </aside>
      </div>
    </div>
  )
}
