import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { PRODUCTS, familyName, formatPrice } from '../data/products'

const PICKS = PRODUCTS.filter((p) => p.type !== 'Discovery Set').slice(0, 8)

// Vertical scroll drives a horizontal walk through the collection while the section is pinned.
export default function HorizontalCollection() {
  const section = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      className="hcol"
      ref={section}
      style={{ height: `calc(100svh + ${distance}px)` }}
      aria-label="The collection"
    >
      <div className="hcol__sticky">
        <div className="hcol__head container">
          <h2 className="stitle">The collection</h2>
          <p>Keep scrolling</p>
        </div>
        <motion.ol className="hcol__track" ref={track} style={{ x }}>
          <li className="hcol__intro">
            <p className="display">Eight scents, one house</p>
          </li>
          {PICKS.map((p, i) => (
            <li key={p.slug} className="hcol__item">
              <Link to={`/product/${p.slug}`} className="hcol__card">
                <span className="hcol__img">
                  <img src={p.image} alt="" loading="lazy" />
                </span>
                <span className="hcol__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hcol__name">{p.name}</span>
                <span className="hcol__meta">
                  {p.type}, {familyName(p.family)} — from {formatPrice(p.sizes[0].price)}
                </span>
              </Link>
            </li>
          ))}
        </motion.ol>
        <div className="hcol__bar container" aria-hidden="true">
          <motion.span style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  )
}
