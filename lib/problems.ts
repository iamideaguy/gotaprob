import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROBLEMS_DIR = path.join(process.cwd(), 'content/problems')

export type HeatLevel = 'burning' | 'warm' | 'fresh'

export interface ScoreBreakdown {
  dimension: string
  score: number
  note: string
}

export interface Resource {
  label: string
  url: string
  type: 'reddit' | 'article' | 'data' | 'tool' | 'community' | 'other'
}

export interface ScoreCard {
  overall: number
  breakdown: ScoreBreakdown[]
  resources: Resource[]
  lastResearched?: string
}

export interface ScoreBadges {
  opportunity: number
  painLevel: number
  feasibility: number
  timing: number
}

export interface TrendKeyword {
  keyword: string
  note: string
}

export interface ProblemStat {
  number: string
  label: string
  source?: string
}

export interface ProofSignal {
  platform: string
  detail: string
}

export interface WhoHasIt {
  segment: string
  description: string
}

export interface WhyNothingWorks {
  tool: string
  reason: string
}

export interface ResearchLink {
  platform: string
  url?: string
  searchQuery: string
  detail: string
}

export interface Problem {
  slug: string
  title: string
  standfirst: string
  heat: HeatLevel
  categories: string[]
  tags: string[]
  dateAdded: string
  views: number
  featured: boolean
  scoreCard: ScoreCard | null
  scoreBadges: ScoreBadges | null
  trendKeywords: TrendKeyword[]
  stats: ProblemStat[]
  proofSignals: ProofSignal[]
  whoHasIt: WhoHasIt[]
  whyNothingWorks: WhyNothingWorks[]
  researchLinks: ResearchLink[]
  questionsToAsk: string[]
  content: string
}

export type ProblemMeta = Omit<Problem, 'content'> & { excerpt: string }

export function getProblemBySlug(slug: string): Problem | null {
  const filePath = path.join(PROBLEMS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return {
    slug,
    title:           data.title           ?? '',
    standfirst:      data.standfirst      ?? '',
    heat:            data.heat            ?? 'fresh',
    categories:      data.categories      ?? [],
    tags:            data.tags            ?? [],
    dateAdded:       data.dateAdded       ?? '',
    views:           data.views           ?? 0,
    featured:        data.featured        ?? false,
    scoreCard:       data.scoreCard       ?? null,
    scoreBadges:     data.scoreBadges     ?? null,
    trendKeywords:   data.trendKeywords   ?? [],
    stats:           data.stats           ?? [],
    proofSignals:    data.proofSignals    ?? [],
    whoHasIt:        data.whoHasIt        ?? [],
    whyNothingWorks: data.whyNothingWorks ?? [],
    researchLinks:   data.researchLinks   ?? [],
    questionsToAsk:  data.questionsToAsk  ?? [],
    content: content
      .split(/\n\n+/)
      .filter(p => p.trim())
      .map(p => `<p>${p.trim().replace(/\n/g, ' ')}</p>`)
      .join('\n'),
  }
}

function parseMeta(file: string): ProblemMeta {
  const slug = file.replace(/\.mdx$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(PROBLEMS_DIR, file), 'utf-8'))
  const excerpt = content.replace(/^#+\s.*/gm, '').replace(/\n+/g, ' ').trim().slice(0, 180) + '...'
  return {
    slug,
    title:           data.title           ?? '',
    standfirst:      data.standfirst      ?? '',
    excerpt,
    heat:            (data.heat           ?? 'fresh') as HeatLevel,
    categories:      data.categories      ?? [],
    tags:            data.tags            ?? [],
    dateAdded:       data.dateAdded       ?? '',
    views:           data.views           ?? 0,
    featured:        data.featured        ?? false,
    scoreCard:       data.scoreCard       ?? null,
    scoreBadges:     data.scoreBadges     ?? null,
    trendKeywords:   data.trendKeywords   ?? [],
    stats:           data.stats           ?? [],
    proofSignals:    data.proofSignals    ?? [],
    whoHasIt:        data.whoHasIt        ?? [],
    whyNothingWorks: data.whyNothingWorks ?? [],
    researchLinks:   data.researchLinks   ?? [],
    questionsToAsk:  data.questionsToAsk  ?? [],
  }
}

function readAllFiles(): ProblemMeta[] {
  if (!fs.existsSync(PROBLEMS_DIR)) return []
  return fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.mdx')).map(parseMeta)
}

export function getAllProblems(): ProblemMeta[] {
  return readAllFiles().sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}

export function getTopProblems(limit = 5): ProblemMeta[] {
  return readAllFiles()
    .sort((a, b) => {
      const sa = a.scoreCard?.overall ?? 0
      const sb = b.scoreCard?.overall ?? 0
      return sb !== sa ? sb - sa : b.views - a.views
    })
    .slice(0, limit)
}

export function getRecentProblems(limit = 6): ProblemMeta[] {
  return getAllProblems().slice(0, limit)
}

export function getFeaturedProblem(): ProblemMeta | null {
  const all = readAllFiles()
  return all.find(p => p.featured) ?? getTopProblems(1)[0] ?? null
}

export function getProblemsByCategory(category: string): ProblemMeta[] {
  return getAllProblems().filter(p =>
    p.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())
  )
}

export function getAllCategories(): { name: string; count: number }[] {
  const counts: Record<string, number> = {}
  readAllFiles().forEach(p => p.categories.forEach(c => { counts[c] = (counts[c] ?? 0) + 1 }))
  return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
}

export function getProblemCount(): number {
  if (!fs.existsSync(PROBLEMS_DIR)) return 0
  return fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.mdx')).length
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(PROBLEMS_DIR)) return []
  return fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export const HEAT_CONFIG: Record<HeatLevel, { label: string; emoji: string; bg: string; text: string }> = {
  burning: { label: 'Burning', emoji: '🔥', bg: 'bg-red-100',   text: 'text-red-800'    },
  warm:    { label: 'Warm',    emoji: '⚡', bg: 'bg-amber-100', text: 'text-amber-800'  },
  fresh:   { label: 'Fresh',   emoji: '🌿', bg: 'bg-forest-50', text: 'text-forest-600' },
}

export const CATEGORY_EMOJI: Record<string, string> = {
  'Health': '🏥', 'Work': '💼', 'Finance': '💰', 'Home': '🏠',
  'Education': '🎓', 'Community': '🌍', 'Shopping': '🛒', 'Food': '🍽',
  'Real Estate': '🏘', 'Travel': '✈', 'Pets': '🐾', 'Parenting': '👨‍👩‍👧',
  'Tech': '💻', 'Immigration': '🌐', 'Sports': '⚽', 'Environment': '🌿',
  'Transportation': '🚗', 'Housing': '🏠', 'Healthcare': '💊',
  'Fitness': '💪', 'Mental Health': '🧠', 'Insurance': '📋',
}

export const CATEGORY_TREE: Record<string, Record<string, string[]>> = {
  'Physical World': {
    'Health & Body': ['Healthcare', 'Mental Health', 'Fitness', 'Nutrition', 'Senior Care'],
    'Home & Living': ['Housing', 'Home Maintenance', 'Moving', 'Neighbourhood'],
    'Food & Drink': ['Grocery', 'Restaurants', 'Cooking'],
    'Transportation': ['Commuting', 'Car Ownership', 'Public Transit', 'Travel'],
    'Environment': ['Sustainability', 'Recycling', 'Energy'],
    'Retail & Shopping': ['Consumer Goods', 'Returns', 'Pricing Transparency'],
  },
  'Digital & Knowledge': {
    'Work & Career': ['Remote Work', 'Freelance', 'Job Search', 'Hiring', 'Skills'],
    'Finance': ['Budgeting', 'Investing', 'Tax', 'Credit', 'Insurance'],
    'Education': ['K-12', 'Higher Ed', 'Self-learning', 'Credentials'],
    'Tech & Software': ['SaaS Gaps', 'Privacy', 'AI Tools', 'Developer Tools'],
    'Community & Society': ['Immigration', 'Local Government', 'Parenting'],
    'Media & Entertainment': ['Content Creation', 'Sports', 'Gaming'],
  },
}
