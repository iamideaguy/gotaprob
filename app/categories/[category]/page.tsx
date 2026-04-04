import { notFound } from 'next/navigation'
import { getProblemsByCategory, getAllCategories, CATEGORY_EMOJI } from '@/lib/problems'
import { ProblemCard } from '@/components/ProblemCard'
import { Sidebar } from '@/components/Sidebar'
import type { Metadata } from 'next'

interface Props { params: { category: string } }

function findName(slug: string) {
  return getAllCategories().find(c => c.name.toLowerCase().replace(/ /g, '-') === slug)?.name ?? null
}

export async function generateStaticParams() {
  return getAllCategories().map(({ name }) => ({
    category: name.toLowerCase().replace(/ /g, '-'),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = findName(params.category)
  if (!name) return {}
  return { title: `${name} Problems`, description: `Browse all ${name} problems on gotaprob.` }
}

export default function CategoryPage({ params }: Props) {
  const name = findName(params.category)
  if (!name) notFound()
  const problems = getProblemsByCategory(name)

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-6 pb-4 border-b border-border">
            <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-1">Category</p>
            <h1 className="font-serif text-2xl text-ink">
              {CATEGORY_EMOJI[name] ?? ''} {name}
            </h1>
            <p className="mt-1 text-sm text-muted">{problems.length} {problems.length === 1 ? 'problem' : 'problems'}</p>
          </div>

          {problems.length === 0 ? (
            <p className="text-muted italic text-center py-16 font-serif">No problems in this category yet.</p>
          ) : (
            <div className="grid gap-px bg-border border border-border md:grid-cols-2">
              {problems.map(p => <ProblemCard key={p.slug} problem={p} showScore />)}
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
