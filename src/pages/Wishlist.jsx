import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { byId, cover } from '../data/catalogue'
import { money } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * The wishlist: product → save → wishlist → add to cart. Saved pieces are kept
 * in this browser, with no account required.
 */
export default function Wishlist() {
  const { wish, unsave, add, addMany } = useShop()
  const pieces = wish.map(byId).filter(Boolean)

  if (!pieces.length) {
    return (
      <section className="sec sec--page">
        <div className="wrap empty">
          <span className="eyebrow">Wishlist</span>
          <h1 className="disp d2">Nothing saved yet</h1>
          <p className="lead">
            Save a piece from anywhere in the collection and it will wait here — no account
            needed.
          </p>
          <Link className="btn btn--solid" to="/shop">Explore the collection</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="sec sec--page">
      <div className="wrap">
        <div className="phead">
          <span className="eyebrow">Wishlist</span>
          <h1 className="disp d2">Saved</h1>
        </div>

        <div className="head head--bare">
          <div className="head__t">
            <p className="lead">
              Kept in this browser. Add a piece to the cart when you are ready, or take it off the
              list.
            </p>
          </div>
          <button
            className="tlink"
            type="button"
            onClick={() => addMany(pieces.map(p => ({ pid: p.id, fi: 0 })))}
          >
            Add all to cart
          </button>
        </div>

        <ul className="wlist">
          {pieces.map(p => (
            <li className="wline" key={p.id}>
              <Link to={`/p/${p.id}`}>
                <Img id={cover(p)} alt={p.name} ratio="3 / 4" w={400} />
              </Link>
              <div className="wline__t">
                <h2 className="pname"><Link to={`/p/${p.id}`}>{p.name}</Link></h2>
                <p className="fine">{p.excerpt}</p>
                <p className="fine">{p.materials[0]} · {p.lead}</p>
              </div>
              <span className="price">{money(p.price)}</span>
              <div className="wline__a">
                <button className="btn btn--quiet btn--sm" type="button" onClick={() => add(p.id, 0)}>
                  Add to cart
                </button>
                <button className="linkbtn" type="button" onClick={() => unsave(p.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
