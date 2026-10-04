import { useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { ROOMS, byId, cover } from '../data/catalogue'
import { cx, money } from '../lib/format'
import { useShop } from '../lib/shop'

function Pick({ pick }) {
  const p = byId(pick.id)
  const { add } = useShop()
  return (
    <article className="pick">
      <Link to={`/p/${p.id}`}>
        <Img id={cover(p)} alt={p.name} ratio="3 / 4" w={800} />
      </Link>
      <div className="pick__t">
        <h3 className="pname"><Link to={`/p/${p.id}`}>{p.name}</Link></h3>
        <span className="price">{money(p.price)}</span>
        <p className="fine">{pick.why}</p>
      </div>
      <button
        className="btn btn--quiet btn--block"
        type="button"
        onClick={() => add(p.id, 0)}
      >
        Add to cart
      </button>
    </article>
  )
}

export default function Assistant() {
  const [id, setId] = useState(null)
  const room = ROOMS.find(r => r.id === id) || null
  const { addMany } = useShop()

  const addAll = () => addMany(room.picks.map(x => ({ pid: x.id, fi: 0 })))

  return (
    <>
      <section className="sec sec--tight">
        <div className="wrap">
          <div className="phead">
            <span className="eyebrow">Room assistant</span>
            <h1 className="disp d1">Design your<br />space smarter</h1>
            <p className="lead">
              Start from a room like yours. We read its light, its proportion and its palette,
              then suggest the few pieces that belong in it — and say why.
            </p>
          </div>

          <div className="rooms" role="radiogroup" aria-label="Choose a room">
            {ROOMS.map(r => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={id === r.id}
                className={cx('room', id === r.id && 'on')}
                onClick={() => setId(r.id)}
              >
                <Img id={r.image} alt={r.name} ratio="4 / 3" w={800} />
                <div className="room__t">
                  <h2 className="pname">{r.name}</h2>
                  <p className="fine">{r.summary}</p>
                </div>
              </button>
            ))}
          </div>

          {!room && (
            <p className="fine rooms__hint">
              Choose a room to see the reading. Nothing is uploaded and nothing is sent — these
              three rooms are prepared, so the result is the same every time you show it.
            </p>
          )}
        </div>
      </section>

      {room && (
        <>
          <section className="sec sec--tight sec--bone">
            <div className="wrap read">
              <Img id={room.image} alt={room.name} ratio="4 / 5" w={1100} />
              <div className="read__t">
                <span className="eyebrow">What we see</span>
                <h2 className="disp d2">{room.name}</h2>
                <dl className="read__list">
                  {room.reading.map(r => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.note}</dd>
                    </div>
                  ))}
                </dl>
                <p className="read__note">{room.note}</p>
              </div>
            </div>
          </section>

          <section className="sec sec--tight">
            <div className="wrap">
              <div className="head">
                <div className="head__t">
                  <span className="eyebrow">The shortlist</span>
                  <h2 className="disp d2">Pieces for this room</h2>
                </div>
                <button className="tlink" type="button" onClick={addAll}>Add all three</button>
              </div>
              <div className="grid-3 picks">
                {room.picks.map(x => <Pick key={x.id} pick={x} />)}
              </div>
              <div className="plp__foot">
                <p className="fine">Prices shown are for the finishes we would specify in this room.</p>
                <Link className="tlink" to="/shop">Browse everything instead</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
