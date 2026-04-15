import Link from 'next/link'
import { getAllCategories, CATEGORY_EMOJI, CATEGORY_TREE, getProblemCount } from '@/lib/problems'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Categories — gotaprob' }

export default function CategoriesPage() {
  const cats = getAllCategories()
  const catMap = Object.fromEntries(cats.map(c => [c.name, c.count]))
  const totalProblems = getProblemCount()

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-2">Browse by topic</p>
        <h1 className="font-serif text-3xl text-ink">All Categories</h1>
        <p className="mt-2 text-muted">
          {cats.length} categories · {totalProblems} problems total
        </p>
      </div>

      {/* If we have problems, show actual category counts */}
      {cats.length > 0 && (
        <div className="mb-12">
          <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-4 pb-2 border-b border-border">
            All active categories
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cats.map(({ name, count }) => (
              <Link
                key={name}
                href={`/categories/${name.toLowerCase().replace(/ /g, '-')}`}
                className="group flex items-start gap-4 border border-border bg-white p-5 hover:bg-cream-100 hover:border-forest-200 transition-all rounded"
              >
                <div className="w-10 h-10 bg-forest-50 border border-forest-100 flex items-center justify-center text-xl flex-shrink-0 rounded-sm">
                  {CATEGORY_EMOJI[name] ?? '📌'}
                </div>
                <div>
                  <p className="font-semibold text-ink group-hover:text-forest-600 transition-colors">{name}</p>
                  <p className="text-xs text-muted mt-0.5">{count} {count === 1 ? 'problem' : 'problems'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Full category tree — always shown, shows what's coming */}
      {Object.entries(CATEGORY_TREE).map(([world, domains]) => (
        <div key={world} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-serif text-xl text-ink">{world}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-col gap-6">
            {Object.entries(domains).map(([domain, subs]) => (
              <div key={domain}>
                <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-3">{domain}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {subs.map(sub => {
                    const count = catMap[sub] ?? 0
                    const href = `/categories/${sub.toLowerCase().replace(/ /g, '-')}`
                    return (
                      <Link
                        key={sub}
                        href={count > 0 ? href : '#'}
                        className={`flex items-center justify-between border px-3 py-2.5 text-sm transition-colors rounded-sm ${
                          count > 0
                            ? 'border-border bg-white text-ink hover:bg-cream-100 hover:border-forest-200 hover:text-forest-600'
                            : 'border-border/50 bg-cream text-muted cursor-default'
                        }`}
                      >
                        <span className="truncate">{CATEGORY_EMOJI[sub] ?? ''} {sub}</span>
                        {count > 0 && (
                          <span className="ml-2 text-2xs font-semibold text-forest-600 flex-shrink-0">{count}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
