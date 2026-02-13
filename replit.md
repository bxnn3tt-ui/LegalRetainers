# LegalRetainers.com

## Overview

LegalRetainers is a marketplace platform where plaintiff law firms acquire pre-signed legal cases across multiple practice areas. The platform delivers pre-qualified clients with executed retainer agreements, allowing law firms to skip intake and start working immediately. Cases are delivered within 24-48 hours and cover 18+ case types across all 50 US states.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Routing**: React Router v6 for client-side navigation
- **State Management**: TanStack Query (React Query) for server state and data fetching
- **Styling**: Tailwind CSS with a custom design system using `lr-` prefixed CSS classes
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **SEO**: react-helmet-async for dynamic meta tags and structured data (Schema.org)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (tsx for execution)
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Port Configuration**: Frontend runs on port 5000, backend on port 3001 with Vite proxy

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` contains Drizzle table definitions
- **Validation**: Zod schemas for runtime type validation (integrated with drizzle-zod)
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)

### Key API Endpoints
- `POST /api/send-newsletter` - Newsletter subscription
- `POST /api/send-contact` - Contact form submission
- `POST /api/send-law-firm-lead` - Law firm demo request
- `POST /api/send-claim-order` - Exclusive lead order

### Rate Limiting
Rate limiting is implemented at the database level using a `rate_limits` table that tracks requests by IP address and function name with a configurable time window.

### Anti-Scraping Protection
The server includes middleware that protects against automated website scraping:
- **Blocked scrapers**: SiteSucker, HTTrack, WebCopy, Teleport, wget, curl, and 30+ other known scraping tools
- **Allowed bots**: LLM crawlers (GPTBot, ClaudeBot, PerplexityBot), search engines (Googlebot, Bingbot), and social media crawlers
- **Rate limiting**: IP-based rate limiting blocks IPs making more than 100 requests/minute
- **Empty UA blocking**: Requests with empty or very short user agents are blocked

### Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── blog/         # Blog-specific components
│   └── ui/           # Core shadcn/ui components
├── pages/            # Route page components
├── data/             # Static data (cases.ts, blog.ts)
├── hooks/            # Custom React hooks
├── utils/            # Utilities (schema generators, sitemap)
└── lib/              # Shared utilities (cn function)

server/
├── index.ts          # Express server entry point
├── routes.ts         # API route definitions
└── db.ts             # Drizzle database connection

shared/
└── schema.ts         # Drizzle schema and Zod validation
```

### Design System
The project uses a custom design system with CSS custom properties defined in `src/index.css`. Classes are prefixed with `lr-` (LegalRetainers) and follow neo-brutalist design principles with strong accessibility considerations.

## External Dependencies

### Email Service
- **Provider**: Resend
- **Environment Variable**: `RESEND_API_KEY`
- **Usage**: Transactional emails for form submissions (newsletter, contact, leads, orders)

### Database
- **Provider**: PostgreSQL (Neon serverless compatible via `@neondatabase/serverless`)
- **Environment Variable**: `DATABASE_URL`
- **Connection**: Connection pooling via `pg` package

### Fonts
- Google Fonts: Inter, Source Sans Pro, Space Grotesk (loaded via CDN)

### Development Tools
- **lovable-tagger**: Component tagging plugin for development mode
- **ESLint**: Code linting with TypeScript and React hooks plugins
- **Terser**: Production build minification and obfuscation

### SEO & Discoverability
- Custom Schema.org structured data generation
- LLM discovery file at `/public/llm.txt`
- Sitemap generation utilities
- robots.txt configured for AI crawler access