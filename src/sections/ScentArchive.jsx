import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SplitText, ease } from '../components/Reveal'

const ROWS = [
  { name: 'Oud', text: 'Resinous agarwood, smoke and old timber', img: 'archive-oud', to: '/shop?family=woody' },
  { name: 'Rose', text: 'Taifi and Kannauj rose, dewy to powdery', img: 'archive-rose', to: '/shop?family=floral' },
  { name: 'Saffron', text: 'Kashmiri threads, leather and warm spice', img: 'archive-saffron', to: '/shop?family=amber' },
  { name: 'Sandalwood', text: 'Creamy woods and the base of every attar', img: 'archive-sandal', to: '/shop?type=Attar' },
  { name: 'Musk', text: 'Soft, skin-close kasturi accords', img: 'archive-musk', to: '/product/kasturi-attar' },
  { name: 'Vetiver', text: 'Cooling khus root, rain and wet earth', img: 'archive-vetiver', to: '/shop?family=fresh' },
]

export default function ScentArchive() {
  const [active, setActive] = useState(0)

  return (
    <section className="arc section" id="archive">
      <div className="container">
        <SplitText as="h2" className="stitle" text="The language of scent" />
        <div className="arc__bar">Saudagar scent archive</div>
        <div className="arc__grid">
          <div className="arc__preview" aria-hidden="true">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={ROWS[active].img}
                src={`/images/${ROWS[active].img}.jpg`}
                alt=""
                initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              />
            </AnimatePresence>
            <span className="arc__caption">{ROWS[active].name}</span>
          </div>
          <ol className="arc__rows">
            {ROWS.map((r, i) => (
              <motion.li
                key={r.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
              >
                <Link
                  to={r.to}
                  className={`arc__row ${active === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="arc__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="arc__name">{r.name}</span>
                  <span className="arc__text">{r.text}</span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
