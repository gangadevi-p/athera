import { Link, useSearchParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Img from '../components/Img'
import Shop from './Shop'
import { CATEGORIES } from '../data/catalogue'

/**
 * Shop by category. With no category chosen, the seven of them as a plain grid
 * (static: no reveals, no drift, no hover swaps). Once one is chosen the page is
 * the featured collection's page — the same listing, filters and sort — for that
 * category's pieces, so the two read as one.
 */

const TABS = ['Sofas', 'Tables', 'Dining', 'Beds', 'Storage', 'Lighting', 'Objects']

export default function Categories() {
  const [sp, setSp] = useSearchParams()
  const chosen = CATEGORIES.find(c => c.id === sp.get('k')) || null

  if (chosen) return <Shop byCategory />

  const choose = id => setSp({ k: id }, { replace: true, preventScrollReset: true })

  return (
    <section className="sec sec--shop sec--col">
      <div className="wrap">
        <div className="phead phead--wide">
          <div className="phead__row">
            <BackButton to="/" />
            <span className="eyebrow">Shop by category</span>
          </div>
          <h1 className="disp d2">Seven ways in</h1>
          <p className="lead">The whole collection, grouped the way a room is actually put together.</p>
        </div>

        <div className="plp__top">
          <div className="cats__tabs" role="group" aria-label="Filter categories">
            <button type="button" aria-pressed="true">All</button>
            {CATEGORIES.map((c, i) => (
              <button key={c.id} type="button" aria-pressed="false" onClick={() => choose(c.id)}>{TABS[i]}</button>
            ))}
          </div>
        </div>

        <ul className="cgrid">
          {CATEGORIES.map((c, i) => (
            <li key={c.id}>
              <Link to={`/categories?k=${c.id}`}>
                <span className="cgrid__img"><Img id={c.image} alt={c.name} ratio="3 / 4" w={900} priority={i < 6} /></span>
                <span className="pname">{c.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
