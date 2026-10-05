import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ease } from '../components/Reveal'
import { INTRO_DELAY } from '../components/Preloader'

const TITLE = 'Traces of oud'

export default function HeroTraces() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const d = INTRO_DELAY
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const spacing = useTransform(scrollYProgress, [0, 1], ['0em', '0.12em'])
  const titleFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  return (
    <section className="hero container" ref={ref}>
      <motion.h1 className="display hero__title" style={{ y: titleY, letterSpacing: spacing, opacity: titleFade }} aria-label={TITLE}>
        {TITLE.split('').map((ch, i) => (
          <span className="hero__mask" key={i} aria-hidden="true">
            <motion.span
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: d + i * 0.035, ease }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.div
        className="hero__media"
        data-cursor="Scroll"
        initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0% round 10px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 10px)' }}
        transition={{ duration: 1.5, delay: d + 0.35, ease }}
      >
        <motion.img
          src="/images/hero-oud-smoke.jpg"
          alt="Smoke rising from a sliver of burning oud wood"
          className="hero__drift"
          style={reduce ? undefined : { y: imgY, scale: imgScale }}
        />
        <span className="grain" aria-hidden="true" />
        <span className="hero__vignette" aria-hidden="true" />
        <motion.div
          className="hero__card"
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: d + 1.2, ease }}
        >
          <h2>The Attar Collection</h2>
          <p>
            Pure perfume oils distilled in copper, chosen for their depth, their warmth and the trace
            they leave on skin.
          </p>
          <Link to="/shop?type=Attar" className="pill pill--block">
            Explore collection
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
