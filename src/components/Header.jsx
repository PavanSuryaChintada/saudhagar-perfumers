import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Wordmark from './Wordmark'
import { useCart } from '../context/CartContext'
import { lockScroll } from '../hooks/useLenis'
import { ease } from './Reveal'

const NAV = [
  { to: '/shop', label: 'collections' },
  { to: '/shop?type=Attar', label: 'attars' },
  { to: '/#about', label: 'house' },
  { to: '/#archive', label: 'archive' },
]

export default function Header({ onSearch }) {
  const { count, wished } = useCart()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 20)
    setHidden(y > 300 && y > prev && !menu)
  })

  // close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = useState(location.key)
  if (lastPath !== location.key) {
    setLastPath(location.key)
    if (menu) setMenu(false)
  }

  useEffect(() => {
    if (!menu) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [menu])

  return (
    <>
      <motion.header
        className={`hd ${solid || menu ? 'hd--solid' : ''}`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="hd__inner">
          <nav className="hd__nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} className="hd__link">
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            className="hd__menu hd__link"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? 'close' : 'menu'}
          </button>
          <Link to="/" className="hd__logo" aria-label="Saudagar Perfumers home">
            <Wordmark size="sm" tagline={false} />
          </Link>
          <div className="hd__actions">
            <button className="hd__link hd__search" onClick={onSearch}>
              search
            </button>
            <Link to="/shop" className="hd__link hd__wide">
              catalog
            </Link>
            <Link to="/wishlist" className="hd__link hd__wide" aria-label={`Wishlist, ${wished.length} saved`}>
              wishlist
              {wished.length > 0 && <sup className="hd__count">{wished.length}</sup>}
            </Link>
            <Link to="/bag" className="hd__link" aria-label={`Bag, ${count} items`}>
              bag
              <AnimatePresence>
                {count > 0 && (
                  <motion.sup
                    key={count}
                    className="hd__count"
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {count}
                  </motion.sup>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mmenu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Mobile">
              {[...NAV, { to: '/wishlist', label: 'wishlist' }, { to: '/bag', label: 'bag' }].map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease }}
                >
                  <Link to={n.to} className="mmenu__link" onClick={() => setMenu(false)}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="mmenu__foot">Free shipping across India on orders over ₹2,999</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
