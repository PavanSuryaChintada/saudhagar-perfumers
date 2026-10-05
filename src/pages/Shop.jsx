import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { FadeIn, ease } from '../components/Reveal'
import { getLenis } from '../hooks/useLenis'
import { FAMILIES, PRODUCTS, TYPES } from '../data/products'

const PER_PAGE = 10

const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) },
  new: { label: 'New in', fn: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) },
  'price-asc': { label: 'Price, low to high', fn: (a, b) => a.sizes[0].price - b.sizes[0].price },
  'price-desc': { label: 'Price, high to low', fn: (a, b) => b.sizes[0].price - a.sizes[0].price },
}

// In every run of ten tiles, the fifth and sixth are shown large — SYLVEN's catalogue rhythm.
const isLarge = (i) => i % 10 === 4 || i % 10 === 5

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type') ?? ''
  const family = params.get('family') ?? ''
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured'
  const page = Math.max(1, Number(params.get('page')) || 1)

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next, { replace: true })
  }

  const list = useMemo(
    () =>
      PRODUCTS.filter((p) => (!type || p.type === type) && (!family || p.family === family))
        .slice()
        .sort(SORTS[sort].fn),
    [type, family, sort],
  )
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const current = Math.min(page, pages)
  const shown = list.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const goTo = (n) => {
    set('page', n > 1 ? String(n) : '')
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cat">
      <header className="cat__head container">
        <h1 className="display cat__title" aria-label="Scent catalog">
          {['Scent', 'catalog'].map((w, i) => (
            <span className="hero__mask" key={w}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
              >
                {w}
              </motion.span>{' '}
            </span>
          ))}
        </h1>
        <FadeIn as="p" className="cat__lede" delay={0.3}>
          A curated catalogue of fragrances built around oud, rose, saffron and sandalwood. Choose by
          note, mood or ritual — from quiet daily scents to deep, smoky compositions with lasting
          presence.
        </FadeIn>
      </header>

      <div className="cat__bar container">
        <div className="chips" role="group" aria-label="Filter by type">
          <button className={`chip ${!type ? 'is-active' : ''}`} onClick={() => set('type', '')}>
            All
          </button>
          {TYPES.map((t) => (
            <button key={t} className={`chip ${type === t ? 'is-active' : ''}`} onClick={() => set('type', t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="cat__selects">
          <label>
            <span className="sr-only">Scent family</span>
            <select value={family} onChange={(e) => set('family', e.target.value)}>
              <option value="">All scent families</option>
              {FAMILIES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)}>
              {Object.entries(SORTS).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="container">
        {shown.length === 0 ? (
          <div className="cat__empty">
            <p>No fragrances match these filters.</p>
            <button className="pill" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="cat__grid">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  className={isLarge(i) ? 'cat__cell--large' : ''}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <ProductCard product={p} index={i} large={isLarge(i)} label="none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {pages > 1 && (
          <nav className="pager" aria-label="Pages">
            <button onClick={() => goTo(current - 1)} disabled={current === 1} aria-label="Previous page">
              ←
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={n === current ? 'is-active' : ''}
                aria-current={n === current ? 'page' : undefined}
                onClick={() => goTo(n)}
              >
                {n}
              </button>
            ))}
            <button onClick={() => goTo(current + 1)} disabled={current === pages} aria-label="Next page">
              →
            </button>
          </nav>
        )}
      </div>
    </div>
  )
}
