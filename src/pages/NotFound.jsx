import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="sec sec--page">
      <div className="wrap empty">
        <span className="eyebrow">404</span>
        <h1 className="disp d2">This page has been put away</h1>
        <p className="lead">The piece or page you were looking for is not here any more.</p>
        <Link className="btn btn--solid" to="/shop">Browse the furniture</Link>
      </div>
    </section>
  )
}
