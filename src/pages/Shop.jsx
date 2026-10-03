import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import ProductCard from '../components/ProductCard'
import {
  CATEGORIES,
  COLOURS,
  MATERIAL_FILTERS,
  PRODUCTS,
  SIZES,
  catById,
  collectionById,
  coloursOf,
  hasMaterial,
} from '../data/catalogue'
import { cx } from '../lib/format'

/* Filters and a sort. Each is a URL parameter, so a filtered listing can be linked
   to and the back button behaves: c category, col featured collection, m material,
   clr colour, s size, sort. (`col` is the collection, so colour is `clr`.)

   Material, Colour and Size are on every view of the shop — the whole collection, a
   category, a featured collection. They are folded by default: a name and a plus,
   in a column, like the product page's dimensions and delivery; the options open
   in place, and close when you click away. Every option no piece can satisfy, given
   the category, the collection and the other ticks, is dimmed rather than left to
   lead to an empty page. Sort, at the top right of the listing, is the same row but
   opens as a popup, so the page below it stays where it is (it adds no pill row either), folds
   once you have chosen, and names the chosen sort beside its own name. */

/* No "Featured" option: with nothing chosen the pieces keep the order they are curated in. */
const SORTS = [
  { id: 'low', name: 'Price, low to high', short: 'Low to high' },
  { id: 'high', name: 'Price, high to low', short: 'High to low' },
  { id: 'new', name: 'Newest first', short: 'Newest' },
]

/** Multi-value params travel as a comma list. */
const list = v => (v ? v.split(',').filter(Boolean) : [])

/** Filter groups, in the order they are listed. `test` says whether a piece belongs to an option. */
const FACETS = [
  { key: 'm', title: 'Material', options: MATERIAL_FILTERS, test: hasMaterial },
  { key: 'clr', title: 'Colour', options: COLOURS, test: (p, id) => coloursOf(p).includes(id), swatch: true },
  { key: 's', title: 'Size', options: SIZES, test: (p, id) => p.size === id },
]

/** The same short names the category page uses for its row of tabs. */
const TABS = ['Sofas', 'Tables', 'Dining', 'Beds', 'Storage', 'Lighting', 'Objects']

/** A filter that starts folded, as the product page folds its dimensions, care and delivery: its name and a
    plus; open, the options come out in place. The page decides which one is open, so only one is. */
function FilterMenu({ title, count = 0, note, swatch, open, onToggle, className, children }) {
  const tag = note || (count > 0 ? count : null)
  return (
    <details className={cx('disc fdisc', className)} open={open}>
      <summary onClick={e => { e.preventDefault(); onToggle() }}>
        <span>{title}{tag && <span className="fdisc__n">({tag})</span>}</span>
      </summary>
      <div className={cx('fdisc__o', swatch && 'fdisc__o--sw')}>{children}</div>
    </details>
  )
}

function Check({ on, off = false, swatch = false, onChange, children }) {
  return (
    <label className={cx('check', swatch && 'check--sw', on && 'on', off && 'off')}>
      <input type="checkbox" checked={on} disabled={off} onChange={onChange} />
      <span className="check__b" aria-hidden="true" />
      <span className="check__t">{children}</span>
    </label>
  )
}

/* `byCategory` is the category page (/categories?k=<id>): the same listing, with the category in `k` instead of `c`,
   shown once a category is chosen (Categories.jsx shows the overview of all seven before that). */
export default function Shop({ byCategory = false }) {
  const [params, setParams] = useSearchParams()
  const catKey = byCategory ? 'k' : 'c'

  const cat = CATEGORIES.some(x => x.id === params.get(catKey)) ? params.get(catKey) : null
  const col = collectionById(params.get('col')) || null
  /* what is ticked, ignoring any value the facet does not have */
  const sel = Object.fromEntries(FACETS.map(f => [f.key, list(params.get(f.key)).filter(id => f.options.some(o => o.id === id))]))
  const sort = SORTS.some(s => s.id === params.get('sort')) ? params.get('sort') : null

  /* which filter (or the sort) is open: one at a time, and a click anywhere else (or Escape) closes it */
  const [openKey, setOpenKey] = useState(null)
  useEffect(() => { setOpenKey(null) }, [col?.id])
  useEffect(() => {
    if (!openKey) return
    /* a click anywhere but the filters (or the sort) folds the open one. It waits for the click, not the press: an open
       filter pushes the page down, so folding on press would slide it up from under the pointer and the click would land
       on something else. A click on another filter is left to that filter, which swaps itself in. */
    const away = e => { if (!(e.target instanceof Element) || !e.target.closest('.rail--menus, .fsort')) setOpenKey(null) }
    const esc = e => {
      if (e.key !== 'Escape') return
      document.querySelector('.fdisc[open] summary')?.focus()
      setOpenKey(null)
    }
    document.addEventListener('click', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('click', away)
      document.removeEventListener('keydown', esc)
    }
  }, [openKey])

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value.length === 0) next.delete(key)
    else next.set(key, Array.isArray(value) ? value.join(',') : value)
    setParams(next, { replace: true })
  }

  const toggle = (key, current, id) =>
    set(key, current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  /* clears the facets but keeps the chosen category (its own row) and the collection */
  const clear = () => setParams({ ...(cat && { [catKey]: cat }), ...(col && { col: col.id }) }, { replace: true })

  /* a category tab; "All" on the category page goes back to its overview of the seven */
  const pickCat = id => (byCategory && !id ? setParams({}, { replace: true }) : set(catKey, id))

  /* ---------- the filtered, sorted list ---------- */

  /* within a facet the ticks are alternatives; across facets they all have to hold.
     `skip` leaves one facet out, to ask what ticking one of its options would give */
  const passes = (p, skip) =>
    (!col || col.pieces.includes(p.id)) &&
    (!cat || p.cat === cat) &&
    FACETS.every(f => f.key === skip || !sel[f.key].length || sel[f.key].some(id => f.test(p, id)))

  /* an option that no piece could satisfy is dimmed (a tick is always kept, so it can be taken off) */
  const offered = (f, id) => sel[f.key].includes(id) || PRODUCTS.some(p => passes(p, f.key) && f.test(p, id))

  let list_ = PRODUCTS.filter(p => passes(p))

  if (sort === 'low') list_ = [...list_].sort((a, b) => a.price - b.price)
  if (sort === 'high') list_ = [...list_].sort((a, b) => b.price - a.price)
  if (sort === 'new') list_ = [...list_].sort((a, b) => b.year - a.year)

  /* the ticked values, named for their group, since colour and material can share a word ("Walnut") */
  const ticked = FACETS.flatMap(f => sel[f.key].map(id => {
    const name = f.options.find(o => o.id === id).name
    return { key: f.key, id, name: `${f.title}: ${name}`, clear: () => toggle(f.key, sel[f.key], id) }
  }))
  const active = [
    ...(col ? [{ key: 'col', id: col.id, name: col.name, clear: () => set('col', null) }] : []),
    ...ticked,
  ]

  const c = cat ? catById(cat) : null

  return (
    <section className={cx('sec sec--shop', (col || byCategory) && 'sec--col')}>
      <div className="wrap">
        <div className="phead phead--wide">
          <div className="phead__row">
            <BackButton to={byCategory ? '/categories' : '/'} />
            <span className="eyebrow">{col ? 'Collection' : byCategory ? 'Shop by category' : 'Furniture'}</span>
          </div>
          <h1 className="disp d2">{col ? col.name : c ? c.name : 'The collection'}</h1>
          <p className="lead">
            {col
              ? col.note
              : c
                ? c.tagline
                : 'Made in small runs and delivered assembled.'}
          </p>
        </div>

        <div className="plp__top">
          <div className="cats__tabs" role="group" aria-label="Filter by category">
            <button type="button" aria-pressed={!cat} onClick={() => pickCat(null)}>All</button>
            {CATEGORIES.map((x, i) => (
              <button key={x.id} type="button" aria-pressed={cat === x.id} onClick={() => pickCat(x.id)}>{TABS[i]}</button>
            ))}
          </div>
          <FilterMenu
            className="fsort"
            title="Sort"
            note={sort && SORTS.find(x => x.id === sort).short}
            open={openKey === 'sort'}
            onToggle={() => setOpenKey(k => (k === 'sort' ? null : 'sort'))}
          >
            {SORTS.map(o => (
              <Check key={o.id} on={sort === o.id} onChange={() => { set('sort', sort === o.id ? null : o.id); setOpenKey(null) }}>
                {o.name}
              </Check>
            ))}
          </FilterMenu>
        </div>

        <div className="plp__in">
          {/* ---------- filters: folded rows, whatever is being shown ---------- */}
          <aside className="rail rail--menus" aria-label="Filters">
            {FACETS.map(f => {
              const options = f.options.map(o => (
                <Check
                  key={o.id}
                  on={sel[f.key].includes(o.id)}
                  off={!offered(f, o.id)}
                  swatch={f.swatch}
                  onChange={() => toggle(f.key, sel[f.key], o.id)}
                >
                  {o.hex && <span className="dot dot--sm" style={{ background: o.hex }} />}
                  {o.name}
                  {o.note && <em>{o.note}</em>}
                </Check>
              ))
              return (
                <FilterMenu
                  key={f.key}
                  title={f.title}
                  count={sel[f.key].length}
                  swatch={f.swatch}
                  open={openKey === f.key}
                  onToggle={() => setOpenKey(k => (k === f.key ? null : f.key))}
                >
                  {options}
                </FilterMenu>
              )
            })}
          </aside>

          {/* ---------- results ---------- */}
          <div className="plp__main">
            {active.length > 0 && (
              <div className="plp__active">
                {active.map(a => (
                  <button className="pill" type="button" key={`${a.key}-${a.id}`} onClick={a.clear}>
                    {a.name}<span aria-hidden="true">×</span>
                    <span className="sr">, remove filter</span>
                  </button>
                ))}
                {ticked.length > 0 && <button className="linkbtn" type="button" onClick={clear}>Clear all</button>}
              </div>
            )}

            {list_.length === 0 ? (
              <div className="empty">
                <h2 className="disp d3">Nothing matches that combination</h2>
                <p className="lead">Try removing a filter — the collection is deliberately small.</p>
                <button className="btn btn--quiet" type="button" onClick={clear}>Clear all filters</button>
              </div>
            ) : (
              <div className="grid-3 plp">
                {list_.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 3} />)}
              </div>
            )}

            <div className="plp__foot">
              <p className="fine">
                Every piece is made to order in a small workshop. Lead times are shown on each piece.
              </p>
              <Link className="tlink" to="/spaces">Not sure where to start? Shop by space</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
