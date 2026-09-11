# Paradise Nursery

**Paradise Nursery** – *Where Green Meets Serenity*

A shopping cart web application for an online houseplant shop, built as the
final project of the IBM "Developing Front-End Apps with React" course.

## Features

- **Landing page** with background image, company name, About Us section and a
  "Get Started" button
- **Product listing** with 3 categories × 6 houseplants (thumbnail, name,
  description, price) and "Add to Cart" buttons that disable once a plant is in
  the cart
- **Navbar** shared by the product listing and cart pages with Home, Plants and
  Cart links plus a live cart icon showing the total item count
- **Shopping cart** showing each plant's thumbnail, name, unit price, quantity
  controls (+ / −), per-item subtotal, delete button, total cart amount,
  "Continue Shopping" and a "Checkout" button (Coming Soon)
- State managed with **Redux Toolkit** (`addItem`, `removeItem`,
  `updateQuantity`)

## Tech stack

| Package | Version |
| --- | --- |
| React | 19 |
| Vite | 8 |
| Redux Toolkit | 2 |
| react-redux | 9 |
| Vitest + Testing Library | unit / component tests |
| Playwright | end-to-end tests |

## Project structure

```
src/
├── App.jsx            # landing page + view switching
├── App.css            # landing page styles incl. background image
├── AboutUs.jsx        # company description
├── ProductList.jsx    # product listing page
├── CartItem.jsx       # shopping cart page
├── CartSlice.jsx      # Redux slice (addItem, removeItem, updateQuantity) + selectors
├── store.js           # Redux store
├── components/Navbar.jsx
├── data/plants.js     # product catalogue
├── utils/currency.js  # price formatting
└── __tests__/         # Vitest tests
e2e/                   # Playwright tests
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run build      # production build
npm run preview    # serve the production build
npm test           # unit + component tests (Vitest)
npm run test:e2e   # end-to-end tests (Playwright, needs `npx playwright install chromium` once)
npm run lint       # oxlint
```
