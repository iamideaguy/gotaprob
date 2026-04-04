# gotaprob

> Real problems worth solving. A curated content site built for SEO, ads, and weekly publishing.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS — cream/green design system |
| Content | MDX files in `content/problems/` |
| Hosting | Vercel |
| Newsletter | Beehiiv |
| Ads | Google AdSense → Mediavine |

---

## Getting started locally

```bash
# 1. Install
npm install

# 2. Copy env file
cp .env.local.example .env.local
# Leave values blank while developing — ad placeholders show instead

# 3. Run
npm run dev
# → http://localhost:3000
```

---

## How adding a problem works

Every problem is one `.mdx` file in `content/problems/`. When you add a file and push:

- It appears in the homepage feed automatically
- The total problem count in the header updates
- Category pages update with the new entry
- Top scored / most recent lists update
- SEO metadata generates from the frontmatter
- Vercel rebuilds in ~30 seconds

**You never touch code to add content.**

---

## Adding a new problem

### 1. Create the file

The filename becomes the URL slug:
```
content/problems/your-problem-slug.mdx
→ gotaprob.com/problems/your-problem-slug
```

### 2. Copy this template

```mdx
---
title: "Specific problem title — concrete, not vague"
standfirst: "1–2 sentences describing the problem and why nothing solves it cleanly."
heat: burning        # burning | warm | fresh
featured: false      # set true on ONE problem to make it the homepage hero
categories:
  - Finance          # 1–3 from the list below
  - Work
tags:
  - Tag One
  - Tag Two
dateAdded: "2026-03-24"   # YYYY-MM-DD
views: 0

stats:
  - number: "18M"
    label: "People affected"
  - number: "$200+"
    label: "Cost of existing solutions"
  - number: "72%"
    label: "Use manual workarounds"

scoreCard:
  overall: 75          # 1–100
  breakdown:
    - dimension: "Market Size"
      score: 8         # 1–10
      note: "One sentence explaining the score."
    - dimension: "Pain Intensity"
      score: 7
      note: "How loud and frequent are the complaints?"
    - dimension: "Solution Gap"
      score: 8
      note: "How badly do existing tools fall short?"
    - dimension: "Timing"
      score: 6
      note: "Is this growing or shrinking as a problem?"
    - dimension: "Competition Risk"
      score: 5
      note: "How hard would it be to win this market?"
  resources:
    - label: "Reddit thread title or site name"
      url: "https://..."
      type: reddit     # reddit | article | data | tool | community | other

proofSignals:
  - platform: "Platform name (member count)"
    detail: "What people are saying there and how many."

whoHasIt:
  - segment: "Segment Name"
    description: "Who they are and how they experience this problem."

whyNothingWorks:
  - tool: "Existing Tool"
    reason: "Why it fails for this specific group."

researchLinks:
  - platform: "Reddit"
    url: "https://reddit.com/r/relevant"
    searchQuery: "keywords to search"
    detail: "What you'll find there."

questionsToAsk:
  - "Question someone should answer before pursuing this?"
  - "Another question worth investigating?"
---

Body text goes here — this is the "The Problem" section.
Write 3–5 paragraphs describing the problem as if you live it.
Be specific. No solutions. No revenue projections.
```

### 3. Push

```bash
git add content/problems/your-problem-slug.mdx
git commit -m "Add: your problem title"
git push
```

Vercel deploys in ~30 seconds. Done.

---

## Score card system

Each problem has a `scoreCard` with:

- **Overall** (1–100) — shown as the big number on the detail page sidebar
- **Breakdown** — 5 dimensions scored 1–10 with a one-sentence note each
- **Resources** — clickable links to sources (Reddit threads, data, tools)

The score card has three tabs: Score / Breakdown / Resources.

Score thresholds:
- **75+** → green — strong signal
- **50–74** → amber — moderate signal
- **<50** → red — early/weak signal

---

## Categories

Use these exact strings in `categories:` frontmatter:

```
Health · Work · Finance · Home · Education · Community
Shopping · Food · Real Estate · Travel · Pets · Parenting
Tech · Immigration · Sports · Environment · Housing · Transportation
```

---

## Heat levels

| Value | When to use |
|---|---|
| `burning` | Active, loud, growing complaints. Clear gap. |
| `warm` | Steady frustration. Some solutions but they're bad. |
| `fresh` | Quieter or emerging. Directionally interesting. |

---

## Featured problem

Set `featured: true` on exactly one problem. That problem becomes the homepage hero. If no problem is marked featured, the highest-scored problem is used automatically.

---

## Ad setup

1. Apply at adsense.google.com
2. Once approved, get your publisher ID (`ca-pub-XXXXXXXXX`)
3. Create 4 ad units in AdSense:
   - Sidebar Rectangle (300×250) → `AD_SLOT_SIDEBAR_1`
   - Sidebar Half-Page (300×600) → `AD_SLOT_SIDEBAR_2`
   - In-Feed → `AD_SLOT_INFEED`
   - In-Article → `AD_SLOT_ARTICLE`
4. Add all IDs to `.env.local`
5. Push — ads go live automatically

---

## Newsletter setup (Beehiiv)

1. Create account at beehiiv.com
2. Create publication "gotaprob"
3. Update the form `action` URL in `components/Sidebar.tsx` and `components/NewsletterSection.tsx`
4. Set up a weekly automation: every Tuesday 8am, send the new problem

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo in the Vercel dashboard. Every `git push` auto-deploys.

Add environment variables in: **Vercel Dashboard → Project → Settings → Environment Variables**

---

## Weekly publishing workflow

| Day | Task |
|---|---|
| Monday | Browse Reddit, G2 reviews, Google Trends. Pick this week's problem. |
| Tuesday | Write the MDX file. `git push`. Vercel deploys in 30s. |
| Tuesday | Send Beehiiv newsletter. |
| Wed–Fri | Post on Reddit (relevant subreddit), X, LinkedIn, TikTok/Reels. |

---

## Project structure

```
gotaprob/
├── app/
│   ├── layout.tsx                    # Root layout, AdSense script
│   ├── page.tsx                      # Homepage
│   ├── globals.css
│   ├── browse/page.tsx               # /browse — all problems, sort by top/recent
│   ├── problems/[slug]/page.tsx      # Individual problem page
│   └── categories/[category]/page.tsx
├── components/
│   ├── Header.tsx                    # Sticky nav with live problem count
│   ├── Footer.tsx
│   ├── Sidebar.tsx                   # Top scored + recent + newsletter + ads
│   ├── ProblemCard.tsx               # FeaturedCard, ProblemCard, ProblemRow, ProblemListRow
│   ├── ScoreCard.tsx                 # Tabbed score widget (Score / Breakdown / Resources)
│   ├── HeatBadge.tsx
│   ├── AdUnit.tsx                    # Drop AdSense once, reuse everywhere
│   └── NewsletterSection.tsx
├── lib/
│   ├── problems.ts                   # All data reading logic
│   └── utils.ts
├── content/
│   └── problems/                     # ← ADD YOUR MDX FILES HERE
│       ├── landlord-maintenance-tracking.mdx
│       └── freelancer-income-reconciliation.mdx
├── .env.local.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
