import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import { CATEGORIES, SPACES } from '../data/catalogue'
import { cx } from '../lib/format'
import { useReveals } from '../lib/motion'
import { useShop } from '../lib/shop'

/** Already home: glide up to the hero in place — no navigation, no page fade. */
function homeClick(pathname) {
  return e => {
    if (pathname !== '/') return
    e.preventDefault()
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
}

/**
 * Minimal navigation. It floats over the hero with no ground of its own, and
 * settles onto paper as soon as the page moves — no blur, no glass.
 */
function Nav({ onMenu }) {
  const { count, wish, account } = useShop()
  const { pathname } = useLocation()
  const [top, setTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // only the landing page has a hero for the nav to float over
  const float = top && pathname === '/'

  return (
    <header className={cx('nav', float && 'nav--float')}>
      <div className="nav__in">
        <Link
          className="mark"
          to="/"
          aria-label="Aethera, home"
          onClick={homeClick(pathname)}
        >Aethera</Link>
        <div className="nav__util">
          <NavLink className="nav__u nav__u--acct" to="/account">
            {account ? account.name?.split(' ')[0] || 'Account' : 'Sign in'}
          </NavLink>
          <NavLink className="nav__u" to="/cart">
            Cart <span className="nav__n">{count}</span>
          </NavLink>
          <button className="nav__menu nav__u" type="button" onClick={onMenu}>
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}

/** The compact navigation: a full-screen editorial overlay, not a dropdown. */
function Menu({ open, onClose }) {
  const { count, wish, account } = useShop()

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div className={cx('menu', open && 'on')} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
      <div className="menu__top">
        <span className="mark">Aethera</span>
        <button className="menu__x" type="button" onClick={onClose} aria-label="Close menu">&times;</button>
      </div>
      <div className="menu__util">
        <Link className="nav__u" to="/account" onClick={onClose}>
          {account ? account.name?.split(' ')[0] || 'Account' : 'Sign in'}
        </Link>
        <Link className="nav__u" to="/wishlist" onClick={onClose}>
          Saved <span className="nav__n">{wish.length}</span>
        </Link>
        <Link className="nav__u" to="/cart" onClick={onClose}>
          Cart <span className="nav__n">{count}</span>
        </Link>
        <Link className="nav__u" to="/track" onClick={onClose}>Track an order</Link>
      </div>
    </div>
  )
}

function Footer() {
  const { pathname } = useLocation()
  return (
    <footer className="foot">
      <div className="wrap">
        {/* the logotype, set as wide as the page: light, spaced, and a link home */}
        <div className="foot__logo">
          <Link to="/" aria-label="Aethera, back to top" onClick={homeClick(pathname)}>Aethera</Link>
        </div>
        <div className="foot__top">
          <div className="foot__shop">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All furniture</Link></li>
              {CATEGORIES.map(c => (
                <li key={c.id}><Link to={`/shop?c=${c.id}`}>{c.short}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Spaces</h4>
            <ul>
              {SPACES.map(s => <li key={s.id}><Link to={`/spaces/${s.id}`}>{s.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><Link to="/track">Track an order</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/account">Sign in</Link></li>
              <li><span className="mute">hello@aethera.studio</span></li>
            </ul>
          </div>
        </div>
        <div className="foot__base">
          <span>© {new Date().getFullYear()} Aethera</span>
          <span>Design prototype · no order is processed</span>
        </div>
      </div>
    </footer>
  )
}

/** Every navigation starts at the top of the new page — or at its #anchor, once the page has laid out. */
function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
    const go = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' })
    const ts = [60, 500, 1400].map(ms => setTimeout(go, ms))
    return () => ts.forEach(clearTimeout)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)

  useReveals()
  useEffect(() => { setMenu(false) }, [pathname])

  return (
    <>
      <ScrollTop />
      <Nav onMenu={() => setMenu(true)} />
      <Menu open={menu} onClose={() => setMenu(false)} />
      {/* the landing page's hero runs under the fixed nav; every other page clears it */}
      <main key={pathname} data-home={pathname === '/' ? '' : undefined}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
