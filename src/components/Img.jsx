import { useState } from 'react'
import { img, imgAt, atOf, isLocal } from '../data/catalogue'
import { cx } from '../lib/format'

/**
 * A photograph with its aspect ratio reserved, a tonal placeholder underneath
 * and a graceful fallback if the asset never arrives — the layout never shifts
 * or collapses.
 *
 * `id` is an Unsplash photo id, or `local:<sheet>-<nn>` for a photograph cut
 * from a contact sheet in /img; pass `src` instead for anything else. A local
 * photograph is framed on its subject (`position` overrides), and `zoom` magnifies
 * it about that point.
 *
 * Ratios come from the brief: 16:9 for the homepage hero, 4:5 for editorial,
 * 3:4 for product cards, 1:1 and 4:5 in the product gallery. Where a crop has
 * to change below 640px — the hero does — pass `ar` and `arSm` and the CDN
 * returns two genuinely different crops rather than one crop letterboxed.
 */
export default function Img({
  id,
  src,
  alt = '',
  ratio = '4 / 5',
  ratioSm,
  ar,
  arSm,
  fp,
  w = 1400,
  wSm = 900,
  className = '',
  position,
  zoom,
  priority = false,
  ...rest
}) {
  const [state, setState] = useState('loading')
  const at = atOf(id)
  const pos = position || (at ? `${at[0] * 100}% ${at[1] * 100}%` : 'center')
  const url = src || (ar ? imgAt(id, w, ar, fp) : img(id, w))

  const common = {
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: priority ? 'high' : 'auto',
    style: zoom > 1 ? { objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos } : { objectPosition: pos },
    onLoad: () => setState('loaded'),
    onError: () => setState('error'),
  }

  return (
    <div
      className={cx('img', state === 'loaded' && 'img--on', (isLocal(id) || src?.includes('/photos/')) && 'img--own', className)}
      style={{ '--ar': ratio, '--ar-sm': ratioSm || ratio }}
      {...rest}
    >
      {state !== 'error' && (
        arSm && id ? (
          <picture>
            <source media="(max-width: 980px), (orientation: portrait)" srcSet={imgAt(id, wSm, arSm, fp)} />
            <img src={url} {...common} />
          </picture>
        ) : (
          <img src={url} {...common} />
        )
      )}
      {state === 'error' && alt && <span className="img__fb">{alt}</span>}
    </div>
  )
}
