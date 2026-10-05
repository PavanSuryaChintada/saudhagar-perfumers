import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS, familyName, formatPrice } from '../data/products'
import { lockScroll } from '../hooks/useLenis'

import { ease } from './Reveal'

const SUGGESTED = ['Oud', 'Rose', 'Saffron', 'Sandalwood', 'Vetiver']

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      setQ('')
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return PRODUCTS.filter((p) =>
      [p.name, p.type, familyName(p.family), ...p.notes.top, ...p.notes.heart, ...p.notes.base]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [q])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          data-lenis-prevent
        >
          <div className="search__inner">
            <div className="search__bar">
              <motion.input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by scent or note"
                aria-label="Search by scent or note"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease }}
              />
              <button className="text-btn" onClick={onClose}>
                Close
              </button>
            </div>
            {!q && (
              <div className="search__suggest">
                <p>Popular notes</p>
                <div className="chips">
                  {SUGGESTED.map((s) => (
                    <button key={s} className="chip" onClick={() => setQ(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {q && results.length === 0 && (
              <p className="search__empty">
                Nothing matches “{q}”. Try a note such as rose, oud or vetiver.
              </p>
            )}
            <ul className="search__results">
              {results.map((p, i) => (
                <motion.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={`/product/${p.slug}`} onClick={onClose} className="search__hit">
                    <span className="search__thumb">
                      <img src={p.image} alt="" />
                    </span>
                    <span className="search__name">{p.name}</span>
                    <span className="search__meta">
                      {p.type}, {familyName(p.family)}
                    </span>
                    <span className="search__price">{formatPrice(p.sizes[0].price)}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
