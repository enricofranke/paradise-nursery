import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Navbar from '../components/Navbar.jsx'
import { renderWithStore } from '../test-utils.jsx'

describe('Navbar', () => {
  it('renders Home, Plants and Cart links', () => {
    renderWithStore(<Navbar currentView="plants" onNavigate={() => {}} />)
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Plants' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Cart/ })).toBeInTheDocument()
  })

  it('shows the summed quantity of all cart items', () => {
    renderWithStore(<Navbar currentView="cart" onNavigate={() => {}} />, {
      preloadedState: {
        cart: {
          items: [
            { id: 'a', name: 'A', image: '', cost: 1, quantity: 2 },
            { id: 'b', name: 'B', image: '', cost: 1, quantity: 3 },
          ],
        },
      },
    })
    expect(screen.getByTestId('cart-count')).toHaveTextContent('5')
    expect(screen.getByRole('button', { name: 'Cart, 5 items' })).toBeInTheDocument()
  })

  it('marks the current view as active', () => {
    renderWithStore(<Navbar currentView="plants" onNavigate={() => {}} />)
    expect(screen.getByRole('button', { name: 'Plants' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('calls onNavigate with the target view', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    renderWithStore(<Navbar currentView="plants" onNavigate={onNavigate} />)

    await user.click(screen.getByRole('button', { name: 'Home' }))
    await user.click(screen.getByRole('button', { name: /^Cart/ }))
    await user.click(screen.getByRole('button', { name: 'Paradise Nursery home' }))

    expect(onNavigate.mock.calls.map((c) => c[0])).toEqual(['home', 'cart', 'home'])
  })
})
