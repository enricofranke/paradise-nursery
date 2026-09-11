import { expect, test } from '@playwright/test'

test.describe('Paradise Nursery shopping flow', () => {
  test('landing page shows company name and Get Started', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Welcome To Paradise Nursery/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible()
  })

  test('product listing shows 3 categories with 6 plants each', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Get Started' }).click()

    const categories = page.locator('.product-category')
    await expect(categories).toHaveCount(3)
    for (let i = 0; i < 3; i += 1) {
      await expect(categories.nth(i).locator('.product-card')).toHaveCount(6)
    }
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('full cart flow: add, count, adjust, delete, checkout, continue', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Get Started' }).click()

    const cartCount = page.getByTestId('cart-count')
    await expect(cartCount).toHaveText('0')

    const snakeButton = page.getByTestId('product-snake-plant').getByRole('button')
    await snakeButton.click()
    await expect(snakeButton).toBeDisabled()
    await expect(snakeButton).toHaveText('Added to Cart')
    await expect(cartCount).toHaveText('1')

    await page.getByTestId('product-lavender').getByRole('button').click()
    await expect(cartCount).toHaveText('2')

    await page.getByRole('button', { name: /^Cart/ }).click()
    await expect(page.getByRole('heading', { name: 'Your Shopping Cart' })).toBeVisible()
    await expect(page.getByTestId('cart-total')).toContainText('$35.00')

    await page.getByRole('button', { name: 'Increase quantity of Snake Plant' }).click()
    await expect(page.getByTestId('quantity-snake-plant')).toHaveText('2')
    await expect(page.getByTestId('subtotal-snake-plant')).toContainText('$30.00')
    await expect(page.getByTestId('cart-total')).toContainText('$50.00')
    await expect(cartCount).toHaveText('3')

    await page.getByRole('button', { name: 'Decrease quantity of Snake Plant' }).click()
    await expect(page.getByTestId('quantity-snake-plant')).toHaveText('1')
    await expect(cartCount).toHaveText('2')

    await page.getByRole('button', { name: 'Delete Lavender from cart' }).click()
    await expect(page.getByTestId('cart-item-lavender')).toHaveCount(0)
    await expect(page.getByTestId('cart-total')).toContainText('$15.00')
    await expect(cartCount).toHaveText('1')

    await page.getByRole('button', { name: 'Checkout' }).click()
    await expect(page.getByRole('status')).toContainText(/coming soon/i)

    await page.getByRole('button', { name: 'Continue Shopping' }).click()
    await expect(page.getByRole('heading', { name: 'Air Purifying Plants' })).toBeVisible()
    await expect(page.getByTestId('product-snake-plant').getByRole('button')).toBeDisabled()
    await expect(page.getByTestId('product-lavender').getByRole('button')).toBeEnabled()
  })
})
