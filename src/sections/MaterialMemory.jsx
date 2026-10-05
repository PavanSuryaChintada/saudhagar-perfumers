import { Link } from 'react-router-dom'
import RevealImage from '../components/RevealImage'
import { FadeIn, SplitText } from '../components/Reveal'

export default function MaterialMemory() {
  return (
    <section className="mat section">
      <div className="container">
        <FadeIn as="p" className="mat__kicker">
          Material memory
        </FadeIn>
        <div className="mat__grid">
          <RevealImage src="/images/material-incense.jpg" alt="Incense burner trailing smoke" />
          <div className="mat__copy">
            <SplitText
              as="p"
              className="mat__lead"
              stagger={0.02}
              text="A fragrance built around the quiet beauty of raw materials. Warm resin, aged wood, soft smoke and skin create a composition that lingers long after the first impression."
            />
            <FadeIn delay={0.2}>
              <h3 className="mat__sub">Where it begins</h3>
              <p className="mat__small">
                Every blend begins with a material: a thread of saffron, a sliver of agarwood, a
                handful of rose petals at dawn. Rather than following trends, each composition grows
                from the details that remain long after the moment has passed.
              </p>
              <Link to="/shop" className="pill pill--sm">
                Explore collection
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
