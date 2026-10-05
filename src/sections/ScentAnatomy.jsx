import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import { findProduct } from '../data/products'

const P = findProduct('oud-shahi')

// Top, heart and base notes really are a sequence: they surface in that order as the
// perfume dries down, so the numbering and the scroll-driven timeline carry meaning here.
const LAYERS = [
  {
    key: 'top',
    title: 'Top notes',
    when: 'The first 15 minutes',
    text: 'The bright opening you smell from the bottle. Light molecules that lift off the skin first.',
  },
  {
    key: 'heart',
    title: 'Heart notes',
    when: '15 minutes to 4 hours',
    text: 'The character of the perfume. Once the opening settles, rose and oud take over.',
  },
  {
    key: 'base',
    title: 'Base notes',
    when: '4 hours and beyond',
    text: 'Resins, woods and musk that cling to skin and cloth long after you leave the room.',
  },
]

export default function ScentAnatomy() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.7'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(LAYERS.length - 1, Math.max(0, Math.floor(v * LAYERS.length))))
  })

  return (
    <section className="anat" ref={ref} aria-labelledby="anat-title">
      <div className="anat__inner container">
        <div className="anat__media">
          <div className="anat__sticky">
            <div className="anat__img">
              <motion.img src={P.image} alt={`${P.name} eau de parfum`} style={{ scale: imgScale }} />
            </div>
            <p className="anat__caption">
              {P.name} — {P.type}
            </p>
          </div>
        </div>

        <div className="anat__body">
          <p className="label">Anatomy of a scent</p>
          <SplitText as="h2" className="stitle anat__title" text={`How ${P.name} unfolds`} />
          <p className="lede">
            A perfume is not one smell but three, revealed one after another as it warms on your skin.
          </p>

          <ol className="anat__layers">
            <span className="anat__track" aria-hidden="true">
              <motion.span style={{ scaleY: line }} />
            </span>
            {LAYERS.map((l, i) => (
              <li key={l.key} className={`anat__layer ${i <= active ? 'is-on' : ''}`}>
                <span className="anat__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{l.title}</h3>
                  <p className="anat__when">{l.when}</p>
                  <p className="anat__notes">{P.notes[l.key].join(', ')}</p>
                  <p className="anat__text">{l.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link to={`/product/${P.slug}`} className="pill">
            Discover {P.name}
          </Link>
        </div>
      </div>
    </section>
  )
}
