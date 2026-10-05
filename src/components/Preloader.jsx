import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from './Reveal'

const introSeen = (() => {
  try {
    return (
      sessionStorage.getItem('saudagar-intro') === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  } catch {
    return false
  }
})()

// Seconds the hero should wait so its entrance plays after the curtain lifts.
// eslint-disable-next-line react-refresh/only-export-components
export const INTRO_DELAY = introSeen ? 0.1 : 2.6

// The logo lock-up assembles itself once per visit, then the curtain lifts.
export default function Preloader() {
  const [done, setDone] = useState(introSeen)

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => {
      setDone(true)
      try {
        sessionStorage.setItem('saudagar-intro', '1')
      } catch {
        /* ignore */
      }
    }, 2600)
    return () => clearTimeout(t)
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          <div className="preloader__mark">
            <div className="preloader__line">
              {'SAUDAGAR'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="preloader__sub"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.12em' }}
              transition={{ delay: 0.8, duration: 1.2, ease }}
            >
              PERFUMERS
            </motion.div>
            <motion.span
              className="preloader__rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1, ease }}
            />
            <motion.div
              className="preloader__tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Premium Fragrances
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
