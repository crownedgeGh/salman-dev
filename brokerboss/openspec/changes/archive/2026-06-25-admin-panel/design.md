## Context

BrokerBoss is a Next.js 15 (App Router) real estate platform with existing public-facing pages for property listings, a post-ad flow, and user registration. The project uses shadcn/ui, Tailwind CSS v4, and the existing blue-toned theme. There is currently no admin interface — oversight, moderation, and analytics must be done directly in the database. The admin panel will be built as a protected route group within the same Next.js app, reusing the existing component system and adding the amber-minimal shadcn theme.

## Goals / Non-Goals

**Goals:**
- Deliver four admin pages (Dashboard, Users, Properties, Ads) under `/admin`
- Implement a shared `AdminTable` component that renders as a table on `lg+` and as responsive cards on `sm`/`md`
- Apply the amber-minimal theme (`https://tweakcn.com/r/themes/amber-minimal.json`) to the admin shell
- Provide dual-format image upload UI in the Ads page (16:9 landscape + 9:16 portrait)
- Ensure full responsiveness — sticky sidebar on desktop, slide-in drawer on mobile
- Keep all admin routes under `app/admin/` with a shared layout

**Non-Goals:**
- Real authentication/authorization enforcement (route protection can be a stub — actual auth guard is a separate concern)
- Backend API integration (all data will use realistic mock/placeholder data)
- Multi-role RBAC (single admin role assumed)
- Email notifications or audit logging

## Decisions

### D1 — Route Group: `app/(admin)/` vs `app/admin/`

**Decision**: Use `app/admin/` (non-grouped) for simplicity.

**Rationale**: A standard directory keeps URLs predictable (`/admin`, `/admin/users`, etc.) without Next.js route group indirection. The admin layout is self-contained and does not need to share layout with public routes.

**Alternative considered**: `app/(admin)/` route group — rejected because it adds indirection without benefit since the admin and public layouts are entirely different.

---

### D2 — Theme application: global vs scoped

**Decision**: Install amber-minimal theme tokens globally (into `globals.css`) alongside the existing theme, but scope the admin amber tokens using a `.admin-theme` class on the admin layout wrapper.

**Rationale**: The existing public site uses the blue-toned theme. Overwriting globals would break public pages. By wrapping the admin layout in `<div className="admin-theme">`, CSS variables can be overridden within the admin scope only.

**Alternative considered**: Separate CSS file imported only in `admin/layout.js` — rejected because Next.js App Router CSS imports from layouts propagate globally, making true scoping impossible without a class wrapper approach.

---

### D3 — AdminTable component design

**Decision**: Single `AdminTable` component accepts `columns` and `data` props. Internally it uses a `useBreakpoint` hook to toggle between `<table>` (desktop) and a mapped card grid (mobile).

**Rationale**: A single component API avoids duplicating table/card logic across four pages. Columns definition (`{ key, label, render? }`) is reusable. Mobile card layout maps each column to a label-value row within a shadcn `Card`.

**Alternative considered**: Separate `DataTable` and `DataCards` components with conditional rendering at the page level — rejected because it would scatter breakpoint logic and duplicate props across pages.

---

### D4 — Ad Image Upload: controlled preview vs external library

**Decision**: Build a custom `AdImageUploader` component using native `<input type="file">` + `URL.createObjectURL` for preview. No external upload library.

**Rationale**: The upload is UI-only (preview demonstration). Using a library like `react-dropzone` would add a dependency for minimal benefit in this phase. The component will expose an `onFileSelect` callback for future integration.

**Alternative considered**: `react-dropzone` — deferred to future work if drag-and-drop UX is prioritised.

---

### D5 — Charts: Recharts via shadcn chart component

**Decision**: Use the shadcn `chart` component (which wraps Recharts) for Dashboard analytics.

**Rationale**: Recharts is already a peer dependency of shadcn. Using the shadcn chart wrapper ensures consistent theming with CSS variable-based colors. We need an area chart for activity trends and a bar chart for ad performance.

---

### D6 — New shadcn components to install

The following components need to be added via `npx shadcn@latest add`:
- `table` — base for AdminTable desktop view
- `avatar` — user avatars in Users page
- `dropdown-menu` — action menus in table rows
- `chart` — Dashboard analytics (installs Recharts)
- `sidebar` — Admin sidebar shell
- `tabs` — Dashboard page tabs
- `progress` — stat card progress indicators
- `skeleton` — loading states

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Theme scoping via `.admin-theme` class may be incomplete if shadcn components render portals outside the wrapper | Test dialog/dropdown portals; add `admin-theme` class to portal container via shadcn `DialogProps` if needed |
| `useBreakpoint` hook requires `window` — SSR mismatch | Use `useEffect` + `useState` with a server-safe default; or use CSS-only approach with `hidden lg:table` / `lg:hidden` classes |
| Mock data volume — large tables may be slow without pagination | Implement client-side pagination in `AdminTable` from the start (page size 10) |
| Amber-minimal theme JSON format may differ from project's current shadcn version | Run install command first and verify `globals.css` output before building components |
