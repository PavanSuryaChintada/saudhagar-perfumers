import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Bottle from '../components/Bottle'
import { ease } from '../components/Reveal'
import { findProduct } from '../data/products'

const P = findProduct('oud-shahi')

// Top, heart and base notes really are a sequence: they surface in that order
// as the perfume evaporates, so the numbering and timeline are earned here.
const STAGES = [
  {
    key: 'top',
    title: 'Top notes',
    when: 'First 15 minutes',
    text: 'The bright opening you smell from the bottle. Light molecules that lift off the skin first.',
    notes: P.notes.top,
    tint: '#3b200c',
    fill: 0.82,
  },
  {
    key: 'heart',
    title: 'Heart notes',
    when: '15 minutes to 4 hours',
    text: 'The character of the perfume. Once the opening settles, rose and oud take over.',
    notes: P.notes.heart,
    tint: '#4a1b1e',
    fill: 0.55,
  },
  {
    key: 'base',
    title: 'Base notes',
    when: '4 hours and beyond',
    text: 'Resins, woods and musk that cling to skin and clothes long after you leave the room.',
    notes: P.notes.base,
    tint: '#2a1a0d',
    fill: 0.3,
  },
]

export default function NotesJourney() {
  const ref = useRef(null)
  const [stage, setStage] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length))
    if (next !== stage) setStage(next)
  })

  const s = STAGES[stage]

  return (
    <section className="journey" ref={ref} aria-label="How a perfume unfolds on skin">
      <div className="journey__sticky">
        <motion.div
          className="journey__bg"
          animate={{ backgroundColor: s.tint }}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        />
        <div className="journey__inner container">
          <div className="journey__intro">
            <p className="journey__kicker">How Oud Shahi unfolds</p>
            <h2 className="h2">A perfume is a story told over a day</h2>
          </div>

          <motion.div className="journey__bottle" style={{ rotate }}>
            <Bottle shape={P.shape} liquid={P.liquid} name={P.name} fill={s.fill} />
            <motion.div
              key={s.key}
              className="journey__vapour"
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -120, scale: 1.4 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
              aria-hidden="true"
            />
          </motion.div>

          <div className="journey__stages">
            <div className="journey__track" aria-hidden="true">
              <motion.span style={{ scaleY: progress }} />
            </div>
            <ol>
              {STAGES.map((st, i) => (
                <li key={st.key} className={`journey__stage ${i === stage ? 'is-active' : ''}`}>
                  <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{st.title}</h3>
                    <p className="journey__when">{st.when}</p>
                    <AnimatePresence initial={false}>
                      {i === stage && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease }}
                          className="journey__detail"
                        >
                          <p>{st.text}</p>
                          <ul className="journey__notes">
                            {st.notes.map((n) => (
                              <li key={n}>{n}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
            </ol>
            <Link to={`/product/${P.slug}`} className="text-btn text-btn--gold journey__cta">
              Discover Oud Shahi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
