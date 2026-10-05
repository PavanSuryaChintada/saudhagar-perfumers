import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { ease } from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { findProduct } from '../data/products'
import { BigTitle } from './Bag'

export default function Wishlist() {
  const { wished } = useCart()
  const items = wished.map(findProduct)

  return (
    <div className="bag container">
      <BigTitle>{`Wishlist (${items.length})`}</BigTitle>
      {items.length === 0 ? (
        <div className="bag__empty">
          <p>Nothing saved yet. Tap the heart on any fragrance to keep it here for later.</p>
          <Link to="/shop" className="pill">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <motion.div layout className="cat__grid">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease }}
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
