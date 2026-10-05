import { motion } from 'framer-motion'
import RevealImage from '../components/RevealImage'
import { FadeIn, SplitText, ease } from '../components/Reveal'

// A real sequence, so the large numerals carry meaning.
const STEPS = [
  {
    title: 'Material selection',
    text: 'Every fragrance begins with the careful selection of raw materials, chosen for their depth, texture and individual character.',
    img: '/images/ritual-materials.jpg',
    alt: 'Saffron and green cardamom on a wooden board',
  },
  {
    title: 'Composition',
    text: 'The selected materials are combined drop by drop, then adjusted over weeks until each note sits in balance.',
    img: '/images/ritual-compose.jpg',
    alt: 'A pipette lowering oil into a glass bottle',
  },
  {
    title: 'Maturation',
    text: 'Blends rest in glass for weeks before bottling so the notes settle, soften and round out.',
    img: '/images/ritual-age.jpg',
    alt: 'Cut-crystal decanters in low light',
  },
  {
    title: 'Bottling',
    text: 'Each bottle is filled, sealed and checked by hand, then wrapped for its journey to you.',
    img: '/images/discovery-set.jpg',
    alt: 'Rows of filled perfume bottles',
  },
]

export default function Ritual() {
  return (
    <section className="rit section">
      <div className="container">
        <div className="rit__head">
          <SplitText as="h2" className="stitle" text="The ritual of composition" />
          <FadeIn as="p">
            From the first raw material to the final bottle, each fragrance is shaped through
            observation, patience and balance — a quiet ritual of making.
          </FadeIn>
        </div>
        <ol className="rit__steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rit__step">
              <motion.span
                className="rit__num"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                {i + 1}
              </motion.span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <RevealImage src={s.img} alt={s.alt} delay={0.1 + i * 0.1} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
