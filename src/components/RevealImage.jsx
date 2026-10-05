import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ease } from './Reveal'

// Photograph that wipes open from the bottom when it enters the viewport,
// then drifts slightly against the scroll for depth.
export default function RevealImage({ src, alt = '', className = '', parallax = 8, delay = 0, eager = false }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  return (
    <motion.div
      ref={ref}
      className={`rimg ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.3, ease, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={reduce ? undefined : { y, scale: 1 + parallax / 50 }}
      />
    </motion.div>
  )
}
