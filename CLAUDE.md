# Aethera — project context

Desktop-only storefront for **Aethera**, a luxury furniture brand: seventy-three
pieces across seven categories, three spaces, and a room assistant. React 18 +
Vite + React Router. No backend.

Three briefs govern this build:

- **`coreflows.jpg`** — the core flows and features diagram. It sets the seven
  product categories, the nine-part landing page, the five filters, the five
  gallery views, the checkout and order-tracking flows, the image ratios, the
  photography direction and the colour palette. **It is the current source of
  truth**; where it and the wireframe disagree, follow it.
- **The visual concept** (given in chat, summarised under *Visual concept*
  below) — "a quiet editorial gallery, not a normal e-commerce website".
  It sets the grid, the section rhythm, the hero, the composition rules, the
  product presentation, the motion system and an explicit list of things to
  avoid. Where it and the core-flows brief overlap, core-flows decides *what*
  is on the page and the concept decides *how it is arranged and how it moves*.
- **`Lofi-wireframe.pdf`** — the earlier IA sketch. Still the origin of the
  Shop-by-space section and the Room Assistant, which the core-flows brief does
  not mention but which stay in the build.

> Two earlier passes live on other branches: the COS-inspired editorial site on
> `claude/aethera-website-design-vfcikd`, and the warm slide-deck build with
> SVG-drawn furniture at commit `fe80dd1` on this branch. Both are superseded.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173/athera/
npm run build    # → dist/
npm run preview  # http://localhost:4173/athera/
```

Base path is `/athera/` (GitHub Pages). `public/404.html` bounces deep links
back through the router. `VITE_HASH_ROUTER=1` switches `src/main.jsx` to
`HashRouter`.

> **`?p=` is reserved.** `index.html` reads a `p` query parameter as the GitHub
> Pages SPA redirect and rewrites the URL with it. Never use `p` for an
> application query parameter — the listing's price filter is `pr` for exactly
> this reason.

## Design

Paper and ink: near-white grounds, hairline rules, one accent, and photography
doing all the colour work. Luxury comes from typography, whitespace and
composition — never from chips, badges, cards-within-cards or motion.

The palette is the brief's seven colours. Each has a token, and the layout
names (`--paper`, `--bone`, `--linen`, `--mute`) are aliases onto them.

| Token | Value | Use |
| --- | --- | --- |
| `--warm-white` | `#F6F4EF` | page ground (`--paper`) |
| `--sand` | `#EFE7DA` | alternating sections (`--bone`) |
| `--beige` | `#E4DED3` | third ground, image placeholder (`--linen`) |
| `--taupe` | `#7C766C` | eyebrows, captions (`--mute`) |
| `--sage` | `#7E8A73` | `--accent`: focus rings, link hovers, the live tracking step |
| `--walnut` | `#241A14` | the one dark section (philosophy), solid-button hover |
| `--charcoal` | `#2B2A27` | accent ink |

Plus `--graphite` `#4A463E` for body copy and `--rule` `#D9D2C6` for hairlines.
`--ink` is an alias onto `--charcoal`: the concept asks for **charcoal text,
never pure black**, so there is no near-black left in the palette.

**Grid and rhythm.** 1440px maximum, 1280px of content, 80px desktop margins
(`--gutter`), 20px on a phone. Section padding is `--sec` 160px / `--sec-tight`
120px, dropping to 96/72 on a phone — the concept's 120–180px desktop and
72–100px mobile bands. `.g12` is the twelve-column grid the asymmetric
compositions are set on.

Type: **Georgia** (display — see Decisions; uppercase, `.disp` + `.d1/.d2/.d3`) and **Jost**
(300/400 body, `.eyebrow` for tracked small caps). No Tailwind classes are
used; Tailwind is installed but its directives were removed.

**Desktop first, responsive below it.** Design against a 1280–1680 canvas.
The responsive layer is three steps (1200 / 980 / 640) at the end of
`pages.css`; keep new layout rules with it rather than scattering media
queries through the file.

Stylesheets: `src/index.css` holds tokens, primitives (buttons, links, image,
nav, footer, cards, save control, forms) and the homepage; `src/pages.css`
holds the other screens. Both are imported from `src/main.jsx`.

### Image ratios

Fixed by the brief, and enforced by `<Img/>`:

| Where | Ratio |
| --- | --- |
| Homepage hero | 16:9, with a **separate 4:5 crop** below 640px |
| Editorial sections, category cards | 4:5 |
| Product cards | 3:4 |
| Product gallery | 1:1 for the opening frame, 4:5 for the rest |

`<Img/>` writes `--ar` and `--ar-sm` as inline custom properties; `.img` reads
`--ar`, and the first media query in `pages.css` swaps to `--ar-sm` at 640px.
Passing `ar`/`arSm` (e.g. `"16:9"` / `"4:5"`) additionally makes the CDN return
two genuinely different crops through a `<picture>`, rather than letterboxing
one crop. Only the hero needs that today.

## Visual concept

A quiet editorial gallery. Slow, spacious, tactile, carefully composed.

**Rhythm — no two consecutive sections share a shape.** The landing page runs:
full-screen visual (hero) · editorial index (categories) · horizontal product
row (featured) · asymmetric composition (lifestyle editorial) · grid
(best-selling) · split-screen (spaces) · cropped texture band · spread
(craftsmanship) · minimal closing (philosophy, newsletter). If you add a
section, look at its neighbours first: a second grid directly after a grid is
the failure mode this rhythm exists to prevent.

**Composition.** Controlled asymmetry, never identical centred sections. Mix
full-width imagery with narrow text blocks: one oversized image beside one
smaller detail, text aligned outside the image, two images at deliberately
unequal sizes, an occasional overlap (`.edit__detail` pulls up into the lead
image). Avoid symmetrical three-card layouts everywhere and anything that reads
as a standard marketplace grid.

**Hero.** 92vh. The photograph takes the right ~64% full-bleed; the type sits
in the ground it leaves, which is why `.hero__t` has its own display size a
notch below `.d1` — a 96px headline will not fit a third of the page.

**Product presentation.** Large borderless cards, three to four per row, image
dominant, warm neutral grounds. A second frame crossfades in on hover and the
material line is revealed rather than always shown (gated behind
`@media (hover: hover)` so touch always sees it). Alternate grid rows with
horizontal scroll rows (`.hrow`), which bleed off the right edge.

**Avoid**, explicitly: glassmorphism (there is no `backdrop-filter` in the
stylesheets and there should not be), heavy shadows, bright gradients, strongly
rounded cards, fast animation, constant parallax, and floating elements.

## Motion

`src/lib/motion.jsx` is the whole motion layer. Slow, soft, controlled — and
opt-in from the markup, which is what keeps the page quiet.

- **`data-reveal`** on an element reveals it when its top crosses 92% of the
  viewport: `data-reveal="mask"` wipes an image open through a vertical mask,
  any other value fades it up 20px. `data-delay="1..5"` sequences a group.
  `useReveals()` is mounted once in Layout and re-queries the document on every
  scroll, so content rendered later is picked up automatically.
  > It deliberately does **not** use an IntersectionObserver. One was tried and
  > silently missed elements, leaving whole sections invisible. A measured pass
  > over ~60 elements costs nothing here and cannot go stale.
- **`useParallax(pct)`** writes `--py` for a scroll-linked crop movement, used
  on exactly two images — the hero and the editorial lead. Adding a third is
  how a page starts to feel restless.
- **Timings** are tokens: `--t-hover` .3s, `--t-reveal` .75s, `--t-image` .9s,
  all on `--ease` `cubic-bezier(.22, 1, .36, 1)`.
- **Page transitions** are a soft fade (`main` is keyed by pathname and
  animates `page-in`). Opening a piece expands its card image into the product
  gallery through the View Transitions API.
- **Reduced motion** is honoured throughout: reveals resolve instantly,
  parallax never attaches, view transitions are not requested, and a global
  rule flattens every transition and animation.

## Photography

Every photo is an Unsplash id in `src/data/catalogue.js`, rendered through
`<Img/>` (`src/components/Img.jsx`), which reserves the aspect ratio, fades the
photo in, and falls back to a tonal block so a layout never collapses. `img(id,
w)` builds the CDN URL; `imgAt(id, w, ar)` builds one at a named ratio.

The brief's **core image style** is the rule for every addition: warm natural
daylight, soft shadows and muted colour, real calm living spaces, minimal
styling, natural textures visible, slightly imperfect and lived-in, editorial
compositions with negative space, one consistent warm grade.

The set was curated against that. When swapping a photo, check it in place: a
single saturated image (orange lamplight, teal upholstery) breaks the whole
page. Candidates were reviewed as a contact sheet before being committed —
worth repeating rather than trusting a search result's thumbnail.

Two named sets come straight from the brief:

- `CRAFT` — the seven craftsmanship close-ups that "make quality visible":
  wood grain, fabric weave, joinery, rounded edges, stitching, metal finishing,
  hands crafting. Rendered as the landing page's craftsmanship list.
- `EDITORIAL` — the five atmospheric story images used between product
  sections: sunlight on linen, a quiet reading corner, ceramic objects on wood,
  curtains near a window, shadows across furniture.

## Structure

```
src/
  data/catalogue.js   CATEGORIES, VIEWS, COLOURS, SIZES, PRICE_BANDS,
                      MATERIAL_FILTERS, PRODUCTS, SPACES, MATERIALS, CRAFT,
                      EDITORIAL, ROOMS + lookups
  lib/format.js       money ($), SHIP, eta(), dateIn(), dims(), cx(),
                      checkPostcode()
  lib/motion.jsx      useReveals(), useParallax(), useViewTransitions(),
                      reducedMotion()
  lib/shop.jsx        cart, wishlist, account, orders, delivery choice,
                      add-to-cart drawer (all localStorage)
  components/         Layout (nav, footer, scroll), CartDrawer, Img, Gallery,
                      ProductCard, SaveButton, Newsletter
  pages/              Home, Shop, Product, Spaces, Space, Assistant, Wishlist,
                      Account, Cart, Checkout, Done, Track, NotFound
  index.css           tokens, primitives, cart drawer, landing
  pages.css           listing, detail, wishlist, cart, checkout, tracking,
                      account, assistant, responsive
```

Routes: `/`, `/shop`, `/p/:id`, `/spaces`, `/spaces/:id`, `/assistant`,
`/wishlist`, `/account`, `/cart`, `/checkout`, `/done`, `/track`.

> **The router is a data router.** `App.jsx` exports a `routes` array and
> `main.jsx` builds it with `createBrowserRouter` (or `createHashRouter` under
> `VITE_HASH_ROUTER=1`). This is not a preference: `useViewTransitionState`,
> which drives the shared-image expansion, throws outside `RouterProvider`.
> `ShopProvider` wraps `Layout` in the root route so cart, wishlist and account
> state survive navigation.

## The catalogue

Seven categories, named as the brief names them:

| id | Name | Pieces |
| --- | --- | --- |
| `sofas` | Sofas and lounge chairs | 10 |
| `tables` | Coffee and side tables | 10 |
| `dining` | Dining tables and chairs | 10 (the writing desk lives here) |
| `beds` | Beds and bedside tables | 10 |
| `storage` | Shelves and storage cabinets | 10 |
| `lighting` | Floor and table lamps | 11 |
| `objects` | Rugs, cushions and ceramic objects | 12 |

To add a piece: add an entry to `PRODUCTS` with `cat`, `spaces`, `size`
(`small`/`medium`/`large`, which drives the size filter), `care`, `stock`, its
finishes — each with a `colour` from `COLOURS`, which drives the colour filter
— and `images` as `{ id, view }` objects using names from `VIEWS` (one `Front`
photograph is enough; the gallery re-frames the other views from it — add a
`focus: [x, y]` placing the piece in that photograph, and optionally a `Detail`
close-up). Add
`arrival: true` for New Arrivals, `featured: true` to be that category's
candidate for the featured row, `bestseller: true` for the best-selling row.

`cover(p)` returns the photo a piece is represented by outside its own gallery.
Use it rather than reaching into `p.images[0]`.

## Decisions and gotchas

- **Prices are `$`**, placeholders. One price per piece; finishes do not change it.
- **Current landing page (supersedes the nine-part list below where they differ).**
  Hero · assurance strip · category carousel · featured collections · philosophy ·
  three spaces (equal panes sized from `--fit-body` in `index.css`) · footer.
  There are no best-seller or newsletter sections on it (`Newsletter.jsx` is
  unused). Featured collections and the spaces row each fit one screen; the
  category carousel is taller than one.
- **Featured collections are curated sets, not categories.** `COLLECTIONS` in
  `catalogue.js` lists the pieces; each tile opens `/shop?col=<id>`. Keep `p` out
  of query names (see Commands).
- **Display type is Georgia**, by the owner's choice (2026-10-02) — not
  Italiana, whatever the Design section below says. The footer logotype
  (`17.4cqw`) and the hero headline cap are calibrated to it; re-measure both if
  the face or tracking changes.
- **`/help`** holds delivery & returns, care and contact (footer deep-links to
  `#delivery`, `#care`, `#contact`). Its copy repeats the product page and
  checkout; change them together.
- **The landing page is the brief's nine parts, in order**: navigation, hero,
  shop by category, featured collection, lifestyle editorial, best-selling,
  craftsmanship, brand philosophy, newsletter, footer. Shop-by-space is kept
  from the wireframe and sits with the other browsing sections, between
  best-selling and craftsmanship, and a cropped texture band separates it from
  craftsmanship. Featured and best-selling are deliberately disjoint so no
  piece appears twice: featured takes one piece per category, best-selling
  takes `bestseller` pieces the featured row did not already show. If you add
  or move a `featured` flag, check the best-selling row still has three —
  its copy carries no number precisely so it cannot silently go stale.
- **`.wrap` centres itself with `margin: 0 auto`**, which inside a grid or flex
  container resolves as shrink-to-fit rather than stretch. The hero is a grid,
  so `.hero > .wrap` sets `width: 100%` explicitly. Any future section that
  makes `.wrap` a grid or flex item needs the same.
- **The nav is `position: fixed`** and floats with no ground over the landing
  hero, settling onto paper past 40px of scroll. `main` carries
  `padding-top: var(--nav-h)` to clear it, removed on the landing page via
  `main[data-home]`. It carries the logotype,
  saved (only once something is saved), account and cart — there are no section
  links; visitors move through the landing page. Below 980px the
  account, saved and tracking links collapse into a full-screen
  editorial menu overlay; below 640px the product page grows a sticky
  add-to-cart bar (`.stickybuy`).
- **The listing has all five filters from the brief** — category, price,
  colour, material, size — plus a sort. Every one is a URL parameter (`c`,
  `pr`, `col`, `m`, `s`, `sort`), so a filtered view can be linked and the back
  button behaves. Multi-value parameters are comma lists. Colour and material
  filter on *families* (`COLOURS`, `MATERIAL_FILTERS`), not raw strings.
- **Every product page shows the brief's five views, always, in this order** —
  front, side, three-quarter, back, detail — as 4:5 close-ups in a column to the left of
  one large 1:1 frame (a labelled strip beneath it on a phone); choosing a close-up
  crossfades it into the large frame. The product panel is centred against the
  gallery, across its column and down.
  `gallery(p)` in `catalogue.js` builds them. Front and detail are the piece's
  own photographs when it has them; side, three-quarter and back are
  **re-framed from the front photograph** (an imgix focal-point crop at a
  different zoom and offset, see `REFRAME`), as is detail when the piece has no
  close-up. That was a deliberate choice: Unsplash has no true back-of-furniture
  photographs, and a piece's other photographs are different rooms, so
  re-framing is what keeps all five frames the same piece. They are crops, not
  new camera angles. `focus: [x, y]` on a piece says where it sits in its front
  photograph (0–1; default `[0.5, 0.55]`) so the crops stay on the piece rather
  than the wall behind it — set for 67 of the 73, tune it if a piece is added or
  its photo swapped. A piece's remaining entries in `images` are not shown in its
  gallery (only `images[1]` is used, as the card's hover frame). The large frame
  opens `Gallery`'s zoom overlay: click to magnify 2.2×, move the pointer to
  pan, arrow keys to step, Escape to close.
- **The availability check is a prototype.** `checkPostcode()` maps a postcode
  to one of three service areas and adds 0/1/2 weeks to the piece's own lead
  time. Nothing is looked up.
- **Checkout is a prototype**: the card fields are cosmetic and nothing is
  sent. It runs in the brief's four steps — account, delivery details,
  shipping method, payment — and step one is a real fork: sign in (which
  prefills the saved address) or continue as guest.
- **Order tracking is real within the browser.** Placed orders are appended to
  `aethera.orders`; `/track` finds one by number (and optionally email) and
  stages a five-step timeline against the delivery window the order was placed
  with. Orders placed in another browser cannot be found, and the page says so.
- **The Room Assistant uses three prepared rooms** (`ROOMS`) — no upload, no
  model call, no key. Each room carries its reading (light, proportion,
  palette), a note, and three picks with a written reason. It is meant to read
  as editorial judgement, not as a dashboard.
- **Cart and checkout are separate pages** (`/cart`, `/checkout`). Adding a
  piece opens the cart drawer; the delivery method is chosen in checkout's
  Shipping method step, not in the cart.
- **Type rule:** the display serif is for hero, section and editorial
  headings only. Product names, prices, navigation, buttons, filters and form
  UI are sans (`.pname`, `.ptitle`, `.price`).
- The product gallery is the left column on `/p/:id`, its width capped by the
  screen height (`--galw`) so the large frame and the close-ups fit one screen;
  the right column is
  sticky (`top: 122px`, clearing the 86px nav).
- **localStorage keys** are `aethera.cart`, `aethera.wishlist`,
  `aethera.account`, `aethera.orders`. All reads and writes go through the
  helpers in `lib/shop.jsx`, which swallow private-mode failures.
- `Lofi-wireframe.pdf` uses subsetted fonts, so its text does not copy out of a
  PDF reader cleanly; the IA above is the decoded version of it.
