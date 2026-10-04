import { Link, useParams } from 'react-router-dom'
import Img from '../components/Img'
import SpaceListing from '../components/SpaceListing'
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
        <Img id={s.cover} alt={s.name} ratio="21 / 9" w={2400} priority />
        <div className="wrap sroom__t">
          <h1 className="disp d1">{s.name}</h1>
        </div>
      </section>

      <section className="sec sec--tight sec--intro">
        <div className="wrap sroom__intro">
          <p className="disp d3">{s.tagline}</p>
          <p className="lead">{s.description}</p>
        </div>
      </section>

      <section className="sec sec--tight sec--bone sec--list">
        <div className="wrap">
          <SpaceListing key={s.id} products={pieces} eyebrow="The room" title="Pieces for this space" />
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
