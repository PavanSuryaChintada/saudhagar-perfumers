import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Splits a line of text into words that rise out of a mask.
export function SplitText({ text, as: Tag = 'span', className = '', delay = 0, stagger = 0.06, once = true }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const MotionTag = motion[Tag]
  // The observer sits on the parent: the words start clipped by their masks,
  // so observing them directly would never report them as visible.
  return (
    <MotionTag
      className={`split ${className}`}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {words.map((w, i) => (
        <span className="split__mask" key={i} aria-hidden="true">
          <motion.span
            className="split__word"
            variants={{ hidden: { y: '110%' }, shown: { y: 0 } }}
            transition={{ duration: 1, ease, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </MotionTag>
  )
}

export function FadeIn({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  )
}

export { ease }
