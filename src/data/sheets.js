/**
 * The photographs cut from the contact sheets in `/img` (and `dining.png`).
 *
 * Each sheet is one PNG holding many frames. `scripts/crop-sheets.mjs` finds the
 * frame boundaries from the white gutters, trims the gutter, upscales each frame
 * and writes it to `public/photos/<sheet>-<nn>.webp` (nn is the frame's number
 * on its sheet, counted left to right, top to bottom, from 00).
 *
 * A frame is referenced everywhere as the id `local:<sheet>-<nn>`; `img()` in
 * the catalogue turns that into a URL. Pieces without a frame keep their
 * original photograph.
 */

/** The source of every sheet, relative to the project root. */
export const SHEETS = {
  sofas: 'img/sofa lounge.png',
  coffee: 'img/coffee tables.png',
  dining: 'img/dining.png',
  beds: 'img/Beds.png',
  bedside: 'img/sidetables.png',
  storage: 'img/storage and shelves.png',
  objects: 'img/seramicobjects.png',
  lamps: 'img/lamps.png',
}

/**
 * Where the subject sits in a frame, as [x, y] from 0 to 1. Frames are
 * landscape and the cards are portrait, so this is the point a card's crop stays
 * centred on. Frames not listed use the default.
 */
export const DEFAULT_AT = [0.5, 0.55]

export const AT = {
  'sofas-10': [0.5, 0.6],
  'sofas-04': [0.5, 0.6],
  'sofas-01': [0.5, 0.6],
  'sofas-09': [0.5, 0.6],
  'sofas-11': [0.55, 0.6],
  'sofas-03': [0.56, 0.6],
  'sofas-13': [0.5, 0.6],
  'sofas-05': [0.5, 0.6],
  'sofas-00': [0.5, 0.6],
  'sofas-15': [0.56, 0.6],
  'sofas-07': [0.58, 0.6],
  'sofas-14': [0.5, 0.6],
  'sofas-08': [0.5, 0.6],
  'lamps-13': [0.3, 0.5],
}

/**
 * Piece → its frames. `front` is the photograph the piece is represented by,
 * `alt` the one the card fades to on approach, `detail` a genuine close-up.
 */
export const PIECES = {
  // sofas and lounge chairs
  'linen-lounge-sofa': { front: 'sofas-10', alt: 'sofas-08' },
  'walnut-reading-chair': { front: 'sofas-04' },
  'boucle-lounge-chair': { front: 'sofas-01' },
  'mango-wood-stool': { front: 'sofas-09' },
  'cane-back-armchair': { front: 'sofas-11' },
  'leather-sling-chair': { front: 'sofas-03', alt: 'sofas-13' },
  'modular-corner-sofa': { front: 'sofas-05', alt: 'sofas-00' },
  'curved-shell-armchair': { front: 'sofas-15' },
  'boucle-loveseat': { front: 'sofas-07' },
  'linen-daybed': { front: 'sofas-14' },

  // coffee and side tables
  'oak-frame-coffee-table': { front: 'coffee-01' },
  'stone-lamp-table': { front: 'coffee-07' },
  'walnut-side-table': { front: 'coffee-08' },
  'oak-nesting-tables': { front: 'coffee-06' },
  'travertine-round-coffee-table': { front: 'coffee-00' },
  'oak-and-steel-coffee-table': { front: 'coffee-04' },
  'brass-nesting-side-tables': { front: 'coffee-09' },
  'ash-tripod-side-table': { front: 'coffee-16' },
  'limestone-coffee-table': { front: 'coffee-02', alt: 'coffee-12' },
  'glass-and-steel-coffee-table': { front: 'coffee-14' },

  // dining tables and chairs
  'oak-dining-table': { front: 'dining-03' },
  'round-walnut-dining-table': { front: 'dining-01', detail: 'dining-08' },
  'fluted-pedestal-dining-table': { front: 'dining-02' },
  'ash-trestle-dining-table': { front: 'dining-13', detail: 'dining-18' },
  'oak-dining-chair': { front: 'dining-15' },
  'cane-dining-chair': { front: 'dining-07' },
  'leather-dining-chair': { front: 'dining-05' },
  'linen-dining-chair': { front: 'dining-17' },

  // beds and bedside tables
  'linen-platform-bed': { front: 'beds-04', alt: 'beds-00' },
  'oak-slat-bed': { front: 'beds-10' },
  'walnut-panel-bed': { front: 'beds-01', alt: 'beds-06' },
  'upholstered-bed': { front: 'beds-07' },
  'cane-headboard-bed': { front: 'beds-08' },
  'linen-bed-bench': { front: 'beds-05' },
  'oak-bedside-table': { front: 'bedside-00' },
  'ash-bedside-table': { front: 'bedside-01' },
  'walnut-nightstand': { front: 'bedside-11' },
  'beech-bedside-table': { front: 'bedside-09' },

  // shelves and storage cabinets
  'ash-shelving-system': { front: 'storage-12' },
  'fluted-oak-sideboard': { front: 'storage-07' },
  'walnut-bookcase': { front: 'storage-10', alt: 'storage-01' },
  'cane-front-cabinet': { front: 'storage-15' },
  'oak-cane-sideboard': { front: 'storage-09' },
  'ash-chest-of-drawers': { front: 'storage-08' },
  'fluted-oak-media-console': { front: 'storage-14' },
  'oak-wall-shelf': { front: 'storage-00' },
  'walnut-chest-of-drawers': { front: 'storage-06' },

  // floor and table lamps (pendants and the sconce have no frame and keep their photographs)
  'washi-floor-lamp': { front: 'lamps-08' },
  'brass-table-lamp': { front: 'lamps-03', alt: 'lamps-06' },
  'ceramic-table-lamp': { front: 'lamps-05' },
  'arc-floor-lamp': { front: 'lamps-13' },
  'oak-tripod-floor-lamp': { front: 'lamps-12' },
  'linen-shade-floor-lamp': { front: 'lamps-10' },
  'slim-column-floor-lamp': { front: 'lamps-11' },

  // ceramic objects (the sheet holds ceramics only; rugs, cushions, the throw,
  // basket, pouf and mirror keep their own photographs)
  'ceramic-vessel-set': { front: 'objects-10' },
  'stoneware-bud-vase': { front: 'objects-07' },
  'ring-vase': { front: 'objects-19' },
  'speckled-stoneware-bowls': { front: 'objects-05' },
}

/** The photograph each category is represented by. */
export const CATEGORY_FRAMES = {
  sofas: 'sofas-01',
  tables: 'coffee-01',
  dining: 'dining-02',
  beds: 'beds-07',
  storage: 'storage-11',
  objects: 'objects-03',
  lighting: 'lamps-02',
}

/** Every frame the site uses. */
export const USED = [
  ...new Set([
    ...Object.values(CATEGORY_FRAMES),
    ...Object.values(PIECES).flatMap(p => [p.front, p.alt, p.detail].filter(Boolean)),
  ]),
].sort()
