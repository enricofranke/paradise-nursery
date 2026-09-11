import { createSlice } from '@reduxjs/toolkit'

/**
 * Shopping cart slice.
 *
 * State shape:
 * {
 *   items: [{ id, name, image, cost, quantity }]
 * }
 */
const initialState = {
  items: [],
}

/** Returns true for a positive, finite integer. */
const isValidQuantity = (quantity) =>
  Number.isInteger(quantity) && quantity > 0

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds a plant to the cart. If the plant is already in the cart its
     * quantity is incremented instead of creating a duplicate entry.
     * Payload: { id, name, image, cost }
     */
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload ?? {}
      if (!id || !name || !Number.isFinite(cost) || cost < 0) return

      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        existingItem.quantity += 1
        return
      }
      state.items.push({ id, name, image, cost, quantity: 1 })
    },

    /**
     * Removes a plant from the cart entirely.
     * Payload: id (string)
     */
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    /**
     * Sets the quantity of a plant. A quantity below 1 removes the item;
     * a non-integer quantity is ignored.
     * Payload: { id, quantity }
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload ?? {}
      if (!Number.isInteger(quantity)) return

      if (quantity < 1) {
        state.items = state.items.filter((item) => item.id !== id)
        return
      }

      const item = state.items.find((item) => item.id === id)
      if (item && isValidQuantity(quantity)) {
        item.quantity = quantity
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = CartSlice.actions

/* ---------- Selectors ---------- */

export const selectCartItems = (state) => state.cart.items

/** Total number of plants in the cart (sum of quantities). */
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

/** Total cost of all plants in the cart. */
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.cost * item.quantity, 0)

/** Returns true if the plant with the given id is in the cart. */
export const selectIsInCart = (id) => (state) =>
  state.cart.items.some((item) => item.id === id)

const cartReducer = CartSlice.reducer

export default cartReducer
