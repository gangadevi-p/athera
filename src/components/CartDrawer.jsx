import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Img from './Img'
import { byId, cover } from '../data/catalogue'
import { cx, money } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * Opens when a piece is added. Shows what was just added — its name, colour,
 * how many are now in the cart and what they cost — then the running subtotal
 * and the three ways on: cart, checkout, or back to browsing.
 */
export default function CartDrawer() {
  const { drawer, closeDrawer, subtotal, cart } = useShop()
  const { pathname } = useLocation()
  const open = Boolean(drawer)

  // Esc closes; a navigation closes; the page behind does not scroll.
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, closeDrawer])

  useEffect(() => { closeDrawer() }, [pathname, closeDrawer])

  const p = drawer ? byId(drawer.pid) : null
  const f = p?.finishes[drawer.fi]
  const q = drawer ? cart.find(i => i.pid === drawer.pid && i.fi === drawer.fi)?.q ?? 1 : 1

  return (
    <>
      <div className={cx('scrim', open && 'on')} onClick={closeDrawer} aria-hidden="true" />
      <aside
        className={cx('drawer', open && 'on')}
        role="dialog"
        aria-modal="true"
        aria-label="Added to cart"
        aria-hidden={!open}
      >
        {p && (
          <>
            <header className="drawer__top">
              <span className="eyebrow">
                Added to cart
              </span>
              <button className="drawer__x" type="button" onClick={closeDrawer} aria-label="Close">
                &times;
              </button>
            </header>

            <div className="drawer__item">
              <Img id={cover(p)} alt={p.name} ratio="3 / 4" w={400} />
              <div>
                <h2 className="pname">{p.name}</h2>
                <dl className="drawer__facts">
                  <div><dt>Colour</dt><dd><span className="dot dot--sm" style={{ background: f.hex }} />{f.label}</dd></div>
                  <div><dt>Quantity</dt><dd>{q}</dd></div>
                  <div><dt>{q > 1 ? 'Price each' : 'Price'}</dt><dd>{money(p.price)}</dd></div>
                  {q > 1 && <div><dt>Total</dt><dd>{money(p.price * q)}</dd></div>}
                </dl>
              </div>
            </div>
            {drawer.n > 1 && <p className="fine drawer__note">{drawer.n - 1} more {drawer.n - 1 === 1 ? 'piece' : 'pieces'} added with it. See them all in your cart.</p>}

            <div className="drawer__sum">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>

            <div className="drawer__acts">
              <Link className="btn btn--solid btn--block" to="/checkout">Checkout</Link>
              <Link className="btn btn--quiet btn--block" to="/cart">View cart</Link>
              <button className="linkbtn" type="button" onClick={closeDrawer}>Continue exploring</button>
            </div>

            <p className="fine drawer__note">Delivered assembled and placed in the room of your choice.</p>
          </>
        )}
      </aside>
    </>
  )
}
