import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn, ease } from '../components/Reveal'

// SYLVEN's "FRAGRANCE BEYOND FORM": stacked display words with a photo set into the lines.
const LINES = ['Memory', 'In every', 'Drop']

export default function Philosophy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgW = useTransform(scrollYProgress, [0.15, 0.5], ['30%', '100%'])

  return (
    <section className="phil section" ref={ref}>
      <div className="container">
        <FadeIn as="p" className="label label--center">
          Brand philosophy
        </FadeIn>
        <div className="phil__stack">
          {LINES.map((line, i) => (
            <motion.div
              className={`phil__line phil__line--${i}`}
              key={line}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <span className="phil__mask">
                <motion.span
                  className="display"
                  variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
              {i === 1 && (
                <div className="phil__slot">
                  <motion.div className="phil__img" style={{ width: imgW }}>
                    <img src="/images/philosophy-bakhoor.jpg" alt="Bakhoor smouldering in a copper bowl" loading="lazy" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <FadeIn as="p" className="phil__note" delay={0.2}>
          A fragrance is gone the moment you notice it, yet it stays in a room, on a shawl, in a
          memory for years. We blend for that trace.
        </FadeIn>
      </div>
    </section>
  )
}
