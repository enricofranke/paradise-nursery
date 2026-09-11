import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createAppStore } from './store.js'

/**
 * Renders a component inside a fresh Redux Provider.
 * Returns the store so tests can inspect / seed state.
 */
export function renderWithStore(ui, { preloadedState, store = createAppStore(preloadedState) } = {}) {
  const result = render(<Provider store={store}>{ui}</Provider>)
  return { store, ...result }
}
