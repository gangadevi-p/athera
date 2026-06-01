import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import collections from '../data/collections.json'

export default function Collections() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 pt-28 pb-20"
    >
      <div className="mb-14">
        <p className="section-tag mb-2">Curated Worlds</p>
        <h1 className="font-heading text-5xl text-walnut">Collections</h1>
      </div>

      <div className="flex flex-col gap-16">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={col.coverImage}
                  alt={col.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <p className="font-body text-xs text-stone tracking-widest uppercase mb-2">{col.tagline}</p>
              <h2 className="font-display text-5xl text-walnut mb-5">{col.name}</h2>
              <p className="font-body text-base text-stone leading-relaxed mb-8">{col.description}</p>
              <Link
                to={`/products?collection=${col.id}`}
                className="btn-outline flex items-center gap-2 w-fit"
              >
                Shop the Collection <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
