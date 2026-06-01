import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const prefilledProduct = searchParams.get('product') || ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    product: prefilledProduct,
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 pt-28 pb-20"
    >
      <div className="max-w-2xl">
        <p className="section-tag mb-2">Get in Touch</p>
        <h1 className="font-heading text-5xl text-walnut mb-4">Let's talk.</h1>
        <p className="font-body text-base text-stone leading-relaxed mb-12">
          Interested in a piece? Have a question about materials, lead times, or custom dimensions? We'd love to hear from you. We typically respond within one business day.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-start gap-4 py-16">
            <CheckCircle size={40} className="text-sage" />
            <h2 className="font-heading text-3xl text-walnut">Message received.</h2>
            <p className="font-body text-stone">We'll be in touch shortly. Thank you for reaching out.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-sm font-medium text-walnut block mb-1.5">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-stone/30 bg-cream px-4 py-3 font-body text-sm text-walnut placeholder-stone focus:outline-none focus:border-walnut"
                />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-walnut block mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full border border-stone/30 bg-cream px-4 py-3 font-body text-sm text-walnut placeholder-stone focus:outline-none focus:border-walnut"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-walnut block mb-1.5">Product of Interest</label>
              <input
                type="text"
                name="product"
                value={form.product}
                onChange={handleChange}
                placeholder="e.g. Wabi Lounge Chair (optional)"
                className="w-full border border-stone/30 bg-cream px-4 py-3 font-body text-sm text-walnut placeholder-stone focus:outline-none focus:border-walnut"
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-walnut block mb-1.5">Message *</label>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what you're looking for..."
                className="w-full border border-stone/30 bg-cream px-4 py-3 font-body text-sm text-walnut placeholder-stone focus:outline-none focus:border-walnut resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="font-body text-sm text-terracotta">
                Something went wrong. Please try emailing us directly at hello@atherafurniture.in
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-fit disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}
