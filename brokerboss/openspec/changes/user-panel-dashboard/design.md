## Context

BrokerBoss is a Next.js 14+ property marketplace with a MongoDB/Mongoose backend and JWT-cookie auth. Users register as **buyer**, **owner**, or **broker** — each role has different profile fields stored in the same `User` collection (with `strict: false`). Properties are stored with a `broker` embedded object containing `broker.id` (the posting user's id). Currently, after login, the Navbar shows a profile pill and logout button, but there is no user self-service for listing management or profile editing. The admin panel has full CRUD for properties and users, but regular users cannot reach it.

## Goals / Non-Goals

**Goals:**
- A slide-in `Sheet` (right side) opens when the logged-in user clicks their profile pill in the Navbar
- Two tabs inside: **My Listings** and **My Profile**
- My Listings: fetches and shows the user's own properties with the existing `PropertyCard` style; adds View and Edit action buttons per card
- Edit Property: an in-panel modal/drawer with a pre-filled form; submits `PUT /api/properties/[id]`
- My Profile: shows and allows editing all role-specific fields; submits `PUT /api/users/profile`
- Profile Completion Ring: circular SVG progress indicator computed from filled fields
- Two new JWT-protected API endpoints: `GET /api/properties/mine` and `PUT /api/users/profile`

**Non-Goals:**
- Admin-level actions (bulk delete, status change) — those remain in `/admin`
- Image upload management beyond what already exists in the property form
- Pagination / infinite scroll for My Listings (MVP: show all, max ~50 is fine for now)
- Password change flow (separate concern)
- Push notifications or email confirmation on profile updates

## Decisions

### D1: Slide-in Sheet vs. Dedicated Page
**Decision**: Use a shadcn `Sheet` (right-side drawer) rather than routing to `/dashboard`.  
**Rationale**: The user's current session state is available in `AuthContext` without a page reload. The existing `PropertyCard` and form components can be rendered inline. Avoids introducing a new route group and layout. Matches common marketplace UX (MagicBricks, 99acres profile panel patterns).  
**Alternative considered**: `/user/dashboard` route — rejected because it requires a full-page load and duplicates layout concerns.

### D2: `GET /api/properties/mine` — Filter by `broker.id`
**Decision**: Add a dedicated API route that filters `Property.find({ 'broker.id': userId })` where `userId` is decoded from the JWT cookie.  
**Rationale**: The existing `GET /api/properties` is a public endpoint and cannot be filtered by auth user server-side without changing its contract. A separate `/mine` endpoint keeps concerns clean and is additive (no breaking changes).  
**Alternative considered**: Client-side filter of all properties — rejected because it leaks all property data to the client and won't scale.

### D3: `PUT /api/users/profile` — Self-update on existing profile route
**Decision**: Add a `PUT` handler to the existing `app/api/users/profile/route.js` file alongside the existing `GET`.  
**Rationale**: The endpoint `/api/users/profile` already represents "the authenticated user's profile". Adding `PUT` is the REST-idiomatic extension. Password is never updated through this endpoint — the handler will explicitly `delete data.password` before writing.  
**Alternative considered**: `PATCH /api/users/[id]` — rejected because it requires the client to know its own user ID, whereas the JWT cookie approach is stateless and more secure.

### D4: Profile Completion Percentage — Field-set-per-role
**Decision**: Define a static mapping of "expected fields" per role. For each field that has a non-empty, non-null value, add to the completion score.  
- **broker**: `name, email, phone, city, firmName, areasOfOperation, reraNumber, yearsOfExperience, bio`
- **owner**: `name, email, phone, city, area, propertyType, description`
- **buyer**: `name, email, phone, city, budgetRange, propertyTypes, preferredArea`  
**Rationale**: Simple, no server computation needed — percentage is computed client-side from the profile object already in `AuthContext`.

### D5: Edit Property Form — Reuse existing field structure
**Decision**: Build `EditPropertyModal` as a controlled form inside a shadcn `Dialog` (or within the Sheet itself using a back-navigation pattern). Fields mirror what the Admin property form captures (title, type, price, area, locality, purpose, description, BHK, furnishing, bathroom).  
**Rationale**: Consistency with admin form; no new field design work needed.

## Risks / Trade-offs

- **[Risk] `broker.id` may be stored as string vs. ObjectId**: The `broker` object is a plain sub-document (not a ref). When comparing, we do string comparison (`broker.id === userId.toString()`). → **Mitigation**: Use `{ 'broker.id': userId.toString() }` in Mongoose query; handle both string and ObjectId forms.
- **[Risk] JWT expiry during panel session**: The user's JWT might expire while they have the panel open, causing API calls to return 401. → **Mitigation**: On 401, call `logout()` from `AuthContext` and close the panel, redirecting to login — same pattern used elsewhere.
- **[Risk] Profile fields mismatch registration form**: Existing users might be missing newer fields. → **Mitigation**: The profile completion ring gracefully shows 0 for missing fields; the edit form shows empty inputs rather than crashing.
- **[Trade-off] No optimistic UI on property edit**: After a successful `PUT`, we refetch the listings list. Adds a brief flash but avoids stale data bugs.
