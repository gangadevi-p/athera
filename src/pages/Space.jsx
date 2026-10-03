import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Img from '../components/Img'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'
import { SPACES, inSpace, spaceById } from '../data/catalogue'

export default function Space() {
  const { id } = useParams()
  const s = spaceById(id)
  if (!s) return <NotFound />

  const pieces = inSpace(s.id)
  const others = SPACES.filter(x => x.id !== s.id)

  return (
    <>
      <section className="sroom">
        <Img id={s.cover} alt={s.name} ratio="21 / 9" w={2000} priority />
        <div className="wrap sroom__t">
          <div className="phead__row">
            <BackButton to="/spaces" light />
            <span className="eyebrow">Shop by space</span>
          </div>
          <h1 className="disp d1">{s.name}</h1>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap sroom__intro">
          <p className="disp d3">{s.tagline}</p>
          <p className="lead">{s.description}</p>
        </div>
      </section>

      <section className="sec sec--tight sec--bone">
        <div className="wrap">
          <div className="head">
            <div className="head__t">
              <span className="eyebrow">The room</span>
              <h2 className="disp d2">{pieces.length} pieces for this space</h2>
            </div>
            <Link className="tlink" to="/shop">All furniture</Link>
          </div>
          <div className="grid-3">
            {pieces.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap srooms__next">
          <div>
            <span className="eyebrow">Other rooms</span>
            <div className="srooms__links">
              {others.map(o => (
                <Link className="disp d3" key={o.id} to={`/spaces/${o.id}`}>{o.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
