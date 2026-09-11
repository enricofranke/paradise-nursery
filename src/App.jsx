import { useState } from 'react'
import './App.css'
import AboutUs from './AboutUs.jsx'
import CartItem from './CartItem.jsx'
import Navbar from './components/Navbar.jsx'
import ProductList from './ProductList.jsx'

/**
 * Root component. Handles simple view switching between the landing page,
 * the product listing and the shopping cart.
 */
function App() {
  const [view, setView] = useState('home')

  if (view === 'home') {
    return (
      <main className="landing-page">
        <div className="landing-page__overlay" />
        <section className="landing-page__content">
          <h1 className="landing-page__title">Welcome To Paradise Nursery</h1>
          <p className="landing-page__tagline">Where Green Meets Serenity</p>
          <div className="landing-page__divider" aria-hidden="true" />
          <button
            type="button"
            className="landing-page__cta"
            onClick={() => setView('plants')}
          >
            Get Started
          </button>
        </section>
        <aside className="landing-page__about">
          <AboutUs />
        </aside>
      </main>
    )
  }

  return (
    <>
      <Navbar currentView={view} onNavigate={setView} />
      <main className="page">
        {view === 'plants' && <ProductList />}
        {view === 'cart' && <CartItem onContinueShopping={() => setView('plants')} />}
      </main>
    </>
  )
}

export default App
