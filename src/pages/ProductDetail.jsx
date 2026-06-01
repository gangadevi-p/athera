import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ImageGallery from '../components/ImageGallery'
import ProductCard from '../components/ProductCard'
import { formatPrice } from '../utils/formatPrice'
import products from '../data/products.json'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.slug === slug)

  const [activeVariant, setActiveVariant] = useState(0)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 text-center">
        <p className="font-heading text-3xl text-stone mb-4">Product not found.</p>
        <Link to="/products" className="btn-outline">Back to Products</Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 pt-24 pb-20"
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-body text-sm text-stone hover:text-walnut transition-colors mb-10"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <ImageGallery images={product.images} alt={product.name} />

        {/* Details */}
        <div>
          <p className="section-tag mb-2 capitalize">{product.category}</p>
          <h1 className="font-display text-4xl text-walnut mb-3">{product.name}</h1>
          <p className="font-heading text-3xl text-terracotta mb-6">
            {formatPrice(product.price, product.currency)}
          </p>

          <p className="font-body text-base text-stone leading-relaxed mb-8">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-8">
              <p className="font-body text-sm font-medium text-walnut mb-3">
                Colour — <span className="text-stone font-normal">{product.variants[activeVariant].label}</span>
              </p>
              <div className="flex gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setActiveVariant(i)}
                    title={v.label}
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${i === activeVariant ? 'ring-2 ring-offset-2 ring-walnut' : ''}`}
                    style={{ backgroundColor: v.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          <div className="mb-6">
            <p className="font-body text-sm font-medium text-walnut mb-2">Materials</p>
            <div className="flex flex-wrap gap-2">
              {product.materials.map(m => (
                <span key={m} className="font-body text-xs text-stone border border-stone/30 px-3 py-1">{m}</span>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="mb-8 bg-cream p-4">
            <p className="font-body text-sm font-medium text-walnut mb-3">Dimensions</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[['W', product.dimensions.w], ['D', product.dimensions.d], ['H', product.dimensions.h]].map(([label, val]) => (
                <div key={label}>
                  <p className="font-display text-xl text-walnut">{val}</p>
                  <p className="font-body text-xs text-stone">{label} ({product.dimensions.unit})</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="btn-primary w-full text-center block"
          >
            Enquire About This Piece
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-24">
          <p className="section-tag mb-2">You might also like</p>
          <h2 className="font-heading text-3xl text-walnut mb-8">Related Pieces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </motion.div>
  )
}
