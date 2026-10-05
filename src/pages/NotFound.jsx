import { Link } from 'react-router-dom'
import Bottle from '../components/Bottle'

export default function NotFound() {
  return (
    <div className="notfound container">
      <div className="notfound__bottle">
        <Bottle shape="classic" liquid="#7a3d12" fill={0.04} />
      </div>
      <h1>This page has evaporated</h1>
      <p>The link may be old or mistyped. Everything we make is still in the shop.</p>
      <Link to="/shop" className="btn btn--gold">
        Go to the shop
      </Link>
    </div>
  )
}
