# Everyday — Shopping Cart Application

## About Everyday

**Everyday** is a **modern, responsive shopping cart application** built with **React and TypeScript**, designed to make online shopping **simple and intuitive**. It features **clean product listings**, easy search and filtering, a **compact cart and order summary**, and a **guided checkout experience** with clear pricing. Additional features include **Buy Now**, **persistent cart state**, **product sorting**, and **dark/light mode**, combining **user-friendly design** with practical frontend development.

## Technologies Used

- **React 19 + TypeScript** — Component-based user interface and type safety
- **Vite** — Development server and production builds
- **React Router** — Page navigation and checkout routes
- **Bootstrap + Custom CSS** — Responsive layouts and styling
- **Zustand** — Cart state management and localStorage persistence
- **TanStack Query** — API fetching, caching, and loading/error states
- **Zod** — API response and shipping form validation
- **Vitest** — Unit testing for pricing calculations

## Features

### Product Browsing
- Responsive product grid displaying images, titles, categories, prices, and ratings
- Product details page with **Add to Cart**, **Go to Cart**, and **Buy Now** actions
- Search products by title
- Filter by category and maximum price, with an option to clear filters
- Loading skeletons, error handling with retry, and empty-result states
- Product sorting by price, name, and rating

### Cart and Pricing
- Add and remove products and update quantities between 1 and 5
- Persistent cart state and visible cart item count
- Automatic subtotal, 5% tax, and a 10% discount when the subtotal exceeds $100
- Checkout disabled when the subtotal is below $10, with a clear explanation
- Separate Buy Now checkout that does not mix selected products with the regular cart

### Checkout Flow
- Multi-step checkout: **Cart Review → Shipping → Payment Summary → Order Confirmation**
- Shipping form managed with React state and validated using Zod
- Field-level validation messages for invalid shipping details
- Read-only payment summary showing shipping information, selected products, and price breakdown
- Order confirmation after placing an order, with the completed checkout state cleared appropriately

### Additional Features
- Dark and light themes with the selected preference saved in localStorage
- URL-based navigation for product details and checkout pages
- Unit tests covering subtotal, tax, discount, checkout threshold, and empty-cart calculations

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- pnpm

### Installation

```bash
npm install --global pnpm
pnpm install
```

### Run the Development Server

```bash
pnpm dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Build for Production

```bash
pnpm build
pnpm preview
```

### Run Tests

```bash
pnpm exec vitest run
```

## API

The application fetches up to 50 products from the [DummyJSON Products API](https://dummyjson.com/products?limit=50). Product responses are validated using Zod before being used by the application.

An internet connection and API availability are required to load products.

## Project Structure

```text
src/
├── api/
│   └── products.ts
├── components/
│   ├── CheckoutStepper.tsx
│   ├── Header.tsx
│   ├── OrderSummary.tsx
│   ├── ProductCard.tsx
│   └── ShippingForm.tsx
├── hooks/
│   ├── useProductFilters.ts
│   └── useProducts.ts
├── pages/
│   ├── ProductsPage.tsx
│   ├── CartPage.tsx
│   ├── ShippingPage.tsx
│   ├── PaymentPage.tsx
│   └── SuccessPage.tsx
├── store/
│   └── cartStore.ts
├── types/
│   └── product.ts
├── utils/
│   ├── pricing.ts
│   └── shippingSchema.ts
├── App.tsx
└── main.tsx
```

## Known Limitations

- No custom backend, database, or payment gateway is integrated.
- Orders are confirmed on the client side and are not saved to a server.
- Cart and Buy Now state persist in localStorage, but shipping details are held in React state and are lost on page reload.
- Product data depends on the public DummyJSON API.

A production-ready commerce application would require secure backend processing, server-side price and inventory verification, persistent order storage, and payment integration.

## Deployment

The application can be deployed as a static site using Vercel, Netlify, or Cloudflare Pages.

- **Build command:** `pnpm build`
- **Output directory:** `dist`

Add the GitHub repository and live deployment URLs here once they are available.
