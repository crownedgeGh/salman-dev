## Why

The Raipur, Chhattisgarh real estate market lacks a clean, broker-centric digital platform. BrokerBoss solves this by listing properties (houses, shops, flats, plots, homes, offices) with full textual data — excluding images and full addresses to prevent copyright issues and broker poaching. The platform lets brokers register, post listings, and connect with buyers via phone calls — all without exposing sensitive identifiers.

## What Changes

- Scaffold a new Next.js 14 app (App Router) called **BrokerBoss**
- Implement Shadcn/ui component library with the custom tweakcn theme (neutral monochrome)
- Build 4 pages: Home (`/`), Properties (`/properties`), Services (`/services`), Contact Us (`/contact`)
- Implement responsive property listing cards (4-col desktop, 3-col tablet, 2-col mobile)
- Implement a global search bar on the Home page filtering dummy listings
- Implement a sidebar filter panel on the Properties page (city, type, price range, purpose)
- Implement "Call Broker" behavior: mobile → `tel:` dialpad, web → reveal number only when logged in (mocked auth state)
- Populate app with rich dummy data (20+ listings, 5+ brokers) for Raipur, Chhattisgarh
- Implement dark/light mode toggle
- SEO-optimize all pages with metadata, titles, and semantic HTML
- Use `react-icons` exclusively (no SVGs, no emojis)

## Capabilities

### New Capabilities

- `property-listing-cards`: Responsive card grid displaying textual property data (type, area, price, locality, description, broker info) with mobile/tablet/desktop layouts
- `property-search`: Global search bar on Home page that filters listings by type, locality, city, or description in real-time
- `property-filters`: Sidebar filter panel on Properties page supporting filter by property type, purpose (Sale/Rent), city/locality, and price range
- `call-broker`: CTA button on each card — opens `tel:` link on mobile, reveals broker phone number on web when user is logged in (mock auth state), else prompts login
- `services-page`: Informational page listing 6 broker services offered by BrokerBoss
- `contact-page`: Contact Us page with Raipur office address, phone, email, and an embedded map placeholder
- `theme-dark-mode`: Light/dark mode toggle using Shadcn ThemeProvider, respecting system preference by default
- `dummy-data-layer`: Static TypeScript data files (`data/properties.ts`, `data/brokers.ts`, `data/services.ts`) representing realistic Raipur real estate listings and broker profiles

### Modified Capabilities

*(None — this is a new project)*

## Impact

- **New project**: Next.js 14 app scaffolded from scratch in the workspace root
- **Dependencies**: `next`, `react`, `react-dom`, `tailwindcss`, `shadcn/ui`, `react-icons`, `next-themes`, `clsx`, `tailwind-merge`
- **No backend**: All data is static TypeScript files; no API routes, no database, no auth logic
- **Future**: Backend API integration will replace `data/*.ts` files with `axios` calls to a MongoDB-backed Node.js API; Google OAuth via `next-auth` will replace the mock auth state
