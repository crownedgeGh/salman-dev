## 1. API — Properties Mine Endpoint

- [x] 1.1 Create `app/api/properties/mine/route.js` with a JWT-cookie-authenticated `GET` handler
- [x] 1.2 Decode JWT from cookie using `jsonwebtoken`; return `401` if missing/invalid
- [x] 1.3 Query `Property.find({ 'broker.id': userId.toString() })` sorted by `createdAt` desc
- [x] 1.4 Return the matching properties array as JSON with `200`
- [x] 1.5 Test: unauthenticated request returns `401`; authenticated user with properties returns correct filtered array

## 2. API — Profile PUT Endpoint

- [x] 2.1 Add `PUT` handler to `app/api/users/profile/route.js` alongside the existing `GET`
- [x] 2.2 Decode JWT from cookie; return `401` if missing/invalid
- [x] 2.3 Parse request body; explicitly `delete data.password` and `delete data.role` before updating
- [x] 2.4 Run `User.findByIdAndUpdate(userId, data, { new: true }).select('-password')` and return `200` with updated user
- [x] 2.5 Return `500` on unexpected error
- [x] 2.6 Test: unauthenticated PUT returns `401`; valid PUT updates fields and never modifies password or role

## 3. Component — UserPanelSheet

- [x] 3.1 Create `components/user/UserPanelSheet.jsx` — a shadcn `Sheet` (side="right", width ~420px) with the panel content
- [x] 3.2 Add panel header: circular avatar initial, user name, role badge
- [x] 3.3 Add two tab buttons: "My Listings" and "My Profile" (track active tab with local state; default: "my-listings")
- [x] 3.4 Render `<MyListings />` or `<MyProfile />` depending on active tab
- [x] 3.5 Export `UserPanelSheet` with `open` / `onClose` props

## 4. Navbar Integration

- [x] 4.1 In `components/layout/Navbar.jsx`, make the logged-in profile pill a clickable button that opens `UserPanelSheet` (add `panelOpen` state and import `UserPanelSheet`)
- [x] 4.2 Wrap desktop profile pill in a `<button>` with `onClick={() => setPanelOpen(true)}`; keep logout button separate
- [x] 4.3 In the mobile Sheet, add a "My Account" row link button above logout that closes the mobile sheet and opens the user panel

## 5. Component — MyListings

- [x] 5.1 Create `components/user/MyListings.jsx`
- [x] 5.2 On mount, fetch `GET /api/properties/mine` using `api` (axios) and set state (`listings`, `loading`, `error`)
- [x] 5.3 Show skeleton/spinner while `loading === true`
- [x] 5.4 Show empty state UI if `listings.length === 0` (message + "Post a Property" link)
- [x] 5.5 Render a vertical list of listing cards — each card shows: property image (or placeholder), title, price, locality/city, purpose badge, and key specs
- [x] 5.6 Add two action buttons per card: **"View Listing"** (navigates to `/properties/[id]`, closes panel) and **"Edit Property"** (opens `EditPropertyModal` with that property)
- [x] 5.7 Pass `onEdit(property)` callback up to `UserPanelSheet` to control `EditPropertyModal` state

## 6. Component — EditPropertyModal

- [x] 6.1 Create `components/user/EditPropertyModal.jsx` as a shadcn `Dialog`
- [x] 6.2 Accept `property` (the full property object) and `onClose` / `onSaved` props
- [x] 6.3 Initialize form state from `property` on open (title, type, purpose, price, area, locality, city, description, BHK, furnishing, bathroom, areaSize, areaUnit)
- [x] 6.4 Render form fields: text inputs for title/price/area/locality/city; `<select>` for type (House/Flat/Plot/Office/Shop/Warehouse) and purpose (Sale/Rent); textarea for description; inputs for BHK, furnishing, bathroom
- [x] 6.5 Validate: title, type, price must be non-empty before submitting; show inline field errors
- [x] 6.6 On submit: call `PUT /api/properties/[property._id]` with form data; show loading state on button
- [x] 6.7 On `200` response: call `onSaved()` to trigger listings refresh, then close modal; show success toast
- [x] 6.8 On error response: show error toast; keep modal open
- [x] 6.9 Dismiss on backdrop click or Escape; confirm if user has unsaved changes (optional nice-to-have)

## 7. Component — MyProfile

- [x] 7.1 Create `components/user/MyProfile.jsx`
- [x] 7.2 Import `useAuth()` to get `userProfile` and `userRole`
- [x] 7.3 Render `<ProfileCompletionRing />` at the top of the section
- [x] 7.4 Define role-field maps: broker → `[name, phone, city, firmName, areasOfOperation, reraNumber, yearsOfExperience, bio]`; owner → `[name, phone, city, area, propertyType, description]`; buyer → `[name, phone, city, budgetRange, propertyTypes, preferredArea]`
- [x] 7.5 Render editable inputs for each field in the current role's map; show Email as read-only text; show Role as a badge
- [x] 7.6 Initialize form state from `userProfile`; track dirty state
- [x] 7.7 "Save Profile" button: call `PUT /api/users/profile` with updated fields; show loading state
- [x] 7.8 On `200`: update `AuthContext` userProfile via a new `updateProfile(data)` helper; show success toast
- [x] 7.9 On error: show error toast

## 8. Component — ProfileCompletionRing

- [x] 8.1 Create `components/user/ProfileCompletionRing.jsx` accepting `percentage` prop (0–100)
- [x] 8.2 Render an SVG circular ring using `stroke-dasharray` / `stroke-dashoffset` technique (radius 40, stroke-width 8, center 50x50 viewBox)
- [x] 8.3 Display the percentage number centered inside the ring (e.g. "72%")
- [x] 8.4 Add label below the ring: "Profile Complete"
- [x] 8.5 Ring stroke color: `< 40%` → red (`#ef4444`), `40–79%` → amber (`#f59e0b`), `≥ 80%` → green (`#22c55e`)
- [x] 8.6 Add a smooth CSS transition on the dashoffset for a fill-in animation when the panel opens

## 9. AuthContext — updateProfile helper

- [x] 9.1 Add `updateProfile(newData)` function to `AuthContext` that merges `newData` into `userProfile` state: `setUserProfile(prev => ({ ...prev, ...newData }))`
- [x] 9.2 Expose `updateProfile` in the context value

## 10. Styling & Polish

- [x] 10.1 Ensure the `UserPanelSheet` is scrollable on small screens (overflow-y-auto on content area)
- [x] 10.2 Apply consistent gap/padding tokens throughout the panel (match existing shadcn Sheet usage in Navbar)
- [x] 10.3 Verify dark mode compatibility for all new components (use `bg-card`, `text-foreground`, `border-border` tokens)
- [x] 10.4 Test panel on mobile viewport — ensure Sheet width is appropriate (w-full or max-w-sm on small screens)
- [x] 10.5 Add `id` attributes to key interactive elements (panel trigger button, tab buttons, save buttons) for testability
