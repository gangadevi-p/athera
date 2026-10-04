import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Img from '../components/Img'
import { byId, cover } from '../data/catalogue'
import { SHIP, cx, money } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * Order tracking: account or order link → enter order details → view delivery
 * status. Orders live in localStorage, so only orders placed in this browser
 * can be found — which the page says.
 */

const day = 24 * 60 * 60 * 1000

const fmt = d => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

/** The build, staged against the delivery window the order was placed with. */
function timeline(order) {
  const at = new Date(order.at).getTime()
  const [w1, w2] = SHIP[order.ship].w
  return [
    { name: 'Order placed', note: 'Received by the workshop.', on: at },
    { name: 'In production', note: 'Timber selected and cut to order.', on: at + 3 * day },
    { name: 'Finishing', note: 'Oiled, upholstered and checked.', on: at + (w1 - 1) * 7 * day },
    { name: 'Ready to ship', note: 'Packed for white-glove delivery.', on: at + w1 * 7 * day },
    { name: 'Delivered', note: 'Assembled and placed in your room.', on: at + w2 * 7 * day },
  ]
}

function Status({ order }) {
  const steps = timeline(order)
  const now = Date.now()
  const at = steps.reduce((last, s, i) => (s.on <= now ? i : last), 0)

  return (
    <div className="track__out">
      <div className="track__head">
        <div>
          <span className="eyebrow">Order {order.no}</span>
          <h2 className="disp d2">{steps[at].name}</h2>
          <p className="lead">{steps[at].note}</p>
        </div>
        <dl className="spec">
          <div><dt>Placed</dt><dd>{fmt(new Date(order.at))}</dd></div>
          <div><dt>Method</dt><dd>{SHIP[order.ship].n}</dd></div>
          <div>
            <dt>Delivering to</dt>
            <dd>{[order.address?.city, order.address?.zip].filter(Boolean).join(', ') || '—'}</dd>
          </div>
          <div><dt>Total</dt><dd>{money(order.total)}</dd></div>
        </dl>
      </div>

      <ol className="track__steps">
        {steps.map((s, i) => (
          <li key={s.name} className={cx(i <= at && 'done', i === at && 'now')}>
            <span className="track__dot" aria-hidden="true" />
            <div>
              <h3 className="pname">{s.name}</h3>
              <p className="fine">{s.note}</p>
            </div>
            <span className="track__when">{fmt(new Date(s.on))}</span>
          </li>
        ))}
      </ol>

      <div className="track__items">
        <h3 className="eyebrow">In this order</h3>
        <ul className="colines">
          {order.items.map(i => {
            const p = byId(i.pid)
            if (!p) return null
            return (
              <li key={`${i.pid}-${i.fi}`}>
                <Img id={cover(p)} alt={p.name} ratio="1 / 1" w={200} />
                <div>
                  <h4 className="pname"><Link to={`/p/${p.id}`}>{p.name}</Link></h4>
                  <p className="fine">{p.finishes[i.fi].label} · {i.q}</p>
                </div>
                <span>{money(p.price * i.q)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Track() {
  const [params] = useSearchParams()
  const { findOrder, orders, account } = useShop()
  const [no, setNo] = useState(params.get('no') || '')
  const [email, setEmail] = useState('')
  const [found, setFound] = useState(() => (params.get('no') ? findOrder(params.get('no')) : null))
  const [miss, setMiss] = useState(false)

  const submit = e => {
    e.preventDefault()
    const o = findOrder(no, email)
    setFound(o)
    setMiss(!o)
  }

  return (
    <section className="sec sec--page">
      <div className="wrap">
        <div className="phead">
          <span className="eyebrow">Order tracking</span>
          <h1 className="disp d2">Follow your order</h1>
          <p className="lead">
            Enter the order number from your confirmation. Orders are kept in this browser only,
            so this finds the ones you placed here.
          </p>
        </div>

        <div className="track">
          <form className="track__f" onSubmit={submit}>
            <div className="field">
              <label htmlFor="no">Order number</label>
              <input
                id="no" name="no" required placeholder="AE-000000"
                value={no}
                onChange={e => { setNo(e.target.value); setMiss(false) }}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email (optional)</label>
              <input
                id="email" name="email" type="email" placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setMiss(false) }}
              />
            </div>
            <button className="btn btn--solid" type="submit">View delivery status</button>
            {miss && (
              <p className="fine" role="status">
                No order with that number in this browser. Check the confirmation email — or, in
                this prototype, place an order first.
              </p>
            )}
            {orders.length > 0 && (
              <div className="track__recent">
                <h2 className="eyebrow">{account ? 'Your orders' : 'Recent orders in this browser'}</h2>
                <ul>
                  {orders.map(o => (
                    <li key={o.no}>
                      <button
                        className="linkbtn"
                        type="button"
                        onClick={() => { setNo(o.no); setFound(o); setMiss(false) }}
                      >
                        {o.no} · {money(o.total)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          {found ? (
            <Status order={found} />
          ) : (
            <div className="track__empty">
              <p className="lead">
                Nothing to show yet. Once an order is placed, this is where the build is staged —
                from the day the timber is cut to the morning it is carried in.
              </p>
              <Link className="tlink" to="/shop">Explore the collection</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
