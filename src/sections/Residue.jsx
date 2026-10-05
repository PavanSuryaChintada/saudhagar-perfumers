import { motion } from 'framer-motion'
import RevealImage from '../components/RevealImage'
import { ease } from '../components/Reveal'

// SYLVEN's second hero: "RESIDUE OF PRESENCE / THE AIR REMEMBERS" over a wide photograph.
export default function Residue() {
  return (
    <section className="res section">
      <div className="container">
        <motion.div
          className="res__head"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <h2 className="display res__title" aria-label="Residue of oud">
            <span className="hero__mask">
              <motion.span variants={{ hidden: { y: '105%' }, shown: { y: 0 } }} transition={{ duration: 1.1, ease }}>
                Residue of oud
              </motion.span>
            </span>
          </h2>
          <p className="res__sub">
            <span className="hero__mask">
              <motion.span
                variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                transition={{ duration: 1.1, delay: 0.12, ease }}
              >
                The air remembers
              </motion.span>
            </span>
          </p>
        </motion.div>
        <RevealImage src="/images/residue.jpg" alt="A cut-crystal decanter of aged oud oil in low light" className="res__img" />
      </div>
    </section>
  )
}
