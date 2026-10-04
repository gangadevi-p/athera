# Aethera — design system

A quiet editorial gallery, not a normal online shop. Paper and ink: near-white
grounds, hairline rules, one accent, and photography doing all the colour work.
Luxury comes from typography, whitespace and composition — never from chips,
badges, shadows or cards inside cards.

This is the written system. The live one is at **`/design-system`** (not linked
from the site): every swatch, size and gap on it is read back from the
stylesheet, so it cannot drift, and it can be opened at any width to watch the
tokens change. The values themselves are in [`src/tokens.css`](src/tokens.css) —
that file is the single source; nothing else in the stylesheets invents a
colour, a size or a gap.

## Principles

1. **One size per role.** Two things that do the same job are never different
   sizes. Text has five sizes; titles have a fluid ramp. A new size needs a new
   role, and a new role needs a reason.
2. **Whitespace is the ornament.** Hairlines and space separate things. There is
   no shadow, no radius and no tint behind a card. The only glass on the site is
   the hero button and the save heart, because both sit over photographs.
3. **Type carries the hierarchy.** Serif capitals for titles, light sans for
   everything functional. Weight changes at most once (300 → 400).
4. **Every screen is a different shape of the same page.** A page is a margin, a
   header (eyebrow · title · subheading), then sections on a shared rhythm.
5. **The tokens change with the screen, the components do not.** Margins,
   section padding, the navigation height and the column gap are tokens that
   step down at each breakpoint, so most components need no media query.
6. **A finger is 44px.** On a touch screen every control has a hit area that
   large; the control itself does not change size.

## Colour

The palette is the brief's seven colours. The names the layout uses are aliases
onto them (and a few quieter neighbours).

| Token | Value | Use |
| --- | --- | --- |
| `--warm-white` | `#F6F4EF` | type and glass over photographs |
| `--sand` | `#EFE7DA` | a second ground (unused for now — one ground across the site) |
| `--beige` | `#E4DED3` | a third ground |
| `--taupe` | `#7C766C` | placeholders |
| `--sage` | `#7E8A73` | **the accent** — focus rings, link hover, the live tracking step |
| `--walnut` | `#2A1B14` | the solid button's hover |
| `--charcoal` | `#2E1E16` | ink — there is no pure black |
| `--paper` | `#FFFFFF` | the page ground |
| `--linen` | `#F2F0EB` | image placeholder, quiet fills |
| `--graphite` | `#4A382D` | body copy |
| `--mute` | `#6B5A4D` | eyebrows, captions, secondary text |
| `--rule` | `#D3C9B6` | hairlines |

Translucent layers are written `rgb(var(--shade-rgb) / .5)` — never a raw
`rgba()`. `--shade-rgb` is the scrim over photographs, `--light-rgb` the type and
glass over them, `--ink-rgb` a tint over paper.

Text on paper is `--ink` (headings, controls), `--graphite` (body) or `--mute`
(secondary); all three pass 4.5:1 on white.

## Type

Two families: **Georgia** (`--display`) for titles, always uppercase; **Jost**
(`--sans`, weights 300 and 400) for everything else. Product names, prices,
navigation, buttons, filters and forms are always sans.

### Sizes

| Token | Size | Role | Class |
| --- | --- | --- | --- |
| `--fs-d1` | fluid 51 – 96px | statement — the one very large size (the hero, an order confirmation) | `.disp .d1` |
| `--fs-d2` | fluid 29 – 48px | **page and section titles** | `.disp .d2` |
| `--fs-d3` | fluid 26 – 42px | sub-sections, room names | `.disp .d3` |
| `--fs-title` | fluid 28 – 36px | a piece's name on its page (sans) | `.ptitle` |
| `--fs-price` | 21.6px | a price, an order total | |
| `--fs-body` | 18.4px | running text, names, values, form fields, prices in lists | `.lead`, `.pname`, `.price` |
| `--fs-small` | 16.5px | notes, material lines, filters | `.fine` |
| `--fs-label` | 15.2px | eyebrows, labels, buttons, tabs, pills, summaries | `.eyebrow`, `.btn` |
| `--fs-caption` | 13.6px | small-caps links, captions, the assurance strip | `.tlink` |

Icons and glyphs: `--fs-icon` 20px (the plus, the quantity signs), `--fs-glyph`
32px (close crosses), `--fs-mark` the logotype.

**Every page title is `.d2`.** `.d1` is for a statement — the landing hero and
the "thank you" after an order — and is not used for the title of a working page.

### Tracking and leading

| Token | Value | Used for |
| --- | --- | --- |
| `--ls-caps` | `.1em` | every small-caps control: buttons, links, tabs, nav |
| `--ls-label` | `.14em` | eyebrows, field labels, legends — the wide, quiet kind |
| `--ls-name` | `.05em` | product names |
| `--ls-title` | `.07em` | the product title |
| `--ls-display` | `.015em` | the serif titles |
| `--lh-body` / `--lh-loose` | 1.65 / 1.75 | running text / long paragraphs |

## Space

A 4/8 scale; **the name is the pixel value**: `--s4 --s8 --s12 --s16 --s20 --s24
--s32 --s40 --s48 --s64 --s80 --s96 --s128`. New rules use these. A handful of
older, hand-tuned values remain in the landing page, the product page and the
compact listing pages, where each pixel was set so that the whole layout fits
one screen — they are left alone on purpose.

## Layout

| Token | Desktop | ≤ 1280 | ≤ 980 | ≤ 640 |
| --- | --- | --- | --- | --- |
| `--max` | 1440px page box | | | |
| `--gutter` (margin each side) | 80px | 64px | 64px | **20px** |
| `--nav-h` | 88px | 88px | **76px** | **68px** |
| `--sec` / `--sec-tight` (section padding) | 160 / 120px | **140 / 104px** | **120 / 96px** | **96 / 72px** |
| `--col-gap` (between the two columns of a page) | 88px | **60px** | **44px** | 44px |
| `--grid-gap` (between cards) | 48px | | | |

- **Container** — `.wrap` is the page box: `max-width: var(--max)`, centred, with
  the gutter either side.
- **Page** — a screen's first section is `.sec.sec--page`: it sits `--page-top`
  beneath the navigation, the same distance on every page.
- **Page header** — `.phead`: an eyebrow, the title (`.d2`), and a subheading
  (`.lead`) that stays on one line where it can. A listing page puts the back
  arrow beside the eyebrow.
- **Section header** — `.head`: eyebrow, title, one link, and a hairline.
- **Columns** — a main column beside its aside (cart, checkout, account) is
  `--cols-main : --cols-aside` = 1.5 : 1 on all three, so the summary does not
  change width between the cart and checkout. Editorial splits are 1 : 1 or
  1.15 : 1. Under 980px every pair folds into one column.
- **Grids** — `.grid-3` / `.grid-4` drop to two columns at 980 and one at 640.
- **Section rhythm** — no two consecutive sections share a shape: a full-bleed
  image, an index, a row, a split, a grid.

### Image ratios

Fixed by the brief and enforced by `<Img/>`: hero 16:9 (with a separate 4:5 crop
on a phone), editorial and category 4:5, product cards 3:4, gallery 1:1 for the
frame and 4:5 for the close-ups.

## Breakpoints

Media queries cannot read custom properties, so the numbers are written out where
used — keep to these:

| Width | Device | What changes |
| --- | --- | --- |
| > 1280 | desktop | the design canvas (1280–1680) |
| ≤ 1280 | small laptop | margins 64px; the section rhythm closes up |
| ≤ 980 | tablet | one column; the navigation becomes the **Menu** overlay; the filter rail becomes a band above the results; grids go two-up |
| ≤ 640 | phone | 20px margins; one-up grids; the product page grows a sticky *Add to cart* bar; the gallery's close-ups become a strip that scrolls sideways |

Beyond these, two blocks keep thresholds tuned to a layout: the landing page's
one-screen sections (`index.css`) and the compact listing pages (`pages.css`,
"compact listing pages"), which scale from the window's spare height and width.

### Components that answer to their own width

- The product panel is a **container**: under 330px (a tablet held sideways, or a
  tall tablet where the photograph takes most of the row) the *Add to cart* and
  *Save* buttons and the postcode field stack instead of squeezing. The same
  panel on a 1920px monitor is 361px and keeps them side by side.
- The **Menu** overlay lists its four links one to a row, 60px tall, at body
  size, at the foot of the screen where the thumb is.
- With the sticky *Add to cart* bar on screen (phones, product page) the footer
  keeps 96px beneath it so the bar never covers the copyright line.

### Touch

- `@media (pointer: coarse)` gives every small control a 44px hit area through an
  invisible `::before` — the control does not move or resize.
- `@media (hover: none)` shows the gallery's *Zoom* chip permanently, since there
  is no hover to reveal it.
- Hover-only effects (the card's second frame, the revealed material line) are
  gated behind `@media (hover: hover)` so touch always sees the content.

## Components

| Component | Class | Notes |
| --- | --- | --- |
| Buttons | `.btn` · `.btn--solid` · `.btn--quiet` · `.btn--sm` · `.btn--block` | solid for the one action; quiet for the rest; `--sm` beside a field or in a bar |
| Links | `.tlink` (sliding underline) · `.ulink` (inline) · `.linkbtn` (quiet action) | |
| Back | `.back` | an arrow, no label, beside the eyebrow; steps back through history |
| Tabs | `.cats__tabs` | sharp rectangles; the chosen one is filled |
| Pills | `.pill` | a chosen filter, with its own remove |
| Fields | `.field` | label above, hairline below; no box |
| Disclosure | `.disc` | the name, a plus at the end, opens in place |
| Product card | `.pcard` | image-dominant, borderless; the material line is revealed on hover |
| Row | `.cline` · `.wline` | one shape for the cart and the wishlist |
| Panel | `.sum` · `.acct__side` | a hairline box on the page ground |
| Spec list | `.spec` | label above value |
| Save | `.save` | a heart; glass over photographs, smoked glass over white |
| Gallery | `.gal` | one 1:1 frame, five 4:5 close-ups; click to magnify in place |

## Motion

Slow, soft, controlled; opt-in from the markup (`data-reveal`). Durations are
tokens on one easing (`--ease`): `--t-hover` .3s, `--t-panel` .5s, `--t-reveal`
.75s, `--t-image` .9s. Everything stops under `prefers-reduced-motion`.

## Adding to it

- Reach for a token first. If none fits, ask whether the thing is a new *role*
  (then add a token here, once) or a one-off (then it probably should not exist).
- A new page: `section.sec.sec--page` → `.wrap` → `.phead` (eyebrow, `h1.disp.d2`,
  optional `.lead`) → content. Its columns are `--cols-main : --cols-aside`.
- Check it at 360, 768, 1024, 1366 and 1920 wide, and at 844 × 390 (a phone on
  its side).
