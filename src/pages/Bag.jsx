import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../components/Reveal'
import { FREE_SHIPPING_AT, useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export const SHIPPING = { standard: 150, express: 400 }
export const shippingFor = (subtotal, method = 'standard') =>
  method === 'standard' && subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING[method]

export function BigTitle({ children }) {
  return (
    <h1 className="display page-title" aria-label={children}>
      <span className="hero__mask">
        <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease }}>
          {children}
        </motion.span>
      </span>
    </h1>
  )
}

export default function Bag() {
  const { lines, subtotal, count, setQty, remove } = useCart()
  const shipping = lines.length ? shippingFor(subtotal) : 0

  return (
    <div className="bag container">
      <BigTitle>{`Shopping bag (${count})`}</BigTitle>

      {lines.length === 0 ? (
        <div className="bag__empty">
          <p>Your bag is empty. The Discovery Set is a good place to start — six scents to try at home.</p>
          <Link to="/product/discovery-set" className="pill">
            View the Discovery Set
          </Link>
        </div>
      ) : (
        <div className="bag__grid">
          <ul className="bag__lines">
            <AnimatePresence initial={false}>
              {lines.map((l, i) => (
                <motion.li
                  key={l.key}
                  className="bline"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                >
                  <Link to={`/product/${l.slug}`} className="bline__img">
                    <img src={l.product.image} alt="" />
                  </Link>
                  <div className="bline__info">
                    <Link to={`/product/${l.slug}`} className="bline__name">
                      {l.product.name}
                    </Link>
                    <p className="bline__meta">
                      Volume: <strong>{l.ml} ml</strong>
                    </p>
                    <div className="qty qty--pill">
                      <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                    <button className="bline__remove" onClick={() => remove(l.key)}>
                      Remove
                    </button>
                  </div>
                  <span className="bline__price">{formatPrice(l.total)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="sum">
            <div className="sum__row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="sum__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="sum__row sum__row--total">
              <span>Total</span>
              <span>{formatPrice(subtotal + shipping)}</span>
            </div>
            {subtotal < FREE_SHIPPING_AT && (
              <p className="sum__hint">Add {formatPrice(FREE_SHIPPING_AT - subtotal)} more for free standard shipping.</p>
            )}
            <Link to="/checkout" className="pill pill--block">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
