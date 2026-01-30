# Node Stripe Demo

A minimal Express + TypeScript API that exposes Stripe-backed subscription and one-time purchase endpoints. Entry point: [`src/server.ts`](src/server.ts).

## Prerequisites

- Node.js ≥ 18
- pnpm (project uses `pnpm@10.20.0`)
- Stripe account & secret key

## Setup

1. Install deps:
   ```sh
   pnpm install
   ```
2. Configure environment:
   - Copy `.env` and set `STRIPE_SECRET_KEY` (see [`src/lib/stripe.ts`](src/lib/stripe.ts) for usage).
3. Run in dev:
   ```sh
   pnpm dev
   ```
4. Build & start:
   ```sh
   pnpm build
   pnpm start
   ```

## API

- `GET /api/subscription/plans` — returns [`PLANS`](src/constants/plans.ts).
- `POST /api/subscription/create` — body: `{ planId, email }`; handles one-time and monthly flows (see [`subscription.routes.ts`](src/routes/subscription.routes.ts)).
- `POST /api/courses/purchase` — body: `{ priceId }`; creates Stripe Checkout session (see [`courses.routes.ts`](src/routes/courses.routes.ts)).

## Project Structure

- [`src/server.ts`](src/server.ts) — app bootstrap, middleware, route mounting.
- [`src/routes`](src/routes) — subscription and course endpoints.
- [`src/constants/plans.ts`](src/constants/plans.ts) — plan catalog typed with [`Plan`](src/types/subscription.type.ts).
- [`src/lib/stripe.ts`](src/lib/stripe.ts) — Stripe SDK initialization.

## Notes

- Express 5 with JSON + CORS middleware.
- Stripe API version set via `apiVersion` in [`src/lib/stripe.ts`](src/lib/stripe.ts).
- Update product/price IDs in [`PLANS`](src/constants/plans.ts) before production use.
