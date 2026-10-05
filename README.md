# Saudagar Perfumers — storefront

React + Vite storefront for Saudagar Perfumers, built in the brand's black and gold.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

- `src/data/products.js` — catalogue, reviews and journal copy. **All placeholder** — replace with the real range, prices and notes.
- Layout follows the SYLVEN e-commerce concept (Behance), section by section, in the Saudagar palette.
- `public/images/` — stock photography from Unsplash (free licence; sources in `CREDITS.json`). Placeholder until real product shoots exist; each product image is named after its slug.
- `src/sections/` — homepage in order: HeroTraces → New arrivals → Signature → About → Philosophy → MaterialMemory → Ritual → NotesJourney → Bestsellers → ScentArchive → Finder → Reviews.
- `src/pages/` — Home, Shop (scent catalog, filters + pages in the URL), Product, Bag, Checkout, NotFound.
- `src/components/Bottle.jsx` — the SVG bottle used by the pinned notes section.
- `src/context/CartContext.jsx` — bag state, saved to localStorage.

Checkout is not wired to a payment provider yet.

Brand: Cinzel (wordmark), Cormorant Garamond (editorial headings), Poppins (body, matches the logo tagline). Gold `#F7D98A`, antique gold `#C9A15A`, black `#000`.

## Deploy to Vercel

The repo is ready to import as-is: Vercel detects Vite, runs `npm ci` and `npm run build`, and serves `dist/`.
`vercel.json` rewrites every route to `index.html` so client-side routes such as `/product/oud-shahi` work on refresh,
and sets long cache headers for hashed assets and images.

1. vercel.com → Add New → Project → import `saudhagar-perfumers`.
2. Leave the detected settings and press Deploy.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.
