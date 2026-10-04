import { Link } from 'react-router-dom'
import { SHIP, money } from '../lib/format'

/**
 * Delivery, returns, care and contact on one quiet page. The footer deep-links
 * to each part (#delivery, #care, #contact). Everything here repeats what the
 * product page and checkout already say.
 */
export default function Help() {
  return (
    <section className="sec sec--page">
      <div className="wrap">
        <div className="phead">
          <span className="eyebrow">Help</span>
          <h1 className="disp d2">Good to know</h1>
        </div>

        <div className="help">
          <section className="help__s" id="delivery">
            <h2 className="disp d3">Delivery &amp; returns</h2>
            <p>
              White-glove delivery is included on every piece. It arrives assembled, is placed in
              the room you choose, and the packaging is taken away.
            </p>
            <p>
              Everything is made to order in a small workshop, so the lead time is shown on each
              piece. At checkout you choose {SHIP.std.n.toLowerCase()} (free) or a priority build
              ({money(SHIP.exp.fee)}), and the date it will be ready is shown before you pay and
              on <Link className="ulink" to="/track">your order's tracking page</Link>.
            </p>
            <p>
              Returns are accepted for thirty days, and every frame carries a ten-year guarantee.
            </p>
          </section>

          <section className="help__s" id="care">
            <h2 className="disp d3">Care</h2>
            <p>
              Each piece lists its own care instructions beneath the photographs. We would rather
              look after a piece than replace it: seats are re-woven, covers replaced and timber
              re-oiled for as long as you keep it.
            </p>
          </section>

          <section className="help__s" id="contact">
            <h2 className="disp d3">Contact</h2>
            <p>
              Write to <a className="ulink" href="mailto:hello@aethera.studio">hello@aethera.studio</a> and
              a person in the workshop will reply.
            </p>
            <p className="fine">This is a design prototype: no order is processed and no mail is sent.</p>
          </section>
        </div>
      </div>
    </section>
  )
}
