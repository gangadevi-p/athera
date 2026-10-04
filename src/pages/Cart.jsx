import { Link } from 'react-router-dom'
import Img from '../components/Img'
import { byId, cover } from '../data/catalogue'
import { money } from '../lib/format'
import { useShop } from '../lib/shop'

function Line({ item, at }) {
  const { setQty, remove } = useShop()
  const p = byId(item.pid)
  return (
    <li className="cline">
      <Link to={`/p/${p.id}`}>
        <Img id={cover(p)} alt={p.name} ratio="3 / 4" w={400} />
      </Link>
      <div className="cline__t">
        <h2 className="pname"><Link to={`/p/${p.id}`}>{p.name}</Link></h2>
        <p className="fine">{p.finishes[item.fi].label}</p>
        <button className="linkbtn" type="button" onClick={() => remove(at)}>Remove</button>
      </div>
      <div className="qty">
        <button type="button" aria-label={`Fewer ${p.name}`} onClick={() => setQty(at, item.q - 1)}>−</button>
        <span aria-live="polite">{item.q}</span>
        <button type="button" aria-label={`More ${p.name}`} onClick={() => setQty(at, item.q + 1)}>+</button>
      </div>
      <span className="cline__amt">{money(p.price * item.q)}</span>
    </li>
  )
}

export default function Cart() {
  const { cart, subtotal } = useShop()

  if (!cart.length) {
    return (
      <section className="sec sec--page">
        <div className="wrap empty">
          <span className="eyebrow">Your cart</span>
          <h1 className="disp d2">Nothing here yet</h1>
          <p className="lead">Choose a piece and its finish, and it will wait for you here.</p>
          <Link className="btn btn--solid" to="/shop">Explore the collection</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="sec sec--page">
      <div className="wrap">
        <div className="phead">
          <span className="eyebrow">Your cart</span>
          <h1 className="disp d2">Cart</h1>
        </div>

        <div className="cart">
          <ul className="clines">
            {cart.map((item, at) => <Line key={`${item.pid}-${item.fi}`} item={item} at={at} />)}
          </ul>

          <aside className="sum">
            <h2 className="eyebrow">Summary</h2>
            <div className="sum__row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="sum__row sum__total"><span>Total</span><b>{money(subtotal)}</b></div>
            <p className="fine">Delivery is chosen at checkout. Every piece is delivered assembled.</p>
            <Link className="btn btn--solid btn--block" to="/checkout">Checkout</Link>
            <Link className="linkbtn" to="/shop">Continue exploring</Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
