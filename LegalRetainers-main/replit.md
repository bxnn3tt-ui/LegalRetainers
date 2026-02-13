# LegalRetainers.com

## Overview
Legal case marketplace for plaintiff law firms to acquire pre-signed cases. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Project Structure
```
src/
├── components/       # UI components
│   ├── blog/         # Blog components
│   └── ui/           # Core components (header, footer, buttons)
├── pages/            # Route pages
├── data/             # Static data (cases.ts, blog.ts)
├── utils/            # Utilities and schema generators
└── assets/           # Images

server/
├── index.ts          # Express server entry point (port 3001)
├── routes.ts         # API routes for email functionality
└── db.ts             # Drizzle database connection

shared/
└── schema.ts         # Drizzle schema and Zod validation schemas

public/
├── images/           # Blog and profile images
└── llm.txt           # LLM discovery file
```

## Development
```bash
npm run dev      # Runs frontend (port 5000) + backend (port 3001)
npm run build    # Production build to dist/
npm run db:push  # Push schema changes to database
```

## Backend API Routes
- `POST /api/send-newsletter` - Newsletter subscription
- `POST /api/send-contact` - Contact form submission  
- `POST /api/send-law-firm-lead` - Law firm demo request
- `POST /api/send-claim-order` - Exclusive lead order

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `RESEND_API_KEY` - Resend email API key (required for email functionality)

## Design System

Uses `lr-` prefixed CSS classes (LegalRetainers design system):

**Typography:** `lr-heading-xl`, `lr-heading-l`, `lr-heading-m`, `lr-heading-s`, `lr-body-l`, `lr-body`, `lr-body-s`

**Components:** `lr-card`, `lr-card-brutalist`, `lr-badge-*`, `lr-button-*`

**Colors:**
- Primary: #002966 (dark blue)
- Accent: #FFD900 (yellow)
- Success: #00703C (green)

**Neo-brutalist styling:** 2px black borders, offset shadows, square corners

Reference page: `/design-system`

## Key Routes
- `/` - Homepage
- `/cases` - Case marketplace
- `/cases/:slug` - Case detail
- `/request-clients` - Request form
- `/insights` - Blog
- `/about` - About page
- `/contact` - Contact page

## User Preferences
- Neo-brutalist aesthetic with bold borders
- Dark blue hero sections with white content areas
- Yellow CTAs, green search buttons
- Space Grotesk font for logo
- Mobile-first responsive design

## Component Patterns

**Breadcrumbs:** Use inline spans with `leading-none`, not ol/li structure. Chevrons are `h-3 w-3 inline-block align-middle`. This prevents oversized clickable areas on mobile.

## Brand Contact Info (Source of Truth)
- **Phone:** 305-900-5954
- **Email:** help@legalretainers.com
- **Address:** 2345 E Thomas Rd Ste 100 #498, Phoenix, AZ 85016
- **Website:** https://legalretainers.com

## SEO & Schema Notes
- Blog author: Dylan Bennett, Program Director (Content Strategy)
- Breadcrumb schema uses "Insights" (not "Blog") to match navigation
- SpecialAnnouncement schema deprecated by Google June 2025 - do not use
- FAQPage schema now restricted to government/health sites only

## Content Audit (Jan 2026)

**Verified Sources for Case Data:**
- SSA COLA: SSA.gov (2.5% for 2025, 2.8% for 2026)
- SSA Ruling 24-3p: Effective Jan 6, 2025 (vocational expert evidence)
- FCI Dublin: $116M settlement Dec 2024, 103 women (DOJ confirmed)
- Meta lawsuit: 42 state AGs filed Oct 2023 (verified)
- Uber safety: 2,717 sexual assault reports (2021-2022 data from 2024 report)
- Hyatt verdict: $177M (court records, upheld Dec 2024)
- Hilton verdict: $44M Nov 2021 (wrong room case, Houston)
- Resort verdict: $29.4M July 2024 (Marriott Residence Inn GA, minor assault)
- EEOC guidance: Updated April 29, 2024 (first in 25 years)
- Title IX: 2024 regulations vacated Jan 9, 2025 (Kentucky federal court)
- Louisiana vs Roblox: Filed Aug 14, 2025 (NOT 2024)
- CMS nursing home arbitration: 2019 rule still in effect (NO 2025 ban exists)
- California AB 2777: Sexual Abuse Cover-Up Accountability Act (SOL extension, NOT rideshare)
- California AB 1955: SAFETY Act (LGBTQ+ privacy, NOT abuse reporting)

**Do NOT reference:**
- Non-existent California AB 465 (therapist misconduct)
- False "2025 CMS arbitration ban" - does not exist
- Incorrect lookback window claims for DE/NM/MT (DE abolished SOL entirely, NM/MT windows closed)
