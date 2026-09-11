import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeItem,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from './CartSlice.jsx'
import { formatPrice } from './utils/currency.js'
import './CartItem.css'

/**
 * Shopping cart page. Lists every plant in the cart with its thumbnail, name,
 * unit price, quantity controls, per-item subtotal and a delete button.
 * Shows the total cart amount plus Continue Shopping and Checkout buttons.
 */
function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotal)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.id))
    }
  }

  const handleRemove = (item) => {
    dispatch(removeItem(item.id))
  }

  const handleCheckout = () => {
    setCheckoutMessage('Checkout functionality is coming soon!')
  }

  const calculateItemSubtotal = (item) => item.cost * item.quantity

  return (
    <div className="cart">
      <h2 className="cart__title">Your Shopping Cart</h2>
      <p className="cart__total" data-testid="cart-total">
        Total Cart Amount: <strong>{formatPrice(totalAmount)}</strong>
      </p>

      {cartItems.length === 0 ? (
        <p className="cart__empty">Your cart is empty.</p>
      ) : (
        <ul className="cart__list">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="cart-item"
              data-testid={`cart-item-${item.id}`}
            >
              <img className="cart-item__image" src={item.image} alt={item.name} />
              <div className="cart-item__details">
                <h3 className="cart-item__name">{item.name}</h3>
                <p className="cart-item__cost">Unit price: {formatPrice(item.cost)}</p>

                <div className="cart-item__quantity">
                  <button
                    type="button"
                    className="cart-item__button"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span
                    className="cart-item__quantity-value"
                    aria-label={`Quantity of ${item.name}`}
                    data-testid={`quantity-${item.id}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="cart-item__button"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item__subtotal" data-testid={`subtotal-${item.id}`}>
                  Total: {formatPrice(calculateItemSubtotal(item))}
                </p>

                <button
                  type="button"
                  className="cart-item__delete"
                  aria-label={`Delete ${item.name} from cart`}
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart__actions">
        <button
          type="button"
          className="cart__action cart__action--secondary"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          type="button"
          className="cart__action cart__action--primary"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>

      {checkoutMessage && (
        <p className="cart__message" role="status">
          {checkoutMessage}
        </p>
      )}
    </div>
  )
}

export default CartItem
