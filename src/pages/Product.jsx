import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../components/Reveal'
import ProductRow from '../sections/ProductRow'
import { useCart } from '../context/CartContext'
import { PRODUCTS, findProduct, formatPrice } from '../data/products'
import NotFound from './NotFound'

const BEST_FOR = {
  woody: 'Best for evenings, cool air and quiet interiors.',
  floral: 'Best for daytime, weddings and celebrations.',
  amber: 'Best for winter, festivals and long evenings.',
  fresh: 'Best for heat, travel and office days.',
}

export default function Product() {
  const { slug } = useParams()
  const p = findProduct(slug)
  if (!p) return <NotFound />
  return <ProductView key={p.slug} p={p} />
}

function ProductView({ p }) {
  const { add } = useCart()
  const reduce = useReducedMotion()
  const [ml, setMl] = useState(p.sizes[0].ml)
  const [qty, setQty] = useState(1)
  const size = p.sizes.find((s) => s.ml === ml)
  const related = PRODUCTS.filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.family === p.family) - Number(a.family === p.family))
    .slice(0, 4)

  const rows = [
    ['Type', p.type, `Opens with ${p.notes.top.join(' and ').toLowerCase()}.`],
    [
      'Volume',
      <span className="pdp__sizes" key="v">
        {p.sizes.map((s) => (
          <button
            key={s.ml}
            className={s.ml === ml ? 'is-active' : ''}
            aria-pressed={s.ml === ml}
            onClick={() => setMl(s.ml)}
          >
            {s.ml} ml
          </button>
        ))}
      </span>,
      `Settles into ${p.notes.heart.join(' and ').toLowerCase()}.`,
    ],
    ['Notes', [...p.notes.heart, ...p.notes.base].slice(0, 3).join(', '), `Wears close to the skin with ${p.notes.base.join(' and ').toLowerCase()}.`],
    ['Longevity', p.longevity, BEST_FOR[p.family]],
  ]

  return (
    <div className="pdp">
      <div className="pdp__grid">
        <motion.div
          className="pdp__media"
          initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.3, ease }}
        >
          <motion.img
            src={p.image}
            alt={`${p.name} by Saudagar Perfumers`}
            initial={reduce ? false : { scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease }}
          />
        </motion.div>

        <div className="pdp__info">
          <h1 className="display pdp__name" aria-label={p.name}>
            {p.name.split(' ').map((w, i) => (
              <span className="hero__mask pdp__word" key={i}>
                <motion.span
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            <p className="pdp__desc">{p.description}</p>

            <table className="spec">
              <tbody>
                {rows.map(([k, v, note]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td className="spec__v">{v}</td>
                    <td className="spec__note">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="pdp__price">{formatPrice(size.price * qty)}</p>
            <div className="pdp__buy">
              <div className="qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span aria-live="polite">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button className="pill" onClick={() => add(p.slug, ml, qty)}>
                Add to bag
              </button>
            </div>
            <p className="pdp__assure">
              Rated {p.rating} from {p.reviews} reviews. Free shipping over ₹2,999.
            </p>
          </motion.div>
        </div>
      </div>

      <ProductRow title="You may also like" products={related} link="/shop" linkText="View all" />
    </div>
  )
}
