# Everyday — Shopping Cart Application

A responsive shopping cart application built to satisfy the Shopping Cart Application internship assignment. It uses real product data from DummyJSON, URL-based routing, a persistent Zustand cart, TanStack Query for API state, and Zod for validating API responses and shipping details.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm

## Run locally

```bash
npm install --global pnpm
pnpm install
pnpm dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
pnpm build
pnpm preview
```

## Technologies

- React 19 + TypeScript
- Vite
- React Router for URL-based pages and browser history
- Bootstrap and custom responsive CSS
- Zustand + persist middleware for cart actions and localStorage persistence
- TanStack Query for product fetching, caching, loading, and error states
- Zod for product API response validation and shipping form validation
- DummyJSON Products API: `https://dummyjson.com/products?limit=30`

## Project structure

```text
src/
├── api/products.ts              # Fetch and validate remote product data
├── components/
│   ├── CheckoutStepper.tsx      # Shared checkout progress indicator
│   ├── Header.tsx
│   ├── OrderSummary.tsx
│   ├── ProductCard.tsx
│   └── ShippingForm.tsx
├── hooks/
│   ├── useProductFilters.ts     # Search and filtering logic
│   └── useProducts.ts           # TanStack Query product request
├── pages/
│   ├── ProductsPage.tsx
│   ├── CartPage.tsx
│   ├── ShippingPage.tsx
│   ├── PaymentPage.tsx
│   └── SuccessPage.tsx
├── store/cartStore.ts           # Cart state/actions and persistence
├── types/product.ts             # Zod API schemas and inferred type
├── utils/pricing.ts             # Centralized price calculations
├── utils/shippingSchema.ts      # Shipping schema and initial values
├── App.tsx                      # Routes and checkout guards
└── main.tsx                     # Providers and router setup
```

## Features completed

- Responsive product grid showing image, title, category, price, rating, and add-to-cart action
- Product API loading, retryable error, empty API response, successful response, and empty search-result states
- Search by title, category filter, maximum-price filter, and clear filters
- Add/remove products, change quantity between 1 and 5, and visible cart item count
- Zustand persistence keeps the cart after refresh
- Cart review with per-item totals, subtotal, 5% tax, conditional 10% discount when subtotal is greater than $100, and final total
- Checkout disabled below a $10 subtotal with a clear explanation
- URL routes for `/`, `/cart`, `/checkout/shipping`, `/checkout/payment`, and `/success`
- Shipping form managed with React state (no form library), Zod validation, and field-level messages
- Read-only payment summary showing shipping details, selected products, and the complete price breakdown
- Placing an order displays a confirmation and clears the cart

## Important limitations

This completes the assignment's required frontend flow. As specified, it does not use a payment gateway or a custom backend/database. Products are fetched from DummyJSON; cart contents are persisted in this browser's localStorage; shipping details are held in React state while the app is open. The confirmation is a client-side order-completion state, not a real stored order. A real commerce deployment would need server-side price/inventory verification, persistent orders, secure customer-data handling, and payment integration.

## Deployment and submission

The app can be deployed as a Vite static site on Vercel, Netlify, or Cloudflare Pages. Configure the build command as `pnpm build` and the output directory as `dist`. Publish the repository and deployment URLs after deploying; this project archive does not itself create a GitHub repository or a public deployment.
