import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { CATEGORY_TREE } from '@/lib/problems'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Find Problems — gotaprob',
  description: 'Our research criteria and decision tree for finding and validating real problems worth surfacing.',
}

const VALIDATION_GATES = [
  {
    gate: 'Gate 1',
    label: 'Is it a real problem or just an inconvenience?',
    pass: [
      'Multiple people complain about it unprompted in forums',
      'There are existing workarounds (spreadsheets, duct-tape solutions)',
      'People have tried to pay for a solution and been disappointed',
    ],
    fail: [
      'Only one person mentioned it',
      'The problem only exists in extreme edge cases',
      'People shrug it off and move on — no real friction',
    ],
  },
  {
    gate: 'Gate 2',
    label: 'Is it large enough to matter?',
    pass: [
      'Searchable subreddit exists with 50k+ members and active posts',
      'Multiple Facebook groups focused on this topic',
      'Google Trends shows consistent or growing interest',
    ],
    fail: [
      'Audience is fewer than ~10,000 people globally',
      'Problem is highly regional and unlikely to scale',
      'Interest is declining on Google Trends',
    ],
  },
  {
    gate: 'Gate 3',
    label: 'Does the gap actually exist?',
    pass: [
      'Existing solutions are either too expensive, too complex, or too old',
      'Top-rated tools have 1-3 star reviews citing this specific gap',
      'Forum threads asking for solutions get "I use a spreadsheet" as the answer',
    ],
    fail: [
      'A good free or cheap tool already exists and people know about it',
      'The gap is acknowledged but Google just changed their product to fix it',
      'The "gap" is actually just a preference, not a structural problem',
    ],
  },
  {
    gate: 'Gate 4',
    label: 'Can you document it with specifics?',
    pass: [
      'You can cite at least 2 specific forum threads with real discussion',
      'You found at least one stat (market size, percentage, dollar amount)',
      'You can name specific existing tools and explain exactly why each falls short',
    ],
    fail: [
      'Your proof is "I feel like people have this problem"',
      'You can only find one vague mention of the issue',
      'The evidence is all secondhand or AI-generated',
    ],
  },
]

const RESEARCH_SOURCES = [
  {
    name: 'Reddit',
    priority: 'Start here',
    color: 'bg-forest-50 border-forest-200',
    labelColor: 'text-forest-700 bg-forest-100',
    steps: [
      'Search the topic in Reddit search',
      'Find the 2-3 most relevant subreddits',
      'Sort by Top / This Month or Top / This Year',
      'Look for posts with 50+ upvotes and comments like "same problem here"',
      'Search "[topic] + spreadsheet" and "[topic] + frustrating"',
    ],
  },
  {
    name: 'Review sites (G2, Capterra, Trustpilot)',
    priority: 'Second stop',
    color: 'bg-amber-50 border-amber-200',
    labelColor: 'text-amber-700 bg-amber-100',
    steps: [
      'Find the category of software closest to the problem',
      'Filter reviews to 1–3 stars only',
      'Read the "What do you dislike?" field on every review',
      'Look for recurring complaints — these are your proof signals',
      'Note the names of tools people switched away from and why',
    ],
  },
  {
    name: 'Google Trends',
    priority: 'Validate demand',
    color: 'bg-blue-50 border-blue-200',
    labelColor: 'text-blue-700 bg-blue-100',
    steps: [
      'Search your core problem keyword',
      'Check: is the trend rising, flat, or falling?',
      'Look at "Related queries" → filter to Rising',
      'Compare 2-3 keyword variations to find the most searched phrasing',
      'Check by country if the problem seems regional',
    ],
  },
  {
    name: 'App Store reviews',
    priority: 'Underrated source',
    color: 'bg-purple-50 border-purple-200',
    labelColor: 'text-purple-700 bg-purple-100',
    steps: [
      'Find the top 2-3 apps in the relevant category',
      'Filter to 1-2 star reviews',
      'People are brutally honest here — granular, specific pain',
      'Note recurring complaints that mention what\'s missing',
      'Cross-reference with the Play Store for the same apps',
    ],
  },
]

const SCORE_GUIDE = [
  { dimension: 'Market Size', q: 'How many people have this problem?', low: 'Niche audience < 100k', high: 'Millions affected globally' },
  { dimension: 'Pain Intensity', q: 'How badly does it hurt?', low: 'Minor inconvenience, people shrug', high: 'Active complaints, money lost, time wasted' },
  { dimension: 'Solution Gap', q: 'How bad are existing options?', low: 'Decent free tool exists but unknown', high: 'Nothing under $100/mo, all enterprise-only' },
  { dimension: 'Timing', q: 'Why is this relevant now?', low: 'Problem has existed unchanged for 10 years', high: 'Growing fast, new trigger (remote work, AI, regulation)' },
  { dimension: 'Competition Risk', q: 'How crowded is this?', low: 'Big players actively investing here', high: 'No focused product, only workarounds' },
]

export default function ResearchGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border">
        <p className="text-2xs font-medium uppercase tracking-widest text-muted mb-3">Our methodology</p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4 leading-tight">
          How we find and validate problems
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          Every problem on gotaprob goes through the same research process. 
          No APIs, no automation, no AI hallucination. Just real signals from real communities 
          — checked manually before we publish anything.
        </p>
      </div>

      {/* Step 1 — Category tree */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-ink mb-2">Step 1 — Pick your starting domain</h2>
        <p className="text-muted mb-6 leading-relaxed">
          Start broad, then go deeper. Every problem lives somewhere in this tree. 
          Starting with a domain keeps your research focused and makes it easier to find 
          related problems once you're in that world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(CATEGORY_TREE).map(([world, domains]) => (
            <div key={world} className="border border-border bg-white p-5 rounded">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{world === 'Physical World' ? '🌍' : '💻'}</span>
                <h3 className="font-semibold text-ink">{world}</h3>
              </div>
              <div className="flex flex-col gap-2">
                {Object.keys(domains).map(domain => (
                  <div key={domain} className="flex items-center gap-2 text-sm">
                    <ArrowRight className="h-3 w-3 text-muted flex-shrink-0" />
                    <span className="text-ink">{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 2 — Research sources */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-ink mb-2">Step 2 — Research the domain</h2>
        <p className="text-muted mb-6 leading-relaxed">
          Go to these sources in order. You're looking for patterns — the same complaint 
          showing up in multiple places is a strong signal. One mention is not a problem.
        </p>
        <div className="flex flex-col gap-4">
          {RESEARCH_SOURCES.map((source) => (
            <div key={source.name} className={`border p-5 rounded ${source.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-semibold text-ink">{source.name}</h3>
                <span className={`text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 ${source.labelColor}`}>
                  {source.priority}
                </span>
              </div>
              <ol className="flex flex-col gap-1.5">
                {source.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink">
                    <span className="font-mono text-muted text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3 — Validation gates */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-ink mb-2">Step 3 — Run it through the gates</h2>
        <p className="text-muted mb-6 leading-relaxed">
          Before writing anything up, the problem has to pass all four gates. 
          If it fails one, either dig deeper until you find the evidence, or drop it and move on.
        </p>
        <div className="flex flex-col gap-4">
          {VALIDATION_GATES.map((g) => (
            <div key={g.gate} className="border border-border bg-white p-5 rounded">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xs font-bold uppercase tracking-widest text-muted bg-cream px-2 py-1 border border-border">
                  {g.gate}
                </span>
                <h3 className="font-semibold text-ink">{g.label}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-2xs font-semibold text-forest-700 uppercase tracking-wider mb-2">Pass if:</p>
                  <ul className="flex flex-col gap-1.5">
                    {g.pass.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink">
                        <CheckCircle className="h-3.5 w-3.5 text-forest-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-2xs font-semibold text-red-700 uppercase tracking-wider mb-2">Fail if:</p>
                  <ul className="flex flex-col gap-1.5">
                    {g.fail.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted">
                        <XCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 4 — Scoring */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-ink mb-2">Step 4 — Score it</h2>
        <p className="text-muted mb-6 leading-relaxed">
          Each problem gets scored across five dimensions, 1–10. 
          We set these manually based on our research — no algorithms, no APIs, no data that goes stale.
          The scores are our honest editorial judgment.
        </p>
        <div className="border border-border bg-white divide-y divide-border rounded overflow-hidden">
          {SCORE_GUIDE.map((item, i) => (
            <div key={i} className="p-4 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">
              <div>
                <p className="font-semibold text-sm text-ink">{item.dimension}</p>
                <p className="text-2xs text-muted mt-0.5 italic">{item.q}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-100 p-2.5 rounded">
                  <p className="text-2xs font-semibold text-red-700 mb-1">Score: 1–4</p>
                  <p className="text-xs text-red-800">{item.low}</p>
                </div>
                <div className="bg-forest-50 border border-forest-100 p-2.5 rounded">
                  <p className="text-2xs font-semibold text-forest-700 mb-1">Score: 7–10</p>
                  <p className="text-xs text-forest-800">{item.high}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mt-3 italic">
          The overall score (1–100) is a weighted sum of all five dimensions.
        </p>
      </section>

      {/* Step 5 — Write it */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl text-ink mb-2">Step 5 — Write it up</h2>
        <p className="text-muted mb-6 leading-relaxed">
          If the problem passed all four gates and you've scored it, you're ready to write. 
          Use the MDX template. The goal is to make the reader <em>feel</em> the problem — 
          not hand them a business plan.
        </p>
        <div className="border border-border bg-cream-200 p-5 rounded">
          <p className="text-2xs font-semibold uppercase tracking-widest text-muted mb-3">Writing rules</p>
          <ul className="flex flex-col gap-2">
            {[
              'Describe the problem as if you live it — specific, not abstract',
              'Every stat needs a source — even a rough one ("~18M landlords according to NAR")',
              'Proof signals must be real — name the subreddit, the thread type, the volume',
              'No solutions — you are not building a business plan',
              'No revenue projections — you are not IdeaBrowser',
              'The "Go Research This" section must have real search queries someone can copy-paste',
              '"Questions Worth Asking" should be things you genuinely don\'t know the answer to',
            ].map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink">
                <span className="text-forest-500 flex-shrink-0">→</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="border border-forest-200 bg-forest-50 p-6 text-center rounded">
        <p className="font-serif text-xl text-ink mb-2">Ready to submit a problem?</p>
        <p className="text-sm text-muted mb-4">
          Found something that passes all four gates? We'd love to feature it.
        </p>
        <Link href="/submit"
          className="inline-flex items-center gap-2 bg-forest-600 text-cream px-6 py-2.5 text-sm font-semibold hover:bg-forest-500 transition-colors">
          Submit a problem <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
