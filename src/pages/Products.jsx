import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import { useProducts } from '../hooks/useProducts'

export default function Products() {
  const [searchParams] = useSearchParams()
  const collection = searchParams.get('collection')

  const { products, category, setCategory, sort, setSort } = useProducts({
    initialCollection: collection,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 pt-28 pb-20"
    >
      <div className="mb-10">
        <p className="section-tag mb-2">{collection ? `Collection: ${collection}` : 'All Products'}</p>
        <h1 className="font-heading text-5xl text-walnut">
          {collection ? collection.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Our Products'}
        </h1>
      </div>

      <FilterBar category={category} setCategory={setCategory} sort={sort} setSort={setSort} />

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-heading text-2xl text-stone mb-2">Nothing here yet.</p>
          <p className="font-body text-sm text-stone">Try adjusting the filters above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
