# Everyday — Shopping Cart Application

## Project overview

Everyday is a responsive product browsing and shopping cart frontend. It loads product data from DummyJSON and supports a regular multi-product cart checkout as well as a separate Buy Now checkout for a single selected product. Checkout includes cart review, shipping details, a payment summary, and a client-side order confirmation.

## Technologies used

- React 19 + TypeScript
- Vite
- React Router for URL-based pages and browser history
- Bootstrap and custom responsive CSS
- Zustand + persist middleware for cart and Buy Now state persistence in localStorage
- TanStack Query for product fetching, caching, loading, and error states
- Zod for product API response validation and shipping form validation
- Vitest for pricing calculation tests

## Setup instructions

Requirements:

- Node.js 20.19+ or 22.12+
- pnpm

Install pnpm if it is not already available, then install the project dependencies:

```bash
npm install --global pnpm
pnpm install
```

## Commands to run the project

Start the development server and open the local URL printed by Vite (normally `http://localhost:5173`):

```bash
pnpm dev
```

Run the production build and serve the generated build locally:

```bash
pnpm build
pnpm preview
```

Run the pricing tests once:

```bash
pnpm exec vitest run
```

## API used

The app fetches up to 50 products from the public DummyJSON Products API:
[`https://dummyjson.com/products?limit=50`](https://dummyjson.com/products?limit=50).
The response is validated with Zod before product data is used. Product loading requires an internet connection and availability of the external API.

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
- Product details page with Add to Cart, Go to Cart, and Buy Now actions
- Product API loading, retryable error, empty API response, successful response, and empty search-result states
- Search by title, category filter, maximum-price filter, and clear filters
- Add/remove products, change quantity between 1 and 5, and visible cart item count
- Zustand persistence keeps cart and Buy Now selections after refresh
- Separate Buy Now cart review and checkout that does not mix in regular cart products
- Cart review with per-item totals, subtotal, 5% tax, conditional 10% discount when subtotal is greater than $100, and final total
- Checkout disabled below a $10 subtotal with a clear explanation
- URL routes for product browsing/details, regular cart review, Buy Now review, shipping, payment summary, and order confirmation
- Shipping form managed with React state (no form library), Zod validation, and field-level messages
- Read-only payment summary showing shipping details, selected products, and the complete price breakdown
- Placing an order displays a confirmation and clears only the state for the completed checkout
- Dark/light theme toggle with the preference stored in localStorage
- Vitest coverage for subtotal, tax, discount, checkout threshold, and empty-cart pricing calculations

## Known limitations

- There is no custom backend, database, or payment gateway. The payment summary is read-only and no payment is collected.
- Order confirmation is client-side only; orders are not saved to a server.
- Cart and Buy Now selections are stored in this browser's localStorage. Shipping details are held in React state and are lost when the page is reloaded.
- Product availability and data depend on the public DummyJSON API.
- A production commerce application would need server-side price and inventory verification, persistent orders, secure customer-data handling, and payment integration.

## Deployment and submission

The app can be deployed as a Vite static site on Vercel, Netlify, or Cloudflare Pages. Configure the build command as `pnpm build` and the output directory as `dist`. Publish the repository and deployment URLs after deploying; this project archive does not itself create a GitHub repository or a public deployment.