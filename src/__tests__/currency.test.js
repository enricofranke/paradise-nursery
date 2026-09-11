import { describe, expect, it } from 'vitest'
import { formatPrice } from '../utils/currency.js'

describe('formatPrice', () => {
  it.each([
    [15, '$15.00'],
    [0, '$0.00'],
    [12.5, '$12.50'],
    [1234.567, '$1,234.57'],
  ])('formats %s as %s', (input, expected) => {
    expect(formatPrice(input)).toBe(expected)
  })

  it.each([
    ['NaN', NaN],
    ['Infinity', Infinity],
    ['undefined', undefined],
    ['null', null],
    ['string', '15'],
  ])('falls back to $0.00 for %s', (_label, input) => {
    expect(formatPrice(input)).toBe('$0.00')
  })
})
