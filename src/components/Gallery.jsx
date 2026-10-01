import { useCallback, useEffect, useMemo, useState } from 'react'
import Img from './Img'
import { gallery } from '../data/catalogue'
import { cx } from '../lib/format'

/**
 * The product gallery: one large 1:1 frame, with the five views the brief
 * names — front, side, three-quarter, back, detail, in that order — as labelled
 * 4:5 close-ups beneath it. Choosing a close-up brings it into the large frame.
 * `gallery()` re-frames the front photograph for any view a piece has no
 * photograph of. The large frame opens a zoom view; inside it, click to magnify
 * and move the pointer to pan, and the arrow keys step through the views.
 */
export default function Gallery({ p, opening = false }) {
  const [view, setView] = useState(0)
  const [at, setAt] = useState(-1)
  const [big, setBig] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const shots = useMemo(() => gallery(p), [p])
  const open = at >= 0
  const shot = open ? shots[at] : null

  // closing the zoom leaves the large frame on whichever view it ended on
  const close = useCallback(() => {
    if (at >= 0) setView(at)
    setAt(-1)
    setBig(false)
  }, [at])
  const step = useCallback(
    d => { setBig(false); setAt(i => (i + d + shots.length) % shots.length) },
    [shots.length]
  )

  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close, step])

  const track = e => {
    if (!big) return
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
    )
  }

  return (
    <>
      <div className="gal">
        {/* every view is layered in the frame, so choosing a close-up
            crossfades rather than flashing the placeholder */}
        <button
          type="button"
          className="gal__stage"
          onClick={() => setAt(view)}
          aria-label={`${p.name}, ${shots[view].view.toLowerCase()} view — open zoom`}
          // the opening frame carries the name the card expands from
          style={view === 0 && opening ? { viewTransitionName: 'piece' } : undefined}
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
          <span className="gal__zoom" aria-hidden="true">Zoom</span>
        </button>

        <div className="gal__thumbs" role="group" aria-label="Views">
          {shots.map((s, i) => (
            <figure className="gal__f" key={`${p.id}-${s.view}`}>
              <button
                type="button"
                className={cx('gal__t', i === view && 'on')}
                onClick={() => setView(i)}
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

      {open && (
        <div className="zoom" role="dialog" aria-modal="true" aria-label={`${p.name}, zoom`}>
          <div className="zoom__bar">
            <span className="eyebrow">
              {p.name} · {shot.view} view · {at + 1}/{shots.length}
            </span>
            <button className="zoom__x" type="button" onClick={close} aria-label="Close zoom">
              &times;
            </button>
          </div>

          <div
            className={cx('zoom__stage', big && 'on')}
            onMouseMove={track}
            onClick={() => setBig(v => !v)}
            role="button"
            tabIndex={0}
            aria-label={big ? 'Reduce' : 'Magnify'}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBig(v => !v) } }}
          >
            <img
              src={shot.url(2000)}
              alt={`${p.name}, ${shot.view.toLowerCase()} view`}
              style={big ? { transform: 'scale(2.2)', transformOrigin: origin } : undefined}
            />
          </div>

          <div className="zoom__nav">
            <button className="tlink" type="button" onClick={() => step(-1)}>Previous</button>
            <span className="fine">{big ? 'Click to reduce' : 'Click the photograph to magnify'}</span>
            <button className="tlink" type="button" onClick={() => step(1)}>Next</button>
          </div>
        </div>
      )}
    </>
  )
}
