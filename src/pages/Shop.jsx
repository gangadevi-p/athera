import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import {
  CATEGORIES,
  MATERIAL_FILTERS,
  PRODUCTS,
  catById,
  collectionById,
  hasMaterial,
} from '../data/catalogue'
import { cx } from '../lib/format'

/* The five facets the brief asks for, plus a sort. Each is a URL parameter, so
   a filtered listing can be linked to and the back button behaves. */

const SORTS = [
  { id: 'featured', name: 'Featured' },
  { id: 'low', name: 'Price, low to high' },
  { id: 'high', name: 'Price, high to low' },
  { id: 'new', name: 'Newest first' },
]

/** Multi-value params travel as a comma list. */
const list = v => (v ? v.split(',').filter(Boolean) : [])

/** The same short names the category page uses for its row of tabs. */
const TABS = ['Sofas', 'Tables', 'Dining', 'Beds', 'Storage', 'Lighting', 'Objects']

function Group({ title, children }) {
  return (
    <div className="rail__g">
      <h3 className="eyebrow">{title}</h3>
      {children}
    </div>
  )
}

function Check({ on, onChange, children }) {
  return (
    <label className={cx('check', on && 'on')}>
      <input type="checkbox" checked={on} onChange={onChange} />
      <span className="check__b" aria-hidden="true" />
      <span className="check__t">{children}</span>
    </label>
  )
}

export default function Shop() {
  const [params, setParams] = useSearchParams()

  const cat = CATEGORIES.some(x => x.id === params.get('c')) ? params.get('c') : null
  const mats = list(params.get('m'))
  const col = collectionById(params.get('col')) || null
  const sort = SORTS.some(s => s.id === params.get('sort')) ? params.get('sort') : 'featured'

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value.length === 0) next.delete(key)
    else next.set(key, Array.isArray(value) ? value.join(',') : value)
    setParams(next, { replace: true })
  }

  const toggle = (key, current, id) =>
    set(key, current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  /* clears the facets but keeps the chosen category (its own row) */
  const clear = () => setParams(cat ? { c: cat } : {}, { replace: true })

  /* ---------- the filtered, sorted list ---------- */

  let list_ = PRODUCTS.filter(p => {
    if (col && !col.pieces.includes(p.id)) return false
    if (cat && p.cat !== cat) return false
    if (mats.length && !mats.some(m => hasMaterial(p, m))) return false
    return true
  })

  if (sort === 'low') list_ = [...list_].sort((a, b) => a.price - b.price)
  if (sort === 'high') list_ = [...list_].sort((a, b) => b.price - a.price)
  if (sort === 'new') list_ = [...list_].sort((a, b) => b.year - a.year)

  const active = [
    ...(col ? [{ key: 'col', id: col.id, name: col.name, clear: () => set('col', null) }] : []),
    ...mats.map(m => ({ key: 'm', id: m, name: MATERIAL_FILTERS.find(x => x.id === m).name, clear: () => toggle('m', mats, m) })),
  ]

  const c = cat ? catById(cat) : null

  return (
    <section className="sec sec--shop">
      <div className="wrap">
        <div className="phead phead--wide">
          <span className="eyebrow">{col ? 'Collection' : 'Furniture'}</span>
          <h1 className="disp d1">{col ? col.name : c ? c.name : 'The collection'}</h1>
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
            <button type="button" aria-pressed={!cat} onClick={() => set('c', null)}>All</button>
            {CATEGORIES.map((x, i) => (
              <button key={x.id} type="button" aria-pressed={cat === x.id} onClick={() => set('c', x.id)}>{TABS[i]}</button>
            ))}
          </div>
          <label className="sortf">
            <span className="eyebrow">Sort</span>
            <select value={sort} onChange={e => set('sort', e.target.value === 'featured' ? null : e.target.value)}>
              {SORTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
        </div>

        <div className="plp__in">
          {/* ---------- filter rail ---------- */}
          <aside className="rail" aria-label="Filters">
            <Group title="Material">
              {MATERIAL_FILTERS.map(m => (
                <Check key={m.id} on={mats.includes(m.id)} onChange={() => toggle('m', mats, m.id)}>
                  {m.name}
                </Check>
              ))}
            </Group>
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
                <button className="linkbtn" type="button" onClick={clear}>Clear all</button>
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
