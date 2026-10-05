import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { ease } from './Reveal'
import WishButton from './WishButton'

// SYLVEN-style catalogue tile: photograph, "TYPE — NAME", price, quick add.
export default function ProductCard({ product: p, index = 0, large = false, label = 'type' }) {
  const { add } = useCart()
  const size = p.sizes[0]
  const kicker = label === 'type' ? `${p.type === 'Eau de Parfum' ? 'Scent' : p.type} — ` : ''

  return (
    <motion.article
      className={`pc ${large ? 'pc--large' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease }}
    >
      <Link to={`/product/${p.slug}`} className="pc__media" aria-label={`${p.name}, ${p.type}`}>
        <img src={p.image} alt="" loading="lazy" />
        {p.isNew && <span className="pc__flag">New</span>}
        <WishButton slug={p.slug} name={p.name} className="pc__wish" />
        <span className="pc__notes" aria-hidden="true">
          {[...p.notes.top, ...p.notes.heart].slice(0, 3).join(' · ')}
        </span>
      </Link>
      <div className="pc__row">
        <div className="pc__text">
          <h3 className="pc__name">
            <Link to={`/product/${p.slug}`}>
              {kicker && <span className="pc__type">{kicker.replace(' — ', '')}</span>}
              {p.name}
            </Link>
          </h3>
          <p className="pc__price">{formatPrice(size.price)}</p>
        </div>
        <button className="pc__quick" onClick={() => add(p.slug, size.ml)} aria-label={`Quick add ${p.name}, ${size.ml} ml`}>
          Quick add <span aria-hidden="true">+</span>
        </button>
      </div>
    </motion.article>
  )
}
