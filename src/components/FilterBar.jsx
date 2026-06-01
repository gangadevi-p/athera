const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'sofas', label: 'Sofas' },
  { value: 'tables', label: 'Tables' },
  { value: 'chairs', label: 'Chairs' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'accessories', label: 'Accessories' },
]

const SORTS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'newest', label: 'Newest' },
]

export default function FilterBar({ category, setCategory, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pb-8 border-b border-stone/20">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-1.5 font-body text-sm tracking-wide transition-all duration-200 ${
              category === c.value
                ? 'bg-walnut text-cream'
                : 'bg-cream text-walnut border border-stone/30 hover:border-walnut'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="font-body text-sm text-walnut bg-cream border border-stone/30 px-3 py-2 focus:outline-none focus:border-walnut cursor-pointer"
      >
        {SORTS.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  )
}
