import { Link } from 'react-router-dom'
import Img from '../components/Img'
import CategoryCarousel from '../components/CategoryCarousel'
import FeaturedCollection from '../components/FeaturedCollection'
import Philosophy from '../components/Philosophy'
import { CATEGORIES, PRODUCTS, SPACES } from '../data/catalogue'
import { cx } from '../lib/format'

/**
 * The landing page runs in the visual concept's rhythm: no two consecutive
 * sections share a shape. Full-screen visual · category carousel · featured
 * collections · brand philosophy · split-screen spaces.
 *
 * Navigation and footer live in Layout.
 */

function Head({ eyebrow, title, lead: text, to, cta = 'View all' }) {
  return (
    <div className="head">
      <div className="head__t">
        <span className="eyebrow" data-reveal="">{eyebrow}</span>
        <h2 className="disp d2" data-reveal="" data-delay="1">{title}</h2>
        {text && <p className="lead" data-reveal="" data-delay="2">{text}</p>}
      </div>
      {to && <Link className="tlink" data-reveal="" data-delay="2" to={to}>{cta}</Link>}
    </div>
  )
}

/** Shop by category, as an index against one large frame rather than a grid. */
function CategoryIndex() {
  const [at, setAt] = useState(0)

  return (
    <div className="cindex">
      <div className="cindex__stage cindex__frame" data-reveal="mask">
        {CATEGORIES.map((c, i) => (
          <Img
            key={c.id}
            id={c.image}
            alt={c.name}
            ratio="4 / 5"
            w={1000}
            priority={i === 0}
            className={cx(i === at && 'on')}
          />
        ))}
      </div>

      <div>
        <ul className="cindex__list">
          {CATEGORIES.map((c, i) => (
            <li key={c.id} data-reveal="" data-delay={Math.min(i, 5)}>
              <Link
                to={`/shop?c=${c.id}`}
                onMouseEnter={() => setAt(i)}
                onFocus={() => setAt(i)}
              >
                <span className="cindex__n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="cindex__name">{c.short}</h3>
                <span className="cindex__items">{c.items}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="cindex__foot" data-reveal="">
          <p className="fine">{PRODUCTS.length} pieces in all, made to order.</p>
          <Link className="tlink" to="/shop">All furniture</Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [leadSpace, ...restSpaces] = SPACES

  return (
    <>
      {/* ---------- 1 · hero — full-screen visual ---------- */}
      <section className="hero">
        <div className="hero__media">
          <Img
            id="photo-1745429523617-0d837856ca35"
            alt="A taupe sofa against a taupe wall, softly lit"
            ratio="16 / 9"
            ratioSm="3 / 4"
            ar="16:9"
            arSm="3:4"
            fp={[0.5, 0.62]}
            w={2600}
            position="center 62%"
            priority
          />
        </div>
        <div className="wrap">
          <div className="hero__t">
            <h1 className="disp d1" data-reveal="">Design spaces<br />that feel quieter.</h1>
            <div className="hero__cta" data-reveal="" data-delay="1">
              <Link className="btn btn--solid" to="/shop">Explore the collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2 · shop by category — editorial index ---------- */}
      <section className="sec" id="categories">
        <div className="wrap">
          <Head
            eyebrow="Shop by category"
            title="Seven ways in"
            lead="The whole collection, grouped the way a room is actually put together."
            to="/categories"
            cta="View all  ›"
          />
          <CategoryCarousel variant="a" />
        </div>
      </section>

      {/* ---------- 3 · featured collection — one story, a few pieces ---------- */}
      <section className="sec sec--bone sec--fit" id="featured">
        <div className="wrap">
          <FeaturedCollection variant="b" />
        </div>
      </section>

      {/* ---------- brand philosophy — statement, close-ups, evidence ---------- */}
      <Philosophy variant="a" />

      {/* ---------- 6 · shop by space — split-screen ---------- */}
      <section className="sec sec--tight sec--gap">
        <div className="wrap">
          <Head
            eyebrow="Shop by space"
            title="Designed for every room"
            lead="Three rooms, each a short list rather than a catalogue."
            to="/spaces"
            cta="All spaces"
          />
        </div>
        <div className="split">
          <Link className="split__pane split--lead" to={`/spaces/${leadSpace.id}`} data-reveal="mask">
            <Img id={leadSpace.cover} alt={leadSpace.name} ratio="21 / 9" w={2000} />
            <div className="split__t">
              <h3 className="disp d3">{leadSpace.name}</h3>
              <p className="fine">{leadSpace.tagline}</p>
            </div>
          </Link>
          {restSpaces.map((s, i) => (
            <Link className="split__pane" key={s.id} to={`/spaces/${s.id}`} data-reveal="mask" data-delay={i + 1}>
              <Img id={s.cover} alt={s.name} ratio="4 / 5" w={1200} />
              <div className="split__t">
                <h3 className="disp d3">{s.name}</h3>
                <p className="fine">{s.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  )
}
