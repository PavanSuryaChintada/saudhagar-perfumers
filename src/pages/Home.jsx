import HeroTraces from '../sections/HeroTraces'
import ProductRow from '../sections/ProductRow'
import Signature from '../sections/Signature'
import HorizontalCollection from '../sections/HorizontalCollection'
import About from '../sections/About'
import Stats from '../sections/Stats'
import Philosophy from '../sections/Philosophy'
import MaterialMemory from '../sections/MaterialMemory'
import Ritual from '../sections/Ritual'
import FamilyStack from '../sections/FamilyStack'
import NotesJourney from '../sections/NotesJourney'
import ScentArchive from '../sections/ScentArchive'
import Finder from '../sections/Finder'
import Reviews from '../sections/Reviews'
import VelocityMarquee from '../components/VelocityMarquee'
import { PRODUCTS, findProduct } from '../data/products'

const MATERIALS = ['Assam oud', 'Taifi rose', 'Kashmiri saffron', 'Mysore sandalwood', 'Kasturi musk', 'Khus vetiver']
const RITUALS = ['Distilled in copper', 'Rested in glass', 'Blended by hand', 'Small batches', 'Alcohol-free attars']

const NEW_ARRIVALS = ['dahn-al-oud', 'shamama-attar', 'kesar-amber', 'barish'].map(findProduct)
const BESTSELLERS = PRODUCTS.filter((p) => p.bestseller).slice(0, 4)

export default function Home() {
  return (
    <>
      <HeroTraces />
      <VelocityMarquee items={MATERIALS} />
      <ProductRow title="New arrivals" products={NEW_ARRIVALS} link="/shop?sort=new" />
      <Signature />
      <HorizontalCollection />
      <About />
      <Stats />
      <Philosophy />
      <MaterialMemory />
      <FamilyStack />
      <Ritual />
      <NotesJourney />
      <ProductRow title="Bestsellers" products={BESTSELLERS} link="/shop" linkText="View catalog" />
      <ScentArchive />
      <VelocityMarquee items={RITUALS} speed={1.5} className="vmarq--gold" />
      <Finder />
      <Reviews />
    </>
  )
}
