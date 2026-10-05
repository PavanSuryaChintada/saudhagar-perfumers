import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ease } from '../components/Reveal'
import { REVIEWS } from '../data/products'

const INTERVAL = 7000

export default function Reviews() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const r = REVIEWS[i]

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => setI((n) => (n + 1) % REVIEWS.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, paused, reduce])

  const go = (d) => setI((n) => (n + d + REVIEWS.length) % REVIEWS.length)

  return (
    <section
      className="reviews section"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container reviews__inner">
        <div className="reviews__stars" aria-label="Rated 4.8 out of 5">
          {'★★★★★'}
          <span>4.8 from 2,200+ reviews</span>
        </div>

        <div className="reviews__stage">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <blockquote>“{r.quote}”</blockquote>
              <figcaption>
                {r.name}, {r.city}
                <span>on {r.product}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="reviews__controls">
          <button className="text-btn" onClick={() => go(-1)} aria-label="Previous review">
            Previous
          </button>
          <div className="reviews__dots">
            {REVIEWS.map((_, n) => (
              <button
                key={n}
                className={`reviews__dot ${n === i ? 'is-active' : ''}`}
                onClick={() => setI(n)}
                aria-label={`Show review ${n + 1}`}
              >
                {n === i && !paused && !reduce && (
                  <motion.span
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          <button className="text-btn" onClick={() => go(1)} aria-label="Next review">
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
