import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartSlice.jsx'

/** Factory so tests can create isolated stores. */
export const createAppStore = (preloadedState) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  })

const store = createAppStore()

export default store
