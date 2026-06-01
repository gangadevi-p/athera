import { motion } from 'framer-motion'
import { Leaf, Hammer, Heart, Globe } from 'lucide-react'

const values = [
  { icon: Hammer, title: 'Honest Craft', desc: 'Every joint, finish, and stitch is made to be examined. We have nothing to hide in our process.' },
  { icon: Leaf, title: 'Natural Materials', desc: 'Wood, linen, clay, stone. Materials that come from the earth and age alongside you.' },
  { icon: Heart, title: 'Designed to Last', desc: 'We reject the disposable. Our pieces are made to be repaired, re-finished, and handed on.' },
  { icon: Globe, title: 'Considered Impact', desc: 'Local sourcing where possible. Waste reduction built in from the very first sketch.' },
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-walnut/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="section-tag text-cream/60 mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl text-cream max-w-xl leading-tight">
            Built with intention. Made to stay.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="section-tag mb-4">How it started</p>
          <h2 className="font-heading text-4xl text-walnut mb-6">A workshop, a belief, a name.</h2>
          <p className="font-body text-base text-stone leading-relaxed mb-4">
            Athera began in a small workshop in Bangalore in 2021. Our founder, frustrated with furniture that fell apart within years and looked identical to everything else, set out to make pieces that were genuinely worth keeping.
          </p>
          <p className="font-body text-base text-stone leading-relaxed mb-4">
            The name comes from the Sanskrit root meaning 'to hold' or 'to carry'. That felt right — furniture that holds your life, carries your stories, and doesn't need replacing every decade.
          </p>
          <p className="font-body text-base text-stone leading-relaxed">
            Today we work with a small group of craftspeople across Karnataka and Tamil Nadu. Every piece is made to order, which means no warehouse of unsold furniture and no compromises on material quality.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=80"
            alt="Our workshop"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-tag mb-2">What we stand for</p>
            <h2 className="font-heading text-4xl text-walnut">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 bg-warm-sand rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-terracotta" />
                </div>
                <h3 className="font-heading text-xl text-walnut mb-2">{title}</h3>
                <p className="font-body text-sm text-stone leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
