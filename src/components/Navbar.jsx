import { useSelector } from 'react-redux'
import { selectCartCount } from '../CartSlice.jsx'
import './Navbar.css'

const NAV_LINKS = [
  { view: 'home', label: 'Home' },
  { view: 'plants', label: 'Plants' },
]

/**
 * Shared navigation bar for the Product Listing and Cart pages.
 * Shows the company name, Home/Plants links and the cart icon with the
 * total number of items in the cart.
 */
function Navbar({ currentView, onNavigate }) {
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="navbar">
      <button
        type="button"
        className="navbar__brand"
        onClick={() => onNavigate('home')}
        aria-label="Paradise Nursery home"
      >
        <span className="navbar__logo" aria-hidden="true">🌱</span>
        <span className="navbar__brand-text">
          <strong>Paradise Nursery</strong>
          <em>Where Green Meets Serenity</em>
        </span>
      </button>

      <nav className="navbar__links" aria-label="Main navigation">
        {NAV_LINKS.map(({ view, label }) => (
          <button
            key={view}
            type="button"
            className={`navbar__link${currentView === view ? ' navbar__link--active' : ''}`}
            aria-current={currentView === view ? 'page' : undefined}
            onClick={() => onNavigate(view)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={`navbar__link navbar__cart${currentView === 'cart' ? ' navbar__link--active' : ''}`}
          aria-current={currentView === 'cart' ? 'page' : undefined}
          aria-label={`Cart, ${cartCount} items`}
          onClick={() => onNavigate('cart')}
        >
          <svg
            className="navbar__cart-icon"
            viewBox="0 0 256 256"
            width="36"
            height="36"
            aria-hidden="true"
          >
            <path
              d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Z"
              fill="currentColor"
            />
          </svg>
          <span className="navbar__cart-count" data-testid="cart-count">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
