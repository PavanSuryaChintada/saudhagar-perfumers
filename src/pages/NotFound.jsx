import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound container">
      <p className="notfound__code display">404</p>
      <h1>This page has evaporated</h1>
      <p>The link may be old or mistyped. Everything we make is still in the catalog.</p>
      <Link to="/shop" className="pill">
        Go to the catalog
      </Link>
    </div>
  )
}
