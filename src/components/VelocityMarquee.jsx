import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// A line of words that drifts on its own and surges with the speed of the scroll,
// reversing direction when the reader scrolls back up.
export default function VelocityMarquee({ items, speed = 2, className = '' }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * speed * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    base.set(base.get() - move)
  })

  const row = [...items, ...items]
  return (
    <div className={`vmarq ${className}`} aria-label={items.join(', ')}>
      <motion.div className="vmarq__track" style={{ x }} aria-hidden="true">
        {[0, 1].map((copy) => (
          <span className="vmarq__set" key={copy}>
            {row.map((t, i) => (
              <span className={`vmarq__item ${i % 2 ? 'vmarq__item--outline' : ''}`} key={i}>
                {t}
                <svg viewBox="0 0 10 10" className="vmarq__star">
                  <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
