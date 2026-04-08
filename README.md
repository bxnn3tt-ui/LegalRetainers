# LegalRetainers

LegalRetainers is a marketing site and intake platform for signed legal case acquisition. Law firms can browse supported case types, request signed clients, submit contact inquiries, and send partnership/demo requests. Form submissions are routed into Twenty CRM as `opportunities`.

## Stack

- React 18
- TypeScript
- Vite
- Express
- Tailwind CSS
- Radix UI / shadcn primitives
- Zod
- Drizzle ORM

## How It Works

- The frontend is a Vite React app under [src](/Users/work/Downloads/LegalRetainers-main/src).
- The backend is a small Express server under [server](/Users/work/Downloads/LegalRetainers-main/server).
- Shared validation schemas live in [shared/schema.ts](/Users/work/Downloads/LegalRetainers-main/shared/schema.ts).
- Static business content like case definitions and blog content lives in [src/data](/Users/work/Downloads/LegalRetainers-main/src/data).
- Form submissions are handled in [server/routes.ts](/Users/work/Downloads/LegalRetainers-main/server/routes.ts) and pushed to Twenty via [server/twenty.ts](/Users/work/Downloads/LegalRetainers-main/server/twenty.ts).

## Requirements

- Node.js `22.9+`
- npm

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://127.0.0.1:5000
```

The frontend runs on `127.0.0.1:5000` and the backend runs on `127.0.0.1:3001`.

## Environment Variables

### Core

- `DATABASE_URL`
  Optional for local development. If omitted, rate limiting falls back to in-memory storage.

### Twenty CRM

- `TWENTY_API_KEY`
  Required if you want form submissions to sync into Twenty.

- `TWENTY_BASE_URL`
  Optional. Defaults to `https://api.twenty.com`.
  For self-hosted Twenty, set this to your CRM base URL or internal service URL.

- `TWENTY_ALLOW_INSECURE_TLS`
  Optional. Use `true` only in local development when your self-hosted Twenty instance uses an internal or self-signed certificate.

- `TWENTY_OBJECT_NAME`
  Optional. Defaults to `opportunities`.

- `TWENTY_OPPORTUNITY_NAME_FIELD`
  Optional. Defaults to `name`.

- `TWENTY_OPPORTUNITY_DESCRIPTION_FIELD`
  Optional. Leave blank unless your Twenty workspace actually has a description-like opportunity field.

- `TWENTY_OPPORTUNITY_*_FIELD`
  Optional field mappings for workspace-specific opportunity fields such as source, contact name, company name, phone, email, or stage.

## Forms

These routes create Twenty opportunities:

- `POST /api/send-newsletter`
- `POST /api/send-contact`
- `POST /api/send-law-firm-lead`
- `POST /api/send-claim-order`

Email is optional for the current submission flow.

## Build

```bash
npm run build
```

Production assets are written to [dist](/Users/work/Downloads/LegalRetainers-main/dist).

## Production Server

Start the backend directly with:

```bash
npm run start
```

The app can also be containerized with the existing [Dockerfile](/Users/work/Downloads/LegalRetainers-main/Dockerfile).

## Project Structure

```text
src/
  assets/           Static images
  components/       Reusable UI and feature components
  data/             Case and blog content
  pages/            Route-level pages
  utils/            SEO/schema/helpers

server/
  db.ts             Database connection and local fallback handling
  index.ts          Express server entrypoint
  routes.ts         Form API routes
  twenty.ts         Twenty CRM integration

shared/
  schema.ts         Shared Zod and Drizzle schemas
```

## Design System

The project uses a custom LegalRetainers design system centered around:

- `lr-` typography and utility classes in [src/index.css](/Users/work/Downloads/LegalRetainers-main/src/index.css)
- brand colors for blue, yellow, green, red, and black
- square corners, bold borders, and brutalist-inspired interaction styling

Core UI primitives live in [src/components/ui](/Users/work/Downloads/LegalRetainers-main/src/components/ui).

## Notes

- If you paste real API credentials into chat or logs, rotate them afterward.

## License

Proprietary. All rights reserved.
