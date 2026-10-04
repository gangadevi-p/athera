import { Link } from 'react-router-dom'
import Img from '../components/Img'
import CategoryCarousel from '../components/CategoryCarousel'
import FeaturedCollection from '../components/FeaturedCollection'
import Philosophy from '../components/Philosophy'
import sofaHero from '../assets/sofa-hero.webp'
import { SPACES } from '../data/catalogue'

/**
 * The landing page runs in the visual concept's rhythm: no two consecutive
 * sections share a shape.
 *
 *   full-screen visual · assurances · category carousel · featured collections ·
 *   three spaces · brand philosophy
 *
 * Navigation and footer live in Layout.
 */

/** Section header: eyebrow, title, optional lead and a single link. `compact` is the one-screen version. */
function Head({ eyebrow, title, lead: text, to, cta = 'View all', compact = false }) {
  return (
    <div className={compact ? 'head head--c head--bare' : 'head head--bare'}>
      <div className="head__t">
        <span className="eyebrow" data-reveal="">{eyebrow}</span>
        <h2 className="disp d2" data-reveal="" data-delay="1">{title}</h2>
        {text && <p className="lead" data-reveal="" data-delay="2">{text}</p>}
      </div>
      {to && <Link className="tlink" data-reveal="" data-delay="2" to={to}>{cta}</Link>}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ---------- 1 · hero — full-screen visual ---------- */}
      <section className="hero hero--stage">
        <div className="hero__media" aria-hidden="true" />
        <div className="wrap">
          <div className="hero__t">
            <h1 className="disp d1" data-reveal=""><span>Design spaces</span> <span>that feel quieter.</span></h1>
            <div className="hero__cta" data-reveal="" data-delay="1">
              <Link className="btn btn--solid" to="/shop">Explore the collection</Link>
            </div>
          </div>
        </div>
        {/* the sofa, front-on and standing on the floor, never shown larger than its own pixels */}
        <div className="hero__stage">
          <img
            className="hero__sofa"
            src={sofaHero}
            alt="A long, low three-seat sofa in brown bouclé seen from the front, with travertine-panelled arms on bronze plinths"
            width="2172"
            height="724"
            fetchpriority="high"
          />
        </div>
      </section>

      {/* ---------- 2 · the three things a buyer of a large piece wants to know ---------- */}
      <section className="assure" aria-label="How we work">
        <div className="wrap assure__in">
          <p data-reveal="">Made to order, in small runs</p>
          <p data-reveal="" data-delay="1">White-glove delivery, included</p>
          <p data-reveal="" data-delay="2">30-day returns · 10-year guarantee</p>
        </div>
      </section>

      {/* ---------- 3 · shop by category — slow carousel ---------- */}
      <section className="sec" id="categories">
        <div className="wrap">
          <Head
            eyebrow="Category"
            title="Seven ways in"
            lead="The whole collection, grouped the way a room is actually put together."
            to="/categories"
            cta="View all  ›"
          />
          <CategoryCarousel variant="a" />
        </div>
      </section>

      {/* ---------- 4 · featured collections — curated sets, not categories ---------- */}
      <section className="sec sec--bone sec--fit" id="featured">
        <div className="wrap">
          <FeaturedCollection variant="b" />
        </div>
      </section>

      {/* ---------- 6 · shop by space — three equal rooms ---------- */}
      <section className="sec sec--fit" id="spaces">
        <div className="fit__col">
          <div className="wrap">
            <Head compact eyebrow="Space" title="Designed for every room" to="/spaces" />
            <div className="split">
              {SPACES.map((s, i) => (
                <Link className="split__pane" key={s.id} to={`/spaces/${s.id}`} data-reveal="mask" data-delay={i + 1}>
                  <Img id={s.cover} alt={s.name} ratio="4 / 5" w={1200} />
                  <div className="split__t">
                    <h3 className="disp d3">{s.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 7 · brand philosophy — statement, close-ups, evidence ---------- */}
      <Philosophy variant="a" />
    </>
  )
}
