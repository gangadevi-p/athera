import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/formatPrice'

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-cream aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-cream/90 text-walnut font-body text-xs font-medium px-2.5 py-1 tracking-wide capitalize">
            {product.category}
          </span>
        </div>
        <div className="pt-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg text-walnut leading-tight">{product.name}</h3>
            <p className="font-body text-sm font-medium text-walnut whitespace-nowrap">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
          <p className="font-body text-xs text-stone mt-1 capitalize">{product.category}</p>
        </div>
      </Link>
    </motion.div>
  )
}
