/**
 * The whole catalogue: categories, pieces, spaces, materials, craft close-ups,
 * editorial stories and the three prepared rooms the Room Assistant reads.
 *
 * The seven categories, the five gallery views, the filter facets and the
 * editorial/craft sets all come from the core-flows brief (`coreflows.jpg`).
 *
 * Imagery is served from the Unsplash CDN. `img()` builds a sized URL; every
 * photo goes through <Img/>, which reserves its ratio and falls back to a tonal
 * block, so a missing asset never collapses a layout.
 */

export const img = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

/** A crop at a named ratio — used for the hero, which ships two crops. */
export const imgAt = (id, w, ar, fp) => {
  const [rw, rh] = ar.split(':').map(Number)
  // fp = [x, y] in 0–1: the point the crop stays centred on, so a tall phone crop keeps the subject
  const focal = fp ? `&crop=focalpoint&fp-x=${fp[0]}&fp-y=${fp[1]}${fp[2] ? `&fp-z=${fp[2]}` : ''}` : ''
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(
    (w * rh) / rw
  )}&q=85${focal}`
}

/* ---------- categories (the seven groups in the brief) ---------- */

export const CATEGORIES = [
  {
    id: 'sofas',
    name: 'Sofas and lounge chairs',
    short: 'Sofas & lounge chairs',
    items: 'Sofas, lounge chairs, stools',
    tagline: 'Built around the way a room is actually used, not the way it photographs.',
    image: 'photo-1578500494198-246f612d3b3d',
  },
  {
    id: 'tables',
    name: 'Coffee and side tables',
    short: 'Coffee & side tables',
    items: 'Coffee tables, side tables',
    tagline: 'Low surfaces in solid timber and honest stone, sized for the room around them.',
    image: 'photo-1620812067822-899be8a6a9a7',
  },
  {
    id: 'dining',
    name: 'Dining tables and chairs',
    short: 'Dining tables & chairs',
    items: 'Dining tables, dining chairs, desks',
    tagline: 'Tables sized for the meal that runs long, and chairs you can stay in.',
    image: 'photo-1749476101600-90b2eb7efa89',
  },
  {
    id: 'beds',
    name: 'Beds and bedside tables',
    short: 'Beds & bedside tables',
    items: 'Beds, headboards, bedside tables',
    tagline: 'The least demanding pieces in the house, so the room can recede.',
    image: 'photo-1688383454669-9f5cc5991778',
  },
  {
    id: 'storage',
    name: 'Shelves and storage cabinets',
    short: 'Shelves & storage',
    items: 'Shelving, sideboards, cabinets',
    tagline: 'Pieces that hold the everyday without announcing it.',
    image: 'photo-1650475496371-d7544a32563d',
  },
  {
    id: 'lighting',
    name: 'Floor and table lamps',
    short: 'Floor & table lamps',
    items: 'Floor lamps, table lamps',
    tagline: 'Paper, linen and blown glass — light softened before it reaches the room.',
    image: 'photo-1769255119650-f658d3dbc397',
  },
  {
    id: 'objects',
    name: 'Rugs, cushions and ceramic objects',
    short: 'Rugs, cushions & objects',
    items: 'Rugs, cushions, ceramics',
    tagline: 'The last layer: the things that make a room read as lived in.',
    image: 'photo-1719513709219-1d6e405ea017',
  },
]

/* ---------- gallery views (the five shots every piece is photographed in) --- */

export const VIEWS = ['Front', 'Side', 'Three-quarter', 'Back', 'Detail']

/* ---------- filter facets ---------- */

/** Colour families, so "colour" filters across finishes rather than per swatch. */
export const COLOURS = [
  { id: 'chalk', name: 'Chalk', hex: '#E7E1D5' },
  { id: 'sand', name: 'Sand', hex: '#D8C7A9' },
  { id: 'oak', name: 'Oak', hex: '#C8A97E' },
  { id: 'stone', name: 'Stone', hex: '#D8CDBB' },
  { id: 'sage', name: 'Sage', hex: '#7E8A73' },
  { id: 'walnut', name: 'Walnut', hex: '#6E4B32' },
  { id: 'charcoal', name: 'Charcoal', hex: '#2C2A26' },
  { id: 'brass', name: 'Brass', hex: '#A98548' },
]

export const SIZES = [
  { id: 'small', name: 'Small', note: 'Under 90 cm wide' },
  { id: 'medium', name: 'Medium', note: '90–160 cm wide' },
  { id: 'large', name: 'Large', note: 'Over 160 cm wide' },
]

/** Material families, so "material" filters across the way pieces list theirs. */
export const MATERIAL_FILTERS = [
  { id: 'oak', name: 'Oak and ash', match: ['oak', 'ash', 'beech', 'birch'] },
  { id: 'walnut', name: 'Walnut', match: ['walnut'] },
  { id: 'linen', name: 'Linen and cotton', match: ['linen', 'cotton', 'bouclé', 'paper cord'] },
  { id: 'wool', name: 'Wool and felt', match: ['wool', 'felt', 'feather'] },
  { id: 'stone', name: 'Travertine and stone', match: ['travertine', 'limestone', 'stone'] },
  { id: 'metal', name: 'Brass and steel', match: ['brass', 'steel', 'metal'] },
  { id: 'paper', name: 'Paper and glass', match: ['washi', 'glass', 'paper'] },
  { id: 'ceramic', name: 'Stoneware', match: ['stoneware', 'ceramic'] },
]

export const PRICE_BANDS = [
  { id: 'a', name: 'Under $500', min: 0, max: 499 },
  { id: 'b', name: '$500 – $1,500', min: 500, max: 1500 },
  { id: 'c', name: '$1,500 – $3,000', min: 1501, max: 3000 },
  { id: 'd', name: 'Over $3,000', min: 3001, max: Infinity },
]

/* ---------- pieces ---------- */

export const PRODUCTS = [
  {
    id: 'linen-lounge-sofa',
    name: 'Linen Lounge Sofa',
    cat: 'sofas',
    spaces: ['living-room'],
    price: 3750,
    size: 'large',
    designer: 'Ines Okafor',
    year: 2025,
    arrival: true,
    featured: true,
    bestseller: true,
    excerpt: 'Three seats, one continuous line, no visible hardware.',
    description:
      'A sofa built to be lived on rather than looked at. Feather-wrapped cushions are removable and re-coverable; the frame is FSC-certified beech with webbing that can be re-tensioned at home. Every seam runs parallel to the floor, which is why the piece reads as one line from across a room.',
    materials: ['Belgian linen', 'FSC beech frame', 'Feather-wrapped foam'],
    care:
      'Vacuum the linen monthly on a low setting and rotate the seat cushions each season so they wear evenly. Covers are removable and can be cold-washed; do not tumble dry. Blot spills, never rub. Keep out of direct afternoon sun, which fades undyed cloth faster than use does.',
    dim: { w: 232, d: 92, h: 68, seat: 40 },
    finishes: [
      { label: 'Chalk', hex: '#E3DED3', colour: 'chalk' },
      { label: 'Clay', hex: '#A98166', colour: 'sand' },
      { label: 'Moss', hex: '#5E6650', colour: 'sage' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.7],
    images: [
      { id: 'photo-1672345158827-7f4aa9467b49', view: 'Front' },
      { id: 'photo-1528458909336-e7a0adfed0a5', view: 'Detail' },
      { id: 'photo-1758448755778-90ebf4d0f1e7', view: 'Three-quarter' },
      { id: 'photo-1745301558339-44eb3217d5da', view: 'Side' },
    ],
  },
  {
    id: 'walnut-reading-chair',
    name: 'Walnut Reading Chair',
    cat: 'sofas',
    spaces: ['living-room', 'bedroom'],
    price: 1490,
    size: 'small',
    designer: 'Marcus Lindqvist',
    year: 2025,
    arrival: true,
    featured: true,
    excerpt: 'A curved shell pressed from eleven layers of walnut veneer.',
    description:
      'A compact reading chair with a shell pressed from eleven layers of walnut veneer. The curve does the structural work, so the frame beneath it can stay slight. Best placed where it can be seen from behind.',
    materials: ['Moulded walnut', 'Wool felt seat'],
    care:
      'Dust with a dry cloth along the grain. Re-oil the shell once a year with a clear hardwax oil — a walnut veneer left dry will lighten unevenly. The felt seat pad lifts out and can be spot-cleaned with cold water.',
    dim: { w: 68, d: 72, h: 76, seat: 42 },
    finishes: [
      { label: 'Walnut', hex: '#6E4B32', colour: 'walnut' },
      { label: 'Pale ash', hex: '#DCCFB8', colour: 'oak' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.65, 0.67],
    images: [
      { id: 'photo-1786564026112-25e9ecdcf363', view: 'Three-quarter' },
      { id: 'photo-1758486561455-ebd0d3ba7423', view: 'Front' },
      { id: 'photo-1672797494267-affab75c2bc0', view: 'Side' },
      { id: 'photo-1564512533667-015a90133f04', view: 'Detail' },
    ],
  },
  {
    id: 'boucle-lounge-chair',
    name: 'Bouclé Lounge Chair',
    cat: 'sofas',
    spaces: ['living-room', 'bedroom'],
    price: 1290,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2025,
    featured: true,
    bestseller: true,
    excerpt: 'A low, wide seat in oiled ash and undyed bouclé.',
    description:
      'This chair began as a question: what does a seat look like when it is designed for the second hour rather than the first? The answer was a lower seat, a deeper pitch and a back that carries weight across the shoulder rather than the spine. The frame is steam-bent ash, oiled rather than lacquered, so it darkens slowly with use.',
    materials: ['Steam-bent ash', 'Undyed bouclé', 'Brass fixings'],
    care:
      'Bouclé holds its loop best when it is brushed rather than vacuumed — use a soft upholstery brush in one direction. Pull, never cut, a snagged loop back through from behind. Re-oil the ash frame every eighteen months.',
    dim: { w: 78, d: 84, h: 72, seat: 38 },
    finishes: [
      { label: 'Undyed', hex: '#E7E1D5', colour: 'chalk' },
      { label: 'Oat', hex: '#CFC4AE', colour: 'sand' },
      { label: 'Slate', hex: '#6E7176', colour: 'charcoal' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.52],
    images: [
      { id: 'photo-1684165610413-2401399e0e59', view: 'Front' },
      { id: 'photo-1789655468281-c4a264d1410c', view: 'Detail' },
      { id: 'photo-1758448755952-42b404bc6f39', view: 'Three-quarter' },
      { id: 'photo-1768946131536-39b5f3ec329d', view: 'Side' },
    ],
  },
  {
    id: 'mango-wood-stool',
    name: 'Mango Wood Stool',
    cat: 'sofas',
    spaces: ['bedroom'],
    price: 340,
    size: 'small',
    designer: 'Atelier Ghosh',
    year: 2025,
    excerpt: 'Turned from a single section of salvaged mango.',
    description:
      'Turned green from salvaged mango wood and allowed to move as it dries — so no two are identical, and small checks in the end grain are part of the piece rather than a fault in it.',
    materials: ['Salvaged mango wood', 'Beeswax finish'],
    care:
      'Wipe with a barely damp cloth and dry at once. Refresh the beeswax twice a year. Standing water will raise the grain, so do not use it as a drinks table without a coaster.',
    dim: { w: 34, d: 34, h: 45 },
    finishes: [{ label: 'Waxed natural', hex: '#B99A76', colour: 'oak' }],
    lead: 'In stock',
    stock: 'In stock',
    focus: [0.52, 0.62],
    images: [
      { id: 'photo-1781388466821-609b24f7e12c', view: 'Front' },
      { id: 'photo-1786325492229-b6d7103ffa67', view: 'Three-quarter' },
      { id: 'photo-1786840228948-9b955498e991', view: 'Side' },
      { id: 'photo-1522092663698-61ab4b1aa6a7', view: 'Detail' },
    ],
  },
  {
    id: 'oak-frame-coffee-table',
    name: 'Oak Frame Coffee Table',
    cat: 'tables',
    spaces: ['living-room'],
    price: 1740,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2025,
    arrival: true,
    featured: true,
    bestseller: true,
    excerpt: 'A low honed plane inside a recessed oak frame.',
    description:
      'Deliberately low and deliberately large — a coffee table that works as a surface for everything rather than a pedestal for one object. The oak frame is recessed 18cm on all sides, so the top appears to float clear of it.',
    materials: ['Solid oak frame', 'Honed limestone'],
    care:
      'Seal the limestone once a year; unsealed stone will take a ring from a wine glass within minutes. Wipe with pH-neutral soap only — anything acidic will etch the honed surface. Re-oil the oak frame annually.',
    dim: { w: 130, d: 72, h: 32 },
    finishes: [
      { label: 'Natural oak', hex: '#C8A97E', colour: 'oak' },
      { label: 'Smoked oak', hex: '#7A6350', colour: 'walnut' },
    ],
    lead: '7–9 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.58],
    images: [
      { id: 'photo-1777513538143-8525eb3943f6', view: 'Front' },
      { id: 'photo-1583418007992-a8e33a92e7ad', view: 'Detail' },
      { id: 'photo-1784653548992-624a30f590cd', view: 'Three-quarter' },
      { id: 'photo-1787539386477-5324beb6eec7', view: 'Side' },
    ],
  },
  {
    id: 'stone-lamp-table',
    name: 'Stone Lamp Table',
    cat: 'tables',
    spaces: ['living-room', 'bedroom'],
    price: 580,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2025,
    bestseller: true,
    arrival: true,
    excerpt: 'A single block of travertine, cut once.',
    description:
      'Cut from one block of unfilled travertine and honed rather than polished, so the surface holds light instead of reflecting it. Each piece varies; the veining you receive is photographed before it ships.',
    materials: ['Unfilled travertine'],
    care:
      'Travertine is porous and unfilled by design. Seal on arrival and again each year. Blot spills immediately — oil and wine will mark it permanently if left. Do not use vinegar, citrus or any acidic cleaner.',
    dim: { w: 42, d: 42, h: 48 },
    finishes: [{ label: 'Honed travertine', hex: '#D8CDBB', colour: 'stone' }],
    lead: '4–5 weeks',
    stock: 'Made to order',
    focus: [0.72, 0.76],
    images: [
      { id: 'photo-1769736436858-65a86b395ef7', view: 'Front' },
      { id: 'photo-1765766638341-0beb9eb9926c', view: 'Three-quarter' },
      { id: 'photo-1762856490803-8e200418973a', view: 'Side' },
    ],
  },
  {
    id: 'oak-dining-table',
    name: 'Oak Dining Table',
    cat: 'dining',
    spaces: ['living-room'],
    price: 2590,
    size: 'large',
    designer: 'Ines Okafor',
    year: 2024,
    featured: true,
    bestseller: true,
    excerpt: 'Two metres of solid oak on a pared trestle base.',
    description:
      'A table sized for the meal that runs long. The top is quarter-sawn oak finished with hardwax oil, so scratches can be spot-repaired instead of refinished. The trestle sits inboard by 32cm, which is the difference between six comfortable seats and eight uncomfortable ones.',
    materials: ['Quarter-sawn oak', 'Hardwax oil finish'],
    care:
      'Hardwax oil is repairable, which is the point: sand a scratch back with 240 grit and re-oil that patch only. Re-oil the whole top once a year. Use a trivet — heat marks are the one thing the finish cannot absorb.',
    dim: { w: 200, d: 95, h: 74 },
    finishes: [
      { label: 'Natural oak', hex: '#C8A97E', colour: 'oak' },
      { label: 'Smoked oak', hex: '#7A6350', colour: 'walnut' },
    ],
    lead: '8–10 weeks',
    stock: 'Made to order',
    focus: [0.55, 0.8],
    images: [
      { id: 'photo-1572297259518-0974576b6738', view: 'Front' },
      { id: 'photo-1643999440226-7290747ef45f', view: 'Three-quarter' },
      { id: 'photo-1645301300961-e2bc264b51fd', view: 'Side' },
      { id: 'photo-1497218770144-3fea6dbc33fe', view: 'Detail' },
    ],
  },
  {
    id: 'oak-dining-chair',
    name: 'Oak Dining Chair',
    cat: 'dining',
    spaces: ['workspace'],
    price: 430,
    size: 'small',
    designer: 'Ines Okafor',
    year: 2024,
    bestseller: true,
    excerpt: 'Stackable, paper-cord seat, ten-year frame guarantee.',
    description:
      'A dining chair proportioned for long sittings and small rooms. The paper-cord seat is woven by hand over three hours and can be re-woven rather than replaced. Stacks four high.',
    materials: ['Solid oak', 'Danish paper cord'],
    care:
      'Paper cord must stay dry — blot, never soak. Vacuum the weave with a brush head. The cord tightens for the first year and then settles; if it slackens after a decade, we will re-weave the seat rather than replace the chair.',
    dim: { w: 48, d: 52, h: 78, seat: 45 },
    finishes: [
      { label: 'Natural oak', hex: '#C8A97E', colour: 'oak' },
      { label: 'Ebonised', hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '5–6 weeks',
    stock: 'In stock',
    focus: [0.55, 0.74],
    images: [
      { id: 'photo-1540760029765-138c8f6d2eac', view: 'Front' },
      { id: 'photo-1690489965043-ec15758cce71', view: 'Three-quarter' },
      { id: 'photo-1785535573599-816365bdd4e4', view: 'Side' },
      { id: 'photo-1560258632-fb994fd2bd44', view: 'Detail' },
    ],
  },
  {
    id: 'ash-writing-desk',
    name: 'Ash Writing Desk',
    cat: 'dining',
    spaces: ['workspace'],
    price: 1580,
    size: 'medium',
    designer: 'Ines Okafor',
    year: 2025,
    featured: true,
    excerpt: 'A compact desk with a cable channel cut into the apron.',
    description:
      'Designed for rooms that are not offices. The apron carries a routed cable channel and a felt-lined drawer sized for a laptop, so the surface can be cleared completely at the end of a working day.',
    materials: ['Solid ash', 'Wool felt lining', 'Brass pull'],
    care:
      'Re-oil the top annually and the brass pull never — it is unlacquered and meant to patinate. Lift the felt drawer liner out to vacuum it. Run cables through the apron channel rather than over the back edge, which is where desks wear first.',
    dim: { w: 120, d: 58, h: 74 },
    finishes: [
      { label: 'Pale ash', hex: '#DCCFB8', colour: 'oak' },
      { label: 'Smoked oak', hex: '#7A6350', colour: 'walnut' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1776482128008-2c9cf5bc0edc', view: 'Front' },
      { id: 'photo-1783437581569-d10b23df85f5', view: 'Three-quarter' },
      { id: 'photo-1778731525509-e1bb04020935', view: 'Side' },
      { id: 'photo-1595418312726-3beb2f4fe67e', view: 'Detail' },
    ],
  },
  {
    id: 'linen-platform-bed',
    name: 'Linen Platform Bed',
    cat: 'beds',
    spaces: ['bedroom'],
    price: 2980,
    size: 'large',
    designer: 'Ines Okafor',
    year: 2025,
    arrival: true,
    featured: true,
    bestseller: true,
    excerpt: 'A low upholstered platform with a headboard you can lean on.',
    description:
      'The platform sits 26cm from the floor, low enough that the room keeps its ceiling. The headboard is upholstered in washed linen over a webbed frame, so it gives slightly when you lean back against it rather than meeting you like a wall. Slats are solid beech and replaceable one at a time.',
    materials: ['Washed Belgian linen', 'Solid beech slats', 'FSC birch platform'],
    care:
      'The headboard cover unzips and can be cold-washed; reshape it damp and let it dry on the frame. Vacuum the platform sides monthly. Turn the mattress rather than the slats — the slats are handed and marked accordingly.',
    dim: { w: 168, d: 212, h: 92 },
    finishes: [
      { label: 'Chalk', hex: '#E3DED3', colour: 'chalk' },
      { label: 'Oat', hex: '#CFC4AE', colour: 'sand' },
      { label: 'Smoke', hex: '#6E7176', colour: 'charcoal' },
    ],
    lead: '9–11 weeks',
    stock: 'Made to order',
    focus: [0.45, 0.68],
    images: [
      { id: 'photo-1631048501851-4aa85ffc3be8', view: 'Front' },
      { id: 'photo-1552558636-f6a8f071c2b3', view: 'Three-quarter' },
      { id: 'photo-1612152605347-f93296cb657d', view: 'Side' },
      { id: 'photo-1631048501786-4e97f20eac71', view: 'Back' },
      { id: 'photo-1606796913825-2b02883605e9', view: 'Detail' },
    ],
  },
  {
    id: 'oak-bedside-table',
    name: 'Oak Bedside Table',
    cat: 'beds',
    spaces: ['bedroom'],
    price: 620,
    size: 'small',
    designer: 'Marcus Lindqvist',
    year: 2025,
    arrival: true,
    excerpt: 'One open shelf, one drawer, nothing on the outside.',
    description:
      'Sized to sit level with the Linen Platform Bed. The drawer front is cut from the same board as the carcase so the grain runs straight through it, and the pull is a rebate rather than a handle — there is nothing to catch a sheet on at night.',
    materials: ['Solid oak', 'Hardwax oil finish'],
    care:
      'Dust along the grain and re-oil once a year. Wax the drawer runners with a candle stub if they tighten in a humid summer; they are wood on wood by design.',
    dim: { w: 46, d: 38, h: 54 },
    finishes: [
      { label: 'Natural oak', hex: '#C8A97E', colour: 'oak' },
      { label: 'Smoked oak', hex: '#7A6350', colour: 'walnut' },
    ],
    lead: '5–6 weeks',
    stock: 'In stock',
    focus: [0.72, 0.72],
    images: [
      { id: 'photo-1611486212557-88be5ff6f941', view: 'Three-quarter' },
      { id: 'photo-1766431066492-9bec8410a57b', view: 'Front' },
      { id: 'photo-1532372320572-cda25653a26d', view: 'Side' },
      { id: 'photo-1564512533667-015a90133f04', view: 'Detail' },
    ],
  },
  {
    id: 'ash-shelving-system',
    name: 'Ash Shelving System',
    cat: 'storage',
    spaces: ['workspace', 'living-room'],
    price: 1890,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2023,
    excerpt: 'Modular ash uprights; shelves that move without tools.',
    description:
      'Six shelf heights, three depths, no fasteners. The system relies on a machined notch rather than a bracket, which keeps the sightline clean and makes reconfiguring it a two-minute job. Add bays as the room changes.',
    materials: ['Solid ash', 'Powder-coated steel'],
    care:
      'Lift shelves clear of the notch rather than sliding them, which is what rounds a notch over time. Re-oil the uprights annually. Wall-fix the top rail in any room with a floor that flexes.',
    dim: { w: 180, d: 34, h: 196 },
    finishes: [
      { label: 'Pale ash', hex: '#DCCFB8', colour: 'oak' },
      { label: 'Ebonised', hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.4, 0.4],
    images: [
      { id: 'photo-1787539386387-77e2f679f2da', view: 'Front' },
      { id: 'photo-1594272807878-93df1f68c357', view: 'Three-quarter' },
      { id: 'photo-1780257563050-0ee78acfeee8', view: 'Side' },
    ],
  },
  {
    id: 'fluted-oak-sideboard',
    name: 'Fluted Oak Sideboard',
    cat: 'storage',
    spaces: ['living-room'],
    price: 2250,
    size: 'large',
    designer: 'Marcus Lindqvist',
    year: 2025,
    featured: true,
    excerpt: 'Fluted doors, push latch, no handles.',
    description:
      'The fluting is not decoration — it is the handle. Each door is milled with a run of shallow half-rounds that give the hand purchase anywhere along the face, so the piece reads as one uninterrupted plane when closed.',
    materials: ['Fluted oak', 'Soft-close hardware', 'Linoleum interior'],
    care:
      'Dust the flutes with a soft brush rather than a cloth, which leaves lint in the grooves. The linoleum interior takes a damp cloth. Adjust the soft-close hinges after the first year; they settle once.',
    dim: { w: 168, d: 45, h: 72 },
    finishes: [
      { label: 'Natural oak', hex: '#C8A97E', colour: 'oak' },
      { label: 'Bone lacquer', hex: '#E8E3D8', colour: 'chalk' },
    ],
    lead: '8–10 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.72],
    images: [
      { id: 'photo-1769690399048-acdcfa33cdc8', view: 'Front' },
      { id: 'photo-1707980716909-61b696e2b84d', view: 'Three-quarter' },
      { id: 'photo-1668957065541-d1af07128bd1', view: 'Side' },
      { id: 'photo-1732885479418-6e50e6f00397', view: 'Detail' },
    ],
  },
  {
    id: 'washi-floor-lamp',
    name: 'Washi Floor Lamp',
    cat: 'lighting',
    spaces: ['living-room', 'bedroom'],
    price: 460,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2025,
    featured: true,
    bestseller: true,
    excerpt: 'Hand-folded washi over a blackened steel spine.',
    description:
      'Light is diffused twice — once through the washi shade, once off the floor. The result sits closer to candlelight than to a lamp. The shade is replaceable and ships flat; the spine is blackened steel, weighted low so it stays put on a rug.',
    materials: ['Washi paper', 'Blackened steel', 'Linen cord'],
    care:
      'Dust the shade with a dry brush only — washi marks with any moisture. Replacement shades ship flat and fit without tools. Use a bulb of 8W or less; the paper is close to the source.',
    dim: { w: 42, d: 42, h: 158 },
    finishes: [{ label: 'Natural washi', hex: '#EFE8D9', colour: 'chalk' }],
    lead: '3–4 weeks',
    stock: 'In stock',
    focus: [0.15, 0.4],
    images: [
      { id: 'photo-1778731525385-c52ad855677c', view: 'Front' },
      { id: 'photo-1778731525372-0ec34ead8d08', view: 'Three-quarter' },
      { id: 'photo-1765181539706-361512106019', view: 'Detail' },
    ],
  },
  {
    id: 'brass-table-lamp',
    name: 'Brass Table Lamp',
    cat: 'lighting',
    spaces: ['bedroom', 'workspace'],
    price: 380,
    size: 'small',
    designer: 'Marcus Lindqvist',
    year: 2025,
    excerpt: 'Blown opal glass on a turned brass base.',
    description:
      'Opal glass, hand-blown, seated on a turned brass base heavy enough to stay honest on a soft surface. The dimmer is inline and metal — no plastic wheel.',
    materials: ['Opal blown glass', 'Solid brass'],
    care:
      'The brass is unlacquered and will darken; that is the finish, not a fault. Leave it, or bring it back with a brass cloth. Wash the opal shade in warm water once a year — dust is what dulls opal glass, not age.',
    dim: { w: 26, d: 26, h: 44 },
    finishes: [
      { label: 'Raw brass', hex: '#A98548', colour: 'brass' },
      { label: 'Patinated', hex: '#6B5B3E', colour: 'walnut' },
    ],
    lead: '3–4 weeks',
    stock: 'In stock',
    focus: [0.68, 0.3],
    images: [
      { id: 'photo-1759264244741-7175af0b7e75', view: 'Front' },
      { id: 'photo-1789472785227-38c0043ddccb', view: 'Three-quarter' },
      { id: 'photo-1540759772348-12e90305e8f4', view: 'Side' },
      { id: 'photo-1595418312726-3beb2f4fe67e', view: 'Detail' },
    ],
  },
  {
    id: 'wool-flatweave-rug',
    name: 'Wool Flatweave Rug',
    cat: 'objects',
    spaces: ['living-room', 'bedroom'],
    price: 890,
    size: 'large',
    designer: 'Atelier Ghosh',
    year: 2025,
    arrival: true,
    featured: true,
    excerpt: 'Undyed wool, flatwoven, with a hand-knotted edge.',
    description:
      'Woven from the fleece of three flocks whose wool is left undyed, which is where the drift of tone across the rug comes from. Flatwoven rather than tufted, so it sits low enough to take a door and can be turned over and used from either side.',
    materials: ['Undyed wool', 'Cotton warp'],
    care:
      'Turn it end to end twice a year so the traffic evens out. Vacuum without a beater bar. Shedding for the first months is normal for undyed wool. Blot spills from the edge inwards; a professional wash every few years is enough.',
    dim: { w: 240, d: 170, h: 1 },
    finishes: [
      { label: 'Undyed', hex: '#D9CDB8', colour: 'sand' },
      { label: 'Stone', hex: '#B9B2A5', colour: 'stone' },
    ],
    lead: '4–6 weeks',
    stock: 'In stock',
    focus: [0.5, 0.5],
    images: [
      { id: 'photo-1616980540826-5542d5aad277', view: 'Front' },
      { id: 'photo-1572427734891-5592aae758b2', view: 'Three-quarter' },
      { id: 'photo-1745589720030-c32f81367a57', view: 'Side' },
      { id: 'photo-1606203230902-89be7eb9fbe6', view: 'Detail' },
    ],
  },
  {
    id: 'linen-cushion-set',
    name: 'Linen Cushion Set',
    cat: 'objects',
    spaces: ['living-room', 'bedroom'],
    price: 180,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2025,
    excerpt: 'Three washed-linen covers, feather inners included.',
    description:
      'Three covers in one weight of washed linen, cut in three sizes so they stack rather than compete. Closures are a plain linen tie — no zip to find with the back of your head. Feather inners are included and are overfilled by ten per cent, because linen relaxes.',
    materials: ['Washed Belgian linen', 'Feather inners'],
    care:
      'Cold wash, line dry, iron damp if you want them crisp — or do not, which is how they are photographed. Plump rather than fold. The linen softens for about twenty washes and then stops changing.',
    dim: { w: 50, d: 50, h: 14 },
    finishes: [
      { label: 'Chalk', hex: '#E7E1D5', colour: 'chalk' },
      { label: 'Clay', hex: '#A98166', colour: 'sand' },
      { label: 'Sage', hex: '#7E8A73', colour: 'sage' },
    ],
    lead: 'In stock',
    stock: 'In stock',
    focus: [0.5, 0.42],
    images: [
      { id: 'photo-1611489704164-6f73c62bd810', view: 'Front' },
      { id: 'photo-1611490135455-3a02bb9eb653', view: 'Three-quarter' },
      { id: 'photo-1761330439252-325f2091e88d', view: 'Side' },
      { id: 'photo-1528458909336-e7a0adfed0a5', view: 'Detail' },
    ],
  },
  {
    id: 'ceramic-vessel-set',
    name: 'Ceramic Vessel Set',
    cat: 'objects',
    spaces: ['living-room', 'workspace'],
    price: 240,
    size: 'small',
    designer: 'Atelier Ghosh',
    year: 2025,
    arrival: true,
    excerpt: 'Three thrown vessels in an unglazed matt stoneware.',
    description:
      'Thrown in three heights so they group without matching, and left unglazed on the outside so the clay keeps its own colour. The interiors are glazed and watertight. Each one carries the thrower’s rings, which is the only decoration on them.',
    materials: ['Matt stoneware', 'Food-safe interior glaze'],
    care:
      'The unglazed exterior will take a mark from oil, so handle them with dry hands. Wash the interiors by hand. They are watertight but not dishwasher-safe, and the largest is not meant for a hot liquid.',
    dim: { w: 18, d: 18, h: 32 },
    finishes: [
      { label: 'Bone', hex: '#E4DCCB', colour: 'chalk' },
      { label: 'Sand', hex: '#C9B195', colour: 'sand' },
    ],
    lead: 'In stock',
    stock: 'In stock',
    images: [
      { id: 'photo-1597696929736-6d13bed8e6a8', view: 'Front' },
      { id: 'photo-1719513709219-1d6e405ea017', view: 'Three-quarter' },
      { id: 'photo-1508716897701-edab2a9e860c', view: 'Side' },
      { id: 'photo-1608111115633-872fa895d40d', view: 'Detail' },
    ],
  },
  {
    id: 'cane-back-armchair',
    name: "Cane-Back Armchair",
    cat: 'sofas',
    spaces: ['living-room','bedroom'],
    price: 980,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A woven back that lets the light through.",
    description:
      "The back is woven by hand in open-weave cane, so the chair reads as a line drawing from across the room and as something warm and textured up close. The oak frame is joined without screws.",
    materials: ['Hand-woven cane','Solid oak frame'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 62, d: 70, h: 84, seat: 42 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.34, 0.5],
    images: [
      { id: 'photo-1579146510179-6d8a87d24d54', view: 'Front' },
      { id: 'photo-1591718720020-f9191c3b8d86', view: 'Three-quarter' },
    ],
  },
  {
    id: 'leather-sling-chair',
    name: "Leather Sling Chair",
    cat: 'sofas',
    spaces: ['living-room','bedroom'],
    price: 1620,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "One hide, stretched between two steel arcs.",
    description:
      "A single vegetable-tanned hide is stitched into a sling and stretched across a blackened steel frame. The leather softens and darkens with use, taking on the shape of whoever sits in it most.",
    materials: ['Vegetable-tanned leather','Blackened steel'],
    care:
      "Wipe with a soft, dry cloth and condition the leather once a year with a neutral balm. Keep away from radiators and direct sun, which dry the hide.",
    dim: { w: 72, d: 78, h: 74, seat: 40 },
    finishes: [
      { label: "Tan", hex: '#A8743F', colour: 'oak' },
      { label: "Charcoal", hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.62],
    images: [
      { id: 'photo-1579656381229-15bdb188da49', view: 'Front' },
      { id: 'photo-1572297794908-f2ee5a2930d6', view: 'Three-quarter' },
    ],
  },
  {
    id: 'modular-corner-sofa',
    name: "Modular Corner Sofa",
    cat: 'sofas',
    spaces: ['living-room'],
    price: 4680,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Five modules that reconfigure as the room does.",
    description:
      "Five modules join with concealed brackets, so the sofa can run as a corner, a straight three-seater or two separate pieces. The wool bouclé is woven in a single warm oatmeal that hides everyday wear.",
    materials: ['Wool bouclé','FSC beech frame','Feather-wrapped foam'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 290, d: 190, h: 72, seat: 40 },
    finishes: [
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
      { label: "Stone", hex: '#D8CDBB', colour: 'stone' },
    ],
    lead: '12–14 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1759722665610-e13e59aa117b', view: 'Front' },
      { id: 'photo-1759722665614-265fdf133b37', view: 'Three-quarter' },
    ],
  },
  {
    id: 'curved-shell-armchair',
    name: "Curved Shell Armchair",
    cat: 'sofas',
    spaces: ['living-room','bedroom'],
    price: 1380,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A shell that holds you rather than the other way round.",
    description:
      "A deep, gently curved shell sits on a slim oak base. The wool twill is stretched by hand over a moulded foam core, so the curves stay clean without visible seams on the front.",
    materials: ['Wool twill','Solid oak base'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 74, d: 76, h: 78, seat: 40 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.42, 0.55],
    images: [
      { id: 'photo-1634148737510-727f137375e0', view: 'Front' },
      { id: 'photo-1634148739177-775032f3feb1', view: 'Three-quarter' },
    ],
  },
  {
    id: 'boucle-loveseat',
    name: "Bouclé Loveseat",
    cat: 'sofas',
    spaces: ['living-room'],
    price: 2290,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Two seats, softly rounded, no hard edge in sight.",
    description:
      "A loveseat for rooms that cannot take a full sofa. The bouclé is left undyed so it keeps the natural variation of the wool, and the softly rounded arms mean there is nothing sharp at knee height.",
    materials: ['Undyed bouclé','Solid ash frame'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 158, d: 88, h: 70, seat: 40 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '10 weeks',
    stock: 'Made to order',
    focus: [0.78, 0.75],
    images: [
      { id: 'photo-1694721025063-08eff99ba558', view: 'Front' },
    ],
  },
  {
    id: 'linen-daybed',
    name: "Linen Daybed",
    cat: 'sofas',
    spaces: ['living-room','bedroom'],
    price: 2450,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A long low seat that works as a sofa, a bench or a guest bed.",
    description:
      "A daybed built low and long, with a sprung ash frame and a natural latex mattress under washed linen. It sits along a wall as a sofa by day and takes a guest at night.",
    materials: ['Washed linen','Solid ash frame','Natural latex'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 200, d: 88, h: 42 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1633515091011-d1aa4c127590', view: 'Front' },
      { id: 'photo-1659962607331-b9ebdcd35d80', view: 'Three-quarter' },
    ],
  },
  {
    id: 'walnut-side-table',
    name: "Walnut Side Table",
    cat: 'tables',
    spaces: ['living-room','bedroom'],
    price: 520,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Turned from a single plank of walnut.",
    description:
      "A compact side table with a top cut from one plank, so the grain runs uninterrupted from edge to edge. It is oiled rather than lacquered and darkens gently with handling.",
    materials: ['Solid walnut','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 46, d: 46, h: 52 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
    ],
    lead: '4–6 weeks',
    stock: 'Made to order',
    focus: [0.27, 0.62],
    images: [
      { id: 'photo-1590938272761-c11f74452660', view: 'Front' },
    ],
  },
  {
    id: 'oak-nesting-tables',
    name: "Oak Nesting Tables",
    cat: 'tables',
    spaces: ['living-room'],
    price: 760,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Two tables that fit into one footprint.",
    description:
      "Two solid oak tables sized to slide one inside the other. Use them together beside a sofa, or pull the small one out where a drink needs a place to sit.",
    materials: ['Solid oak','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 56, d: 40, h: 50 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.5],
    images: [
      { id: 'photo-1611486212355-d276af4581c0', view: 'Front' },
      { id: 'photo-1683965274732-664bc41cf49d', view: 'Three-quarter' },
    ],
  },
  {
    id: 'travertine-round-coffee-table',
    name: "Travertine Round Coffee Table",
    cat: 'tables',
    spaces: ['living-room'],
    price: 1980,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A low disc of unfilled stone.",
    description:
      "A round coffee table cut from a single block of unfilled travertine. The natural pits and veins are left open, so no two tops are alike and each one reads as stone rather than as a finish.",
    materials: ['Unfilled travertine'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 90, d: 90, h: 32 },
    finishes: [
      { label: "Stone", hex: '#D8CDBB', colour: 'stone' },
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '8–10 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.62],
    images: [
      { id: 'photo-1714926340157-dd3a67e7b2c4', view: 'Front' },
    ],
  },
  {
    id: 'oak-and-steel-coffee-table',
    name: "Oak & Steel Coffee Table",
    cat: 'tables',
    spaces: ['living-room'],
    price: 1150,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A warm oak top on a fine steel frame.",
    description:
      "A rectangular oak top rests on a slim blackened steel frame. The contrast keeps the table light on its feet, while the oak top brings warmth to a room of soft furnishings.",
    materials: ['Solid oak','Blackened steel'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 110, d: 60, h: 40 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1629908787565-db80d8234b43', view: 'Front' },
    ],
  },
  {
    id: 'brass-nesting-side-tables',
    name: "Brass Nesting Side Tables",
    cat: 'tables',
    spaces: ['living-room','bedroom'],
    price: 890,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Two round tables in brushed brass and white marble.",
    description:
      "Two side tables with honed marble tops on slender solid brass rings. They nest for the day and separate when you need a surface at either end of the sofa.",
    materials: ['Solid brass','Honed marble'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 50, d: 50, h: 45 },
    finishes: [
      { label: "Brass", hex: '#A98548', colour: 'brass' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.45, 0.55],
    images: [
      { id: 'photo-1643558544531-bff73bbffc28', view: 'Front' },
    ],
  },
  {
    id: 'ash-tripod-side-table',
    name: "Ash Tripod Side Table",
    cat: 'tables',
    spaces: ['living-room','bedroom'],
    price: 460,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Three slim legs and a black top.",
    description:
      "A light side table on three tapered ash legs with a dark top that shows off a lamp or a single book. It is easy to carry from room to room.",
    materials: ['Solid ash','Blackened steel'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 46, d: 46, h: 50 },
    finishes: [
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '4–6 weeks',
    stock: 'Made to order',
    images: [
      { id: 'photo-1585167095899-a33318ea90b0', view: 'Front' },
    ],
  },
  {
    id: 'limestone-coffee-table',
    name: "Limestone Coffee Table",
    cat: 'tables',
    spaces: ['living-room'],
    price: 2350,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A heavy, quiet table with a soft edge.",
    description:
      "Cut from a single block of honed limestone, this coffee table is heavy enough to feel like part of the room. The edge is rounded by hand and the surface is sealed but never polished.",
    materials: ['Honed limestone'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 100, d: 70, h: 34 },
    finishes: [
      { label: "Stone", hex: '#D8CDBB', colour: 'stone' },
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '10 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.62],
    images: [
      { id: 'photo-1620812067822-899be8a6a9a7', view: 'Front' },
    ],
  },
  {
    id: 'glass-and-steel-coffee-table',
    name: "Glass & Steel Coffee Table",
    cat: 'tables',
    spaces: ['living-room'],
    price: 1320,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A round glass top that almost disappears.",
    description:
      "A round tempered-glass top on a sculptural blackened steel base. The glass keeps the floor visible, which helps a small living room feel larger.",
    materials: ['Tempered glass','Blackened steel'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 90, d: 90, h: 38 },
    finishes: [
      { label: "Charcoal", hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.72],
    images: [
      { id: 'photo-1718049719548-f5cea9f78592', view: 'Front' },
    ],
  },
  {
    id: 'round-walnut-dining-table',
    name: "Round Walnut Dining Table",
    cat: 'dining',
    spaces: ['living-room'],
    price: 3180,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Seats six around a single unbroken circle.",
    description:
      "A round dining table for six in solid walnut, with a top built from wide boards and matched by grain. Everyone sits at the same distance, which changes how a dinner feels.",
    materials: ['Solid walnut','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 140, d: 140, h: 75 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.72],
    images: [
      { id: 'photo-1749476101600-90b2eb7efa89', view: 'Front' },
    ],
  },
  {
    id: 'fluted-pedestal-dining-table',
    name: "Fluted Pedestal Dining Table",
    cat: 'dining',
    spaces: ['living-room'],
    price: 3420,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A pedestal carved into a column of shallow flutes.",
    description:
      "A round table on a hand-fluted pedestal, so there are no legs to work around. The fluting is cut from solid walnut and catches the light differently through the day.",
    materials: ['Solid walnut','Hand-fluted base'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 130, d: 130, h: 75 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '12 weeks',
    stock: 'Made to order',
    images: [
      { id: 'photo-1732575966442-b2d665c080d2', view: 'Front' },
    ],
  },
  {
    id: 'ash-trestle-dining-table',
    name: "Ash Trestle Dining Table",
    cat: 'dining',
    spaces: ['living-room'],
    price: 2740,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A long, plain table on two trestle legs.",
    description:
      "A long dining table built on two trestle legs and a single-piece top. The proportions are deliberately plain, so it works as a dining table, a work table or a place for a big project.",
    materials: ['Solid ash','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 240, d: 95, h: 75 },
    finishes: [
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '10 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.65],
    images: [
      { id: 'photo-1605635544350-5796fb1622d1', view: 'Front' },
    ],
  },
  {
    id: 'oak-dining-bench',
    name: "Oak Dining Bench",
    cat: 'dining',
    spaces: ['living-room'],
    price: 780,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A bench that seats three and tucks fully under a table.",
    description:
      "A solid oak bench sized to slide under a dining table. It seats three, or five children, and the wide slab seat is softened at the edge so it is comfortable for a long meal.",
    materials: ['Solid oak','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 150, d: 36, h: 45 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.48, 0.7],
    images: [
      { id: 'photo-1585128903994-9788298932a6', view: 'Front' },
    ],
  },
  {
    id: 'cane-dining-chair',
    name: "Cane Dining Chair",
    cat: 'dining',
    spaces: ['living-room'],
    price: 520,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A cane back, woven by hand in an open pattern.",
    description:
      "A dining chair with a hand-woven cane back and a solid beech frame. The cane is open enough to let light through and strong enough for daily use, and it can be re-woven when it eventually wears.",
    materials: ['Hand-woven cane','Solid beech'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 46, d: 52, h: 82, seat: 46 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.65, 0.68],
    images: [
      { id: 'photo-1758486561455-ebd0d3ba7423', view: 'Front' },
      { id: 'photo-1643474664086-6e2d12ee66f8', view: 'Three-quarter' },
    ],
  },
  {
    id: 'leather-dining-chair',
    name: "Leather Dining Chair",
    cat: 'dining',
    spaces: ['living-room'],
    price: 640,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A chair that gets better the more it is used.",
    description:
      "A dining chair in vegetable-tanned leather over a solid beech frame. The leather is cut in one piece for the seat and back, and it gains character with every year.",
    materials: ['Vegetable-tanned leather','Solid beech'],
    care:
      "Wipe with a soft, dry cloth and condition the leather once a year with a neutral balm. Keep away from radiators and direct sun, which dry the hide.",
    dim: { w: 48, d: 54, h: 80, seat: 46 },
    finishes: [
      { label: "Tan", hex: '#A8743F', colour: 'oak' },
      { label: "Charcoal", hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.5],
    images: [
      { id: 'photo-1598300056393-4aac492f4344', view: 'Front' },
    ],
  },
  {
    id: 'linen-dining-chair',
    name: "Linen Dining Chair",
    cat: 'dining',
    spaces: ['living-room'],
    price: 560,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A soft, upholstered chair with slim wooden legs.",
    description:
      "A dining chair with a linen-upholstered seat and back on slender beech legs. The covers zip off for washing, which is the quiet reason it works so well at a family table.",
    materials: ['Belgian linen','Solid beech'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 48, d: 54, h: 84, seat: 46 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.5],
    images: [
      { id: 'photo-1598300042247-d088f8ab3a91', view: 'Front' },
    ],
  },
  {
    id: 'oak-slat-bed',
    name: "Oak Slat Bed",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 2650,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A low frame in oak with a slatted base.",
    description:
      "A low oak bed with a slatted base that lets the mattress breathe. There is no headboard to design around, so the bed suits the plainest room and the most crowded one.",
    materials: ['Solid oak','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 168, d: 212, h: 34 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '10 weeks',
    stock: 'Made to order',
    focus: [0.45, 0.55],
    images: [
      { id: 'photo-1688383454669-9f5cc5991778', view: 'Front' },
    ],
  },
  {
    id: 'walnut-panel-bed',
    name: "Walnut Panel Bed",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 3290,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A headboard of wide walnut panels.",
    description:
      "A bed with a tall headboard of wide walnut panels, matched grain to grain. A soft light beneath the headboard makes it feel like part of the wall rather than a piece against it.",
    materials: ['Walnut veneer','Solid walnut frame'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 172, d: 216, h: 110 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '12 weeks',
    stock: 'Made to order',
    images: [
      { id: 'photo-1779648596385-bac45f45d1ed', view: 'Front' },
    ],
  },
  {
    id: 'upholstered-bed',
    name: "Upholstered Bed",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 3140,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A tall soft headboard, upholstered in undyed bouclé.",
    description:
      "A bed with a tall, softly padded headboard covered in undyed bouclé over an FSC beech frame. It is the kind of piece that makes the rest of the bedroom quiet.",
    materials: ['Undyed bouclé','FSC beech frame'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 170, d: 214, h: 118 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '12 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1560185128-e173042f79dd', view: 'Front' },
      { id: 'photo-1741308478100-85c440e1b4bf', view: 'Three-quarter' },
    ],
  },
  {
    id: 'cane-headboard-bed',
    name: "Cane Headboard Bed",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 2890,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A rounded headboard woven from cane.",
    description:
      "A bed with a rounded headboard of hand-woven cane set into a solid oak frame. The weave filters light rather than blocking it, which makes it look lighter than it is.",
    materials: ['Hand-woven cane','Solid oak frame'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 168, d: 210, h: 112 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.55, 0.62],
    images: [
      { id: 'photo-1787336971325-41c2cb86e410', view: 'Front' },
      { id: 'photo-1676883343977-5f8ecc36856c', view: 'Three-quarter' },
    ],
  },
  {
    id: 'ash-bedside-table',
    name: "Ash Bedside Table",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 540,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "An open shelf and a slim drawer.",
    description:
      "A bedside table with an open shelf for a book and a slim drawer for the rest. The ash is left pale and finished with hardwax oil, so it sits comfortably beside almost any bed.",
    materials: ['Solid ash','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 46, d: 38, h: 52 },
    finishes: [
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '4–6 weeks',
    stock: 'Made to order',
    focus: [0.42, 0.62],
    images: [
      { id: 'photo-1532372320572-cda25653a26d', view: 'Front' },
    ],
  },
  {
    id: 'walnut-nightstand',
    name: "Walnut Nightstand",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 690,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A dark nightstand with a single brass pull.",
    description:
      "A walnut nightstand with one deep drawer and a single brass pull. The dark timber gives the bed a firm anchor, and the drawer glides on solid runners.",
    materials: ['Solid walnut','Brass pull'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 46, d: 40, h: 54 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.18, 0.62],
    images: [
      { id: 'photo-1766431014990-39bb54f64f50', view: 'Front' },
    ],
  },
  {
    id: 'beech-bedside-table',
    name: "Beech Bedside Table",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 480,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A light, simple table that goes beside any bed.",
    description:
      "A simple beech bedside table with a tapering leg and a wide top. It has no drawers to catch, no hardware to bump, and is light enough to move when you change the room.",
    materials: ['Solid beech','Natural oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 44, d: 36, h: 50 },
    finishes: [
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '4 weeks',
    stock: 'Made to order',
    focus: [0.78, 0.65],
    images: [
      { id: 'photo-1766431066492-9bec8410a57b', view: 'Front' },
    ],
  },
  {
    id: 'linen-bed-bench',
    name: "Linen Bed Bench",
    cat: 'beds',
    spaces: ['bedroom'],
    price: 860,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A padded bench for the foot of the bed.",
    description:
      "A low upholstered bench for the end of the bed, with a tufted linen top over wool wadding and an ash frame. It also works in a hallway or at the foot of a sofa.",
    materials: ['Washed linen','Solid ash','Wool wadding'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 130, d: 40, h: 44 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.78],
    images: [
      { id: 'photo-1579283111541-081efe96f922', view: 'Front' },
    ],
  },
  {
    id: 'walnut-bookcase',
    name: "Walnut Bookcase",
    cat: 'storage',
    spaces: ['living-room'],
    price: 2980,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Open shelves in solid walnut, for a wall of books.",
    description:
      "A tall open bookcase in solid walnut with adjustable shelves. Each shelf is a full 3 cm thick, so it takes the weight of a real library without bowing.",
    materials: ['Solid walnut','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 180, d: 36, h: 220 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.5],
    images: [
      { id: 'photo-1593430980369-68efc5a5eb34', view: 'Front' },
    ],
  },
  {
    id: 'cane-front-cabinet',
    name: "Cane-Front Cabinet",
    cat: 'storage',
    spaces: ['living-room'],
    price: 1860,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Doors of woven cane on slim metal legs.",
    description:
      "A cabinet with two doors of hand-woven cane, a solid oak case and slim steel legs. You see just enough of what is inside to know it is there, and no more.",
    materials: ['Hand-woven cane','Solid oak','Blackened steel'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 100, d: 40, h: 78 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '8–10 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.58],
    images: [
      { id: 'photo-1659398652648-b3b8b7c1beab', view: 'Front' },
    ],
  },
  {
    id: 'oak-cane-sideboard',
    name: "Oak Cane Sideboard",
    cat: 'storage',
    spaces: ['living-room'],
    price: 2380,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A long sideboard with four cane-fronted doors.",
    description:
      "A long, low sideboard in solid oak with four cane-fronted doors. The interior is fitted with a felt-lined drawer and adjustable shelves, so it holds a dining room in a single piece.",
    materials: ['Solid oak','Hand-woven cane'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 190, d: 44, h: 76 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '10–12 weeks',
    stock: 'Made to order',
    focus: [0.45, 0.62],
    images: [
      { id: 'photo-1696774276977-131fc18de2a0', view: 'Front' },
    ],
  },
  {
    id: 'ash-chest-of-drawers',
    name: "Ash Chest of Drawers",
    cat: 'storage',
    spaces: ['bedroom'],
    price: 1740,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Four deep drawers in pale ash.",
    description:
      "A chest of four deep drawers in pale ash, with soft-close runners and cut-away pulls in place of handles. It is quiet enough for a bedroom and strong enough for a family.",
    materials: ['Solid ash','Soft-close hardware'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 90, d: 46, h: 110 },
    finishes: [
      { label: "Pale ash", hex: '#DCCFB8', colour: 'oak' },
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '8–10 weeks',
    stock: 'Made to order',
    focus: [0.35, 0.45],
    images: [
      { id: 'photo-1771039753521-fad683e5e091', view: 'Front' },
      { id: 'photo-1771039753623-3ae33a6bfbcb', view: 'Three-quarter' },
    ],
  },
  {
    id: 'fluted-oak-media-console',
    name: "Fluted Oak Media Console",
    cat: 'storage',
    spaces: ['living-room'],
    price: 2140,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A long console with fluted doors.",
    description:
      "A long, low console in fluted oak, with doors that hide the cables and the clutter of a media wall. The fluting adds a soft rhythm without adding a handle.",
    materials: ['Fluted oak','Linoleum interior'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 200, d: 42, h: 58 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '10 weeks',
    stock: 'Made to order',
    focus: [0.74, 0.68],
    images: [
      { id: 'photo-1730131434819-084da0348b25', view: 'Front' },
    ],
  },
  {
    id: 'oak-wall-shelf',
    name: "Oak Wall Shelf",
    cat: 'storage',
    spaces: ['living-room','bedroom'],
    price: 220,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A single oak shelf, mounted without visible fixings.",
    description:
      "A single shelf in solid oak, mounted with hidden brackets so there is nothing to see but the wood. It suits a hallway, a kitchen wall or a row of small objects.",
    materials: ['Solid oak','Hidden brackets'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 90, d: 22, h: 4 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '3–4 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.6],
    images: [
      { id: 'photo-1576069353653-21a2b29e3bc7', view: 'Front' },
    ],
  },
  {
    id: 'oak-hall-bench',
    name: "Oak Hall Bench",
    cat: 'storage',
    spaces: ['living-room'],
    price: 690,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A bench for putting on shoes, with a shelf beneath.",
    description:
      "A solid oak bench with an open lower shelf, designed for the hallway. It gives you somewhere to sit while you put your shoes on and somewhere to keep them afterwards.",
    materials: ['Solid oak','Hardwax oil'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 120, d: 36, h: 46 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.32, 0.62],
    images: [
      { id: 'photo-1651307016791-220f229087b1', view: 'Front' },
    ],
  },
  {
    id: 'walnut-chest-of-drawers',
    name: "Walnut Chest of Drawers",
    cat: 'storage',
    spaces: ['bedroom'],
    price: 2460,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Dovetailed drawers in dark walnut.",
    description:
      "A chest of drawers in solid walnut, with hand-cut dovetails in every drawer. It is heavy and it is meant to be, and it is the piece people tend to keep for the rest of their lives.",
    materials: ['Solid walnut','Dovetailed drawers'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 100, d: 48, h: 108 },
    finishes: [
      { label: "Walnut", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '12 weeks',
    stock: 'Made to order',
    focus: [0.4, 0.55],
    images: [
      { id: 'photo-1692451438819-24d1ac92c3eb', view: 'Front' },
    ],
  },
  {
    id: 'ceramic-table-lamp',
    name: "Ceramic Table Lamp",
    cat: 'lighting',
    spaces: ['bedroom'],
    price: 340,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A hand-thrown stoneware base under a linen shade.",
    description:
      "A table lamp with a hand-thrown stoneware base and a pleated linen shade. The glaze is left textured, so the lamp feels handmade even when it is switched off.",
    materials: ['Textured stoneware','Linen shade'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 30, d: 30, h: 52 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '4–6 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.55],
    images: [
      { id: 'photo-1580130281320-0ef0754f2bf7', view: 'Front' },
      { id: 'photo-1667312939978-64cf31718a6e', view: 'Three-quarter' },
    ],
  },
  {
    id: 'woven-cylinder-pendant',
    name: "Woven Cylinder Pendant",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 420,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A tall cylinder of woven rattan.",
    description:
      "A tall cylindrical pendant, woven by hand from rattan. It throws a soft, dappled light across the ceiling and works well over a dining table or a hallway.",
    materials: ['Hand-woven rattan','Linen cord'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 34, d: 34, h: 60 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.3, 0.5],
    images: [
      { id: 'photo-1578678809569-1a8ead9cb802', view: 'Front' },
    ],
  },
  {
    id: 'rattan-cluster-pendant',
    name: "Rattan Cluster Pendant",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 560,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Several woven shades hung at different heights.",
    description:
      "Three woven rattan shades hung at different heights from one canopy. Together they make a small ceiling composition, so a room feels considered before a single piece of furniture is in it.",
    materials: ['Hand-woven rattan','Linen cord'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 70, d: 70, h: 90 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '6–8 weeks',
    stock: 'Made to order',
    images: [
      { id: 'photo-1773208411355-30c48123d5fc', view: 'Front' },
    ],
  },
  {
    id: 'arc-floor-lamp',
    name: "Arc Floor Lamp",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 980,
    size: 'medium',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A long arc that lets you light a sofa from behind.",
    description:
      "A floor lamp with a long steel arc and a heavy marble base. It reaches over a sofa or a dining table without a ceiling fixing, and the dimmer sits on the cord.",
    materials: ['Blackened steel','Marble base'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 180, d: 40, h: 210 },
    finishes: [
      { label: "Charcoal", hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '8 weeks',
    stock: 'Made to order',
    focus: [0.38, 0.38],
    images: [
      { id: 'photo-1606425288528-4cebbfc69de7', view: 'Front' },
    ],
  },
  {
    id: 'oak-tripod-floor-lamp',
    name: "Oak Tripod Floor Lamp",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 640,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Three oak legs and a wide linen shade.",
    description:
      "A floor lamp on three tapering oak legs with a wide drum shade of linen. It gives a warm, diffused light that is easy on the eyes in the evening.",
    materials: ['Solid oak','Linen shade'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 48, d: 48, h: 150 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.32, 0.48],
    images: [
      { id: 'photo-1561664701-5b89dafffdd5', view: 'Front' },
    ],
  },
  {
    id: 'linen-shade-floor-lamp',
    name: "Linen Shade Floor Lamp",
    cat: 'lighting',
    spaces: ['living-room','bedroom'],
    price: 520,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A slim brass stem under a pale linen shade.",
    description:
      "A floor lamp with a slim solid brass stem and a pale linen shade. It stands beside a chair or a window and adds light without adding any bulk.",
    materials: ['Linen shade','Solid brass'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 40, d: 40, h: 140 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Brass", hex: '#A98548', colour: 'brass' },
    ],
    lead: '5 weeks',
    stock: 'Made to order',
    focus: [0.4, 0.4],
    images: [
      { id: 'photo-1786114528367-822e778d0962', view: 'Front' },
    ],
  },
  {
    id: 'glass-globe-pendant',
    name: "Glass Globe Pendant",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 380,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A clear blown-glass globe with a brass canopy.",
    description:
      "A pendant made from a single blown-glass globe with a brass canopy. It is deliberately clear, so the bulb is part of the picture and the light stays clean and bright.",
    materials: ['Blown glass','Brass canopy'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 28, d: 28, h: 90 },
    finishes: [
      { label: "Brass", hex: '#A98548', colour: 'brass' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.55],
    images: [
      { id: 'photo-1589173956121-8891103b66b0', view: 'Front' },
    ],
  },
  {
    id: 'slim-column-floor-lamp',
    name: "Slim Column Floor Lamp",
    cat: 'lighting',
    spaces: ['living-room'],
    price: 720,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A tall column of frosted glass on a steel foot.",
    description:
      "A slim floor lamp with a tall column of frosted glass on a blackened steel foot. It glows rather than shines, which suits a corner where you want a softer light.",
    materials: ['Frosted glass','Blackened steel'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 20, d: 20, h: 160 },
    finishes: [
      { label: "Charcoal", hex: '#2C2A26', colour: 'charcoal' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.4, 0.35],
    images: [
      { id: 'photo-1718049720099-a035f05e539a', view: 'Front' },
    ],
  },
  {
    id: 'brass-wall-sconce',
    name: "Brass Wall Sconce",
    cat: 'lighting',
    spaces: ['living-room','bedroom'],
    price: 290,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A small sconce in brass and opal glass.",
    description:
      "A small wall sconce in solid brass with an opal glass shade. It sits beside a bed or a mirror, and the brass takes on a soft patina as it ages.",
    materials: ['Solid brass','Opal glass'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 12, d: 16, h: 24 },
    finishes: [
      { label: "Brass", hex: '#A98548', colour: 'brass' },
    ],
    lead: '4–6 weeks',
    stock: 'Made to order',
    focus: [0.5, 0.45],
    images: [
      { id: 'photo-1585056050604-f5cd7f56902d', view: 'Front' },
    ],
  },
  {
    id: 'jute-round-rug',
    name: "Jute Round Rug",
    cat: 'objects',
    spaces: ['living-room','bedroom'],
    price: 640,
    size: 'large',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A round rug braided from natural jute.",
    description:
      "A round rug braided by hand from natural jute and finished with a cotton edge. It gives a floor texture without adding colour, and it works well layered under a wool rug.",
    materials: ['Hand-braided jute','Cotton weft'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 180, d: 180, h: 1 },
    finishes: [
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.42, 0.8],
    images: [
      { id: 'photo-1759722666813-5b972f5c4625', view: 'Front' },
      { id: 'photo-1762758889413-64d717f81b0d', view: 'Three-quarter' },
    ],
  },
  {
    id: 'merino-wool-throw',
    name: "Merino Wool Throw",
    cat: 'objects',
    spaces: ['living-room','bedroom'],
    price: 260,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A soft throw in a single undyed colour.",
    description:
      "A large throw woven from undyed merino wool. It is warm without being heavy, and the plain colour goes over any sofa or bed without competing with it.",
    materials: ['Merino wool'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 130, d: 180, h: 1 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '3–4 weeks',
    stock: 'Made to order',
    images: [
      { id: 'photo-1638431110087-80c185015f94', view: 'Front' },
    ],
  },
  {
    id: 'seagrass-basket',
    name: "Seagrass Basket",
    cat: 'objects',
    spaces: ['living-room','bedroom'],
    price: 190,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A woven basket with a pair of handles.",
    description:
      "A hand-woven seagrass basket with two low handles and a cotton lining. It holds blankets, logs or laundry, and it looks equally at home by a sofa or beside a bath.",
    materials: ['Seagrass','Cotton lining'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 40, d: 40, h: 34 },
    finishes: [
      { label: "Natural cane", hex: '#C8A97E', colour: 'oak' },
    ],
    lead: '3–4 weeks',
    stock: 'Made to order',
    focus: [0.3, 0.65],
    images: [
      { id: 'photo-1578678809626-a3741782f0b8', view: 'Front' },
    ],
  },
  {
    id: 'woven-bowl-set',
    name: "Woven Bowl Set",
    cat: 'objects',
    spaces: ['living-room'],
    price: 140,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "Three nesting bowls in woven palm fibre.",
    description:
      "Three nesting bowls, coiled by hand from palm fibre. They hold fruit, keys or nothing at all, and they stack together when they are not in use.",
    materials: ['Hand-woven palm fibre'],
    care:
      "Dust with a soft brush and wipe with a barely damp cloth. Keep away from prolonged damp and direct sun, which make natural fibres brittle.",
    dim: { w: 30, d: 30, h: 12 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
    ],
    lead: '3 weeks',
    stock: 'Made to order',
    focus: [0.45, 0.55],
    images: [
      { id: 'photo-1626037235530-fe56de7d6459', view: 'Front' },
    ],
  },
  {
    id: 'stoneware-bud-vase',
    name: "Stoneware Bud Vase",
    cat: 'objects',
    spaces: ['living-room'],
    price: 120,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A small matt vase for a single stem.",
    description:
      "A small stoneware vase with a matt glaze and a narrow neck, made for a single stem or a handful of dried grasses. Each one is thrown by hand, so they vary slightly in height.",
    materials: ['Matt stoneware'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 12, d: 12, h: 22 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '3–4 weeks',
    stock: 'Made to order',
    focus: [0.65, 0.55],
    images: [
      { id: 'photo-1613424777445-f93a2a48e285', view: 'Front' },
    ],
  },
  {
    id: 'ring-vase',
    name: "Ring Vase",
    cat: 'objects',
    spaces: ['living-room'],
    price: 150,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A vase in the shape of a ring, with a small opening.",
    description:
      "A ring-shaped vase in matt stoneware with a small opening at the top. It works with a single stem, and it looks as good empty as it does full.",
    materials: ['Matt stoneware'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 22, d: 8, h: 22 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '3–4 weeks',
    stock: 'Made to order',
    focus: [0.52, 0.58],
    images: [
      { id: 'photo-1643569556871-91ec60671ed7', view: 'Front' },
    ],
  },
  {
    id: 'boucle-pouf',
    name: "Bouclé Pouf",
    cat: 'objects',
    spaces: ['living-room','bedroom'],
    price: 420,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A soft round pouf to use as a seat or a footrest.",
    description:
      "A round pouf in wool bouclé on a low beech base. It works as a footrest, an extra seat or a soft table for a tray, and it is light enough to move with one hand.",
    materials: ['Wool bouclé','Solid beech base'],
    care:
      "Dust with a dry cloth along the grain and wipe with a barely damp one. Re-oil the timber once a year with a clear hardwax oil, and wipe up spills at once.",
    dim: { w: 55, d: 55, h: 38 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Oat", hex: '#CFC4AE', colour: 'sand' },
    ],
    lead: '6 weeks',
    stock: 'Made to order',
    focus: [0.74, 0.7],
    images: [
      { id: 'photo-1694165748400-368e3af3b926', view: 'Front' },
    ],
  },
  {
    id: 'oak-round-mirror',
    name: "Oak Round Mirror",
    cat: 'objects',
    spaces: ['living-room','bedroom'],
    price: 390,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A round mirror with a slim oak frame.",
    description:
      "A round mirror in a slim solid oak frame, with bevelled glass. It hangs from a single leather strap, so it can be hung in a hallway, a bedroom or a bathroom.",
    materials: ['Solid oak','Bevelled glass'],
    care:
      "Dust with a soft cloth and clean glass with water only. Brass will darken over time; leave it to patinate or polish it lightly with a dry cloth.",
    dim: { w: 60, d: 3, h: 60 },
    finishes: [
      { label: "Natural oak", hex: '#C8A97E', colour: 'oak' },
      { label: "Smoked oak", hex: '#6E4B32', colour: 'walnut' },
    ],
    lead: '4 weeks',
    stock: 'Made to order',
    focus: [0.48, 0.3],
    images: [
      { id: 'photo-1621826805983-4bb60ece28ae', view: 'Front' },
    ],
  },
  {
    id: 'speckled-stoneware-bowls',
    name: "Speckled Stoneware Bowls",
    cat: 'objects',
    spaces: ['workspace','living-room'],
    price: 160,
    size: 'small',
    designer: 'Studio Aethera',
    year: 2026,
    excerpt: "A set of bowls in speckled stoneware.",
    description:
      "A set of small bowls in speckled stoneware with a food-safe glaze. They are made for breakfast, but they also hold small things on a shelf or a desk.",
    materials: ['Speckled stoneware','Food-safe glaze'],
    care:
      "Wipe with a damp cloth and dry at once. Use a coaster under drinks — natural stone is porous — and reseal every couple of years.",
    dim: { w: 16, d: 16, h: 7 },
    finishes: [
      { label: "Chalk", hex: '#E3DED3', colour: 'chalk' },
      { label: "Sand", hex: '#D8C7A9', colour: 'sand' },
    ],
    lead: '3 weeks',
    stock: 'Made to order',
    focus: [0.42, 0.52],
    images: [
      { id: 'photo-1523367310297-83064fc42a16', view: 'Front' },
    ],
  },
]

/* ---------- spaces ---------- */

export const SPACES = [
  {
    id: 'living-room',
    name: 'Living room',
    tagline: 'A room that holds people for longer than planned.',
    description:
      'Low seating, one generous surface and light kept below eye level. Everything here is proportioned so that a room reads as settled the moment you walk into it.',
    cover: 'photo-1680773525468-eda783c5bfe7',
    detail: 'photo-1599696848652-f0ff23bc911f',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    tagline: 'The room you return to rather than perform in.',
    description:
      'Brushed surfaces, undyed cloth and nothing that shines. A bedroom should be the least demanding room in a home, so these pieces are chosen to recede.',
    cover: 'photo-1750420556288-d0e32a6f517b',
    detail: 'photo-1642541070065-3912f347e7c6',
  },
  {
    id: 'workspace',
    name: 'Workspace',
    tagline: 'A focused environment that supports creativity and clarity.',
    description:
      'Designed for rooms that are not offices. A surface that can be cleared completely, a chair you can sit in for three hours, and storage that keeps the work out of sight when the day ends.',
    cover: 'photo-1738168266307-1d1515cbca2b',
    detail: 'photo-1764410481612-7544525b2991',
  },
]

/* ---------- the five materials the house works in ---------- */

export const MATERIALS = [
  { name: 'Natural oak and ash', note: 'Strong, warm, and built to age beautifully.' },
  { name: 'Linen and textured cotton', note: 'Washed before it is cut, so it never has to be broken in.' },
  { name: 'Travertine and muted stone', note: 'Honed rather than polished, so it holds light instead of throwing it.' },
  { name: 'Brushed metal accents', note: 'Unlacquered brass and blackened steel, left to patinate.' },
  { name: 'Cane, used sparingly', note: 'One woven plane per room is enough.' },
]

/* ---------- craftsmanship close-ups ---------- */
/* The seven shots that make quality visible, straight from the brief. */

export const CRAFT = [
  { name: 'Wood grain', note: 'Quarter-sawn, so the figure runs straight down the board.', image: 'photo-1564512533667-015a90133f04' },
  { name: 'Fabric weave', note: 'Washed linen, open enough to see the warp.', image: 'photo-1528458909336-e7a0adfed0a5' },
  { name: 'Joinery', note: 'Cut to fit, then fitted once — no bracket, no filler.', image: 'photo-1497218770144-3fea6dbc33fe' },
  { name: 'Rounded edges', note: 'Every arris eased by hand so the light turns the corner.', image: 'photo-1522092663698-61ab4b1aa6a7' },
  { name: 'Stitching', note: 'One seam per plane, run parallel to the floor.', image: 'photo-1789655468281-c4a264d1410c' },
  { name: 'Metal finishing', note: 'Unlacquered brass, brushed in one direction and left alone.', image: 'photo-1595418312726-3beb2f4fe67e' },
  { name: 'Hands crafting', note: 'Made to order in a workshop of eleven people.', image: 'photo-1659930087003-2d64e33181f7' },
]

/* ---------- editorial story images ---------- */
/* Atmosphere between the product sections, not products. */

export const EDITORIAL = [
  { id: 'sunlight', title: 'Sunlight falling on linen', note: 'Late morning, before the room is used.', image: 'photo-1601276174812-63280a55656e' },
  { id: 'reading', title: 'A quiet reading corner', note: 'One chair, one lamp, nothing else asked of it.', image: 'photo-1761330439629-d734ef9395b0' },
  { id: 'ceramics', title: 'Ceramic objects on wood', note: 'Three heights, no two alike.', image: 'photo-1719513709219-1d6e405ea017' },
  { id: 'curtains', title: 'Curtains moving near a window', note: 'The only thing in the room that changes.', image: 'photo-1612196808827-9ff25cb6137a' },
  { id: 'shadows', title: 'Shadows across furniture', note: 'Four o’clock, and the table draws itself.', image: 'photo-1738900737999-c7b0b26addc2' },
]

/* ---------- prepared rooms for the Room Assistant ---------- */

export const ROOMS = [
  {
    id: 'north-facing-living-room',
    name: 'North-facing living room',
    summary: 'Cool light, high ceiling, one long empty wall.',
    image: 'photo-1785535573593-6f3eb1cc8189',
    reading: [
      { label: 'Light', note: 'Cool and indirect until late afternoon. Warm materials will do more work here than bright ones.' },
      { label: 'Proportion', note: 'A 3.1m ceiling over a low sightline. Pieces can afford to sit low and wide.' },
      { label: 'Palette', note: 'Chalk walls, pale oak floor. Undyed cloth and honed stone will settle; high contrast will not.' },
    ],
    picks: [
      { id: 'linen-lounge-sofa', why: 'One long horizontal against the empty wall, in chalk linen so the cool light reads as soft rather than flat.' },
      { id: 'oak-frame-coffee-table', why: 'Low and wide enough to hold the centre of the room without adding a second visual line.' },
      { id: 'washi-floor-lamp', why: 'The one vertical in the scheme, and a warm light source to offset the northern daylight.' },
    ],
    note: 'Anchor the long wall with a single low line, then break it with one vertical: the floor lamp rather than a second seat.',
  },
  {
    id: 'small-city-bedroom',
    name: 'Small city bedroom',
    summary: 'Warm evening light, limited floor area, dark corner.',
    image: 'photo-1644057501622-dfa7dd26dbfb',
    reading: [
      { label: 'Light', note: 'Warm and low after 4pm, with one corner the daylight never reaches.' },
      { label: 'Proportion', note: 'Under 12m². Anything with a visible frame will read lighter than a solid volume.' },
      { label: 'Palette', note: 'Linen and walnut already present. Keep additions within one tone of what is there.' },
    ],
    picks: [
      { id: 'walnut-reading-chair', why: 'A visible frame and a raised shell, so the corner keeps its floor and the room keeps its air.' },
      { id: 'brass-table-lamp', why: 'Warm, dimmable light at table height — the dark corner lit without an overhead fitting.' },
      { id: 'oak-bedside-table', why: 'A rebated pull and a small footprint: a surface beside the bed with nothing to catch a sheet on.' },
    ],
    note: 'Light the dark corner at table height rather than overhead, and keep the floor as open as you can.',
  },
  {
    id: 'workspace-alcove',
    name: 'Workspace alcove',
    summary: 'A working corner inside a room used for other things.',
    image: 'photo-1699621106755-4fe40ce95d64',
    reading: [
      { label: 'Light', note: 'Side light from a single window. A surface placed square to it will avoid working in your own shadow.' },
      { label: 'Proportion', note: 'A 2.4m alcove. One desk, one chair and vertical storage is the whole brief.' },
      { label: 'Palette', note: 'Pale ash keeps the corner from reading as a separate, darker room.' },
    ],
    picks: [
      { id: 'ash-writing-desk', why: 'A surface that clears completely at the end of the day, with the cabling hidden in the apron.' },
      { id: 'oak-dining-chair', why: 'Comfortable for three hours and light enough to pull away when the corner is not in use.' },
      { id: 'ash-shelving-system', why: 'Storage that goes up rather than along, so the alcove ends at the wall.' },
    ],
    note: 'Choose storage that goes up rather than along, so the corner ends at the wall instead of spreading into the room.',
  },
]

/* ---------- lookups ---------- */

export const byId = id => PRODUCTS.find(p => p.id === id)
export const catById = id => CATEGORIES.find(c => c.id === id)
export const spaceById = id => SPACES.find(s => s.id === id)
export const inSpace = id => PRODUCTS.filter(p => p.spaces.includes(id))
export const inCat = id => PRODUCTS.filter(p => p.cat === id)
export const arrivals = () => PRODUCTS.filter(p => p.arrival)
export const bestsellers = () => PRODUCTS.filter(p => p.bestseller)

/** The photo a piece is represented by everywhere except its own gallery. */
export const cover = p => p.images[0].id

/**
 * How a view is re-framed from a piece's front photograph when the piece has no
 * photograph of that view. `z` is the zoom (1 = the largest box of that ratio
 * the photo holds), `dx`/`dy` move the crop away from the piece's centre, as a
 * fraction of the photo. Front is the full subject, three-quarter is the widest
 * frame, side and back sit to either flank, detail is the close-up.
 */
const REFRAME = {
  Front: { ar: '1:1', z: 1, dx: 0, dy: 0 },
  Side: { ar: '4:5', z: 1.5, dx: -0.06, dy: 0 },
  'Three-quarter': { ar: '4:5', z: 1.15, dx: 0.05, dy: 0 },
  Back: { ar: '4:5', z: 1.9, dx: 0.08, dy: -0.03 },
  Detail: { ar: '4:5', z: 3, dx: 0, dy: 0.06 },
}

const clamp = n => Math.min(1, Math.max(0, +n.toFixed(3)))

/**
 * The gallery of a piece: always the five views in the brief's order — front,
 * side, three-quarter, back, detail — so every product page reads the same.
 * Front is the piece's front photograph and Detail its close-up when it has
 * one; side, three-quarter and back are always re-framed from the front
 * photograph, because a piece's other photographs are different rooms and would
 * stop the set reading as one piece. `focus` (optional on a piece) is where the
 * piece sits in that photograph, as `[x, y]` from 0 to 1, and `detailAt` where
 * a re-framed close-up should land.
 */
export const gallery = p => {
  const lead = p.images.find(i => i.view === 'Front') || p.images[0]
  const [fx, fy] = p.focus || [0.5, 0.55]
  const [dx, dy] = p.detailAt || [fx, fy]
  return VIEWS.map(view => {
    const own = (view === 'Front' || view === 'Detail') && p.images.find(i => i.view === view)
    if (own) return { view, id: own.id, url: w => img(own.id, w) }
    const r = REFRAME[view]
    const at = view === 'Detail' ? [dx, dy] : [fx, fy]
    const fp = [clamp(at[0] + r.dx), clamp(at[1] + r.dy), r.z]
    // a re-framed crop is only as sharp as its source, so it is never asked for wider than 1400px
    return { view, id: lead.id, url: w => imgAt(lead.id, Math.min(w, 1400), r.ar, fp) }
  })
}

/** Every colour family a piece is actually offered in. */
export const coloursOf = p => [...new Set(p.finishes.map(f => f.colour))]

/** Does a piece use any material in this family? Matched on its own list. */
export const hasMaterial = (p, id) => {
  const f = MATERIAL_FILTERS.find(m => m.id === id)
  if (!f) return false
  const text = p.materials.join(' ').toLowerCase()
  return f.match.some(m => text.includes(m))
}
