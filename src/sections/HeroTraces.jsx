import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Embers from '../components/Embers'
import { ease } from '../components/Reveal'
import { useIntroDone } from '../intro'
import { HERO_SLIDES } from '../data/hero'

const SLIDE_MS = 6500
const N = HERO_SLIDES.length

function RollingWord({ word, ready }) {
  return (
    <span className="hero__word">
      <AnimatePresence mode="wait" initial={false}>
        <span className="hero__wordin" key={word}>
          {word.split('').map((ch, i) => (
            <span className="hero__mask" key={i}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: ready ? 0 : '105%' }}
                exit={{ y: '-105%', transition: { duration: 0.45, delay: i * 0.025, ease: [0.7, 0, 0.84, 0] } }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.045, ease }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
      </AnimatePresence>
    </span>
  )
}

export default function HeroTraces() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const ready = useIntroDone()
  const inView = useInView(ref, { margin: '-20% 0px' })
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState(null)
  const slide = HERO_SLIDES[index]

  // scroll-out choreography
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const spacing = useTransform(scrollYProgress, [0, 1], ['-0.035em', '0.1em'])
  const titleFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.1])
  const uiY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])

  // pointer parallax inside the frame
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * -24)
    py.set(((e.clientY - r.top) / r.height - 0.5) * -16)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  const go = (n) => {
    if (n === index) return
    setPrev(index)
    setIndex((n + N) % N)
  }

  // autoplay while visible
  useEffect(() => {
    if (!ready || !inView || reduce) return
    const t = setTimeout(() => {
      setPrev(index)
      setIndex((index + 1) % N)
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, ready, inView, reduce])

  // warm the cache for the remaining slides once the intro is done
  useEffect(() => {
    if (!ready) return
    HERO_SLIDES.slice(1).forEach((s) => {
      const img = new Image()
      img.src = s.img
    })
  }, [ready])

  return (
    <section className="hero container" ref={ref} aria-roledescription="carousel" aria-label="Featured scents">
      <div className="hero__head">
      <motion.h1
        className="display hero__title"
        style={{ y: titleY, letterSpacing: spacing, opacity: titleFade }}
        aria-label={`Traces of ${slide.word}`}
      >
        <span className="hero__lead" aria-hidden="true">
          {'Traces of'.split('').map((ch, i) => (
            <span className="hero__mask" key={i}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: ready ? 0 : '105%' }}
                transition={{ duration: 1.1, delay: i * 0.035, ease }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </span>
        <span aria-hidden="true">
          <RollingWord word={slide.word} ready={ready} />
        </span>
      </motion.h1>
      <motion.p
        className="hero__index"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="hero__mask">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={index}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="hero__of">/ {String(N).padStart(2, '0')}</span>
      </motion.p>
      </div>

      <div className="hero__media" data-cursor="Scroll" onMouseMove={onMove} onMouseLeave={onLeave}>
        <motion.div className="hero__stage" style={reduce ? undefined : { y: imgY }}>
          <motion.div className="hero__parallax" style={{ x: sx, y: sy }}>
            {prev !== null && (
              <div className="hero__slide" key={`prev-${prev}`}>
                <img src={HERO_SLIDES[prev].img} alt="" />
              </div>
            )}
            <motion.div
              className="hero__slide"
              key={index}
              initial={prev === null ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src={slide.img}
                alt={slide.alt}
                initial={{ scale: prev === null ? 1.02 : 1.22 }}
                animate={{ scale: ready && !reduce ? 1.14 : 1.02 }}
                transition={{ duration: (SLIDE_MS + 1500) / 1000, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <span className="grain" aria-hidden="true" />
        <span className="hero__vignette" aria-hidden="true" />
        <Embers />

        <motion.div className="hero__ui" style={{ y: uiY }}>
          <motion.div
            className="hero__card"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
              >
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
              </motion.div>
            </AnimatePresence>
            <Link to={slide.to} className="pill pill--block">
              {slide.cta}
            </Link>
          </motion.div>


          <motion.nav
            className="hero__nav"
            aria-label="Choose a scent"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.9, ease }}
          >
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.word}
                className={`hero__tab ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-current={i === index}
              >
                <span className="hero__tabtext">
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.word}
                </span>
                <span className="hero__line">
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: ready && inView && !reduce ? 1 : 0 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  )
}
