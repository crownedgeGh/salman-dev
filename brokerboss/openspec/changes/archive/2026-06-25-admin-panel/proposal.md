## Why

The BrokerBoss real estate platform currently has no administrative interface, making it impossible for admins to monitor platform activity, manage users, oversee property listings, or control ads. An admin panel is needed now to enable operational oversight and moderation as the platform grows.

## What Changes

- Add a new `/admin` route group with layout, sidebar navigation, and four main pages
- Introduce an `AdminTable` reusable component that renders as a table on desktop and as cards on mobile/tablet
- **Dashboard page** — stat cards (users count, properties listed, ads running, revenue), charts for activity trends, recent activity feed
- **Users page** — searchable/filterable table of registered users with columns: Avatar, Username, Email, Location, Properties Listed, Status, and Actions (Delete / Block)
- **Properties page** — searchable/filterable table of all property listings with columns: Image, Title, Type, Location, Price, Status, Owner, Date Listed, and Actions (View / Delete)
- **Ads page** — ad management with a dual-format image uploader (16:9 landscape + 9:16 portrait/story format), table of active ads with status, impressions, and controls
- Apply the amber-minimal shadcn theme (`npx shadcn@latest add https://tweakcn.com/r/themes/amber-minimal.json`) as the visual foundation for the admin panel
- Full responsive design — table view on desktop (lg+), card view on mobile and tablet (< lg)

## Capabilities

### New Capabilities

- `admin-layout`: Persistent sidebar + topbar admin shell with navigation, breadcrumbs, and mobile drawer
- `admin-dashboard`: Overview dashboard with KPI stat cards, activity charts, and a recent-activity list
- `admin-users`: User management page — list, search, filter, block, and delete users
- `admin-properties`: Property management page — list, search, filter, view, and delete property listings
- `admin-ads`: Ad management page — dual-format image upload (16:9 and 9:16) and ad listing table with controls
- `admin-table`: Shared responsive table component that switches to card layout on mobile/tablet

### Modified Capabilities

- (none)

## Impact

- **New files**: `app/admin/` route group (layout.js + 4 page files), `components/admin/` directory with AdminTable, StatCard, AdminSidebar, AdminTopbar, AdImageUploader, and chart wrappers
- **Shadcn components needed**: `table`, `badge`, `avatar`, `dropdown-menu`, `chart` (recharts), `sidebar`, `tabs`, `progress`, `skeleton` — install via shadcn CLI
- **Theme**: amber-minimal theme applied globally or scoped to admin routes via class
- **No breaking changes** to existing public-facing routes or components
