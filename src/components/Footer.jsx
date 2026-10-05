import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { ease } from './Reveal'

const YEAR = new Date().getFullYear()

const COLS = [
  [
    ['Perfumes', '/shop?type=Eau%20de%20Parfum'],
    ['Attars', '/shop?type=Attar'],
    ['Gift sets', '/shop?type=Discovery%20Set'],
    ['New in', '/shop?sort=new'],
    ['Bestsellers', '/shop'],
  ],
  [
    ['About', '/#about'],
    ['Scent archive', '/#archive'],
    ['Shipping', '/bag'],
    ['Returns', '/bag'],
    ['Contact', 'mailto:hello@saudagarperfumers.com'],
  ],
  [
    ['Instagram', 'https://instagram.com'],
    ['WhatsApp', 'https://wa.me/'],
    ['YouTube', 'https://youtube.com'],
  ],
]

const isExternal = (to) => /^(https?:|mailto:)/.test(to)

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__inner container">
        <motion.div
          className="ft__brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <Wordmark size="md" />
        </motion.div>

        {COLS.map((col, i) => (
          <ul key={i} className={`ft__col ft__col--${i}`}>
            {col.map(([label, to]) => (
              <li key={label}>
                {isExternal(to) ? (
                  <a href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {label}
                  </a>
                ) : (
                  <Link to={to}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        ))}

        <div className="ft__last">
          <p className="ft__title">Last trace</p>
          <Link to="/#finder" className="pill pill--light pill--block">
            Find your scent
          </Link>
          <Link to="/shop" className="pill pill--light pill--block">
            Collection index
          </Link>
        </div>
      </div>
      <div className="ft__base container">
        <span>© {YEAR} Saudagar Perfumers</span>
        <span>Vol. 01</span>
      </div>
    </footer>
  )
}
