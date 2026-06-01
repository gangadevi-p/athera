import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'
import collections from '../data/collections.json'

const featured = products.filter(p => p.featured)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p variants={fadeUp} className="section-tag text-cream/60 mb-4">
            New Arrivals — Summer 2026
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl text-cream leading-tight max-w-2xl mb-6">
            Furniture that earns its place.
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-lg text-cream/80 max-w-md mb-8 leading-relaxed">
            Every piece is designed to slow you down — crafted from honest materials, built to age well.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pt-24">
        <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
          <div>
            <p className="section-tag mb-2">Handpicked</p>
            <h2 className="font-heading text-4xl text-walnut">Featured Pieces</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 font-body text-sm text-stone hover:text-terracotta transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Brand Philosophy */}
      <section className="max-w-7xl mx-auto px-6 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} className="order-2 md:order-1">
            <p className="section-tag mb-4">Our Philosophy</p>
            <h2 className="font-heading text-4xl md:text-5xl text-walnut leading-tight mb-6">
              Made to be lived with, not looked at.
            </h2>
            <p className="font-body text-base text-stone leading-relaxed mb-4">
              We believe the best furniture disappears into your life. It holds your morning coffee, bears the weight of your longest days, and quietly becomes part of how you experience home.
            </p>
            <p className="font-body text-base text-stone leading-relaxed mb-8">
              That's why we work only with materials that develop character over time — woods that deepen, linens that soften, metals that patina. Nothing that pretends to be something it isn't.
            </p>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </motion.div>
          <motion.div variants={fadeUp} className="order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=80"
                alt="Craftsman at work"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collections Teaser */}
      <section className="max-w-7xl mx-auto px-6 pt-28">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="section-tag mb-2">Curated Worlds</p>
          <h2 className="font-heading text-4xl text-walnut">Collections</h2>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map(col => (
            <motion.div key={col.id} variants={fadeUp}>
              <Link to={`/collections`} className="group block relative overflow-hidden aspect-[16/9]">
                <img
                  src={col.coverImage}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-walnut/40 group-hover:bg-walnut/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-body text-xs text-cream/60 tracking-widest uppercase mb-1">{col.tagline}</p>
                  <h3 className="font-display text-3xl text-cream">{col.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
