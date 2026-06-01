import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/products', label: 'Products' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-warm-sand/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-walnut tracking-wide" onClick={() => setOpen(false)}>
            Athera
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `font-body text-sm tracking-wide transition-colors duration-200 ${isActive ? 'text-terracotta' : 'text-walnut hover:text-terracotta'}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-walnut p-1"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-walnut/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-cream z-50 md:hidden flex flex-col pt-20 px-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <ul className="flex flex-col gap-6">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `font-heading text-2xl ${isActive ? 'text-terracotta' : 'text-walnut'}`
                      }
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
