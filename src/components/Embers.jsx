import { useEffect, useRef } from 'react'

// Sparse gold motes rising through the hero photo, like dust in lamplight.
// Pauses when off-screen and does nothing for reduced-motion users.
export default function Embers({ count = 38 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let motes = []

    const size = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.7 + 0.4,
      vy: -(Math.random() * 0.35 + 0.12),
      sway: Math.random() * Math.PI * 2,
      a: Math.random() * 0.55 + 0.2,
    })
    size()
    motes = Array.from({ length: count }, () => spawn(true))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i]
        m.sway += 0.015
        m.x += Math.sin(m.sway) * 0.25
        m.y += m.vy
        if (m.y < -10) motes[i] = spawn(false)
        const fade = Math.min(1, m.y / (h * 0.35))
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4)
        g.addColorStop(0, `rgba(247, 217, 138, ${m.a * fade})`)
        g.addColorStop(1, 'rgba(247, 217, 138, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(draw)
      } else if (!e.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)
    window.addEventListener('resize', size)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
    }
  }, [count])

  return <canvas ref={ref} className="embers" aria-hidden="true" />
}
