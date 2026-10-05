import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast, notify } = useCart()
  const t = typeof toast === 'string' ? { text: toast } : toast
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <AnimatePresence>
        {t && (
          <motion.div
            key={t.id ?? t.text}
            className="toast"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            <span>{t.text}</span>
            {t.link && (
              <Link to={t.link} className="toast__link" onClick={() => notify(null)}>
                {t.linkText}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
