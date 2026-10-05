import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ease } from '../components/Reveal'
import { PRODUCTS } from '../data/products'

// Facts that come from the catalogue itself, so they stay true as products change.
const attars = PRODUCTS.filter((p) => p.type === 'Attar').length
const STATS = [
  { value: PRODUCTS.length, label: 'Fragrances in the house' },
  { value: attars, label: 'Alcohol-free attars' },
  { value: 4, label: 'Scent families' },
  { value: 7, label: 'Days to return unopened bottles' },
]

function Count({ to, start }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!start || reduce) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [start, to, reduce])
  return <>{String(n).padStart(2, '0')}</>
}

export default function Stats() {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section className="stats" ref={ref} aria-label="The house in numbers">
      <ul className="stats__row container">
        {STATS.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={seen ? { clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ duration: 1, delay: i * 0.12, ease }}
          >
            <span className="display stats__n">
              <Count to={s.value} start={seen} />
            </span>
            <span className="stats__l">{s.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
