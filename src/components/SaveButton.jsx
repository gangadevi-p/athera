import { cx } from '../lib/format'
import { useShop } from '../lib/shop'

/**
 * Save → wishlist. A hairline heart that fills when the piece is saved —
 * the same control on a card, in the gallery and on the wishlist itself.
 */
export default function SaveButton({ id, name, className = '', withLabel = false }) {
  const { saved, toggleSave } = useShop()
  const on = saved(id)

  return (
    <button
      type="button"
      className={cx('save', on && 'save--on', withLabel && 'save--label', className)}
      aria-pressed={on}
      title={on ? `Saved — remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={e => { e.preventDefault(); toggleSave(id) }}
    >
      <svg viewBox="0 0 20 18" aria-hidden="true" focusable="false">
        <path d="M10 16.4S1.8 11.5 1.8 6.1C1.8 3.6 3.7 1.7 6.1 1.7c1.6 0 3 .9 3.9 2.2.9-1.3 2.3-2.2 3.9-2.2 2.4 0 4.3 1.9 4.3 4.4 0 5.4-8.2 10.3-8.2 10.3z" />
      </svg>
      {withLabel && <span>{on ? 'Saved' : 'Save'}</span>}
      {!withLabel && <span className="sr">{on ? 'Saved to wishlist' : 'Save to wishlist'}</span>}
    </button>
  )
}
