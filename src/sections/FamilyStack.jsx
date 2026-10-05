import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FAMILIES, PRODUCTS } from '../data/products'

// Full-screen panels that stack as you scroll. Each one pins, its giant word
// slides across, and the next panel rises over it while it sinks back.
const PANELS = {
  woody: { word: 'Oud', img: '/images/archive-oud.jpg', tone: 'onyx' },
  floral: { word: 'Rose', img: '/images/archive-rose.jpg', tone: 'gold' },
  amber: { word: 'Saffron', img: '/images/archive-saffron.jpg', tone: 'graphite' },
  fresh: { word: 'Vetiver', img: '/images/archive-vetiver.jpg', tone: 'ivory' },
}

function Panel({ family, i, n, progress }) {
  const cfg = PANELS[family.id]
  const step = 1 / (n - 1)
  const isLast = i === n - 1
  // local progress for this panel: -1 entering, 0 settled, +1 fully covered
  const local = (v) => Math.max(-1, Math.min(1, (v - i * step) / step))
  const wordX = useTransform(progress, (v) => `${-local(v) * 32}%`)
  const imgY = useTransform(progress, (v) => `${local(v) * 12}%`)
  const scale = useTransform(progress, (v) => (isLast ? 1 : 1 - Math.max(0, local(v)) * 0.1))
  const dim = useTransform(progress, (v) => (isLast ? 0 : Math.max(0, local(v)) * 0.65))
  const items = PRODUCTS.filter((p) => p.family === family.id)

  return (
    <div className="fp__slot">
      <motion.article className={`fp fp--${cfg.tone}`} style={{ scale }}>
        <div className="fp__meta">
          <p className="fp__kicker">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span className="fp__rule" aria-hidden="true" />
            {family.name}
          </p>
          <p className="fp__blurb">{family.blurb}</p>
          <p className="fp__names">{items.map((p) => p.name).join(' / ')}</p>
          <Link to={`/shop?family=${family.id}`} className="pill pill--sm fp__cta">
            Shop {family.name.toLowerCase()}
          </Link>
        </div>

        <div className="fp__img">
          <motion.img src={cfg.img} alt="" loading="lazy" style={{ y: imgY }} />
        </div>

        <motion.h3 className="fp__word" style={{ x: wordX }}>
          {cfg.word}
        </motion.h3>

        <motion.span className="fp__shade" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  )
}

export default function FamilyStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section className="fps" ref={ref} aria-label="Scent families">
      {FAMILIES.map((f, i) => (
        <Panel key={f.id} family={f} i={i} n={FAMILIES.length} progress={scrollYProgress} />
      ))}
    </section>
  )
}
