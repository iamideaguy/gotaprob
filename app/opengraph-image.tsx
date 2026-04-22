import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'gotaprob — Real problems worth solving'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF7F0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Georgia, serif',
          padding: '72px 80px',
          borderTop: '6px solid #1F521F',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ color: '#1a1a18', fontSize: 22, fontWeight: 700, fontStyle: 'italic' }}>gotaprob</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ color: '#1a1a18', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            Real problems,
          </div>
          <div style={{ color: '#1a1a18', fontSize: 72, fontStyle: 'italic', fontWeight: 700, lineHeight: 1.1 }}>
            worth solving.
          </div>
          <div style={{ color: '#6b7280', fontSize: 26, marginTop: 16, lineHeight: 1.5, maxWidth: 700 }}>
            A curated collection of problems from everyday life. Scored, researched, and ready to explore.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#9ca3af', fontSize: 16, letterSpacing: 3, textTransform: 'uppercase' }}>
            gotaprob.com
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1F521F', borderRadius: 6, padding: '10px 20px' }}>
            <div style={{ color: '#FAF7F0', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>Free forever</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
