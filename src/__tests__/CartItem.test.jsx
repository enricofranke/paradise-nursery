import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CartItem from '../CartItem.jsx'
import { renderWithStore } from '../test-utils.jsx'

const seeded = {
  cart: {
    items: [
      { id: 'snake-plant', name: 'Snake Plant', image: 'https://img/snake.jpg', cost: 15, quantity: 2 },
      { id: 'lavender', name: 'Lavender', image: 'https://img/lavender.jpg', cost: 20, quantity: 1 },
    ],
  },
}

const renderCart = (props = {}) =>
  renderWithStore(<CartItem onContinueShopping={() => {}} {...props} />, { preloadedState: seeded })

describe('CartItem', () => {
  it('shows an empty state and disables checkout when the cart is empty', () => {
    renderWithStore(<CartItem onContinueShopping={() => {}} />)
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })

  it('renders thumbnail, name, unit price, quantity and subtotal per item', () => {
    renderCart()
    const snake = screen.getByTestId('cart-item-snake-plant')
    expect(within(snake).getByRole('img', { name: 'Snake Plant' })).toHaveAttribute('src', 'https://img/snake.jpg')
    expect(within(snake).getByRole('heading', { name: 'Snake Plant' })).toBeInTheDocument()
    expect(within(snake).getByText('Unit price: $15.00')).toBeInTheDocument()
    expect(screen.getByTestId('quantity-snake-plant')).toHaveTextContent('2')
    expect(screen.getByTestId('subtotal-snake-plant')).toHaveTextContent('$30.00')
  })

  it('shows the total cart amount', () => {
    renderCart()
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$50.00')
  })

  it('increments quantity and updates subtotal and total', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByRole('button', { name: 'Increase quantity of Snake Plant' }))
    expect(screen.getByTestId('quantity-snake-plant')).toHaveTextContent('3')
    expect(screen.getByTestId('subtotal-snake-plant')).toHaveTextContent('$45.00')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$65.00')
  })

  it('decrements quantity and updates subtotal and total', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByRole('button', { name: 'Decrease quantity of Snake Plant' }))
    expect(screen.getByTestId('quantity-snake-plant')).toHaveTextContent('1')
    expect(screen.getByTestId('subtotal-snake-plant')).toHaveTextContent('$15.00')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$35.00')
  })

  it('removes the item when decrementing from quantity 1', async () => {
    const user = userEvent.setup()
    const { store } = renderCart()
    await user.click(screen.getByRole('button', { name: 'Decrease quantity of Lavender' }))
    expect(screen.queryByTestId('cart-item-lavender')).not.toBeInTheDocument()
    expect(store.getState().cart.items.map((i) => i.id)).toEqual(['snake-plant'])
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$30.00')
  })

  it('deletes an item via the delete button', async () => {
    const user = userEvent.setup()
    const { store } = renderCart()
    await user.click(screen.getByRole('button', { name: 'Delete Snake Plant from cart' }))
    expect(screen.queryByTestId('cart-item-snake-plant')).not.toBeInTheDocument()
    expect(store.getState().cart.items).toHaveLength(1)
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$20.00')
  })

  it('shows the empty state after deleting all items', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByRole('button', { name: 'Delete Snake Plant from cart' }))
    await user.click(screen.getByRole('button', { name: 'Delete Lavender from cart' }))
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })

  it('shows a coming soon message on checkout', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByRole('button', { name: 'Checkout' }))
    expect(screen.getByRole('status')).toHaveTextContent(/coming soon/i)
  })

  it('calls onContinueShopping', async () => {
    const user = userEvent.setup()
    const onContinueShopping = vi.fn()
    renderCart({ onContinueShopping })
    await user.click(screen.getByRole('button', { name: 'Continue Shopping' }))
    expect(onContinueShopping).toHaveBeenCalledTimes(1)
  })
})
