import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ImageGallery({ images, alt }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden bg-cream aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${alt} — view ${active + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 aspect-square overflow-hidden transition-all duration-200 ${
                i === active ? 'ring-2 ring-walnut ring-offset-1' : 'opacity-60 hover:opacity-90'
              }`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
