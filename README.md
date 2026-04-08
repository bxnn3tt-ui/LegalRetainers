# LegalRetainers.com

A marketplace platform where plaintiff law firms acquire pre-signed legal cases across multiple practice areas.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **Routing:** React Router v6
- **Data Fetching:** TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Optional: create a local env file
cp .env.example .env

# Start development server
npm run dev
```

The app runs on `http://localhost:5000` by default.

### Local Environment Variables

For basic local development, environment variables are optional.

- `DATABASE_URL`: Optional for local browsing. If omitted, the app falls back to an in-memory rate limiter instead of Postgres.
- `RESEND_API_KEY`: Optional for local browsing. Contact and order forms will render, but email submission endpoints will return a configuration error until this is set.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── blog/         # Blog-related components
│   └── ui/           # Core UI components (header, footer, buttons, etc.)
├── pages/            # Route page components
├── data/             # Static data (cases, blog posts)
├── utils/            # Utility functions and helpers
└── assets/           # Images and static assets

public/
├── images/           # Public images
└── ...               # Other static files
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero and featured case categories |
| `/cases` | Case marketplace with filtering |
| `/cases/:slug` | Individual case detail page |
| `/request-clients` | Case request form |
| `/insights` | Blog and industry updates |
| `/about` | About the company |
| `/contact` | Contact information and form |

## Design System

The project uses a custom design system with `lr-` prefixed CSS utility classes:

- **Typography:** `lr-heading-xl`, `lr-heading-l`, `lr-body`, etc.
- **Components:** `lr-card`, `lr-badge-*`, `lr-button-*`
- **Layout:** `lr-container`, `lr-section`

Reference documentation available at `/design-system` in development.

## License

Proprietary - All rights reserved.
