const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formats a numeric USD amount, e.g. 15 -> "$15.00". */
export function formatPrice(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  return formatter.format(value)
}
