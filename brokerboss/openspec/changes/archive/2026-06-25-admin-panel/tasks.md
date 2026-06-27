## 1. Theme & Shadcn Setup

- [x] 1.1 Run `npx shadcn@latest add https://tweakcn.com/r/themes/amber-minimal.json` and verify CSS variable output in `globals.css`
- [x] 1.2 Create `.admin-theme` CSS class in `globals.css` that overrides root variables with amber-minimal tokens, scoping the theme to the admin shell
- [x] 1.3 Install required shadcn components: `npx shadcn@latest add table avatar dropdown-menu chart sidebar tabs progress skeleton`

## 2. Admin Layout & Navigation

- [x] 2.1 Create `app/admin/layout.js` — wraps children in `<div className="admin-theme">`, renders `AdminSidebar` and `AdminTopbar`, manages mobile drawer state
- [x] 2.2 Create `components/admin/AdminSidebar.jsx` — fixed 240px sidebar with logo, four nav links (Dashboard, Users, Properties, Ads), active-link highlighting using `usePathname`, and user profile section
- [x] 2.3 Create `components/admin/AdminTopbar.jsx` — topbar visible only on mobile (`lg:hidden`), contains logo and hamburger button that triggers drawer open
- [x] 2.4 Wire mobile drawer open/close state between `AdminTopbar` (trigger) and `AdminSidebar` (drawer panel) via shared state in layout
- [ ] 2.5 Verify sidebar is hidden on mobile, drawer is hidden on desktop — test at 375px and 1280px widths

## 3. AdminTable Shared Component

- [x] 3.1 Create `components/admin/AdminTable.jsx` — accepts `columns` (`{ key, label, render? }[]`) and `data` (`object[]`) props
- [x] 3.2 Implement desktop table view using shadcn `Table` components — visible only on `lg+` screens via `hidden lg:block`
- [x] 3.3 Implement mobile card view — maps each data item to a shadcn `Card` with label-value rows; visible only on `< lg` via `block lg:hidden`
- [x] 3.4 Add client-side pagination to `AdminTable` — `pageSize` prop (default 10), Previous/Next buttons, "Page X of Y" indicator, resets to page 1 on data/search change
- [x] 3.5 Add `searchQuery` prop support — filters data items client-side (case-insensitive match on all string cell values), shows "No results found" empty state when no matches
- [x] 3.6 Export `AdminTable` from `components/admin/index.js` barrel file

## 4. Dashboard Page

- [x] 4.1 Create `app/admin/page.js` — Dashboard page using the admin layout
- [x] 4.2 Create `components/admin/StatCard.jsx` — reusable card showing metric value, label, icon, and a positive/negative change badge (green/red)
- [x] 4.3 Render four `StatCard` instances: Total Users, Properties Listed, Active Ads, Total Revenue — in a responsive 4/2/1 column grid
- [x] 4.4 Create mock data in `data/adminMock.js` — users array (20+ entries), properties array (20+ entries), ads array (10+ entries), activity events, and chart series data
- [x] 4.5 Add activity trend area chart (users + properties over 30 days) using shadcn `ChartContainer` + Recharts `AreaChart` with amber/muted colors
- [x] 4.6 Add ad performance bar chart (top 5 ads: impressions vs. clicks) using shadcn `ChartContainer` + Recharts `BarChart`
- [x] 4.7 Add "Recent Activity" feed section — list of 8 most recent mock events with icon, description, and relative timestamp

## 5. Users Page

- [x] 5.1 Create `app/admin/users/page.js` — Users page
- [x] 5.2 Define `USERS_COLUMNS` array with: Avatar (custom render with shadcn `Avatar`), Username, Email, Location, Properties Listed, Status (custom render with colored `Badge`), Actions (custom render with dropdown)
- [x] 5.3 Add search input above the `AdminTable` — controlled state passed as `searchQuery` prop
- [x] 5.4 Implement block/unblock action — toggles user `status` field in local state (`useState`) and updates the badge; show "Unblock" when user is blocked
- [x] 5.5 Implement delete action — show shadcn `Dialog` confirmation modal; on confirm, remove user from local state and show a toast notification

## 6. Properties Page

- [x] 6.1 Create `app/admin/properties/page.js` — Properties page
- [x] 6.2 Define `PROPERTIES_COLUMNS` array with: Thumbnail (custom render with `<img>`), Title, Type, Location, Price, Status (colored Badge: Active=green / Sold=gray / Pending=yellow), Owner, Date Listed, Actions (View, Delete)
- [x] 6.3 Add search input (title/location) above the `AdminTable`
- [x] 6.4 Add status filter `Select` dropdown (All / Active / Sold / Pending) — filters data before passing to `AdminTable`
- [x] 6.5 Implement "View" action — opens `/properties/[id]` in a new browser tab
- [x] 6.6 Implement "Delete" action — confirmation dialog, then remove from local state with success toast

## 7. Ads Page — Image Uploader

- [x] 7.1 Create `components/admin/AdImageUploader.jsx` — accepts `label`, `aspectRatio` (`"16/9"` or `"9/16"`), and `onFileSelect` callback props
- [x] 7.2 Render upload placeholder — dashed border, centered upload icon (`UploadCloud` from lucide-react), label, and "Click to upload" helper text, sized to the correct aspect ratio via CSS (`aspect-ratio: 16/9` or `aspect-ratio: 9/16`)
- [x] 7.3 Bind hidden `<input type="file" accept="image/*">` to the container click; on file select, create object URL and store in state
- [x] 7.4 When an image is selected, replace placeholder with `<img>` preview (object-fit: cover, fills container), and show a circular × button in the top-right corner on hover
- [x] 7.5 × button clears the preview (revokes object URL, resets state) and restores the placeholder

## 8. Ads Page — Ad Table

- [x] 8.1 Create `app/admin/ads/page.js` — Ads page; renders two `AdImageUploader` components side-by-side (stacked on mobile) at the top
- [x] 8.2 Define `ADS_COLUMNS` array with: ID, Title, Format (Badge: Banner/Story), Status (colored Badge: Active=green / Paused=yellow / Expired=gray), Impressions, Clicks, CTR % (calculated), Owner, Expiry Date, Actions
- [x] 8.3 Add search input above the ads `AdminTable`
- [x] 8.4 Implement pause/activate toggle — updates ad `status` in local state; badge and action label update accordingly
- [x] 8.5 Implement delete action — confirmation dialog and remove from local state with toast

## 9. Polish & Responsive QA

- [x] 9.1 Add page titles and meta descriptions to each admin page via Next.js `metadata` export
- [x] 9.2 Add `Skeleton` loading state placeholders to all table sections (rendered for 500ms on initial mount to demonstrate loading UI)
- [x] 9.3 Test all four pages at 375px (mobile), 768px (tablet), and 1280px (desktop) — verify table↔card switching works correctly on all pages
- [x] 9.4 Verify amber-minimal theme is applied to sidebar active links, primary buttons, and badges within admin; public pages unaffected
- [x] 9.5 Verify `AdImageUploader` aspect ratios are pixel-perfect at different screen widths using browser dev tools
