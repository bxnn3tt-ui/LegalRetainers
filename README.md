# LegalRetainers

LegalRetainers is a marketing site and intake platform for signed legal case acquisition. Law firms can browse supported case types, request signed clients, submit contact inquiries, and send partnership/demo requests. Form submissions can be routed into Twenty CRM directly, forwarded to n8n, or delivered to both.

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

- The frontend is a Vite React app under [`src`](./src).
- The backend is a small Express server under [`server`](./server).
- Shared validation schemas live in [`shared/schema.ts`](./shared/schema.ts).
- Static business content like case definitions and blog content lives in [`src/data`](./src/data).
- Form submissions are handled in [`server/routes.ts`](./server/routes.ts).
- Delivery targets are coordinated in [`server/form-delivery.ts`](./server/form-delivery.ts).
- Twenty integration lives in [`server/twenty.ts`](./server/twenty.ts).
- n8n webhook forwarding lives in [`server/n8n.ts`](./server/n8n.ts).

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

3. In `.env`, disable coming-soon mode so the full local site is visible:

```bash
VITE_SITE_COMING_SOON=false
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://127.0.0.1:5000
```

The frontend runs on `127.0.0.1:5000` and the backend runs on `127.0.0.1:3001`.

## Environment Variables

### Core

- `DATABASE_URL`
  Optional for local development. If omitted, rate limiting falls back to in-memory storage.

- `VITE_SITE_COMING_SOON`
  Optional. Set to `false` to render the full app and routes.
  If not set to `false`, the app renders a "Coming soon" page.

- `DISABLE_FORM_RATE_LIMITS`
  Optional. Set to `true` to bypass form submission rate limits while testing.

### Twenty CRM

- `TWENTY_API_KEY`
  Required for current form submission endpoints (`/api/send-contact`, `/api/send-law-firm-lead`, `/api/send-claim-order`).
  If missing, those endpoints return server errors.

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

- `TWENTY_OPPORTUNITY_SOURCE_FIELD`
  Optional. Field mapping for submission source.

- `TWENTY_OPPORTUNITY_CONTACT_NAME_FIELD`
  Optional. Field mapping for contact name.

- `TWENTY_OPPORTUNITY_COMPANY_NAME_FIELD`
  Optional. Field mapping for company/firm name.

- `TWENTY_OPPORTUNITY_EMAIL_FIELD`
  Optional. Field mapping for contact email.

- `TWENTY_OPPORTUNITY_PHONE_FIELD`
  Optional. Field mapping for contact phone.

- `TWENTY_OPPORTUNITY_STAGE_FIELD`
  Optional. Field mapping for stage field.

- `TWENTY_OPPORTUNITY_STAGE_VALUE`
  Optional. Stage value sent only when `TWENTY_OPPORTUNITY_STAGE_FIELD` is set.

### Form Delivery

- `FORM_SUBMISSION_TARGETS`
  Optional. Comma-separated delivery targets: `twenty`, `n8n`, or both like `twenty,n8n`.
  Defaults to `twenty`.

- `N8N_FORM_WEBHOOK_URL`
  Optional default webhook used when a form-specific override is not set.

- `N8N_CONTACT_WEBHOOK_URL`
  Optional contact-form-specific webhook URL, such as `https://n8n.legalretainers.com/webhook/legalretainers/contact`.

- `N8N_REQUEST_CASES_WEBHOOK_URL`
  Optional request-form-specific webhook URL shared by both claim orders and partnership inquiries, such as `https://n8n.legalretainers.com/webhook/legalretainers/request-cases`.

- `N8N_FORM_WEBHOOK_SECRET`
  Optional shared secret sent to n8n in a custom header.

- `N8N_FORM_WEBHOOK_SECRET_HEADER`
  Optional. Defaults to `x-legalretainers-secret`.

- `N8N_FORM_WEBHOOK_TIMEOUT_MS`
  Optional timeout for webhook delivery. Defaults to `10000`.

- `N8N_ALLOW_INSECURE_TLS`
  Optional. Use `true` only in local development when your internal n8n certificate is signed by a local or self-managed CA that Node does not trust.

- `N8N_TEST_WEBHOOK_URL`
  Optional. When set, the contact form route triggers this URL server-side after a successful submit.
  Useful for webhook testing without relying on a browser cross-origin request.

## Forms

These routes create form submission payloads:

- `POST /api/send-contact`
- `POST /api/send-law-firm-lead`
- `POST /api/send-claim-order`

Email is optional for the current submission flow.

Each submission can now be sent to:

- Twenty directly
- n8n directly
- both Twenty and n8n during a migration

When forwarding to n8n, the backend sends a normalized JSON payload shaped like:

```json
{
  "type": "contact-form",
  "title": "Contact inquiry - Jane Doe",
  "description": "Submission type: Contact inquiry\nName: Jane Doe\n...",
  "submittedAt": "2026-04-12T18:55:00.000Z",
  "contactName": "Jane Doe",
  "companyName": "Example Law",
  "email": "jane@example.com",
  "phone": "555-555-5555",
  "details": {
    "submissionType": "Contact inquiry",
    "message": "We need inventory in Arizona"
  },
  "metadata": {
    "clientIp": "203.0.113.10",
    "endpoint": "/api/send-contact",
    "userAgent": "Mozilla/5.0 ..."
  }
}
```

## n8n Setup

Recommended pattern:

1. Create one `Webhook` node for contact forms and one shared `Webhook` node for request flows if you want separate workflows.
2. In the request workflow, add a `Switch` node on `{{$json.type}}` to split `claim-order` and `law-firm-demo`.
3. Add a Twenty step:
   - either use the Twenty community node package in n8n
   - or use an `HTTP Request` node against your Twenty `/rest/...` API
4. Add any additional routing such as Mattermost after the CRM step.

During rollout, set `FORM_SUBMISSION_TARGETS=twenty,n8n` so your existing direct Twenty sync keeps working while you validate the n8n workflow.

## Build

```bash
npm run build
```

Production assets are written to [`dist`](./dist).

## Production Server

Start the backend directly with:

```bash
npm run start
```

Run `npm run build` before `npm run start` when serving the full production app.

The app can also be containerized with the existing [`Dockerfile`](./Dockerfile).

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
  form-delivery.ts  Delivery routing for Twenty and n8n
  index.ts          Express server entrypoint
  n8n.ts            n8n webhook integration
  routes.ts         Form API routes
  twenty.ts         Twenty CRM integration

shared/
  schema.ts         Shared Zod and Drizzle schemas
```

## Design System

The project uses a custom LegalRetainers design system centered around:

- `lr-` typography and utility classes in [`src/index.css`](./src/index.css)
- brand colors for blue, yellow, green, red, and black
- square corners, bold borders, and brutalist-inspired interaction styling

Core UI primitives live in [`src/components/ui`](./src/components/ui).

## Notes

- If you paste real API credentials into chat or logs, rotate them afterward.

## License

Proprietary. All rights reserved.
