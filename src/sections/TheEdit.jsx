import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProductCard from '../components/ProductCard'

// Sticky giant title on the left while the product column scrolls past on the right.
export default function TheEdit({ title = ['Best', 'sellers'], note, products, link = '/shop' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const fill = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])

  return (
    <section className="edit" ref={ref}>
      <div className="edit__inner container">
        <div className="edit__side">
          <div className="edit__sticky">
            <motion.h2 className="edit__word" style={{ y: lift }} aria-label={title.join(' ')}>
              {title.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </motion.h2>
            {note && <p className="edit__note">{note}</p>}
            <div className="edit__bar" aria-hidden="true">
              <motion.span style={{ scaleY: fill }} />
            </div>
            <Link to={link} className="pill pill--sm">
              View all
            </Link>
          </div>
        </div>
        <div className="edit__grid">
          {products.map((p, i) => (
            <div key={p.slug} className={i % 2 ? 'edit__cell edit__cell--low' : 'edit__cell'}>
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
