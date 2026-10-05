import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Two rows of giant words that travel in opposite directions as the page scrolls.
// Movement is tied to scroll position, never to a timer, so it stops when the reader stops.
export default function ScrollWords({ top, bottom, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-38%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-38%', '4%'])
  const row = (words) => [...words, ...words, ...words].join('  ·  ')

  return (
    <section className={`swords ${className}`} ref={ref} aria-label={[...top, ...bottom].join(', ')}>
      <motion.p className="swords__row" style={{ x: x1 }} aria-hidden="true">
        {row(top)}
      </motion.p>
      <motion.p className="swords__row swords__row--outline" style={{ x: x2 }} aria-hidden="true">
        {row(bottom)}
      </motion.p>
    </section>
  )
}
