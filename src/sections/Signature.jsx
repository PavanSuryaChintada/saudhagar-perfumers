import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn, SplitText, ease } from '../components/Reveal'

const LINES = [
  {
    title: 'Signature perfumes',
    text: 'Our core collection of eau de parfums',
    more: 'Oud, rose, saffron and leather, blended in small batches for everyday wear.',
    to: '/shop?type=Eau%20de%20Parfum',
  },
  {
    title: 'Attars',
    text: 'Pure perfume oils, free of alcohol',
    more: 'Distilled the deg-bhapka way into sandalwood oil. One drop lasts from morning to night.',
    to: '/shop?type=Attar',
  },
  {
    title: 'Dark notes',
    text: 'Deep, rich notes of oud and resin',
    more: 'Our smokiest compositions — aged oud, birch tar, incense and labdanum.',
    to: '/shop?family=woody',
  },
  {
    title: 'Discovery sets',
    text: 'Curated sets to explore and compare',
    more: 'Six travel vials to wear at home before you choose a full bottle.',
    to: '/shop?type=Discovery%20Set',
  },
]

export default function Signature() {
  const [open, setOpen] = useState(-1)

  return (
    <section className="sig section">
      <div className="container">
        <div className="shead shead--top">
          <SplitText as="h2" className="stitle" text="Signature scents" />
          <FadeIn as="p" className="shead__note">
            The core lines of Saudagar — scents built around oud, rose, saffron and memory.
          </FadeIn>
        </div>
        <div className="sig__grid">
          {LINES.map((l, i) => (
            <motion.div
              key={l.title}
              className={`sig__card ${i % 2 ? 'sig__card--low' : ''} ${open === i ? 'is-open' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              <span className="sig__num">{String(i + 1).padStart(2, '0')}</span>
              <button
                className="sig__head"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>
                  <span className="sig__title">{l.title}</span>
                  <span className="sig__text">{l.text}</span>
                </span>
                <span className="sig__plus" aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="sig__more"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p>{l.more}</p>
                    <Link to={l.to} className="pill pill--sm">
                      Shop {l.title.toLowerCase()}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
