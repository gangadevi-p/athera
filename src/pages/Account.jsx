import { Link } from 'react-router-dom'
import { money } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * A prototype account: sign in → saved address → payment → confirmation is the
 * flow the brief describes, and this is the part that holds the name and the
 * address so checkout can prefill them. No password, nothing sent anywhere.
 */
export default function Account() {
  const { account, signIn, signOut, saveAddress, orders, wish } = useShop()

  const submitSignIn = e => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    signIn({ name: String(fd.get('name') || ''), email: String(fd.get('email') || '') })
  }

  const submitAddress = e => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    saveAddress({
      addr: String(fd.get('addr') || ''),
      city: String(fd.get('city') || ''),
      zip: String(fd.get('zip') || ''),
      country: String(fd.get('country') || ''),
    })
  }

  if (!account) {
    return (
      <section className="sec">
        <div className="wrap acct">
          <div className="phead">
            <span className="eyebrow">Account</span>
            <h1 className="disp d1">Sign in</h1>
            <p className="lead">
              An account saves your address so checkout is three steps instead of four, and keeps
              your orders in one place. You can also check out as a guest — nothing here is
              required.
            </p>
          </div>

          <form className="acct__f" onSubmit={submitSignIn}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" required placeholder="Your name" autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
            </div>
            <button className="btn btn--solid" type="submit">Sign in</button>
            <p className="fine">
              A design prototype: no password is asked for, nothing is sent, and everything is
              kept in this browser only.
            </p>
            <Link className="tlink" to="/shop">Continue without an account</Link>
          </form>
        </div>
      </section>
    )
  }

  const a = account.address

  return (
    <section className="sec">
      <div className="wrap acct">
        <div className="phead phead--short">
          <span className="eyebrow">Account</span>
          <h1 className="disp d1">{account.name || 'Your account'}</h1>
          <p className="lead">{account.email}</p>
        </div>

        <div className="acct__grid">
          <form className="acct__f" onSubmit={submitAddress}>
            <h2 className="eyebrow">Saved address</h2>
            <div className="field">
              <label htmlFor="addr">Address</label>
              <input id="addr" name="addr" required placeholder="Street and number" defaultValue={a?.addr || ''} autoComplete="street-address" />
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" required placeholder="City" defaultValue={a?.city || ''} autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor="zip">Postcode</label>
                <input id="zip" name="zip" required placeholder="Postcode" defaultValue={a?.zip || ''} autoComplete="postal-code" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" defaultValue={a?.country || 'United States'} autoComplete="country-name">
                {['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'Germany'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button className="btn btn--quiet" type="submit">Save address</button>
            {a && <p className="fine">Saved — checkout will fill this in for you.</p>}
          </form>

          <div className="acct__side">
            <h2 className="eyebrow">Orders</h2>
            {orders.length ? (
              <ul className="acct__orders">
                {orders.map(o => (
                  <li key={o.no}>
                    <Link className="ulink" to={`/track?no=${o.no}`}>{o.no}</Link>
                    <span>{money(o.total)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="fine">No orders yet. <Link className="ulink" to="/shop">Explore the collection</Link>.</p>
            )}

            <h2 className="eyebrow">Wishlist</h2>
            <p className="fine">
              {wish.length
                ? <>Pieces saved — <Link className="ulink" to="/wishlist">view the list</Link>.</>
                : <>Nothing saved yet. <Link className="ulink" to="/shop">Start browsing</Link>.</>}
            </p>

            <button className="linkbtn" type="button" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </div>
    </section>
  )
}
