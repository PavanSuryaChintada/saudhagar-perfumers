import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { SplitText, ease } from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { PRODUCTS, familyName, formatPrice } from '../data/products'

const QUESTIONS = [
  {
    q: 'Which of these would you rather smell?',
    options: [
      { label: 'A rose garden after rain', family: 'floral' },
      { label: 'Wood smoke and incense', family: 'woody' },
      { label: 'Warm spices in the kitchen', family: 'amber' },
      { label: 'Wet earth and cut grass', family: 'fresh' },
    ],
  },
  {
    q: 'When will you wear it most?',
    options: [
      { label: 'Every day, to work', type: 'Eau de Parfum', soft: true },
      { label: 'Evenings and celebrations', type: 'Eau de Parfum' },
      { label: 'Prayer and quiet moments', type: 'Attar' },
      { label: 'I want to try a few first', type: 'Discovery Set' },
    ],
  },
  {
    q: 'How noticeable should it be?',
    options: [
      { label: 'Close to the skin', soft: true },
      { label: 'Noticed when someone leans in' },
      { label: 'Fills the room', strong: true },
    ],
  },
]

function recommend(answers) {
  const [fam, when, power] = answers
  const scored = PRODUCTS.map((p) => {
    let s = 0
    if (p.family === fam.family) s += 3
    if (p.type === when.type) s += 4
    if (power.strong && p.sillage === 'Strong') s += 1
    if (power.soft && (p.sillage === 'Soft' || p.sillage === 'Skin-close')) s += 1
    if (when.soft && p.sillage !== 'Strong') s += 0.5
    return { p, s: s + p.rating / 10 }
  })
  scored.sort((a, b) => b.s - a.s)
  return scored[0].p
}

export default function Finder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const { add } = useCart()
  const done = answers.length === QUESTIONS.length
  const result = done ? recommend(answers) : null

  const choose = (opt) => {
    const next = [...answers.slice(0, step), opt]
    setAnswers(next)
    if (step < QUESTIONS.length - 1) setStep(step + 1)
  }

  const reset = () => {
    setAnswers([])
    setStep(0)
  }

  return (
    <section className="finder section" id="finder">
      <div className="container finder__grid">
        <div className="finder__intro">
          <SplitText as="h2" className="h2" text="Find your scent in three questions" />
          <p>
            Tell us what you like and we will match you with one of our fragrances. It takes under a
            minute.
          </p>
          <div className="finder__progress" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <span key={i} className={i < answers.length ? 'is-done' : i === step ? 'is-current' : ''} />
            ))}
          </div>
        </div>

        <div className="finder__panel" aria-live="polite">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="finder__count">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="finder__q">{QUESTIONS[step].q}</h3>
                <div className="finder__options">
                  {QUESTIONS[step].options.map((o, i) => (
                    <motion.button
                      key={o.label}
                      className="finder__option"
                      onClick={() => choose(o)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      {o.label}
                    </motion.button>
                  ))}
                </div>
                {step > 0 && (
                  <button className="text-btn finder__back" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="finder__result"
                style={{ '--tint': result.liquid }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="finder__result-bottle">
                  <img src={result.image} alt={result.name} />
                </div>
                <div>
                  <p className="finder__count">Your match</p>
                  <h3 className="finder__name">{result.name}</h3>
                  <p className="finder__meta">
                    {result.type}, {familyName(result.family)}
                  </p>
                  <p>{result.tagline}</p>
                  <div className="finder__actions">
                    <button
                      className="btn btn--gold"
                      onClick={() => add(result.slug, result.sizes[0].ml)}
                    >
                      Add to bag, {formatPrice(result.sizes[0].price)}
                    </button>
                    <Link to={`/product/${result.slug}`} className="text-btn text-btn--gold">
                      View details
                    </Link>
                  </div>
                  <button className="text-btn finder__back" onClick={reset}>
                    Start again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
