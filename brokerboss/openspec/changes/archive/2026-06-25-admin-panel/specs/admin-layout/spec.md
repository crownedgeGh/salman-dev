## ADDED Requirements

### Requirement: Admin shell renders persistent sidebar on desktop
The admin layout SHALL render a fixed left sidebar (240px wide) containing the BrokerBoss logo, navigation links (Dashboard, Users, Properties, Ads), and a user profile section with logout option. The sidebar SHALL remain visible and non-collapsing on screens `lg` (1024px) and wider.

#### Scenario: Desktop sidebar visible
- **WHEN** the admin visits any `/admin/*` page on a screen wider than 1024px
- **THEN** the sidebar is rendered on the left with all four nav links visible

#### Scenario: Active nav link highlighted
- **WHEN** the admin is on `/admin/users`
- **THEN** the "Users" nav link is highlighted with the amber primary color

---

### Requirement: Admin shell renders mobile drawer navigation
On screens below `lg`, the sidebar SHALL be replaced with a topbar containing a hamburger menu icon. Tapping the icon SHALL open a slide-in drawer (from the left) containing the same navigation links.

#### Scenario: Mobile topbar shown
- **WHEN** screen width is below 1024px
- **THEN** a topbar is visible with the site logo and a hamburger icon; the sidebar is hidden

#### Scenario: Drawer opens and closes
- **WHEN** admin taps the hamburger icon
- **THEN** the navigation drawer slides in from the left; tapping a nav link or the overlay closes the drawer

---

### Requirement: Admin layout applies amber-minimal theme
The admin layout wrapper element SHALL carry a class (e.g., `admin-theme`) that scopes the amber-minimal shadcn CSS variable overrides, ensuring the admin UI uses amber tones without affecting the public-facing site.

#### Scenario: Theme scoped to admin
- **WHEN** admin visits any `/admin/*` page
- **THEN** primary buttons, active links, and accents appear in amber tones
- **AND** the public-facing pages retain the original blue theme
