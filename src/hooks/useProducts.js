import { useState, useMemo } from 'react'
import products from '../data/products.json'

export function useProducts({ initialCategory = 'all', initialCollection = null } = {}) {
  const [category, setCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let result = [...products]

    if (initialCollection) {
      result = result.filter(p => p.collections.includes(initialCollection))
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return result
  }, [category, priceRange, sort, initialCollection])

  return { products: filtered, category, setCategory, priceRange, setPriceRange, sort, setSort }
}
