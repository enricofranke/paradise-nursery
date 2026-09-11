import { describe, expect, it } from 'vitest'
import cartReducer, {
  addItem,
  removeItem,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  selectIsInCart,
  updateQuantity,
} from '../CartSlice.jsx'

const snake = { id: 'snake-plant', name: 'Snake Plant', image: 'snake.jpg', cost: 15 }
const spider = { id: 'spider-plant', name: 'Spider Plant', image: 'spider.jpg', cost: 12 }

const stateWith = (items) => ({ cart: { items } })

describe('CartSlice reducers', () => {
  it('returns the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] })
  })

  describe('addItem', () => {
    it('adds a new item with quantity 1', () => {
      const state = cartReducer(undefined, addItem(snake))
      expect(state.items).toEqual([{ ...snake, quantity: 1 }])
    })

    it('increments quantity when the same item is added twice', () => {
      let state = cartReducer(undefined, addItem(snake))
      state = cartReducer(state, addItem(snake))
      expect(state.items).toHaveLength(1)
      expect(state.items[0].quantity).toBe(2)
    })

    it('keeps separate entries for different items', () => {
      let state = cartReducer(undefined, addItem(snake))
      state = cartReducer(state, addItem(spider))
      expect(state.items.map((i) => i.id)).toEqual(['snake-plant', 'spider-plant'])
    })

    it.each([
      ['undefined payload', undefined],
      ['empty object', {}],
      ['missing id', { name: 'x', cost: 1 }],
      ['missing name', { id: 'x', cost: 1 }],
      ['string cost', { id: 'x', name: 'x', cost: '15' }],
      ['NaN cost', { id: 'x', name: 'x', cost: NaN }],
      ['negative cost', { id: 'x', name: 'x', cost: -1 }],
    ])('ignores invalid payload: %s', (_label, payload) => {
      const state = cartReducer(undefined, addItem(payload))
      expect(state.items).toEqual([])
    })
  })

  describe('removeItem', () => {
    it('removes the item with the given id', () => {
      const initial = { items: [{ ...snake, quantity: 2 }, { ...spider, quantity: 1 }] }
      const state = cartReducer(initial, removeItem('snake-plant'))
      expect(state.items).toEqual([{ ...spider, quantity: 1 }])
    })

    it('is a no-op for an unknown id', () => {
      const initial = { items: [{ ...snake, quantity: 1 }] }
      const state = cartReducer(initial, removeItem('does-not-exist'))
      expect(state.items).toEqual(initial.items)
    })

    it('is a no-op on an empty cart', () => {
      expect(cartReducer({ items: [] }, removeItem('snake-plant')).items).toEqual([])
    })
  })

  describe('updateQuantity', () => {
    const initial = { items: [{ ...snake, quantity: 2 }] }

    it('sets the quantity', () => {
      const state = cartReducer(initial, updateQuantity({ id: 'snake-plant', quantity: 5 }))
      expect(state.items[0].quantity).toBe(5)
    })

    it('removes the item when quantity is 0', () => {
      const state = cartReducer(initial, updateQuantity({ id: 'snake-plant', quantity: 0 }))
      expect(state.items).toEqual([])
    })

    it('removes the item when quantity is negative', () => {
      const state = cartReducer(initial, updateQuantity({ id: 'snake-plant', quantity: -3 }))
      expect(state.items).toEqual([])
    })

    it.each([
      ['float', 1.5],
      ['string', '3'],
      ['NaN', NaN],
      ['Infinity', Infinity],
      ['undefined', undefined],
    ])('ignores non-integer quantity: %s', (_label, quantity) => {
      const state = cartReducer(initial, updateQuantity({ id: 'snake-plant', quantity }))
      expect(state.items[0].quantity).toBe(2)
    })

    it('is a no-op for an unknown id', () => {
      const state = cartReducer(initial, updateQuantity({ id: 'nope', quantity: 9 }))
      expect(state.items).toEqual(initial.items)
    })

    it('ignores undefined payload', () => {
      const state = cartReducer(initial, updateQuantity(undefined))
      expect(state.items).toEqual(initial.items)
    })
  })
})

describe('CartSlice selectors', () => {
  it('selectCartItems returns the items', () => {
    const items = [{ ...snake, quantity: 1 }]
    expect(selectCartItems(stateWith(items))).toBe(items)
  })

  it('selectCartCount sums quantities', () => {
    const state = stateWith([{ ...snake, quantity: 2 }, { ...spider, quantity: 3 }])
    expect(selectCartCount(state)).toBe(5)
  })

  it('selectCartCount is 0 for an empty cart', () => {
    expect(selectCartCount(stateWith([]))).toBe(0)
  })

  it('selectCartTotal multiplies cost by quantity', () => {
    const state = stateWith([{ ...snake, quantity: 2 }, { ...spider, quantity: 3 }])
    expect(selectCartTotal(state)).toBe(15 * 2 + 12 * 3)
  })

  it('selectCartTotal is 0 for an empty cart', () => {
    expect(selectCartTotal(stateWith([]))).toBe(0)
  })

  it('selectIsInCart reports membership', () => {
    const state = stateWith([{ ...snake, quantity: 1 }])
    expect(selectIsInCart('snake-plant')(state)).toBe(true)
    expect(selectIsInCart('spider-plant')(state)).toBe(false)
  })
})
