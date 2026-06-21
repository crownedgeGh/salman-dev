## Context

BrokerBoss is a brand-new, frontend-only Next.js 14 web application for the Raipur, Chhattisgarh real estate market. There is no existing codebase. The entire data layer is static TypeScript files (dummy data) that will later be swapped for real API calls once the backend is built. The UI is built entirely with Shadcn/ui components styled with the custom tweakcn neutral monochrome theme.

The app targets three user types:
1. **Visitors (unauthenticated)** — browse listings, see partial broker info
2. **Logged-in users** — see full broker phone numbers (mock auth state for now)
3. **Brokers** — will post listings in a future iteration (Google Auth + backend)

## Goals / Non-Goals

**Goals:**
- Scaffold a production-quality Next.js 14 (App Router) project with Shadcn/ui and Tailwind CSS
- Build 4 fully responsive pages: Home, Properties, Services, Contact Us
- Implement property listing cards with responsive grid (4-col desktop, 3-col tablet, 2-col mobile)
- Implement global search on Home, sidebar filters on Properties page
- Implement "Call Broker" with conditional behavior (mobile dialpad / web reveal on login)
- Populate with 20+ realistic dummy listings for Raipur, Chhattisgarh
- Support light/dark mode toggle via `next-themes`
- Full SEO metadata on every page

**Non-Goals:**
- No real backend, no API routes, no database connections
- No real Google OAuth — auth state is a mocked `useState` toggle
- No broker dashboard / listing management UI
- No property detail page (single card view only)
- No images or videos anywhere in the UI
- No payment or subscription features

## Decisions

### Decision 1: Next.js 14 App Router (not Pages Router)

**Chosen**: App Router with `app/` directory.

**Rationale**: App Router is the modern Next.js standard (2024+), supports React Server Components, and has first-class layout support — crucial for the shared Navbar/Footer shell across all pages.

**Alternative considered**: Pages Router — rejected because it's legacy and the team will build the backend in a modern stack.

---

### Decision 2: Static TypeScript data files (not JSON)

**Chosen**: `src/data/properties.ts`, `src/data/brokers.ts`, `src/data/services.ts` with typed interfaces.

**Rationale**: TypeScript data files allow us to define interfaces/types alongside data, giving full autocomplete and type safety for all consumers. This makes the eventual API migration clean — just replace the import source with an `axios` call returning the same shape.

**Alternative considered**: JSON files — rejected because no type safety.

---

### Decision 3: Mock auth state with React Context

**Chosen**: A `AuthContext` wrapping the app, exposing `isLoggedIn: boolean` and `toggleLogin()` — with a temporary "Login / Logout" button in the navbar for demo purposes.

**Rationale**: This accurately models the future real auth state shape without needing any real OAuth. The "Call Broker" component only depends on `isLoggedIn`, making it trivially swappable with real auth later.

**Alternative considered**: Hardcoded `false` everywhere — rejected because it prevents demo of the conditional reveal feature.

---

### Decision 4: `react-icons` exclusively (no SVGs, no emojis)

**Chosen**: All icons sourced from `react-icons` (e.g., `FaHome`, `FaBuilding`, `FaPhone`, `FaMapMarkerAlt`).

**Rationale**: User requirement. `react-icons` is a tree-shakeable library covering FontAwesome, Material Icons, Heroicons, etc., giving a wide selection without any raw SVG markup.

---

### Decision 5: Shadcn/ui component library (not Radix UI raw)

**Chosen**: Shadcn/ui with `npx shadcn@latest init` generating components into `src/components/ui/`.

**Rationale**: Shadcn gives pre-built, accessible, customizable components (Card, Button, Input, Badge, Select, Sheet, etc.) that work natively with the tweakcn theme CSS variables. Saves significant dev time vs. raw Radix.

---

### Decision 6: Sidebar filters (Sheet component on mobile)

**Chosen**: On desktop, filters render as a fixed left sidebar. On mobile, filters are inside a Shadcn `Sheet` (slide-over drawer) triggered by a filter button.

**Rationale**: Standard responsive filter pattern for property listing sites. Keeps the mobile card grid full-width.

---

### Decision 7: `tel:` link for "Call Broker" on mobile

**Chosen**: On mobile breakpoint, "Call Broker" renders as `<a href="tel:+91XXXXXXXXXX">` regardless of login state — because mobile dialpad is the natural interaction and privacy is less of a concern (the number isn't displayed on screen).

**Rationale**: UX practicality — on mobile you expect to tap and call. Requiring login before calling on mobile is too much friction.

---

### Decision 8: Google Maps embed placeholder

**Chosen**: On the Contact page, an `<iframe>` pointing to a Google Maps embed URL for Raipur city centre, styled as a responsive block.

**Rationale**: Simple, no API key needed for basic embeds. Production will swap this for the Maps JavaScript API or a `@react-google-maps/api` component.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Dummy data feels fake/thin | Use 20+ listings across all property types with realistic Raipur localities (Shankar Nagar, Telibandha, Pandri, Mowa, VIP Road, Khamardih) |
| Mock auth is misleading to stakeholders | Add a prominent "Demo Mode" badge in the navbar when auth is mocked |
| Filter state complexity grows | Keep filters as simple `useState` in the Properties page component; no global state manager needed at this scale |
| Shadcn component version conflicts | Pin `shadcn@latest` at init time and commit lockfile |
| "Call Broker" number leakage on web | Numbers are only rendered in the DOM when `isLoggedIn === true`; not just CSS-hidden |
