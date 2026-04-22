import { ImageResponse } from 'next/og'
import { getProblemBySlug } from '@/lib/problems'

export const alt = 'gotaprob problem'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage({ params }: { params: { slug: string } }) {
  const problem = getProblemBySlug(params.slug)
  const title = problem?.title ?? 'Real problems worth solving'
  const score = problem?.scoreCard?.overall ?? null
  const category = problem?.categories?.[0] ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1F521F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Georgia, serif',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: '#FAF7F0', fontSize: 22, fontWeight: 700 }}>gotaprob</div>
          {category && (
            <>
              <div style={{ color: 'rgba(250,247,240,0.4)', fontSize: 18 }}>·</div>
              <div style={{ color: 'rgba(250,247,240,0.6)', fontSize: 16, letterSpacing: 3, textTransform: 'uppercase' }}>{category}</div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: '#FAF7F0', fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: score ? 900 : 1040 }}>
            {title}
          </div>
          {problem?.standfirst && (
            <div style={{ color: 'rgba(250,247,240,0.65)', fontSize: 24, lineHeight: 1.5, maxWidth: 800 }}>
              {problem.standfirst}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: 'rgba(250,247,240,0.5)', fontSize: 16, letterSpacing: 3, textTransform: 'uppercase' }}>
            gotaprob.com
          </div>
          {score !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(250,247,240,0.1)', border: '1px solid rgba(250,247,240,0.2)', borderRadius: 8, padding: '12px 24px' }}>
              <div style={{ color: '#FAF7F0', fontSize: 42, fontWeight: 700 }}>{score}</div>
              <div style={{ color: 'rgba(250,247,240,0.6)', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1.3 }}>Opportunity<br />Score</div>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
