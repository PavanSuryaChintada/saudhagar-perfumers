import { useId } from 'react'
import { motion } from 'framer-motion'

// Every bottle on the site is drawn here, so the catalogue stays coherent
// without product photography. Four silhouettes, one glass treatment.
const SHAPES = {
  classic: {
    body: 'M54,108 H146 Q164,108 164,126 V288 Q164,306 146,306 H54 Q36,306 36,288 V126 Q36,108 54,108 Z',
    top: 108,
    bottom: 306,
    neck: { x: 82, y: 92, w: 36, h: 18 },
    cap: 'M64,30 H136 V94 H64 Z',
    capFacets: ['M64,46 H136', 'M100,30 V94'],
    label: { x: 62, y: 184, w: 76, h: 58 },
    hl: { x: 46, y: 122, w: 9, h: 168 },
  },
  obelisk: {
    body: 'M66,84 H134 L146,298 Q146,308 136,308 H64 Q54,308 54,298 Z',
    top: 84,
    bottom: 308,
    neck: { x: 87, y: 68, w: 26, h: 18 },
    cap: 'M80,10 H120 L116,70 H84 Z',
    capFacets: ['M100,10 V70'],
    label: { x: 70, y: 176, w: 60, h: 62 },
    hl: { x: 66, y: 98, w: 7, h: 194 },
  },
  round: {
    body: 'M10,214 A90,90 0 1 0 190,214 A90,90 0 1 0 10,214 Z',
    top: 124,
    bottom: 304,
    neck: { x: 84, y: 102, w: 32, h: 26 },
    cap: 'M68,72 A32,32 0 1 0 132,72 A32,32 0 1 0 68,72 Z',
    capFacets: ['M70,72 H130'],
    label: { x: 64, y: 196, w: 72, h: 46 },
    hl: { x: 30, y: 168, w: 8, h: 90 },
  },
  attar: {
    body: 'M100,148 L154,188 L154,270 L100,310 L46,270 L46,188 Z',
    top: 148,
    bottom: 310,
    neck: { x: 90, y: 124, w: 20, h: 28 },
    cap: 'M100,8 C120,44 128,78 120,104 Q116,126 100,126 Q84,126 80,104 C72,78 80,44 100,8 Z',
    capFacets: ['M100,8 V126', 'M86,60 Q100,70 114,60'],
    facets: ['M100,148 V310', 'M46,188 L100,228 L154,188', 'M46,270 L100,228 L154,270'],
    medallion: { cx: 100, cy: 228, r: 20 },
    hl: { x: 54, y: 194, w: 6, h: 70 },
  },
}

export default function Bottle({
  shape = 'classic',
  liquid = '#7a3d12',
  name,
  fill = 0.72,
  capLift = 0,
  animateFill = false,
  delay = 0,
  className = '',
  title,
}) {
  const uid = useId().replace(/:/g, '')
  const s = SHAPES[shape] ?? SHAPES.classic
  const span = s.bottom - s.top
  const emptyH = span * (1 - fill)

  return (
    <svg
      viewBox="0 0 200 330"
      className={`bottle ${className}`}
      role="img"
      aria-label={title ?? (name ? `${name} bottle` : 'Perfume bottle')}
    >
      <defs>
        <clipPath id={`b-${uid}`}>
          <path d={s.body} />
        </clipPath>
        <linearGradient id={`l-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity="0.95" />
          <stop offset="1" stopColor={liquid} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a2c" />
          <stop offset="0.35" stopColor="#F7D98A" />
          <stop offset="0.6" stopColor="#c9a15a" />
          <stop offset="1" stopColor="#6e5222" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="100" cy="318" rx="78" ry="7" fill="#000" opacity="0.55" />

      {/* glass body */}
      <path d={s.body} fill={`url(#glass-${uid})`} />
      <g clipPath={`url(#b-${uid})`}>
        <motion.g
          initial={animateFill ? { y: span } : false}
          animate={{ y: emptyH }}
          transition={{ duration: animateFill ? 2.2 : 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="0" y={s.top} width="200" height={span + 4} fill={`url(#l-${uid})`} />
          <rect x="0" y={s.top} width="200" height="2.5" fill="#fff" opacity="0.22" />
        </motion.g>
        {s.facets?.map((d) => (
          <path key={d} d={d} stroke="#F7D98A" strokeOpacity="0.18" strokeWidth="1" fill="none" />
        ))}
        <rect x={s.hl.x} y={s.hl.y} width={s.hl.w} height={s.hl.h} fill="#fff" opacity="0.13" />
      </g>
      <path d={s.body} fill="none" stroke="#F7D98A" strokeOpacity="0.55" strokeWidth="1.2" />

      {/* label */}
      {s.label && (
        <g>
          <rect
            x={s.label.x}
            y={s.label.y}
            width={s.label.w}
            height={s.label.h}
            fill="#050505"
            stroke={`url(#g-${uid})`}
            strokeWidth="1"
          />
          <text
            x="100"
            y={s.label.y + 20}
            textAnchor="middle"
            fill="#F7D98A"
            fontFamily="Cinzel, serif"
            fontSize="9.5"
            letterSpacing="1.6"
          >
            SAUDAGAR
          </text>
          <line
            x1={100 - s.label.w / 4}
            x2={100 + s.label.w / 4}
            y1={s.label.y + 28}
            y2={s.label.y + 28}
            stroke="#c9a15a"
            strokeWidth="0.6"
          />
          {name && (
            <text
              x="100"
              y={s.label.y + 44}
              textAnchor="middle"
              fill="#c9a15a"
              fontFamily="Poppins, sans-serif"
              fontSize={name.length > 12 ? 5.5 : 6.5}
              letterSpacing="1"
            >
              {name.toUpperCase()}
            </text>
          )}
        </g>
      )}
      {s.medallion && (
        <g>
          <circle {...s.medallion} fill="#050505" stroke={`url(#g-${uid})`} strokeWidth="1.2" />
          <text
            x={s.medallion.cx}
            y={s.medallion.cy + 6}
            textAnchor="middle"
            fill="#F7D98A"
            fontFamily="Cinzel, serif"
            fontSize="17"
          >
            S
          </text>
        </g>
      )}

      {/* neck + cap */}
      <rect {...rectProps(s.neck)} fill={`url(#g-${uid})`} opacity="0.85" />
      <motion.g
        animate={{ y: -capLift, rotate: capLift ? -4 : 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        style={{ transformOrigin: '100px 90px' }}
      >
        <path d={s.cap} fill={`url(#g-${uid})`} />
        {s.capFacets.map((d) => (
          <path key={d} d={d} stroke="#3d2c0e" strokeOpacity="0.35" strokeWidth="1" fill="none" />
        ))}
      </motion.g>
    </svg>
  )
}

const rectProps = ({ x, y, w, h }) => ({ x, y, width: w, height: h })
