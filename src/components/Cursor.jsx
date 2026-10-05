import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

// A small gold follower for mouse users. Elements with data-cursor="Label"
// turn it into a disc carrying that label (e.g. "View" over product photos).
export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [label, setLabel] = useState(null)
  const [hoverLink, setHoverLink] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target instanceof Element ? e.target : null
      const tagged = t?.closest('[data-cursor]')
      setLabel(tagged ? tagged.getAttribute('data-cursor') : null)
      setHoverLink(!tagged && !!t?.closest('a, button, select, input, label'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 84 : hoverLink ? 34 : 8
  return (
    <motion.div
      className={`cursor ${label ? 'cursor--label' : ''} ${hoverLink ? 'cursor--ring' : ''}`}
      style={{ x: sx, y: sy }}
      animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
