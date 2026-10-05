import RevealImage from '../components/RevealImage'
import { FadeIn, SplitText } from '../components/Reveal'

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__text">
          <SplitText as="h2" className="stitle" text="About us" />
          <div>
            <SplitText
              as="p"
              className="about__lead"
              stagger={0.025}
              text="A perfume house for oud, attar and everyday rituals."
            />
            <FadeIn as="p" className="about__body" delay={0.2}>
              Saudagar means merchant. Built around oud, saffron, rose and sandalwood, we make
              fragrance the way the old traders carried it — rare materials, honestly sourced and
              blended in small batches.
            </FadeIn>
          </div>
        </div>
        <div className="about__media">
          <RevealImage src="/images/about-apothecary.jpg" alt="Shelves of perfume oils, jars and raw materials" />
          <RevealImage src="/images/about-saffron.jpg" alt="Saffron threads beside a brass mortar" delay={0.15} />
        </div>
      </div>
    </section>
  )
}
