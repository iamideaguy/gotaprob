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
          background: '#1F521F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          padding: '80px',
        }}
      >
        <div style={{ color: 'rgba(250,247,240,0.5)', fontSize: 16, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 32 }}>
          A CURATED COLLECTION · FREE FOREVER
        </div>
        <div style={{ color: '#FAF7F0', fontSize: 80, fontWeight: 700, lineHeight: 1.1, textAlign: 'center', marginBottom: 32 }}>
          gotaprob
        </div>
        <div style={{ color: 'rgba(250,247,240,0.7)', fontSize: 28, textAlign: 'center', maxWidth: 700, lineHeight: 1.5 }}>
          Real problems worth solving
        </div>
      </div>
    ),
    { ...size }
  )
}
