'use client'

const DOTS = [
  { x: 62, y: 38, delay: '0s',   dur: '3.2s' },
  { x: 35, y: 55, delay: '0.8s', dur: '3.8s' },
  { x: 70, y: 68, delay: '1.6s', dur: '2.9s' },
  { x: 48, y: 25, delay: '2.1s', dur: '4.1s' },
  { x: 25, y: 40, delay: '0.4s', dur: '3.5s' },
  { x: 78, y: 50, delay: '1.2s', dur: '3.0s' },
  { x: 55, y: 72, delay: '2.8s', dur: '3.7s' },
  { x: 40, y: 78, delay: '1.9s', dur: '2.8s' },
]

export function RadarOrb() {
  return (
    <div className="hidden lg:flex items-center justify-center w-full h-full pointer-events-none select-none">
      <div className="relative w-80 h-80" aria-hidden="true">

        {/* Rings */}
        {[1, 0.65, 0.35].map((scale, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-forest-600"
            style={{
              opacity: 0.12,
              transform: `scale(${scale})`,
              top: `${(1 - scale) * 50}%`,
              left: `${(1 - scale) * 50}%`,
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
            }}
          />
        ))}

        {/* Cross hairs */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.07 }}>
          <div className="absolute w-full h-px bg-forest-600" />
          <div className="absolute w-px h-full bg-forest-600" />
        </div>

        {/* Sweep */}
        <div
          className="absolute inset-0 rounded-full radar-sweep"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(31,82,31,0.15) 300deg, rgba(31,82,31,0.35) 355deg, transparent 360deg)`,
            filter: 'blur(4px)',
          }}
        />

        {/* Dots */}
        {DOTS.map((d, i) => (
          <div
            key={i}
            className="absolute radar-dot"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              animationDelay: d.delay,
              animationDuration: d.dur,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-forest-500"
              style={{ opacity: 0.3 }}
            />
          </div>
        ))}

        {/* Centre dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-forest-600" style={{ opacity: 0.5 }} />
        </div>

      </div>

      <style>{`
        .radar-sweep {
          animation: radar-spin 4s linear infinite;
          transform-origin: center;
        }
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .radar-dot {
          animation: radar-ping 3s ease-in-out infinite;
        }
        @keyframes radar-ping {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.8); }
        }
      `}</style>
    </div>
  )
}
