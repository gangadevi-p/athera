# Aethera

A responsive storefront for **Aethera** — a furniture brand curating pieces and
interiors for calm, intentional living. Designed desktop-first and checked from
360px phones to 2560px monitors.

Built with React 18, Vite and React Router. Designed and built from a Figma
wireframe, a core-flows brief (`coreflows.jpg`) and a visual concept: **a quiet
editorial gallery, not a normal e-commerce site** — slow, spacious, tactile and
carefully composed, with luxury carried by typography, whitespace and
photography rather than by interface.

## Design direction

Paper and ink. Warm off-white grounds, hairline rules, a single sage accent,
charcoal text instead of pure black, and large photography doing the colour
work. **Georgia** capitals for titles against **Jost** for everything else;
generous vertical rhythm and very few controls on any screen.

**The design system is written down in [`DESIGN.md`](DESIGN.md)** and lives in
one file, [`src/tokens.css`](src/tokens.css): the palette, a five-size text
scale and a fluid ramp for titles, a 4/8 spacing scale, the layout box, the
section rhythm, motion and the values that change at each breakpoint. Open
`/design-system` (not linked from the site) to see every token drawn live — it
reads the values back from the stylesheet, so it can't drift, and it can be
resized to watch the tokens change.

The page is laid out in a 1440px box with 1280px of content, 80px desktop
margins, and 120–160px between sections.

The palette is the brief's seven colours (`--paper`, `--ink` and friends are the
names the layout uses):

| Token | Value | Use |
| --- | --- | --- |
| `warm-white` | `#F6F4EF` | type and glass over photographs |
| `sand` | `#EFE7DA` | a second ground |
| `beige` | `#E4DED3` | a third ground |
| `taupe` | `#7C766C` | placeholders |
| `sage` | `#7E8A73` | the single accent |
| `walnut` | `#2A1B14` | the solid button's hover |
| `charcoal` | `#2E1E16` | ink |

Image ratios are fixed by the brief: 16:9 for the homepage hero (with a
separate 4:5 crop on mobile), 4:5 for editorial sections, 3:4 for product
cards, and 1:1 plus 4:5 in the product gallery.

## Responsive

Three breakpoints — **1280, 980 and 640** — and the tokens (margins, section
padding, navigation height, column gap) change at each, so most components need
no media query of their own. Below 980px every pair of columns folds into one,
grids go two-up, and the navigation becomes a full-screen **Menu**. Below 640px
margins drop to 20px, grids go one-up, the product page grows a sticky
add-to-cart bar, and the gallery's close-ups become a strip that scrolls
sideways. On touch screens every small control has a 44px hit area and the
gallery's *Zoom* chip is always visible; hover-only reveals are never the only
way to see something.

## Rhythm and motion

No two consecutive sections share a shape. The landing page moves between large
visual moments and quiet empty spaces: a full-screen hero, an editorial
category index, a horizontal product row, an asymmetric image composition, a
grid, a split-screen, a cropped texture band, a spread, and a minimal close.

Motion is slow, soft and controlled, and opt-in from the markup. Images reveal
through a vertical mask, text fades upward, two images carry a 4–5% scroll-
linked crop movement, product cards crossfade to a second frame on hover, links
grow a thin sliding underline, the cart opens as a right-side drawer, and
opening a piece expands its card image into the product gallery. Every one of
these is disabled under `prefers-reduced-motion`.

## Screens

| Route | Purpose |
| --- | --- |
| `/` | Landing — hero, shop by category, featured collections, philosophy, shop by space |
| `/shop` | Listing, filtered by category, colour, material and size through the URL; `?col=` is a featured collection |
| `/categories` | Shop by category — the seven, and a chosen category's listing |
| `/p/:id` | Product detail — gallery with in-place zoom, finishes, availability check, specification, care |
| `/spaces` | Shop by space — living room, bedroom, workspace |
| `/spaces/:id` | One space, with the pieces chosen for it |
| `/wishlist` | Saved pieces, with add-to-cart and remove |
| `/account` | Prototype sign-in and a saved address |
| `/cart` | Cart with quantities and a running total |
| `/checkout` | Account, delivery details, shipping method and payment, with a live summary |
| `/done` | Order confirmation |
| `/track` | Order tracking — enter an order number, see the delivery status |
| `/help` | Delivery and returns, care, contact |
| `/design-system` | The design system, drawn from the live tokens (not linked) |

## The collection

Seventy-three pieces across the brief's seven categories: sofas and lounge chairs,
coffee and side tables, dining tables and chairs, beds and bedside tables,
shelves and storage cabinets, floor and table lamps, and rugs, cushions and
ceramic objects.

Each piece is photographed in the views the brief asks for — front, side,
three-quarter, back and detail — labelled under each frame in the gallery. Any
frame magnifies in place — click to enlarge, drag to move around, click again to return — and a sharper file loads as you arrive.

## Imagery

Photography is a mix of frames cut from contact sheets in `/img` (`scripts/crop-sheets.mjs`, `scripts/cut-featured.mjs`; served from `public/photos`) and the Unsplash CDN. Every image goes through
`src/components/Img.jsx`, which reserves the aspect ratio, fades the photo in
on load, and falls back to a tonal placeholder if an asset fails — so the
layout never collapses or shifts. The hero ships two genuinely different CDN
crops through a `<picture>` rather than letterboxing one.

## Development

```bash
npm install
npm run dev      # http://localhost:5173/athera/
npm run build    # production build to dist/
npm run preview  # serve the build at /athera/
```

The app is served from the `/athera/` base path (GitHub Pages); `public/404.html`
redirects deep links back through the SPA router. Because that redirect uses a
`p` query parameter, application query parameters must not be named `p` — the
listing's price filter is `pr`.

The cart, wishlist, account and placed orders persist to `localStorage`. There
is no backend: checkout is a prototype — the card fields are cosmetic, nothing
is charged, and nothing is stored or sent — and order tracking finds only the
orders placed in that browser.
