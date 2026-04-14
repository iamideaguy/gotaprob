import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getFeaturedProblem, getRecentProblems, getTopProblems, getAllCategories, CATEGORY_EMOJI } from '@/lib/problems'
import { FeaturedCard, ProblemCard } from '@/components/ProblemCard'
import { Sidebar } from '@/components/Sidebar'
import { NewsletterSection } from '@/components/NewsletterSection'
import { AdUnit } from '@/components/AdUnit'
import { TickerBar } from '@/components/TickerBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'gotaprob — Real problems worth solving',
}

export default function HomePage() {
  const featured  = getFeaturedProblem()
  const recent    = getRecentProblems(6)
  const top       = getTopProblems(3)
  const cats      = getAllCategories()
  const feedProblems = recent.filter(p => p.slug !== featured?.slug)

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-2xs font-medium uppercase tracking-widest text-muted">
              A curated collection · Free forever
            </p>
            <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl md:leading-tight">
              Real problems,{' '}
              <span className="italic">waiting to be solved</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We surface interesting problems from every corner of life. Your job is to get curious, dig deeper, and maybe build something that matters.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/browse"
                className="group inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 text-sm font-semibold text-ink transition-all hover:border-forest-600 hover:text-forest-600"
              >
                Browse all problems
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-muted">·</span>
              <Link href="/browse?sort=top" className="text-sm font-medium text-muted underline underline-offset-4 hover:text-ink transition-colors">
                Top scored
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TickerBar />

      {/* ── Main layout ── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[1fr_320px]">

          {/* Feed */}
          <div>
            {/* Featured */}
            {featured && (
              <div className="mb-10">
                <p className="mb-4 text-2xs font-medium uppercase tracking-widest text-muted">
                  Problem of the week
                </p>
                <FeaturedCard problem={featured} />
              </div>
            )}

            {/* Top scored strip */}
            {top.length > 0 && (
              <div className="mb-10">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-0.5">Highest scored</p>
                    <h2 className="font-serif text-xl text-ink">Top Problems</h2>
                  </div>
                  <Link href="/browse?sort=top" className="group inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink">
                    See all <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="grid gap-px bg-border border border-border md:grid-cols-3">
                  {top.map(p => <ProblemCard key={p.slug} problem={p} showScore />)}
                </div>
              </div>
            )}

            {/* In-feed ad */}
            <AdUnit size="leaderboard" slot={process.env.NEXT_PUBLIC_AD_SLOT_INFEED} className="mb-10 w-full" />

            {/* Recent problems */}
            <div>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-0.5">Recently added</p>
                  <h2 className="font-serif text-xl text-ink">Latest Problems</h2>
                </div>
                <Link href="/browse" className="group inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink">
                  See all <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-px bg-border border border-border md:grid-cols-2">
                {feedProblems.map(p => <ProblemCard key={p.slug} problem={p} />)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Sidebar />
          </aside>
        </div>
      </div>

      {/* ── Category grid ── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-1">Explore by</p>
              <h2 className="font-serif text-2xl text-ink">Category</h2>
            </div>
            <Link href="/categories" className="text-sm font-medium text-muted underline underline-offset-4 hover:text-ink">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border border border-border md:grid-cols-4">
            {cats.slice(0, 8).map(({ name, count: c }) => (
              <Link
                key={name}
                href={`/categories/${name.toLowerCase().replace(/ /g, '-')}`}
                className="group flex items-center justify-between bg-white p-5 hover:bg-cream-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-ink">{CATEGORY_EMOJI[name] ?? '📌'} {name}</p>
                  <p className="mt-0.5 text-xs text-muted">{c} {c === 1 ? 'problem' : 'problems'}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSection />
    </>
  )
}
