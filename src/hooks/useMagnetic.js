import { useEffect } from 'react'

// Pill buttons lean a few pixels toward the pointer, then settle back.
// One delegated listener covers every .pill on the page, including ones added later.
export default function useMagnetic(selector = '.pill', strength = 0.28) {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let current = null

    const reset = (el) => {
      el.style.transform = ''
    }
    const move = (e) => {
      const el = e.target instanceof Element ? e.target.closest(selector) : null
      if (current && current !== el) reset(current)
      current = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const clamp = (v) => Math.max(-12, Math.min(12, v))
      el.style.transform = `translate(${clamp(dx * strength)}px, ${clamp(dy * strength * 1.4)}px)`
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      if (current) reset(current)
    }
  }, [selector, strength])
}
