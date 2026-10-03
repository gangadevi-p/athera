import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Img from '../components/Img'
import { SPACES, inSpace } from '../data/catalogue'
import { cx } from '../lib/format'

export default function Spaces() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="phead">
          <div className="phead__row">
            <BackButton to="/" />
            <span className="eyebrow">Shop by space</span>
          </div>
          <h1 className="disp d1">Designed for<br />every room</h1>
          <p className="lead">
            Explore furniture and layouts tailored to the way you live. Each room is a short
            list rather than a catalogue — the pieces we would actually put in it.
          </p>
        </div>

        <div className="spreads">
          {SPACES.map((s, i) => (
            <article className={cx('spread', i % 2 === 1 && 'spread--flip')} key={s.id}>
              <Img id={s.cover} alt={s.name} ratio="5 / 4" w={1200} />
              <div className="spread__t">
                <span className="eyebrow">0{i + 1} · {inSpace(s.id).length} pieces</span>
                <h2 className="disp d2">{s.name}</h2>
                <p className="lead">{s.description}</p>
                <Link className="tlink" to={`/spaces/${s.id}`}>View the room</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
