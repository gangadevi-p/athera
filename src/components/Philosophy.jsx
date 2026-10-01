import Img from './Img'

/**
 * Brand philosophy: what the brand believes, not how it is made. One statement
 * of intent and three principles, set in strong type against still, quiet
 * photography — light on a wall, a window, a pair of vases — with no tools or
 * workshop in sight.
 *
 *   a · manifesto   statement and principles on the left, one tall photograph
 *                   bleeding off the right
 *   b · principles  the statement across the page, three principles in a row,
 *                   a wide strip of light beneath
 *   c · still       a full-bleed wall of light, the statement and principles
 *                   set into its empty space
 *
 * Every layout is sized from the viewport, so it fits one screen.
 */

const STATEMENT = 'We make fewer things, in smaller runs, for rooms meant to be lived in rather than looked at.'

const PRINCIPLES = [
  { n: '01', t: 'Quiet over loud.', d: 'A piece should settle into a room, not announce itself.' },
  { n: '02', t: 'Fewer, and made for you.', d: 'Everything is made to order in small runs, so nothing is made twice by accident.' },
  { n: '03', t: 'Kept, not replaced.', d: 'Seats are re-woven, covers replaced and timber re-oiled — a piece is looked after, not thrown out.' },
]

const IMG = {
  vases: { id: 'photo-1772442364499-52f96e8fc4d4', alt: 'Two textured stoneware vases with dry branches beside a curtained window', at: 'center 60%' },
  shadow: { id: 'photo-1789292249119-5f349a3031e9', alt: 'Sunlight casting soft geometric shadows across a plain wall', at: 'center 40%' },
  light: { id: 'photo-1643699302640-e8dd689194f4', alt: 'Soft light falling across a white wall', at: 'center' },
}

function Photo({ k, w = 1800, ratio = '4 / 5', priority = false }) {
  const p = IMG[k]
  return <Img id={p.id} alt={p.alt} ratio={ratio} w={w} position={p.at} priority={priority} />
}

function Principle({ p }) {
  return (
    <div className="pp">
      <span className="pp__n">{p.n}</span>
      <div className="pp__b">
        <h3 className="disp pp__t">{p.t}</h3>
        <p className="pp__d">{p.d}</p>
      </div>
    </div>
  )
}

export default function Philosophy({ variant = 'a' }) {
  if (variant === 'b') {
    return (
      <section className="ph ph--b" id="philosophy">
        <div className="wrap ph__wrap">
          <div className="ph__head">
            <span className="eyebrow" data-reveal="">Our philosophy</span>
            <p className="disp ph__big" data-reveal="" data-delay="1">{STATEMENT}</p>
          </div>
          <div className="ph__three">
            {PRINCIPLES.map((p, i) => (
              <div key={p.n} data-reveal="" data-delay={i + 1}><Principle p={p} /></div>
            ))}
          </div>
          <div className="ph__strip" data-reveal="mask"><Photo k="shadow" w={2400} ratio="21 / 9" /></div>
        </div>
      </section>
    )
  }

  if (variant === 'c') {
    return (
      <section className="ph ph--c" id="philosophy">
        <div className="ph__bg"><Photo k="shadow" w={2400} ratio="16 / 9" priority /></div>
        <div className="wrap ph__wrap">
          <div className="ph__head">
            <span className="eyebrow" data-reveal="">Our philosophy</span>
            <p className="disp ph__big" data-reveal="" data-delay="1">{STATEMENT}</p>
          </div>
          <div className="ph__three">
            {PRINCIPLES.map((p, i) => (
              <div key={p.n} data-reveal="" data-delay={i + 1}><Principle p={p} /></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="ph ph--a" id="philosophy">
      <div className="ph__body">
        <span className="eyebrow" data-reveal="">Our philosophy</span>
        <p className="disp ph__mid" data-reveal="" data-delay="1">{STATEMENT}</p>
        <div className="ph__list" data-reveal="" data-delay="2">
          {PRINCIPLES.map(p => <Principle key={p.n} p={p} />)}
        </div>
      </div>
      <div className="ph__img" data-reveal="mask"><Photo k="vases" w={1800} ratio="2 / 3" priority /></div>
    </section>
  )
}
