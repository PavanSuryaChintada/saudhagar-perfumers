import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { ease } from './Reveal'
import { lockScroll } from '../hooks/useLenis'
import { finishIntro } from '../intro'
import { HERO_SLIDES } from '../data/hero'

const reduceMotion = (() => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
})()

const seenBefore = (() => {
  try {
    return sessionStorage.getItem('saudagar-intro') === '1'
  } catch {
    return false
  }
})()

const STAGES = ['Gathering oud', 'Distilling rose', 'Steeping saffron', 'Resting in glass']
const BODY = { top: 64, bottom: 196 } // liquid range inside the bottle, in SVG units

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })

// Phases: loading → bloom (photo rises out of the dark) → settle (photo shrinks into the hero frame) → gone
export default function Preloader() {
  const [phase, setPhase] = useState(reduceMotion ? 'gone' : 'loading')
  const [stage, setStage] = useState(0)
  const [target, setTarget] = useState(null)
  const fill = useMotionValue(0)
  const counter = useRef(null)
  const liquidY = useTransform(fill, [0, 1], [BODY.bottom, BODY.top])

  // Real progress: hero photo + web fonts, never faster than a minimum, never slower than 7s.
  useEffect(() => {
    if (reduceMotion) {
      finishIntro()
      return
    }
    lockScroll(true)
    const minMs = seenBefore ? 1100 : 2600
    const tasks = [loadImage(HERO_SLIDES[0].img), document.fonts?.ready ?? Promise.resolve()]
    let loaded = 0
    tasks.forEach((t) => t.then(() => (loaded += 1)))
    const start = performance.now()
    let shown = 0
    let raf
    const tick = (now) => {
      const elapsed = now - start
      const byTime = Math.min(1, elapsed / minMs)
      const byLoad = elapsed > 7000 ? 1 : (loaded / tasks.length) * 0.9 + 0.1
      const goal = Math.min(byTime, byLoad)
      shown += (goal - shown) * 0.08
      if (goal >= 1 && shown > 0.995) shown = 1
      fill.set(shown)
      if (counter.current) counter.current.textContent = String(Math.round(shown * 100)).padStart(3, '0')
      setStage(Math.min(STAGES.length - 1, Math.floor(shown * STAGES.length)))
      if (shown < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setPhase('bloom'), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [fill])

  // Measure where the hero frame sits so the photo can land exactly on it.
  useEffect(() => {
    if (phase !== 'bloom') return
    const vw = window.innerWidth
    const vh = window.innerHeight
    const el = document.querySelector('.hero__media')
    const r = el?.getBoundingClientRect()
    const rect = r && r.width > 0 && r.top < vh ? r : { left: 0, top: 0, width: vw, height: vh }
    const scale = Math.max(vw / rect.width, vh / rect.height)
    setTarget({
      rect,
      scale,
      x: vw / 2 - (rect.left + rect.width / 2),
      y: vh / 2 - (rect.top + rect.height / 2),
      onHero: !!el,
    })
    const t = setTimeout(() => setPhase('settle'), 1100)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'settle') return
    finishIntro()
    const t = setTimeout(() => {
      setPhase('gone')
      lockScroll(false)
      try {
        sessionStorage.setItem('saudagar-intro', '1')
      } catch {
        /* ignore */
      }
    }, 1300)
    return () => clearTimeout(t)
  }, [phase])

  const settling = phase === 'settle'

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div className="pl" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <motion.div
            className="pl__bg"
            animate={{ opacity: settling ? 0 : 1 }}
            transition={{ duration: 1, ease, delay: settling ? 0.15 : 0 }}
          />

          {target && (
            <motion.div
              className="pl__photo"
              style={{
                left: target.rect.left,
                top: target.rect.top,
                width: target.rect.width,
                height: target.rect.height,
              }}
              initial={{
                x: target.x,
                y: target.y,
                scale: target.scale,
                clipPath: 'inset(100% 0% 0% 0%)',
                borderRadius: 0,
              }}
              animate={
                settling
                  ? { x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', borderRadius: target.onHero ? 10 : 0 }
                  : { clipPath: 'inset(0% 0% 0% 0%)' }
              }
              transition={settling ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] } : { duration: 1, ease }}
            >
              <motion.img
                src={HERO_SLIDES[0].img}
                alt=""
                initial={{ scale: 1.25 }}
                animate={{ scale: settling ? 1.02 : 1.08 }}
                transition={{ duration: settling ? 1.2 : 1.6, ease }}
              />
            </motion.div>
          )}

          <motion.div
            className="pl__center"
            animate={
              phase === 'loading'
                ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, scale: 1.35, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.9, ease }}
          >
            <svg className="pl__bottle" viewBox="0 0 120 210">
              <defs>
                <clipPath id="pl-body">
                  <rect x="16" y="64" width="88" height="132" rx="14" />
                </clipPath>
                <linearGradient id="pl-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f7d98a" />
                  <stop offset="1" stopColor="#a87b34" />
                </linearGradient>
              </defs>
              <g clipPath="url(#pl-body)">
                <motion.g style={{ y: liquidY }}>
                  <motion.path
                    d="M-120 0 Q -105 -6 -90 0 T -60 0 T -30 0 T 0 0 T 30 0 T 60 0 T 90 0 T 120 0 T 150 0 T 180 0 V 140 H -120 Z"
                    fill="url(#pl-gold)"
                    animate={{ x: [0, 60] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.g>
              </g>
              {[
                'M30 64 H90 Q104 64 104 78 V182 Q104 196 90 196 H30 Q16 196 16 182 V78 Q16 64 30 64 Z',
                'M50 64 V50 H70 V64',
                'M42 50 V14 Q42 10 46 10 H74 Q78 10 78 14 V50 Z',
              ].map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="#f7d98a"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.1 + i * 0.25, ease }}
                />
              ))}
              <motion.text
                x="60"
                y="136"
                textAnchor="middle"
                fontFamily="Cinzel, serif"
                fontSize="9"
                letterSpacing="2"
                fill="#000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 1 }}
              >
                SAUDAGAR
              </motion.text>
            </svg>

            <div className="pl__count">
              <span ref={counter}>000</span>
            </div>
            <div className="pl__stage">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {STAGES[stage]}…
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="pl__foot"
            animate={{ opacity: phase === 'loading' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span>Saudagar Perfumers</span>
            <span className="pl__bar">
              <motion.span style={{ scaleX: fill }} />
            </span>
            <span>Premium Fragrances</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

