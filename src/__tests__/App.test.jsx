import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { renderWithStore } from '../test-utils.jsx'

describe('App navigation flow', () => {
  it('renders the landing page with company name, about section and Get Started', () => {
    renderWithStore(<App />)
    expect(screen.getByRole('heading', { name: /Welcome To Paradise Nursery/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('navigates landing -> plants -> cart -> plants -> home', async () => {
    const user = userEvent.setup()
    renderWithStore(<App />)

    await user.click(screen.getByRole('button', { name: 'Get Started' }))
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Air Purifying Plants' })).toBeInTheDocument()

    await user.click(within(screen.getByTestId('product-snake-plant')).getByRole('button', { name: 'Add to Cart' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')

    await user.click(screen.getByRole('button', { name: /^Cart/ }))
    expect(screen.getByRole('heading', { name: 'Your Shopping Cart' })).toBeInTheDocument()
    expect(screen.getByTestId('cart-item-snake-plant')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue Shopping' }))
    expect(screen.getByRole('heading', { name: 'Air Purifying Plants' })).toBeInTheDocument()
    // state persisted: button still disabled
    expect(within(screen.getByTestId('product-snake-plant')).getByRole('button', { name: 'Added to Cart' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Home' }))
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument()
  })
})
