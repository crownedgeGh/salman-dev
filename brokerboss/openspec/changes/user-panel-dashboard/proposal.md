## Why

Currently logged-in users (owners, brokers, buyers) have no dedicated space to manage their own property listings or view/edit their personal profile. After authentication, clicking on the profile avatar shows nothing actionable — users have no self-service CRUD for their own listings and no way to view or complete their role-specific profile. This is a critical gap for any property marketplace: a user panel is the foundation of a personal account experience.

## What Changes

- Add a **User Panel sidebar** (slide-in sheet) triggered by clicking the profile avatar/name pill in the Navbar when logged in
- The sidebar has two top-level sections: **My Listings** and **My Profile**
- **My Listings (A)**: Shows all properties posted by the currently logged-in user in the same property card layout as `/properties`; each card has **View Listing** and **Edit Property** action buttons
- **Edit Property (A3)**: Opens an edit modal/form pre-filled with the property's data (title, type, price, area, locality, purpose, description, images etc.), submits via existing `PUT /api/properties/[id]`
- **My Profile (B)**: Displays and allows editing of the logged-in user's profile fields (role-specific — broker fields for brokers, owner fields for owners, buyer fields for buyers)
- **Profile Completion Ring (B2)**: A circular progress indicator showing what % of the user's profile fields are filled in
- New API route: `GET /api/properties/mine` — returns properties where `broker.id` matches the currently authenticated user's id (JWT-protected)
- New API route: `PUT /api/users/profile` — allows the logged-in user to update their own profile fields (JWT-protected, password excluded)
- Navbar profile pill becomes clickable to open the panel (desktop); mobile sheet also gets panel entry points

## Capabilities

### New Capabilities
- `user-panel-shell`: The slide-in user panel sidebar triggered from the Navbar profile avatar, containing tab navigation between My Listings and My Profile
- `my-listings`: Shows all properties posted by the authenticated user in card format, with View and Edit actions; calls `GET /api/properties/mine`
- `edit-property-modal`: Modal form for editing an existing property listing; pre-filled from property data; submits via `PUT /api/properties/[id]`
- `my-profile`: Displays and edits the authenticated user's role-specific profile fields; calls `PUT /api/users/profile`
- `profile-completion-ring`: Circular SVG/CSS progress indicator showing profile completeness percentage based on filled fields

### Modified Capabilities
- `properties-api`: Adding `GET /api/properties/mine` — a new JWT-protected endpoint that filters properties by the logged-in user's id (no spec-level break, additive)

## Impact

- **Frontend**: `components/layout/Navbar.jsx` (profile pill becomes a trigger), new components: `UserPanelSheet`, `MyListings`, `EditPropertyModal`, `MyProfile`, `ProfileCompletionRing`
- **API (new)**: `app/api/properties/mine/route.js` — `GET` with JWT auth
- **API (new)**: `app/api/users/profile/route.js` — add `PUT` method alongside existing `GET`
- **Auth**: All new endpoints require valid JWT cookie (same pattern as `GET /api/users/profile`)
- **Models**: No schema changes needed; `Property.broker.id` is already stored
- **Dependencies**: None new — uses existing `jsonwebtoken`, `mongoose`, shadcn `Sheet`, existing `PropertyCard` / `PropertyGrid`
