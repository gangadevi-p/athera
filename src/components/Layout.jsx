import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import CartDrawer from './CartDrawer'
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
 * Minimal navigation. It floats over the hero with no ground of its own for as
 * long as the hero is beneath it, and settles onto paper only once the
 * hero has scrolled out from under it — no blur, no glass. On the landing page
 * and on a room's page it steps out of the way while you scroll down and comes
 * back as soon as you scroll up.
 */
function Nav({ onMenu }) {
  const { count, wish, account } = useShop()
  const { pathname } = useLocation()
  const [overHero, setOverHero] = useState(true)
  const [away, setAway] = useState(false)
  const [up, setUp] = useState(false) // the last scroll was upward

  useEffect(() => {
    let lastY = window.scrollY
    setAway(false) // a new page always arrives with its navigation showing...
    setUp(false)   // ...except a room's page, which keeps it away until the first scroll up
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) >= 6) setUp(y < lastY)
      const hero = document.querySelector('.hero, .sroom') // the landing hero, or a room's full-screen photo
      const navH = document.querySelector('.nav')?.offsetHeight || 0
      setOverHero(hero ? hero.getBoundingClientRect().bottom > navH : y < 40)
      // direction, read over a few pixels so a trackpad's small steps still count
      if (y < navH) { setAway(false); lastY = y; return }
      if (Math.abs(y - lastY) < 6) return
      setAway(y > lastY)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // the landing page and each room's page open on a full-screen photograph for the nav to float over.
  // The landing page shows it on arrival, hides it while scrolling down and brings it back on the way up;
  // a room's page does not show it on arrival at all — it comes in only on a scroll up, and goes on a scroll down
  const home = pathname === '/'
  const room = pathname.startsWith('/spaces/')
  const float = overHero && (home || room)

  return (
    <header className={cx('nav', float && 'nav--float', (room ? !up : away && home) && 'nav--away')}>
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
          <NavLink className="nav__u" to="/wishlist" aria-label={`Wishlist, ${wish.length} saved`}>
            <span className="nav__long">Wishlist</span><span className="nav__short" aria-hidden="true">&#9825;</span>
          </NavLink>
          <NavLink className="nav__u" to="/cart" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
            Cart
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
  const { account } = useShop()

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
          Wishlist
        </Link>
        <Link className="nav__u" to="/cart" onClick={onClose}>
          Cart
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
          <div>
            <ul>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/help#care">Care</Link></li>
              <li><Link to="/help#contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot__base">
          <span>© {new Date().getFullYear()} Aethera</span>
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
      <main key={pathname} data-home={pathname === '/' || pathname.startsWith('/spaces/') ? '' : undefined}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
