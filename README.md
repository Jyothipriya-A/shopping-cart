# Shopping Cart App

A polished React + Vite storefront demo built around a simple, production-minded shopping experience. The app lets users browse products, inspect details, add items to a cart, and manage checkout-like state with a persistent client-side cart.

## Overview

This project demonstrates a clean frontend architecture for an e-commerce-style experience without a backend. It uses React Router for page navigation, a context-based cart system for shared state, and a service layer to abstract API calls and data normalization.

## Features

- Product listing with pagination controls
- Product detail view with add-to-cart actions
- Cart management with quantity updates, total price calculation, and clear-cart support
- Persistent cart state using localStorage
- Responsive, component-based UI structure
- API integration with fallback image handling and normalization

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- ESLint for code quality

## Project Structure

```text
src/
  components/        # Reusable UI components such as Navbar, ProductCard, and CartItem
  context/           # Cart context provider and custom hook
  pages/             # Home, ProductDetails, and Cart pages
  services/          # API integration and data normalization logic
  assets/            # Static assets and local resources
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run the ESLint checks

## Architecture Notes

- The app follows a simple separation of concerns:
  - UI lives in pages and components
  - Cart behavior is centralized in the context layer
  - Product fetching is abstracted into the service layer so the rest of the app does not depend directly on the external API shape
- The cart state is managed with `useReducer` and persisted to localStorage so it survives browser refreshes.

## API Source

Product data is fetched from the Platzi e-commerce API. The service layer normalizes the incoming payload and sanitizes image URLs so the UI can consume the data consistently.

## Notes

This is a frontend-focused demo project, so there is no backend, authentication, or checkout flow. Its purpose is to showcase a maintainable React structure for a shopping experience rather than provide a full production commerce platform.
