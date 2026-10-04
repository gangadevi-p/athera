import { useEffect, useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import ProductCard from '../components/ProductCard'
import SaveButton from '../components/SaveButton'
import { PRODUCTS } from '../data/catalogue'

/**
 * The design system, drawn with the system itself. Nothing here is a picture of
 * a token: every swatch, size and gap is the live token, read back from the
 * stylesheet, so the page cannot drift from the site — and it can be opened at
 * any width to watch the tokens change. Not linked from the navigation.
 * `DESIGN.md` is the written version.
 */

const PALETTE = [
  ['--warm-white', 'Warm white', 'type and glass over photographs'],
  ['--sand', 'Sand', 'a second ground'],
  ['--beige', 'Beige', 'a third ground'],
  ['--taupe', 'Taupe', 'captions, placeholders'],
  ['--sage', 'Sage', 'the one accent — focus, hover, the live step'],
  ['--walnut', 'Walnut', 'the solid button’s hover'],
  ['--charcoal', 'Charcoal', 'ink — never pure black'],
]

const ROLES = [
  ['--paper', 'Paper', 'the page ground'],
  ['--linen', 'Linen', 'image placeholder, quiet fills'],
  ['--graphite', 'Graphite', 'body copy'],
  ['--mute', 'Mute', 'eyebrows, secondary text'],
  ['--rule', 'Rule', 'hairlines'],
  ['--ink', 'Ink', 'headings and controls'],
]

const TYPE = [
  ['d1', '--fs-d1', 'disp d1', 'Design spaces that feel quieter.', 'statement — the one very large size'],
  ['d2', '--fs-d2', 'disp d2', 'Seven ways in', 'page and section titles'],
  ['d3', '--fs-d3', 'disp d3', 'Living room', 'sub-sections, room names'],
  ['title', '--fs-title', 'ptitle', 'Linen lounge sofa', 'a piece’s name on its page'],
  ['price', '--fs-price', 'ds-price', '$3,750', 'a price, an order total'],
  ['body', '--fs-body', 'lead', 'Made in small runs and delivered assembled, placed in the room you choose.', 'running text, names, values'],
  ['small', '--fs-small', 'fine', 'Lead time 10–12 weeks. White-glove delivery is included.', 'notes, material lines, filters'],
  ['label', '--fs-label', 'eyebrow', 'Delivery and availability', 'eyebrows, labels, buttons, tabs'],
  ['caption', '--fs-caption', 'ds-caption', 'View all ›', 'small-caps links, captions'],
]

const SPACE = ['--s4', '--s8', '--s12', '--s16', '--s20', '--s24', '--s32', '--s40', '--s48', '--s64', '--s80', '--s96', '--s128']

const BREAKPOINTS = [
  ['> 1280', 'Desktop', '80px margins · 160 / 120px between sections · 88px between columns'],
  ['≤ 1280', 'Small laptop', '64px margins · 140 / 104px · 60px'],
  ['≤ 980', 'Tablet', 'one column · compact navigation · 76px navigation · 120 / 96px · 44px'],
  ['≤ 640', 'Phone', '20px margins · 68px navigation · 96 / 72px · product rows keep their size'],
]

const MOTION = [
  ['--t-hover', 'a hover, a focus'],
  ['--t-panel', 'the cart drawer, the menu'],
  ['--t-reveal', 'text fading up as it arrives'],
  ['--t-image', 'a photograph opening'],
]

const hex = rgb => {
  const m = rgb.match(/\d+(\.\d+)?/g)
  if (!m) return rgb
  return '#' + m.slice(0, 3).map(n => Math.round(Number(n)).toString(16).padStart(2, '0')).join('').toUpperCase()
}

/** Reads a custom property back from the stylesheet. */
const token = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

function Swatch({ name, label, use }) {
  const ref = useRef(null)
  const [value, setValue] = useState('')
  useEffect(() => { setValue(hex(getComputedStyle(ref.current).backgroundColor)) }, [])
  return (
    <li className="ds-sw">
      <span ref={ref} className="ds-sw__chip" style={{ background: `var(${name})` }} />
      <span className="ds-sw__t">
        <b>{label}</b>
        <code>{name}</code>
        <span>{value}</span>
        <small>{use}</small>
      </span>
    </li>
  )
}

function Specimen({ tokenName, className, text, use }) {
  const ref = useRef(null)
  const [px, setPx] = useState('')
  useEffect(() => {
    const read = () => setPx(`${Math.round(parseFloat(getComputedStyle(ref.current).fontSize) * 10) / 10}px`)
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])
  return (
    <div className="ds-type">
      <div className="ds-type__meta">
        <code>{tokenName}</code>
        <span>{px}</span>
        <small>{use}</small>
      </div>
      <p ref={ref} className={className}>{text}</p>
    </div>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section className="ds-sec" id={id}>
      <div className="head head--bare">
        <div className="head__t">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="disp d3">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  const [vw, setVw] = useState(0)
  const sample = PRODUCTS[0]
  useEffect(() => {
    const read = () => setVw(document.documentElement.clientWidth)
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  return (
    <section className="sec sec--page ds">
      <div className="wrap">
        <div className="phead">
          <div className="phead__row">
            <BackButton to="/" />
            <span className="eyebrow">Design system</span>
          </div>
          <h1 className="disp d2">Paper and ink</h1>
          <p className="lead">
            Seven colours, two typefaces, one spacing scale and three breakpoints. Everything below is
            drawn from the live tokens — resize the window and the sizes follow.
            <span className="ds-vw"> This window is {vw}px wide.</span>
          </p>
        </div>

        <Section id="colour" eyebrow="Foundations" title="Colour">
          <ul className="ds-swatches">
            {PALETTE.map(([n, l, u]) => <Swatch key={n} name={n} label={l} use={u} />)}
          </ul>
          <p className="fine ds-note">The names the layout uses are aliases onto these, with a few quieter neighbours.</p>
          <ul className="ds-swatches">
            {ROLES.map(([n, l, u]) => <Swatch key={n} name={n} label={l} use={u} />)}
          </ul>
        </Section>

        <Section id="type" eyebrow="Foundations" title="Type">
          <p className="fine ds-note">
            Georgia in capitals for titles; Jost for everything functional. Five sizes for text and a fluid
            ramp for titles — each role has one size, so two things that do the same job are never different.
          </p>
          <div className="ds-types">
            {TYPE.map(([k, t, c, text, use]) => <Specimen key={k} tokenName={t} className={c} text={text} use={use} />)}
          </div>
        </Section>

        <Section id="space" eyebrow="Foundations" title="Space">
          <p className="fine ds-note">A 4 / 8 scale. The name is the pixel value.</p>
          <ul className="ds-space">
            {SPACE.map(n => (
              <li key={n}>
                <code>{n}</code>
                <span className="ds-space__bar" style={{ width: `var(${n})` }} />
                <small>{token(n)}</small>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="layout" eyebrow="Foundations" title="Layout and breakpoints">
          <p className="fine ds-note">
            A 1440px page box, 1280px of content at the full margin, twelve columns where a composition needs
            them. The tokens change at each step, so most components need no media query of their own.
          </p>
          <dl className="ds-bp">
            {BREAKPOINTS.map(([w, n, d]) => (
              <div key={w}>
                <dt><code>{w}</code> {n}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="controls" eyebrow="Components" title="Controls">
          <div className="ds-row">
            <button className="btn btn--solid" type="button">Add to cart</button>
            <button className="btn" type="button">Checkout</button>
            <button className="btn btn--quiet" type="button">Continue as guest</button>
            <button className="btn btn--quiet btn--sm" type="button">Check</button>
            <SaveButton id={sample.id} name={sample.name} withLabel />
          </div>
          <div className="ds-row">
            <a className="tlink" href="#controls">View all ›</a>
            <button className="linkbtn" type="button">Remove</button>
            <a className="ulink" href="#controls">An underlined link</a>
            <BackButton to="/" label="Back" />
            <div className="qty"><button type="button" aria-label="Fewer">−</button><span>2</span><button type="button" aria-label="More">+</button></div>
            <div className="swatches"><span className="sw"><span className="dot" style={{ background: '#E7E1D5' }} /></span><span className="sw"><span className="dot" style={{ background: '#6E4B32' }} /></span></div>
          </div>
          <div className="cats__tabs ds-row">
            <button type="button" aria-pressed="true">All</button>
            <button type="button" aria-pressed="false">Sofas</button>
            <button type="button" aria-pressed="false">Tables</button>
          </div>
          <div className="ds-form">
            <div className="field">
              <label htmlFor="ds-name">Full name</label>
              <input id="ds-name" placeholder="Your name" />
            </div>
            <details className="disc">
              <summary>Care instructions</summary>
              <p>Dust with a soft cloth; oil the timber once a year.</p>
            </details>
          </div>
        </Section>

        <Section id="surfaces" eyebrow="Components" title="Cards, rows and panels">
          <div className="ds-cards">
            <ProductCard p={sample} />
            <div className="sum">
              <h3 className="eyebrow">Summary</h3>
              <div className="sum__row"><span>Subtotal</span><span>$7,230</span></div>
              <div className="sum__row sum__total"><span>Total</span><b>$7,230</b></div>
              <p className="fine">A panel is a hairline box on the page ground — no shadow, no radius.</p>
            </div>
            <dl className="spec ds-spec">
              <div><dt>Size</dt><dd>232 × 92 × 68 cm</dd></div>
              <div><dt>Materials</dt><dd>Belgian linen, FSC beech frame</dd></div>
              <div><dt>Designer</dt><dd>Ines Okafor, 2025</dd></div>
            </dl>
          </div>
        </Section>

        <Section id="motion" eyebrow="Foundations" title="Motion">
          <p className="fine ds-note">Slow, soft, controlled. Every duration is a token, on one easing, and all of it stops under reduced motion.</p>
          <ul className="ds-motion">
            {MOTION.map(([n, u]) => (
              <li key={n}><code>{n}</code><span>{`${parseFloat(token(n))}s`}</span><small>{u}</small></li>
            ))}
          </ul>
        </Section>
      </div>
    </section>
  )
}
