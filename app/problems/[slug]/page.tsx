import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProblemBySlug, getAllSlugs, getAllProblems, CATEGORY_EMOJI } from '@/lib/problems'
import { formatDate } from '@/lib/utils'
import { HeatBadge } from '@/components/HeatBadge'
import { ScoreCard } from '@/components/ScoreCard'
import { ProblemCard } from '@/components/ProblemCard'
import { AdUnit } from '@/components/AdUnit'
import { NewsletterSection } from '@/components/NewsletterSection'
import { ShareButton } from '@/components/ShareButton'
import { SidebarNewsletter } from '@/components/SidebarNewsletter'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProblemBySlug(params.slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.standfirst,
    openGraph: { title: p.title, description: p.standfirst, type: 'article', publishedTime: p.dateAdded },
  }
}

export default function ProblemPage({ params }: Props) {
  const problem = getProblemBySlug(params.slug)
  if (!problem) notFound()

  const all     = getAllProblems()
  const related = all
    .filter(p => p.slug !== problem.slug && p.categories.some(c => problem.categories.includes(c)))
    .slice(0, 3)

  const toc = [
    { label: 'The Problem', show: true },
    { label: 'Proof Signals', show: problem.proofSignals.length > 0 },
    { label: 'Who Has This Problem', show: problem.whoHasIt.length > 0 },
    { label: 'Why Nothing Works', show: problem.whyNothingWorks.length > 0 },
    { label: 'Go Research This Yourself', show: problem.researchLinks.length > 0 },
    { label: 'Questions Worth Asking', show: problem.questionsToAsk.length > 0 },
  ].filter(t => t.show)

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-cream-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 flex items-center gap-2 text-xs text-muted overflow-hidden">
          <Link href="/" className="hover:text-ink transition-colors shrink-0">Home</Link>
          <span>/</span>
          {problem.categories[0] && (
            <>
              <Link
                href={`/categories/${problem.categories[0].toLowerCase().replace(/ /g, '-')}`}
                className="hover:text-ink transition-colors shrink-0"
              >
                {problem.categories[0]}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-ink truncate">{problem.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 py-8 lg:py-12 lg:grid-cols-[1fr_300px]">

          {/* ── Article ── */}
          <article className="min-w-0">

            {/* Back link */}
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All problems
            </Link>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <HeatBadge heat={problem.heat} />
                {problem.categories.map(cat => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className="text-2xs font-semibold uppercase tracking-wider text-forest-600 hover:underline rounded-sm px-2 py-0.5 bg-forest-50 border border-forest-200"
                  >
                    {CATEGORY_EMOJI[cat] ?? ''} {cat}
                  </Link>
                ))}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-ink mb-5" style={{ textWrap: 'balance' } as React.CSSProperties}>
                {problem.title}
              </h1>

              <p className="text-base sm:text-lg font-light leading-relaxed text-muted border-l-2 border-forest-300 pl-4 mb-6">
                {problem.standfirst}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted py-4 border-t border-b border-border">
                <span>Added {formatDate(problem.dateAdded)}</span>
                <ShareButton title={problem.title} />
              </div>
            </div>

            {/* Stats */}
            {problem.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-px bg-border border border-border rounded mb-8 overflow-hidden">
                {problem.stats.map((s, i) => (
                  <div key={i} className="bg-white p-3 sm:p-5 text-center">
                    <div className="font-serif text-xl sm:text-3xl font-bold text-forest-600 leading-none mb-1">{s.number}</div>
                    <div className="text-2xs uppercase tracking-wider text-muted leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Table of contents — inline, before the content */}
            {toc.length > 1 && (
              <div className="border border-border bg-cream-100 rounded p-4 mb-8">
                <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-3">On This Page</p>
                <ol className="flex flex-col gap-1 list-none">
                  {toc.map(({ label }, i) => (
                    <li key={label}>
                      <a
                        href={`#${label.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center gap-2 text-sm text-ink hover:text-forest-600 transition-colors py-1"
                      >
                        <span className="text-2xs text-muted font-mono w-4 shrink-0">{i + 1}.</span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Problem body */}
            <div className="mb-8">
              <SectionLabel>The Problem</SectionLabel>
              <div className="problem-prose" dangerouslySetInnerHTML={{ __html: problem.content }} />
            </div>

            {/* Proof signals */}
            {problem.proofSignals.length > 0 && (
              <div className="mb-8">
                <SectionLabel>Proof Signals</SectionLabel>
                <div className="border border-border border-l-4 border-l-forest-400 bg-white divide-y divide-border rounded overflow-hidden">
                  {problem.proofSignals.map((s, i) => (
                    <div key={i} className="flex gap-3 p-4 text-sm">
                      <span className="text-base flex-shrink-0">🗣️</span>
                      <div className="text-ink leading-relaxed min-w-0">
                        <strong className="font-semibold">{s.platform}</strong> — {s.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Who has it */}
            {problem.whoHasIt.length > 0 && (
              <div className="mb-8">
                <SectionLabel>Who Has This Problem</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {problem.whoHasIt.map((w, i) => (
                    <div key={i} className="border border-border bg-white p-4 rounded">
                      <p className="text-2xs font-semibold uppercase tracking-wider text-muted mb-1.5">{w.segment}</p>
                      <p className="text-sm text-ink leading-relaxed">{w.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why nothing works */}
            {problem.whyNothingWorks.length > 0 && (
              <div className="mb-8">
                <SectionLabel>Why Nothing Works</SectionLabel>
                <div className="flex flex-col gap-2">
                  {problem.whyNothingWorks.map((w, i) => (
                    <div key={i} className="bg-white border border-border rounded p-4">
                      <p className="font-semibold text-sm text-forest-600 mb-1.5">{w.tool}</p>
                      <p className="text-sm text-ink leading-relaxed">{w.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mid-article ad */}
            <AdUnit size="infeed" slot={process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE} className="w-full mb-8" />

            {/* Research links */}
            {problem.researchLinks.length > 0 && (
              <div className="mb-8">
                <SectionLabel>Go Research This Yourself</SectionLabel>
                <ul className="flex flex-col gap-2">
                  {problem.researchLinks.map((r, i) => (
                    <li key={i} className="flex gap-3 bg-white border border-border rounded p-4 min-w-0">
                      <span className="text-lg flex-shrink-0">🔍</span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-ink mb-0.5 flex flex-wrap items-center gap-1">
                          {r.url ? (
                            <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline inline-flex items-center gap-1">
                              {r.platform} <ArrowUpRight className="h-3 w-3" />
                            </a>
                          ) : r.platform}
                          <span className="font-normal text-muted text-xs">search: "{r.searchQuery}"</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">{r.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Questions to ask */}
            {problem.questionsToAsk.length > 0 && (
              <div className="mb-8">
                <SectionLabel>Questions Worth Asking</SectionLabel>
                <ul className="flex flex-col list-none">
                  {problem.questionsToAsk.map((q, i) => (
                    <li key={i} className="flex gap-3 py-3 border-b border-border last:border-0 text-sm text-ink leading-relaxed">
                      <span className="font-serif font-bold text-forest-400 text-lg leading-none shrink-0">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-cream-200 border border-border rounded p-4 mb-8 text-sm text-muted italic leading-relaxed">
              ⚠️ gotaprob surfaces problems worth investigating — not businesses ready to build. We don't validate ideas or guarantee opportunity. This is a starting point. Do your own research.
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="border-t border-border pt-8">
                <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-4">Related Problems</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {related.map(p => <ProblemCard key={p.slug} problem={p} />)}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-6">

            {/* Score card */}
            {problem.scoreCard && (
              <div>
                <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-3">Problem Score</p>
                <ScoreCard scoreCard={problem.scoreCard} />
              </div>
            )}

            {/* Sidebar ad */}
            <AdUnit size="rectangle" slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_1} />

            <SidebarNewsletter />

            {/* Second ad */}
            <AdUnit size="halfpage" slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR_2} />
          </aside>

        </div>
      </div>

      <NewsletterSection />
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const id = typeof children === 'string' ? children.toLowerCase().replace(/ /g, '-') : undefined
  return (
    <div id={id} className="inline-block bg-ink text-cream text-2xs font-semibold uppercase tracking-widest px-3 py-1.5 mb-4 rounded-sm scroll-mt-24">
      {children}
    </div>
  )
}
