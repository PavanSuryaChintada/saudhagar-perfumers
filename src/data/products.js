// Catalogue content is placeholder copy written for the build.
// Replace names, prices and notes with the real Saudagar range before launch.

export const FAMILIES = [
  { id: 'woody', name: 'Oud & Woods', blurb: 'Smoke, resin and old timber.', tint: '#3a2614' },
  { id: 'floral', name: 'Florals', blurb: 'Rose, jasmine and night-blooming mogra.', tint: '#4a1f26' },
  { id: 'amber', name: 'Ambers & Spice', blurb: 'Saffron, amber and warm skin.', tint: '#4d3010' },
  { id: 'fresh', name: 'Fresh & Earthy', blurb: 'Vetiver, rain on clay, green tea.', tint: '#1f2d22' },
]

export const TYPES = ['Eau de Parfum', 'Attar', 'Discovery Set']

export const PRODUCTS = [
  {
    slug: 'oud-shahi',
    name: 'Oud Shahi',
    type: 'Eau de Parfum',
    family: 'woody',
    wearer: 'Unisex',
    tagline: 'Royal oud, softened with rose.',
    description:
      'A deep, resinous oud from Assam laid over smoked birch and a thread of Taifi rose. It opens dark and slowly turns honeyed on skin — the bottle we reach for in the evening.',
    notes: {
      top: ['Saffron', 'Pink pepper'],
      heart: ['Taifi rose', 'Oud'],
      base: ['Birch tar', 'Labdanum', 'Musk'],
    },
    sizes: [
      { ml: 50, price: 3900 },
      { ml: 100, price: 6200 },
    ],
    liquid: '#7a3d12',
    shape: 'classic',
    rating: 4.9,
    reviews: 214,
    bestseller: true,
    longevity: 'Ten hours or more',
    sillage: 'Strong',
  },
  {
    slug: 'gulab-taifi',
    name: 'Gulab Taifi',
    type: 'Eau de Parfum',
    family: 'floral',
    wearer: 'Her',
    tagline: 'A rose garden at first light.',
    description:
      'Dewy Taifi rose with lychee and a green edge of geranium, resting on soft white musk. Bright in the morning, close and powdery by evening.',
    notes: {
      top: ['Lychee', 'Bergamot'],
      heart: ['Taifi rose', 'Geranium'],
      base: ['White musk', 'Cashmeran'],
    },
    sizes: [
      { ml: 50, price: 3400 },
      { ml: 100, price: 5400 },
    ],
    liquid: '#c4687a',
    shape: 'round',
    rating: 4.8,
    reviews: 168,
    bestseller: true,
    longevity: 'Eight hours',
    sillage: 'Moderate',
  },
  {
    slug: 'kesar-amber',
    name: 'Kesar Amber',
    type: 'Eau de Parfum',
    family: 'amber',
    wearer: 'Unisex',
    tagline: 'Saffron threads in warm amber.',
    description:
      'Kashmiri saffron and cardamom poured over a golden amber accord with tonka and benzoin. Sweet without being sugary; it sits on skin like a shawl.',
    notes: {
      top: ['Saffron', 'Cardamom'],
      heart: ['Amber', 'Orris'],
      base: ['Tonka bean', 'Benzoin', 'Vanilla'],
    },
    sizes: [
      { ml: 50, price: 3600 },
      { ml: 100, price: 5800 },
    ],
    liquid: '#c9802a',
    shape: 'obelisk',
    rating: 4.9,
    reviews: 189,
    bestseller: true,
    isNew: true,
    longevity: 'Ten hours or more',
    sillage: 'Moderate',
  },
  {
    slug: 'mitti',
    name: 'Mitti',
    type: 'Eau de Parfum',
    family: 'fresh',
    wearer: 'Unisex',
    tagline: 'The first rain on dry earth.',
    description:
      'Petrichor, vetiver and a mineral clay accord, lifted by green cardamom. Clean and grounding, made for hot afternoons.',
    notes: {
      top: ['Green cardamom', 'Grapefruit'],
      heart: ['Clay accord', 'Petrichor'],
      base: ['Vetiver', 'Cedarwood'],
    },
    sizes: [
      { ml: 50, price: 3200 },
      { ml: 100, price: 5100 },
    ],
    liquid: '#8a7a55',
    shape: 'classic',
    rating: 4.7,
    reviews: 97,
    isNew: true,
    longevity: 'Six hours',
    sillage: 'Soft',
  },
  {
    slug: 'mogra-raat',
    name: 'Mogra Raat',
    type: 'Eau de Parfum',
    family: 'floral',
    wearer: 'Her',
    tagline: 'Jasmine strung for a night out.',
    description:
      'Fresh mogra buds, tuberose and orange blossom over sandalwood. Heady and luminous — a white floral that does not apologise.',
    notes: {
      top: ['Orange blossom', 'Mandarin'],
      heart: ['Mogra', 'Tuberose'],
      base: ['Sandalwood', 'Ambrette'],
    },
    sizes: [
      { ml: 50, price: 3400 },
      { ml: 100, price: 5400 },
    ],
    liquid: '#e2cf9a',
    shape: 'obelisk',
    rating: 4.8,
    reviews: 131,
    longevity: 'Eight hours',
    sillage: 'Strong',
  },
  {
    slug: 'sultan-leather',
    name: 'Sultan Leather',
    type: 'Eau de Parfum',
    family: 'woody',
    wearer: 'Him',
    tagline: 'Saddle leather and black tea.',
    description:
      'Supple suede, smoky black tea and a whisper of tobacco leaf, finished with patchouli. Confident, dry and polished.',
    notes: {
      top: ['Black tea', 'Bergamot'],
      heart: ['Suede', 'Tobacco leaf'],
      base: ['Patchouli', 'Vetiver'],
    },
    sizes: [
      { ml: 50, price: 3700 },
      { ml: 100, price: 5900 },
    ],
    liquid: '#4e2a18',
    shape: 'classic',
    rating: 4.8,
    reviews: 152,
    bestseller: true,
    longevity: 'Ten hours or more',
    sillage: 'Strong',
  },
  {
    slug: 'chandan-attar',
    name: 'Chandan',
    type: 'Attar',
    family: 'woody',
    wearer: 'Unisex',
    tagline: 'Pure sandalwood oil, alcohol-free.',
    description:
      'A creamy Mysore-style sandalwood attar, distilled the traditional deg-bhapka way. Dab a drop on the wrist; it lasts all day and stays close.',
    notes: {
      top: ['Sandalwood'],
      heart: ['Sandalwood', 'Milky woods'],
      base: ['Sandalwood', 'Musk'],
    },
    sizes: [
      { ml: 6, price: 1400 },
      { ml: 12, price: 2500 },
    ],
    liquid: '#b8894a',
    shape: 'attar',
    rating: 4.9,
    reviews: 276,
    bestseller: true,
    longevity: 'All day',
    sillage: 'Skin-close',
  },
  {
    slug: 'kasturi-attar',
    name: 'Kasturi',
    type: 'Attar',
    family: 'amber',
    wearer: 'Unisex',
    tagline: 'Soft musk with a saffron edge.',
    description:
      'A clean, skin-like musk attar warmed with saffron and a hint of amber. The kind of scent people lean in to ask about.',
    notes: {
      top: ['Saffron'],
      heart: ['White musk', 'Amber'],
      base: ['Musk', 'Sandalwood'],
    },
    sizes: [
      { ml: 6, price: 1200 },
      { ml: 12, price: 2100 },
    ],
    liquid: '#d6b06a',
    shape: 'attar',
    rating: 4.8,
    reviews: 203,
    isNew: true,
    longevity: 'All day',
    sillage: 'Skin-close',
  },
  {
    slug: 'khus-attar',
    name: 'Khus',
    type: 'Attar',
    family: 'fresh',
    wearer: 'Him',
    tagline: 'Cooling vetiver root from the river beds.',
    description:
      'Earthy, green and cooling — vetiver root distilled into sandalwood oil. A summer classic for hot days and long drives.',
    notes: {
      top: ['Green vetiver'],
      heart: ['Vetiver root', 'Wet earth'],
      base: ['Sandalwood'],
    },
    sizes: [
      { ml: 6, price: 1100 },
      { ml: 12, price: 1900 },
    ],
    liquid: '#5d6a3a',
    shape: 'attar',
    rating: 4.7,
    reviews: 88,
    longevity: 'All day',
    sillage: 'Skin-close',
  },
  {
    slug: 'discovery-set',
    name: 'The Discovery Set',
    type: 'Discovery Set',
    family: 'amber',
    wearer: 'Unisex',
    tagline: 'Six scents, 5 ml each.',
    description:
      'Oud Shahi, Gulab Taifi, Kesar Amber, Mitti, Mogra Raat and Sultan Leather in travel vials. The amount is credited back when you buy a full bottle.',
    notes: {
      top: ['Saffron', 'Lychee', 'Cardamom'],
      heart: ['Rose', 'Mogra', 'Oud'],
      base: ['Amber', 'Leather', 'Vetiver'],
    },
    sizes: [{ ml: 30, price: 1800 }],
    liquid: '#a0652a',
    shape: 'round',
    rating: 4.9,
    reviews: 341,
    bestseller: true,
    longevity: 'Varies by scent',
    sillage: 'Varies by scent',
  },
  {
    slug: 'dahn-al-oud',
    name: 'Dahn al Oud',
    type: 'Attar',
    family: 'woody',
    wearer: 'Unisex',
    tagline: 'Aged oud oil in a crystal decanter.',
    description:
      'A dark, animalic oud oil rested for a full year before decanting. Barnyard and leather at first, then honey, incense and old wood that last for days on cloth.',
    notes: {
      top: ['Oud', 'Leather'],
      heart: ['Incense', 'Honey'],
      base: ['Aged oud', 'Resin'],
    },
    sizes: [
      { ml: 3, price: 4800 },
      { ml: 6, price: 8900 },
    ],
    liquid: '#5a3416',
    shape: 'attar',
    rating: 4.9,
    reviews: 64,
    longevity: 'All day and beyond',
    sillage: 'Moderate',
  },
  {
    slug: 'shamama-attar',
    name: 'Shamama',
    type: 'Attar',
    family: 'amber',
    wearer: 'Unisex',
    tagline: 'Forty herbs, spices and resins in one oil.',
    description:
      'The classic winter attar of Kannauj: saffron, cinnamon, oakmoss and amber distilled together over weeks. Dense, warming and slightly smoky.',
    notes: {
      top: ['Saffron', 'Cinnamon'],
      heart: ['Herbs', 'Oakmoss'],
      base: ['Amber', 'Resins'],
    },
    sizes: [
      { ml: 6, price: 1600 },
      { ml: 12, price: 2800 },
    ],
    liquid: '#8a3a12',
    shape: 'attar',
    rating: 4.8,
    reviews: 119,
    isNew: true,
    longevity: 'All day',
    sillage: 'Skin-close',
  },
  {
    slug: 'barish',
    name: 'Barish',
    type: 'Eau de Parfum',
    family: 'fresh',
    wearer: 'Unisex',
    tagline: 'Monsoon air, cut glass and cold stone.',
    description:
      'Ozonic and mineral: rain-cooled air, aquatic notes and a clean musk base. The lightest scent in the house, for heat and humidity.',
    notes: {
      top: ['Ozone', 'Lime'],
      heart: ['Water lily', 'Mineral accord'],
      base: ['Clean musk', 'Ambrette'],
    },
    sizes: [
      { ml: 50, price: 3100 },
      { ml: 100, price: 4900 },
    ],
    liquid: '#8aa0a8',
    shape: 'classic',
    rating: 4.6,
    reviews: 72,
    isNew: true,
    longevity: 'Five hours',
    sillage: 'Soft',
  },
  {
    slug: 'noor',
    name: 'Noor',
    type: 'Eau de Parfum',
    family: 'amber',
    wearer: 'Her',
    tagline: 'Candlelight on crystal.',
    description:
      'Golden amber, benzoin and a glow of orange blossom, wrapped in vanilla. Made for festive evenings and lamps left burning late.',
    notes: {
      top: ['Orange blossom', 'Pink pepper'],
      heart: ['Amber', 'Benzoin'],
      base: ['Vanilla', 'Sandalwood'],
    },
    sizes: [
      { ml: 50, price: 3500 },
      { ml: 100, price: 5600 },
    ],
    liquid: '#b6782a',
    shape: 'round',
    rating: 4.8,
    reviews: 101,
    longevity: 'Eight hours',
    sillage: 'Moderate',
  },
]

// Every product has a photograph named after its slug in /public/images.
PRODUCTS.forEach((p) => {
  p.image = `/images/${p.slug}.jpg`
})

export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)
export const familyName = (id) => FAMILIES.find((f) => f.id === id)?.name ?? id

export const formatPrice = (n) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })

export const REVIEWS = [
  {
    quote:
      'Oud Shahi is the first oud I have owned that does not shout. People ask about it every single time I wear it to work.',
    name: 'Aarav M.',
    city: 'Mumbai',
    product: 'Oud Shahi',
  },
  {
    quote:
      'I bought the Discovery Set to choose one and ended up ordering three full bottles. Gulab Taifi smells like my grandmother’s garden.',
    name: 'Sana K.',
    city: 'Hyderabad',
    product: 'Gulab Taifi',
  },
  {
    quote:
      'The Chandan attar lasts from morning till I go to bed. One drop on the wrist is enough. Beautiful packaging too.',
    name: 'Rohan D.',
    city: 'Bengaluru',
    product: 'Chandan',
  },
  {
    quote:
      'Kesar Amber is warm and cosy without being too sweet. Perfect for winter weddings.',
    name: 'Meher P.',
    city: 'Delhi',
    product: 'Kesar Amber',
  },
]

export const JOURNAL = [
  {
    slug: 'how-to-wear-attar',
    title: 'How to wear an attar',
    excerpt: 'One drop, warm skin, and why you should never rub your wrists together.',
    read: '4 min read',
    tint: '#b8894a',
    shape: 'attar',
  },
  {
    slug: 'layering-oud-and-rose',
    title: 'Layering oud and rose',
    excerpt: 'The oldest pairing in perfumery, and three ways to make it your own.',
    read: '6 min read',
    tint: '#7a3d12',
    shape: 'classic',
  },
  {
    slug: 'make-perfume-last',
    title: 'Making your perfume last longer',
    excerpt: 'Moisturise first, spray pulse points, and store the bottle away from sunlight.',
    read: '3 min read',
    tint: '#c4687a',
    shape: 'round',
  },
]
