import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-walnut text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-display text-2xl text-cream mb-3">Athera</p>
          <p className="font-body text-sm leading-relaxed text-cream/60 max-w-xs">
            Thoughtfully crafted furniture and accessories for the way you actually live.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="hover:text-terracotta transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-terracotta transition-colors"><Twitter size={18} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-terracotta transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <p className="section-tag text-stone mb-4">Navigate</p>
          <ul className="flex flex-col gap-2">
            {[['/', 'Home'], ['/products', 'Products'], ['/collections', 'Collections'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="font-body text-sm hover:text-terracotta transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-tag text-stone mb-4">Stay in touch</p>
          <p className="font-body text-sm text-cream/60 mb-4">New pieces, stories, and occasional slow thoughts — straight to your inbox.</p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-cream/10 border border-cream/20 text-cream placeholder-cream/30 px-4 py-2 text-sm font-body focus:outline-none focus:border-terracotta"
            />
            <button type="submit" className="bg-terracotta text-cream px-4 py-2 text-sm font-body hover:bg-cream hover:text-walnut transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10 max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between gap-2">
        <p className="font-body text-xs text-cream/40">© 2026 Athera. All rights reserved.</p>
        <p className="font-body text-xs text-cream/40">Designed with intention. Made to last.</p>
      </div>
    </footer>
  )
}
