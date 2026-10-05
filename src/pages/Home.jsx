import HeroTraces from '../sections/HeroTraces'
import ProductRow from '../sections/ProductRow'
import Signature from '../sections/Signature'
import About from '../sections/About'
import ScentArchive from '../sections/ScentArchive'
import Residue from '../sections/Residue'
import MaterialMemory from '../sections/MaterialMemory'
import Ritual from '../sections/Ritual'
import Philosophy from '../sections/Philosophy'
import { PRODUCTS, findProduct } from '../data/products'

// Section order follows the two SYLVEN homepage boards, one after the other.
const NEW_ARRIVALS = ['dahn-al-oud', 'shamama-attar', 'kesar-amber', 'barish'].map(findProduct)
const BESTSELLERS = PRODUCTS.filter((p) => p.bestseller).slice(0, 4)
const POPULAR = ['mogra-raat', 'noor', 'kasturi-attar', 'mitti'].map(findProduct)

export default function Home() {
  return (
    <>
      <HeroTraces />
      <ProductRow title="New arrivals" products={NEW_ARRIVALS} link="/shop?sort=new" />
      <Signature />
      <About />
      <ProductRow title="Bestsellers" products={BESTSELLERS} link="/shop" />
      <ScentArchive />
      <Residue />
      <MaterialMemory />
      <Ritual />
      <Philosophy />
      <ProductRow title="Popular products" products={POPULAR} link="/shop" linkText="View catalog" />
    </>
  )
}
