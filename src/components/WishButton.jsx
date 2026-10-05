import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function WishButton({ slug, name, className = '' }) {
  const { isWished, toggleWish } = useCart()
  const on = isWished(slug)
  return (
    <button
      className={`wish ${on ? 'is-on' : ''} ${className}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWish(slug)
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
    >
      <motion.svg
        viewBox="0 0 24 24"
        key={on ? 'on' : 'off'}
        initial={{ scale: on ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 14 }}
        aria-hidden="true"
      >
        <path d="M12 20s-7-4.4-9.2-8.6C1.3 8.3 3.2 4.8 6.6 4.8c2 0 3.3 1.1 5.4 3.3 2.1-2.2 3.4-3.3 5.4-3.3 3.4 0 5.3 3.5 3.8 6.6C19 15.6 12 20 12 20z" />
      </motion.svg>
    </button>
  )
}
