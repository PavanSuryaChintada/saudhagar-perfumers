import { motion, useScroll, useSpring } from 'framer-motion'

// A hairline of gold that fills across the top of the window as you read.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div className="sprogress" style={{ scaleX }} aria-hidden="true" />
}
