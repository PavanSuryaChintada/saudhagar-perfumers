import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import { FAMILIES, PRODUCTS } from '../data/products'

const IMAGES = {
  woody: '/images/archive-oud.jpg',
  floral: '/images/archive-rose.jpg',
  amber: '/images/archive-saffron.jpg',
  fresh: '/images/archive-vetiver.jpg',
}

function Card({ family, i, total, progress }) {
  // each card shrinks a little as the cards after it slide over
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.05])
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - i) * 0.18])
  const names = PRODUCTS.filter((p) => p.family === family.id).map((p) => p.name)

  return (
    <div className="fstack__slot" style={{ top: `calc(var(--hd) + 24px + ${i * 22}px)` }}>
      <motion.article className="fstack__card" style={{ scale, '--tint': family.tint }}>
        <div className="fstack__img">
          <img src={IMAGES[family.id]} alt="" loading="lazy" />
        </div>
        <div className="fstack__body">
          <span className="fstack__num">
            {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3 className="display">{family.name}</h3>
          <p className="fstack__blurb">{family.blurb}</p>
          <p className="fstack__names">{names.join(' · ')}</p>
          <Link to={`/shop?family=${family.id}`} className="pill pill--sm">
            Shop {family.name.toLowerCase()}
          </Link>
        </div>
        <motion.span className="fstack__shade" style={{ opacity: dim }} aria-hidden="true" />
      </motion.article>
    </div>
  )
}

export default function FamilyStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section className="fstack section" ref={ref}>
      <div className="container">
        <div className="shead">
          <SplitText as="h2" className="stitle" text="Scent families" />
          <p className="shead__note">Four moods. Every fragrance in the house belongs to one.</p>
        </div>
        {FAMILIES.map((f, i) => (
          <Card key={f.id} family={f} i={i} total={FAMILIES.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
