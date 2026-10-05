import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import Preloader from './components/Preloader'
import Toast from './components/Toast'
import ScrollProgress from './components/ScrollProgress'
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  useLenis()
  const location = useLocation()
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
