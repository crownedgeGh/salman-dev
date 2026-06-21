## 1. Project Scaffold & Configuration

- [x] 1.1 Bootstrap Next.js 14 app with App Router in the workspace using `npx create-next-app@latest`
- [x] 1.2 Install and configure Tailwind CSS (comes with create-next-app)
- [x] 1.3 Initialize Shadcn/ui with `npx shadcn@latest init` and apply tweakcn neutral theme CSS variables
- [x] 1.4 Install additional dependencies: `react-icons`, `next-themes`, `clsx`, `tailwind-merge`
- [x] 1.5 Add Shadcn components used by the app: Button, Card, Badge, Input, Select, Sheet, Separator, Tooltip

## 2. Types & Dummy Data Layer

- [x] 2.1 Create `src/types/index.ts` with `Property`, `Broker`, `Service`, `PropertyType`, `Purpose` TypeScript interfaces
- [x] 2.2 Create `src/data/brokers.ts` with 5+ realistic Raipur broker profiles (name, phone, yearsExperience)
- [x] 2.3 Create `src/data/properties.ts` with 20+ dummy listings covering all 7 property types across Raipur localities
- [x] 2.4 Create `src/data/services.ts` with 6 service definitions (icon name, title, description)

## 3. Global Layout & Providers

- [x] 3.1 Create `src/app/layout.tsx` with ThemeProvider (`next-themes`), AuthContext wrapper, and global font import
- [x] 3.2 Create `src/context/AuthContext.tsx` with `isLoggedIn: boolean` and `toggleLogin()` mock auth state
- [x] 3.3 Create `src/components/layout/Navbar.tsx` with logo (BrokerBoss), nav links (Home, Properties, Services, Contact Us), dark mode toggle, and mock Login/Logout button
- [x] 3.4 Create `src/components/layout/Footer.tsx` with branding, quick links, and copyright
- [x] 3.5 Make Navbar responsive: hamburger menu on mobile using Shadcn Sheet component

## 4. Reusable Components

- [x] 4.1 Create `src/components/PropertyCard.tsx` — card rendering all listing fields, property type badge, broker name, and Call Broker CTA
- [x] 4.2 Implement "Call Broker" logic in PropertyCard: mobile → `tel:` link; web + logged in → show phone number; web + logged out → "Login to view number" message (number NOT in DOM when hidden)
- [x] 4.3 Create `src/components/SearchBar.tsx` — controlled input with search icon, used on Home page
- [x] 4.4 Create `src/components/PropertyGrid.tsx` — responsive grid wrapper (4/3/2 columns) rendering PropertyCard list with empty state
- [x] 4.5 Create `src/components/FilterSidebar.tsx` — filter panel with Type, Purpose, City/Locality, Price Range filters and Clear Filters button
- [x] 4.6 Create `src/components/FilterSheet.tsx` — mobile slide-over Sheet wrapping FilterSidebar, triggered by "Filters" button

## 5. Home Page

- [x] 5.1 Create `src/app/page.tsx` with a hero section: headline, subtitle, and SearchBar
- [x] 5.2 Implement client-side search filtering of listings from `data/properties.ts` using the SearchBar query
- [x] 5.3 Render filtered listings in PropertyGrid below the hero section
- [x] 5.4 Add SEO metadata: title "BrokerBoss – Find Properties in Raipur", meta description

## 6. Properties Page

- [x] 6.1 Create `src/app/properties/page.tsx` with two-column layout: FilterSidebar (desktop) and PropertyGrid
- [x] 6.2 Implement filter state: type, purpose, locality, priceMin, priceMax as `useState` in the page
- [x] 6.3 Apply all active filters to the listings array before passing to PropertyGrid
- [x] 6.4 Render FilterSheet trigger button on mobile, hide sidebar on mobile
- [x] 6.5 Add SEO metadata: title "All Properties – BrokerBoss Raipur"

## 7. Services Page

- [x] 7.1 Create `src/app/services/page.tsx` with a hero section header
- [x] 7.2 Render 6 service cards from `data/services.ts`, each with react-icons icon, title, and description
- [x] 7.3 Make service card grid responsive (3-col desktop, 2-col tablet, 1-col mobile)
- [x] 7.4 Add SEO metadata: title "Our Services – BrokerBoss Raipur"

## 8. Contact Us Page

- [x] 8.1 Create `src/app/contact/page.tsx` with a two-column layout: office info + contact form (left), map (right)
- [x] 8.2 Render office details: address (Shankar Nagar, Raipur), phone, email, working hours with react-icons
- [x] 8.3 Embed Google Maps iframe centered on Raipur, Chhattisgarh, responsive (full-width, 400px height)
- [x] 8.4 Build contact form UI with Name, Email, Phone (optional), Message fields and Submit button (UI only, no submission)
- [x] 8.5 Add SEO metadata: title "Contact Us – BrokerBoss Raipur"

## 9. Polish & Responsive QA

- [x] 9.1 Verify dark mode toggle works correctly on all 4 pages and theme persists on refresh
- [x] 9.2 QA card grid responsive breakpoints: 4-col (desktop), 3-col (tablet), 2-col (mobile) on Home and Properties
- [x] 9.3 QA Navbar hamburger menu on mobile across all pages
- [x] 9.4 QA FilterSheet opens and closes correctly on mobile on Properties page
- [x] 9.5 QA "Call Broker" behavior: mobile dialpad, web logged-out message, web logged-in number reveal
- [x] 9.6 Verify phone numbers are absent from DOM when user is logged out (web)
- [x] 9.7 Run `npm run build` to verify no TypeScript or build errors
