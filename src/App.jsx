import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import Preloader from './components/Preloader'
import Toast from './components/Toast'
import ScrollProgress from './components/ScrollProgress'
import Wordmark from './components/Wordmark'
import { ease } from './components/Reveal'
import useLenis, { getLenis, scrollToTop } from './hooks/useLenis'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import NotFound from './pages/NotFound'
import Bag from './pages/Bag'
import Checkout from './pages/Checkout'

function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
    >
      {children}
    </motion.main>
  )
}

// A gold curtain carrying the wordmark rises over the old page, holds while
// the routes swap underneath, then lifts off the new one.
function RouteCurtain() {
  return (
    <motion.div
      className="curtain"
      aria-hidden="true"
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{
        clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
      }}
      transition={{ duration: 1.35, times: [0, 0.38, 0.6, 1], ease }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -14] }}
        transition={{ duration: 1.35, times: [0, 0.38, 0.6, 1], ease }}
      >
        <Wordmark size="md" tagline={false} />
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  useLenis()
  const location = useLocation()
  // the first page is revealed by the preloader, so the curtain waits for a real navigation
  const [firstPath] = useState(location.pathname)
  const [moved, setMoved] = useState(false)
  if (!moved && location.pathname !== firstPath) setMoved(true)
  const [search, setSearch] = useState(false)
  const closeSearch = useCallback(() => setSearch(false), [])

  // Hash links like /#story scroll to their section once the page has rendered.
  useEffect(() => {
    if (!location.hash) return
    const t = setTimeout(() => {
      const el = document.querySelector(location.hash)
      if (!el) return
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { offset: -60 })
      else el.scrollIntoView()
    }, 650)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      {moved && <RouteCurtain key={location.pathname} />}
      <Header onSearch={() => setSearch(true)} />
      <AnimatePresence mode="wait" onExitComplete={() => !location.hash && scrollToTop()}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/shop"
            element={
              <Page>
                <Shop />
              </Page>
            }
          />
          <Route
            path="/product/:slug"
            element={
              <Page>
                <Product />
              </Page>
            }
          />
          <Route
            path="/bag"
            element={
              <Page>
                <Bag />
              </Page>
            }
          />
          <Route
            path="/checkout"
            element={
              <Page>
                <Checkout />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <SearchOverlay open={search} onClose={closeSearch} />
      <Toast />
    </MotionConfig>
  )
}
