import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Img from '../components/Img'
import { byId, cover } from '../data/catalogue'
import { SHIP, eta, money } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * Checkout in the four steps the brief sets out — delivery details, shipping
 * method, payment, confirmation — entered either as a guest or through a
 * signed-in account with a saved address.
 *
 * It is a prototype: the card fields are cosmetic and nothing is sent.
 */

const Field = ({ id, label, ...rest }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} required {...rest} />
  </div>
)

const Step = ({ n, title, children }) => (
  <fieldset className="step">
    <legend>
      <span className="step__n">{n}</span>
      {title}
    </legend>
    {children}
  </fieldset>
)

const digits = (e, max) => e.target.value.replace(/\D/g, '').slice(0, max)

export default function Checkout() {
  const { cart, ship, setShip, subtotal, total, place, account, signIn } = useShop()
  const navigate = useNavigate()
  const [mode, setMode] = useState(account ? 'account' : null)
  const [signing, setSigning] = useState(false)

  if (!cart.length) return <Navigate to="/cart" replace />

  const addr = account?.address

  const submit = e => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    place({
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      address: {
        addr: String(fd.get('addr') || ''),
        city: String(fd.get('city') || ''),
        zip: String(fd.get('zip') || ''),
        country: String(fd.get('country') || ''),
      },
    })
    navigate('/done')
  }

  const doSignIn = e => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    signIn({ name: String(fd.get('acct-name') || ''), email: String(fd.get('acct-email') || '') })
    setMode('account')
    setSigning(false)
  }

  return (
    <section className="sec sec--page">
      <div className="wrap">
        <div className="phead">
          <span className="eyebrow">Checkout</span>
          <h1 className="disp d2">Your order</h1>
        </div>

        <div className="co">
          <div className="co__form">
            <Step n="01" title="Account">
              {mode === 'account' && account ? (
                <div className="co__acct">
                  <p className="fine">
                    Signed in as <b>{account.name || account.email}</b>
                    {addr ? ' — your saved address is filled in below.' : '.'}
                  </p>
                  <button className="linkbtn" type="button" onClick={() => setMode('guest')}>
                    Use different details
                  </button>
                </div>
              ) : signing ? (
                <form className="co__signin" onSubmit={doSignIn}>
                  <p className="fine">
                    A prototype sign-in: no password, nothing sent. It only remembers your name
                    and address for next time.
                  </p>
                  <div className="row">
                    <Field id="acct-name" label="Full name" placeholder="Your name" autoComplete="name" />
                    <Field id="acct-email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div className="co__choice">
                    <button className="btn btn--solid" type="submit">Sign in</button>
                    <button className="linkbtn" type="button" onClick={() => setSigning(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="co__choice">
                  <button className="btn btn--quiet btn--sm" type="button" onClick={() => setSigning(true)}>
                    Sign in
                  </button>
                  <button className="btn btn--quiet btn--sm" type="button" onClick={() => setMode('guest')}>
                    Continue as guest
                  </button>
                  {mode === 'guest' && <span className="fine">Checking out as a guest.</span>}
                </div>
              )}
            </Step>

            {mode && (
              <form className="co__rest" onSubmit={submit}>
                <Step n="02" title="Delivery details">
                  <div className="row">
                    <Field
                      id="name" label="Full name" placeholder="Your name" autoComplete="name"
                      defaultValue={account?.name || ''}
                    />
                    <Field
                      id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email"
                      defaultValue={account?.email || ''}
                    />
                  </div>
                  <Field
                    id="addr" label="Address" placeholder="Street and number" autoComplete="street-address"
                    defaultValue={addr?.addr || ''}
                  />
                  <div className="row">
                    <Field
                      id="city" label="City" placeholder="City" autoComplete="address-level2"
                      defaultValue={addr?.city || ''}
                    />
                    <Field
                      id="zip" label="Postcode" placeholder="Postcode" autoComplete="postal-code"
                      defaultValue={addr?.zip || ''}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country" name="country" autoComplete="country-name"
                      defaultValue={addr?.country || 'United States'}
                    >
                      {['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </Step>

                <Step n="03" title="Shipping method">
                  <div className="ship" role="radiogroup" aria-label="Shipping method">
                    {Object.entries(SHIP).map(([k, s]) => (
                      <label key={k} className={ship === k ? 'on' : ''}>
                        <input type="radio" name="ship" value={k} checked={ship === k} onChange={() => setShip(k)} />
                        <b>{s.n}</b>
                        <small>Ready {eta(...s.w)}</small>
                        <em>{s.fee ? money(s.fee) : 'Free'}</em>
                      </label>
                    ))}
                  </div>
                </Step>

                <Step n="04" title="Payment">
                  <Field
                    id="card" label="Card number" placeholder="0000 0000 0000 0000"
                    inputMode="numeric" maxLength={19} autoComplete="cc-number"
                    onInput={e => { e.target.value = digits(e, 16).replace(/(.{4})/g, '$1 ').trim() }}
                  />
                  <div className="row">
                    <Field
                      id="exp" label="Expiry" placeholder="MM / YY"
                      inputMode="numeric" maxLength={7} autoComplete="cc-exp"
                      onInput={e => { const d = digits(e, 4); e.target.value = d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d }}
                    />
                    <Field id="cvc" label="CVC" placeholder="000" inputMode="numeric" maxLength={4} autoComplete="cc-csc" />
                  </div>
                  <p className="fine">
                    Secure checkout. This is a design prototype — nothing is charged, nothing is
                    sent, and nothing is stored.
                  </p>
                </Step>

                <button className="btn btn--solid btn--block" type="submit">
                  Place order · {money(total)}
                </button>
              </form>
            )}
          </div>

          <aside className="sum">
            <h2 className="eyebrow">Summary</h2>
            <ul className="colines">
              {cart.map(i => {
                const p = byId(i.pid)
                return (
                  <li key={`${i.pid}-${i.fi}`}>
                    <Img id={cover(p)} alt={p.name} ratio="1 / 1" w={200} />
                    <div>
                      <h3 className="pname">{p.name}</h3>
                      <p className="fine">{p.finishes[i.fi].label} · {i.q}</p>
                    </div>
                    <span>{money(p.price * i.q)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="sum__row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="sum__row">
              <span>{SHIP[ship].n}</span>
              <span>{SHIP[ship].fee ? money(SHIP[ship].fee) : 'Free'}</span>
            </div>
            <div className="sum__row sum__total"><span>Total</span><b>{money(total)}</b></div>
            <p className="fine">Ready {eta(...SHIP[ship].w)}</p>
            <Link className="linkbtn" to="/cart">Edit cart</Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
