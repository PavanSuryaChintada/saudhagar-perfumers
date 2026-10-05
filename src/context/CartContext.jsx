import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { findProduct } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'saudagar-bag'
const WISH_KEY = 'saudagar-wishlist'
export const FREE_SHIPPING_AT = 2999

const keyOf = (slug, ml) => `${slug}:${ml}`

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = keyOf(action.slug, action.ml)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: l.qty + action.qty } : l))
      }
      return [...state, { key, slug: action.slug, ml: action.ml, qty: action.qty }]
    }
    case 'qty':
      return state
        .map((l) => (l.key === action.key ? { ...l, qty: action.qty } : l))
        .filter((l) => l.qty > 0)
    case 'remove':
      return state.filter((l) => l.key !== action.key)
    default:
      return state
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const lines = raw ? JSON.parse(raw) : []
    return Array.isArray(lines) ? lines.filter((l) => findProduct(l.slug)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [wished, setWished] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(WISH_KEY) ?? '[]')
      return Array.isArray(saved) ? saved.filter((s) => findProduct(s)) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wished))
    } catch {
      /* storage unavailable */
    }
  }, [wished])

  const toggleWish = useCallback(
    (slug) => {
      const has = wished.includes(slug)
      const name = findProduct(slug).name
      setWished(has ? wished.filter((s) => s !== slug) : [...wished, slug])
      setToast(
        has
          ? { text: `${name} removed from your wishlist`, id: Date.now() }
          : { text: `${name} saved to your wishlist`, link: '/wishlist', linkText: 'View wishlist', id: Date.now() },
      )
    },
    [wished],
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — bag still works for this visit */
    }
  }, [lines])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const add = useCallback((slug, ml, qty = 1) => {
    dispatch({ type: 'add', slug, ml, qty })
    const p = findProduct(slug)
    setToast({ text: `${p.name}, ${ml} ml added to your bag`, link: '/bag', linkText: 'View bag', id: Date.now() })
  }, [])

  const value = useMemo(() => {
    const detailed = lines.map((l) => {
      const product = findProduct(l.slug)
      const size = product.sizes.find((s) => s.ml === l.ml) ?? product.sizes[0]
      return { ...l, product, price: size.price, total: size.price * l.qty }
    })
    const subtotal = detailed.reduce((n, l) => n + l.total, 0)
    const count = lines.reduce((n, l) => n + l.qty, 0)
    return {
      lines: detailed,
      subtotal,
      count,
      open,
      setOpen,
      add,
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      toast,
      notify: setToast,
      wished,
      isWished: (slug) => wished.includes(slug),
      toggleWish,
    }
  }, [lines, open, add, toast, wished, toggleWish])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
