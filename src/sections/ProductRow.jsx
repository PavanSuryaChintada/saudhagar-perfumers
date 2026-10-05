import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { SplitText } from '../components/Reveal'

// "NEW ARRIVALS" / "BESTSELLERS" / "YOU MAY ALSO LIKE" — title, pill, four tiles.
export default function ProductRow({ title, products, link = '/shop', linkText = 'View all', id }) {
  return (
    <section className="prow section" id={id}>
      <div className="container">
        <div className="shead">
          <SplitText as="h2" className="stitle" text={title} />
          {link && (
            <Link to={link} className="pill pill--sm">
              {linkText}
            </Link>
          )}
        </div>
        <div className="prow__grid">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
