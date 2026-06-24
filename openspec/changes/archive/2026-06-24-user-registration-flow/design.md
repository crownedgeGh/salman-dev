## Context

BrokerBoss is a Next.js 14 app-router project with Tailwind CSS (via `@import "tailwindcss"`), shadcn/ui components, and `react-icons/fa`. The existing `AuthContext` exposes only `isLoggedIn` (boolean) and `toggleLogin()`. There is no real back-end; all state is purely client-side. The Navbar already imports and uses `useAuth`. Theme tokens are defined in `globals.css` as CSS custom properties (`--primary`, `--background`, `--foreground`, etc.) and the design system must respect them exclusively.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, theme-consistent role-selection modal triggered by a new **Register** button in the Navbar
- Capture role-specific registration details through dedicated full-page form components (Owner, Broker, Buyer)
- Show a **POST AD** button in the Navbar only for Owner and Broker roles after login
- Extend `AuthContext` to store `userRole` and a `userProfile` object; expose `register(role, profile)` and `logout()` helpers
- Ensure all UI uses react-icons (no emoji), and all colours reference theme CSS variables only

**Non-Goals:**
- Real API / backend persistence
- Image upload for properties or avatars
- Full street addresses (city + area only)
- Email/password authentication (mock registration only for now)
- Admin or agent-management dashboards

## Decisions

### D1 — Client-side only state (no backend)
**Decision**: Use `useState` inside `AuthProvider`; no API calls.
**Rationale**: Project is still in UI-prototype phase; adding a backend would block front-end progress. This decision is explicitly reversible — the `register(role, profile)` signature is designed to be swapped for a real API call later.
**Alternative**: Next.js Server Actions + a SQLite DB — deferred until backend phase.

### D2 — Role-selection via modal, forms on dedicated pages
**Decision**: Role-selection is a `Dialog` (shadcn/ui) popup. After selecting a role, the user is navigated to `/register/owner`, `/register/broker`, or `/register/buyer` (dedicated Next.js pages/routes). Form submission redirects to the home page and sets auth state.
**Rationale**: A modal-within-modal UX is cramped especially on mobile; separate pages allow full-width responsive forms, proper `<form>` semantics, and individual metadata.
**Alternative**: Multi-step wizard inside the modal — considered but rejected due to complexity and poor mobile experience.

### D3 — Extend AuthContext (not replace)
**Decision**: Keep `isLoggedIn` + `toggleLogin` for backward compatibility; add `userRole`, `userProfile`, `register()`, and `logout()`.
**Rationale**: Navbar and other consumers already use `isLoggedIn`. Removing it would require updating all usages simultaneously.

### D4 — POST AD button placement
**Decision**: Rendered in the Navbar's desktop right-controls section and in the mobile sheet, conditionally on `userRole === 'owner' || userRole === 'broker'`.
**Rationale**: Always-visible Navbar placement matches the brief ("show POST AD button on top"). For now it routes to `/post-ad` (placeholder page).

### D5 — Multi-select property types for Buyer
**Decision**: Custom toggle-button grid (not a `<select multiple>`) using theme-accented pill buttons. Selected types stored as an array in form state.
**Rationale**: Multi-select native element is notoriously hard to use on mobile. Pill-toggle pattern is familiar, touch-friendly, and on-brand.

## Risks / Trade-offs

- **State loss on refresh** → Client-side only state is lost on page reload. Mitigation: document this clearly; add `sessionStorage` persistence as a follow-up.
- **No real auth security** → Mock registration accepts any input. Mitigation: clearly label as demo; replace with real auth (NextAuth/Clerk) later without changing the component API.
- **Route conflicts** → `/register/*` routes must be added. Mitigation: confirm no existing pages at those paths (currently none detected).
- **Form field scope** → Buyer profile fields (budget range, preferred areas) are assumptions per the brief. Mitigation: fields are minimal and easy to add/remove without architectural change.
