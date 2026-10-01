import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Img from './Img'
import { CATEGORIES } from '../data/catalogue'
import { cx } from '../lib/format'
import { reducedMotion } from '../lib/motion'

/**
 * Shop by category as a slow carousel: two categories in view, the first at
 * 70% of the width and the second at 30%. Every few seconds the track drifts
 * right to left — the small one grows into the lead and the next one enters.
 *
 * Seven categories are followed by clones of the first two, so the loop closes
 * without the eye seeing a seam: on reaching a clone the track snaps back to
 * the identical real slide with transitions off.
 *
 * Photos are lazy: only the first two are fetched up front.
 */

const HOLD = 4200   // ms each pair stays put
const MOVE = 1600   // ms the drift takes; written to --cc-move so CSS follows
const N = CATEGORIES.length
const SLIDES = [...CATEGORIES, CATEGORIES[0], CATEGORIES[1]]

export default function CategoryCarousel({ variant = 'a' }) {
  const [at, setAt] = useState(0)
  const [snap, setSnap] = useState(false)
  const paused = useRef(false)

  // advance on a slow timer; never while hovered, hidden, or under reduced motion
  useEffect(() => {
    if (reducedMotion()) return
    const id = setInterval(() => {
      if (paused.current || document.hidden) return
      setAt(a => (a >= N ? a : a + 1))
    }, HOLD)
    return () => clearInterval(id)
  }, [])

  // at a clone: once the drift ends, jump back to the identical real slide
  useEffect(() => {
    if (at < N) return
    const t = setTimeout(() => {
      setSnap(true)
      setAt(0)
      setTimeout(() => setSnap(false), 60)
    }, MOVE + 80)
    return () => clearTimeout(t)
  }, [at])

  return (
    <div
      className={cx('cc', `cc--${variant}`, snap && 'cc--snap')}
      style={{ '--cc-move': `${MOVE}ms` }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onFocus={() => { paused.current = true }}
      onBlur={() => { paused.current = false }}
    >
      <div className="cc__view">
        <div className="cc__track" style={{ transform: `translateX(${-at * 30}%)` }}>
          {SLIDES.map((c, i) => (
            <Link
              key={i}
              to={`/categories?k=${c.id}`}
              className={cx('cc__s', i === at && 'on')}
              aria-hidden={i >= N ? 'true' : undefined}
              tabIndex={i >= N ? -1 : undefined}
            >
              <span className="cc__frame">
                <Img id={c.image} alt={i >= N ? '' : c.name} ratio="4 / 5" w={1400} priority={i < 2} />
              </span>
              <span className="cc__cap">
                <span className="cc__name">{c.short}</span>
                <span className="cc__items">{c.items}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
