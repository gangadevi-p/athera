import { useLocation, useNavigate } from 'react-router-dom'
import { cx } from '../lib/format'

/**
 * An icon-only way back, set beside a page's title. It steps back through the
 * browser history, so it returns to wherever the visitor came from; if the page
 * was opened directly (nothing to go back to) it goes to `to` instead.
 */
export default function BackButton({ to = '/', label = 'Go back', light = false }) {
  const navigate = useNavigate()
  const { key } = useLocation()

  const back = () => {
    if (key !== 'default') navigate(-1)
    else navigate(to)
  }

  return (
    <button className={cx('back', light && 'back--light')} type="button" onClick={back} aria-label={label}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="m11 6-6 6 6 6" />
      </svg>
    </button>
  )
}
