import { useEffect, useMemo, useRef, useState } from 'react'
import Img from './Img'
import { gallery } from '../data/catalogue'
import { cx } from '../lib/format'

const SCALE = 2.6

/**
 * The product gallery: one large 1:1 frame, with the five views the brief
 * names — front, side, three-quarter, back, detail, in that order — as labelled
 * 4:5 close-ups beside it. Choosing a close-up brings it into the large frame.
 * `gallery()` re-frames the front photograph for any view a piece has no
 * photograph of. There is no zoom page or overlay: the frame magnifies in place.
 * Click (or tap, or Enter) to enlarge: the view then holds still where it was
 * clicked, drag to move around it, click again or press Escape to return. Once the pointer arrives, a 2400px file is fetched
 * for the view on show, so the magnified detail is sharp rather than stretched.
 */
export default function Gallery({ p, opening = false }) {
  const [view, setView] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [armed, setArmed] = useState(false)
  const [hi, setHi] = useState('')
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const drag = useRef(null)
  const shots = useMemo(() => gallery(p), [p])
  const hiUrl = shots[view].url(2400)

  const pick = i => { setZoomed(false); setHi(''); setView(i) }

  useEffect(() => {
    if (!zoomed) return
    const onKey = e => { if (e.key === 'Escape') setZoomed(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [zoomed])

  const at = (e, el) => {
    const r = el.getBoundingClientRect()
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    }
  }

  // enlarging holds the view where it was clicked; only a drag moves it
  const down = e => {
    if (!zoomed) return
    drag.current = { x: e.clientX, y: e.clientY, from: origin, moved: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const move = e => {
    const d = drag.current
    if (!d) return
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
    if (!d.moved) return
    // moving the content by n pixels moves the origin by -n / (scale - 1)
    const k = 100 / (SCALE - 1)
    setOrigin({
      x: Math.min(100, Math.max(0, d.from.x - (dx / r.width) * k)),
      y: Math.min(100, Math.max(0, d.from.y - (dy / r.height) * k)),
    })
  }
  const toggle = e => {
    const moved = drag.current?.moved
    drag.current = null
    if (moved) return
    if (!zoomed) setOrigin(at(e, e.currentTarget))
    setZoomed(z => !z)
  }

  // the arrow keys step through the views while the frame has focus
  const key = e => {
    if (e.key === 'ArrowRight') pick((view + 1) % shots.length)
    if (e.key === 'ArrowLeft') pick((view - 1 + shots.length) % shots.length)
  }

  return (
    <div className="gal">
      {/* every view is layered in the frame, so choosing a close-up
          crossfades rather than flashing the placeholder */}
      <button
        type="button"
        className={cx('gal__stage', zoomed && 'gal__stage--zoomed')}
        onClick={toggle}
        onPointerEnter={() => setArmed(true)}
        onFocus={() => setArmed(true)}
        onPointerDown={down}
        onPointerMove={move}
        onKeyDown={key}
        aria-pressed={zoomed}
        aria-label={`${p.name}, ${shots[view].view.toLowerCase()} view — ${zoomed ? 'return to full view' : 'magnify'}`}
        // the opening frame carries the name the card expands from
        style={view === 0 && opening ? { viewTransitionName: 'piece' } : undefined}
      >
        <span
          className="gal__zoomer"
          style={{ transformOrigin: `${origin.x}% ${origin.y}%`, transform: zoomed ? `scale(${SCALE})` : undefined }}
        >
          {shots.map((s, i) => (
            <Img
              key={`${p.id}-${s.view}`}
              className={cx('gal__layer', i === view && 'on')}
              src={s.url(1400)}
              alt={i === view ? `${p.name}, ${s.view.toLowerCase()} view` : ''}
              ratio="1 / 1"
              priority={i === 0}
            />
          ))}
          {armed && (
            <img
              key={hiUrl}
              className={cx('gal__hi', hi === hiUrl && 'on')}
              src={hiUrl}
              alt=""
              decoding="async"
              onLoad={() => setHi(hiUrl)}
            />
          )}
        </span>
        <span className="gal__zoom" aria-hidden="true">Zoom</span>
      </button>

      <div className="gal__thumbs" role="group" aria-label="Views">
        {shots.map((s, i) => (
          <figure className="gal__f" key={`${p.id}-${s.view}`}>
            <button
              type="button"
              className={cx('gal__t', i === view && 'on')}
              onClick={() => pick(i)}
              aria-pressed={i === view}
              aria-label={`Show ${s.view.toLowerCase()} view`}
            >
              <Img src={s.url(360)} alt="" ratio="4 / 5" />
            </button>
            <figcaption className="gal__cap">{s.view}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
