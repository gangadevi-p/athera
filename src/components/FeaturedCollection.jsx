import { Link } from 'react-router-dom'
import Img from './Img'
import { COLLECTIONS } from '../data/catalogue'

/**
 * Featured collections: five small stories, each one mood, material or way of
 * living. Just the photograph and its name — nothing else is written. Each one
 * opens a hand-picked set of pieces (see COLLECTIONS in the catalogue), not a
 * category.
 *
 *   a · staggered   five columns of different widths and heights
 *   b · lead + four one large image beside a two-by-two
 *   c · two over three   two wide images above three portraits
 */

function Tile({ c, i, className, w = 1200 }) {
  return (
    <Link to={`/shop?col=${c.id}`} className={`fcl ${className || ''}`}>
      <span className="fcl__img"><Img id={c.image} alt={c.name} ratio="4 / 5" w={w} priority={i < 3} /></span>
      <span className="fcl__name">{c.name}</span>
    </Link>
  )
}

export default function FeaturedCollection({ variant = 'a' }) {
  return (
    <>
      <div className="fcs__head">
        <span className="eyebrow" data-reveal="">Featured</span>
        <h2 className="disp d2" data-reveal="" data-delay="1">Five small stories</h2>
      </div>
      <div className={`fcs fcs--${variant}`}>
        {COLLECTIONS.map((c, i) => <Tile key={c.name} c={c} i={i} className={`fcl--${i + 1}`} />)}
      </div>
    </>
  )
}
