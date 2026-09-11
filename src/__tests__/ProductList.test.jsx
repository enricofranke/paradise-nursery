import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Navbar from '../components/Navbar.jsx'
import { allPlants, plantCategories } from '../data/plants.js'
import ProductList from '../ProductList.jsx'
import { renderWithStore } from '../test-utils.jsx'

describe('ProductList', () => {
  it('renders every category heading', () => {
    renderWithStore(<ProductList />)
    for (const category of plantCategories) {
      expect(screen.getByRole('heading', { name: category.name })).toBeInTheDocument()
    }
  })

  it('renders every plant with thumbnail, name and price', () => {
    renderWithStore(<ProductList />)
    for (const plant of allPlants) {
      const card = screen.getByTestId(`product-${plant.id}`)
      expect(within(card).getByRole('img', { name: plant.name })).toHaveAttribute('src', plant.image)
      expect(within(card).getByRole('heading', { name: plant.name })).toBeInTheDocument()
      expect(within(card).getByText(`$${plant.cost}.00`)).toBeInTheDocument()
      expect(within(card).getByRole('button', { name: 'Add to Cart' })).toBeEnabled()
    }
  })

  it('adds a plant to the cart and disables its button', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ProductList />)
    const card = screen.getByTestId('product-snake-plant')
    const button = within(card).getByRole('button', { name: 'Add to Cart' })

    await user.click(button)

    expect(store.getState().cart.items).toEqual([
      { id: 'snake-plant', name: 'Snake Plant', image: expect.any(String), cost: 15, quantity: 1 },
    ])
    expect(within(card).getByRole('button', { name: 'Added to Cart' })).toBeDisabled()
    // other buttons unaffected
    const otherCard = screen.getByTestId('product-spider-plant')
    expect(within(otherCard).getByRole('button', { name: 'Add to Cart' })).toBeEnabled()
  })

  it('does not add twice when the disabled button is clicked again', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<ProductList />)
    const card = screen.getByTestId('product-lavender')
    await user.click(within(card).getByRole('button', { name: 'Add to Cart' }))
    await user.click(within(card).getByRole('button', { name: 'Added to Cart' }))
    expect(store.getState().cart.items[0].quantity).toBe(1)
  })

  it('shows buttons as added for items already in the cart', () => {
    renderWithStore(<ProductList />, {
      preloadedState: {
        cart: { items: [{ id: 'mint', name: 'Mint', image: 'x', cost: 12, quantity: 1 }] },
      },
    })
    const card = screen.getByTestId('product-mint')
    expect(within(card).getByRole('button', { name: 'Added to Cart' })).toBeDisabled()
  })

  it('increments the navbar cart count when adding plants', async () => {
    const user = userEvent.setup()
    renderWithStore(
      <>
        <Navbar currentView="plants" onNavigate={() => {}} />
        <ProductList />
      </>,
    )
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')

    await user.click(within(screen.getByTestId('product-snake-plant')).getByRole('button', { name: 'Add to Cart' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')

    await user.click(within(screen.getByTestId('product-jasmine')).getByRole('button', { name: 'Add to Cart' }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })
})
