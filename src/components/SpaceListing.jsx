import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import { Check, FACETS, FilterMenu, SORTS, list } from '../pages/Shop'

/**
 * A room's short list with the shop's own filters: Material, Colour and Size (folded, opening in place, one at a
 * time) and a Sort, all as URL parameters — m, clr, s, sort — so a filtered room can be linked to. Options no piece
 * in this room could satisfy are dimmed rather than left to lead to an empty page.
 */
export default function SpaceListing({ products, eyebrow, title }) {
  const [params, setParams] = useSearchParams()
  const [openKey, setOpenKey] = useState(null)
  const root = useRef(null)
  const pin = useRef(null)

  /* the filters pin just under the pinned heading, whatever height it has at this screen width */
  useEffect(() => {
    const el = pin.current
    if (!el) return
    const measure = () => root.current?.style.setProperty('--pin-h', `${el.offsetHeight}px`)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const sel = Object.fromEntries(FACETS.map(f => [f.key, list(params.get(f.key)).filter(id => f.options.some(o => o.id === id))]))
  const sort = SORTS.some(s => s.id === params.get('sort')) ? params.get('sort') : null

  /* a click anywhere but the filters (or the sort) folds the open one; Escape does too */
  useEffect(() => {
    if (!openKey) return
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
  const clear = () => setParams({}, { replace: true })

  /* within a facet the ticks are alternatives; across facets they all have to hold */
  const passes = (p, skip) =>
    FACETS.every(f => f.key === skip || !sel[f.key].length || sel[f.key].some(id => f.test(p, id)))
  const offered = (f, id) => sel[f.key].includes(id) || products.some(p => passes(p, f.key) && f.test(p, id))

  let shown = products.filter(p => passes(p))
  if (sort === 'low') shown = [...shown].sort((a, b) => a.price - b.price)
  if (sort === 'high') shown = [...shown].sort((a, b) => b.price - a.price)
  if (sort === 'new') shown = [...shown].sort((a, b) => b.year - a.year)

  const ticked = FACETS.flatMap(f => sel[f.key].map(id => ({
    key: f.key,
    id,
    name: `${f.title}: ${f.options.find(o => o.id === id).name}`,
    clear: () => toggle(f.key, sel[f.key], id),
  })))

  return (
    <div className="spacelist" ref={root}>
      {/* the section's heading, with the sort where the "All furniture" link used to be; it stays pinned while the pieces scroll */}
      <div className="head head--pin" ref={pin}>
        <div className="head__t">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="disp d2">{title}</h2>
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
        <aside className="rail rail--menus" aria-label="Filters">
          {FACETS.map(f => (
            <FilterMenu
              key={f.key}
              title={f.title}
              count={sel[f.key].length}
              swatch={f.swatch}
              open={openKey === f.key}
              onToggle={() => setOpenKey(k => (k === f.key ? null : f.key))}
            >
              {f.options.map(o => (
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
              ))}
            </FilterMenu>
          ))}
        </aside>

        <div className="plp__main">
          {ticked.length > 0 && (
            <div className="plp__active">
              {ticked.map(a => (
                <button className="pill" type="button" key={`${a.key}-${a.id}`} onClick={a.clear}>
                  {a.name}<span aria-hidden="true">×</span>
                  <span className="sr">, remove filter</span>
                </button>
              ))}
              <button className="linkbtn" type="button" onClick={clear}>Clear all</button>
            </div>
          )}

          {shown.length === 0 ? (
            <div className="empty">
              <h2 className="disp d3">Nothing matches that combination</h2>
              <p className="lead">Try removing a filter — each room is deliberately small.</p>
              <button className="btn btn--quiet" type="button" onClick={clear}>Clear all filters</button>
            </div>
          ) : (
            <div className="grid-3 plp">
              {shown.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 3} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
