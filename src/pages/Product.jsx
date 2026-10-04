import { useState } from 'react'
import { Link, useParams, useViewTransitionState } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Gallery from '../components/Gallery'
import ProductCard from '../components/ProductCard'
import SaveButton from '../components/SaveButton'
import NotFound from './NotFound'
import { PRODUCTS, byId, catById } from '../data/catalogue'
import { checkPostcode, dims, money } from '../lib/format'
import { useShop } from '../lib/shop'

/** Materials as one running list: only the first item opens a capital, proper nouns keep theirs. */
const materials = list =>
  list.map((m, i) => (i === 0 || /^(FSC|Belgian|Danish)/.test(m) ? m : m[0].toLowerCase() + m.slice(1))).join(', ')

/** '10–12 weeks' → 10; 'In stock' → 0. */
const leadWeeks = lead => {
  const n = String(lead).match(/\d+/)
  return n ? Number(n[0]) : 0
}

/** Delivery and availability check — postcode in, service area and window out. */
function Availability({ p }) {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [miss, setMiss] = useState(false)

  const submit = e => {
    e.preventDefault()
    const r = checkPostcode(code, leadWeeks(p.lead))
    setResult(r)
    setMiss(!r)
  }

  return (
    <div className="avail">
      <div className="pdp__optHead">
        <span className="eyebrow">Delivery and availability</span>
        <span className="pdp__optVal">{p.stock}</span>
      </div>
      <form className="avail__f" onSubmit={submit}>
        <div className="field">
          <label className="sr" htmlFor="zipcheck">Postcode</label>
          <input
            id="zipcheck"
            name="zipcheck"
            inputMode="numeric"
            placeholder="Postcode, e.g. 10012"
            value={code}
            onChange={e => { setCode(e.target.value); setResult(null); setMiss(false) }}
          />
        </div>
        <button className="btn btn--quiet btn--sm" type="submit">Check</button>
      </form>
      {result && (
        <p className="fine" role="status">
          {result.area} service area — delivered between {result.from} and {result.to}, assembled
          and placed in the room of your choice.
        </p>
      )}
      {miss && (
        <p className="fine" role="status">Enter at least four digits to check your area.</p>
      )}
      {!result && !miss && (
        <p className="fine">Lead time {p.lead}. White-glove delivery is included.</p>
      )}
    </div>
  )
}

function Detail({ p }) {
  const opening = useViewTransitionState(`/p/${p.id}`)
  const [fi, setFi] = useState(0)
  const { add } = useShop()
  const cat = catById(p.cat)
  const finish = p.finishes[fi]
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3)

  return (
    <>
      <section className="pdp">
        <div className="wrap pdp__in">
          <div className="pdp__gallery">
            <Gallery p={p} opening={opening} />
          </div>

          <div className="pdp__side">
            <div className="pdp__panel">
              <div className="phead__row">
                <BackButton to={`/shop?c=${cat.id}`} />
                <nav className="crumb" aria-label="Breadcrumb">
                  <Link to="/shop">Furniture</Link>
                  <span>/</span>
                  <Link to={`/shop?c=${cat.id}`}>{cat.short}</Link>
                </nav>
              </div>

              <h1 className="ptitle">{p.name}</h1>
              <p className="pdp__price">{money(p.price)}</p>
              <p className="pdp__excerpt">{p.excerpt}</p>

              <div className="pdp__opt">
                <div className="pdp__optHead">
                  <span className="eyebrow">Finish</span>
                  <span className="pdp__optVal">{finish.label}</span>
                </div>
                <div className="swatches" role="radiogroup" aria-label="Finish">
                  {p.finishes.map((f, i) => (
                    <label className="sw" key={f.label} title={f.label}>
                      <input
                        className="sr"
                        type="radio"
                        name="finish"
                        checked={fi === i}
                        onChange={() => setFi(i)}
                      />
                      <span className="dot" style={{ background: f.hex }} />
                      <span className="sr">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Availability p={p} />

              <div className="pdp__acts">
                <button
                  className="btn btn--solid btn--block"
                  type="button"
                  onClick={() => add(p.id, fi)}
                >
                  Add to cart
                </button>
                <SaveButton id={p.id} name={p.name} withLabel className="pdp__save" />
              </div>
            </div>
          </div>
        </div>

        {/* below the desktop canvas the panel scrolls away, so the one action
            that matters follows the reader down the page */}
        <div className="stickybuy">
          <div className="stickybuy__t">
            <span className="pname">{p.name}</span>
            <span className="price">{money(p.price)} · {finish.label}</span>
          </div>
          <button className="btn btn--solid btn--sm" type="button" onClick={() => add(p.id, fi)}>
            Add to cart
          </button>
        </div>
      </section>

      <section className="pdetail">
        <div className="wrap pdetail__list">
          <details className="disc">
            <summary>Dimensions</summary>
            <dl className="spec">
              <div><dt>Size</dt><dd>{dims(p.dim)}{p.dim.seat ? ` · seat ${p.dim.seat} cm` : ''}</dd></div>
              <div><dt>Materials</dt><dd>{materials(p.materials)}</dd></div>
              <div><dt>Designer</dt><dd>{p.designer}, {p.year}</dd></div>
            </dl>
          </details>

          <details className="disc">
            <summary>Care instructions</summary>
            <p>{p.care}</p>
          </details>

          <details className="disc">
            <summary>Delivery and returns</summary>
            <p>
              White-glove delivery is included: the piece arrives assembled and is placed in
              the room you choose, with the packaging taken away. Thirty-day returns, and a
              ten-year guarantee on every frame.
            </p>
          </details>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec sec--tight">
          <div className="wrap">
            <div className="head">
              <div className="head__t">
                <span className="eyebrow">Related pieces</span>
                <h2 className="disp d2">More {cat.short.toLowerCase()}</h2>
              </div>
              <Link className="tlink" to={`/shop?c=${cat.id}`}>View all</Link>
            </div>
            <div className="grid-3 related">
              {related.map(x => <ProductCard key={x.id} p={x} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default function Product() {
  const { id } = useParams()
  const p = byId(id)
  // keyed by id so choosing another piece resets to its first finish
  return p ? <Detail key={id} p={p} /> : <NotFound />
}
