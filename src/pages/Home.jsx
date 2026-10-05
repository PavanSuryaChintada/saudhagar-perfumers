import HeroTraces from '../sections/HeroTraces'
import ProductRow from '../sections/ProductRow'
import Signature from '../sections/Signature'
import About from '../sections/About'
import ScentArchive from '../sections/ScentArchive'
import Residue from '../sections/Residue'
import MaterialMemory from '../sections/MaterialMemory'
import Ritual from '../sections/Ritual'
import FamilyStack from '../sections/FamilyStack'
import Philosophy from '../sections/Philosophy'
import TheEdit from '../sections/TheEdit'
import HorizontalCollection from '../sections/HorizontalCollection'
import ScentAnatomy from '../sections/ScentAnatomy'
import { PRODUCTS, findProduct } from '../data/products'

// SYLVEN section order, with scroll-driven passages between the chapters.
const NEW_ARRIVALS = ['dahn-al-oud', 'shamama-attar', 'kesar-amber', 'barish'].map(findProduct)
const BESTSELLERS = PRODUCTS.filter((p) => p.bestseller).slice(0, 6)

export default function Home() {
  return (
    <>
      <HeroTraces />
      <ProductRow title="New arrivals" products={NEW_ARRIVALS} link="/shop?sort=new" />
      <Signature />
      <About />
      <TheEdit
        products={BESTSELLERS}
        note="The bottles our customers come back for — worn daily, gifted often, reordered every season."
      />
      <ScentArchive />
      <Residue />
      <MaterialMemory />
      <FamilyStack />
      <Ritual />
      <ScentAnatomy />
      <Philosophy />
      <HorizontalCollection />
    </>
  )
}
