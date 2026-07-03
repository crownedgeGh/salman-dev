## ADDED Requirements

### Requirement: My Listings fetches user-owned properties
The system SHALL call `GET /api/properties/mine` (JWT-cookie authenticated) when the My Listings tab is active, returning only properties where `broker.id` matches the currently authenticated user's id.

#### Scenario: User with listings sees their properties
- **WHEN** a logged-in user opens the My Listings tab
- **THEN** only properties posted by that user are shown; no other users' properties appear

#### Scenario: User with no listings sees empty state
- **WHEN** a logged-in user has not posted any properties
- **THEN** an empty state message is shown ("You haven't listed any properties yet") with a call-to-action link to Post Property

#### Scenario: Loading state while fetching
- **WHEN** the My Listings tab is first opened
- **THEN** a skeleton/spinner is shown while the API request is in flight

### Requirement: Listings displayed in property card format
Properties in My Listings SHALL be rendered using the same visual card layout as the public `/properties` page (using the existing `PropertyCard` component or an equivalent layout).

#### Scenario: Card shows property details
- **WHEN** a user's property is displayed
- **THEN** each card shows the property image, title, price, locality, type, and key specs (BHK, area, purpose badge)

### Requirement: View and Edit action buttons on each listing card
Each listing card SHALL have two action buttons on the right side: **View Listing** (navigates to the public property detail page) and **Edit Property** (opens the edit modal).

#### Scenario: View Listing navigates to public page
- **WHEN** the user clicks "View Listing" on a property card
- **THEN** the user panel closes and the browser navigates to `/properties/[id]`

#### Scenario: Edit Property opens edit modal
- **WHEN** the user clicks "Edit Property" on a property card
- **THEN** the `EditPropertyModal` opens pre-populated with that property's data

### Requirement: Properties API mine endpoint
The system SHALL expose `GET /api/properties/mine` that returns a JSON array of properties belonging to the authenticated user.

#### Scenario: Authenticated request returns user's properties
- **WHEN** a valid JWT cookie is present in the request
- **THEN** the endpoint returns `200` with an array of property objects where `broker.id` equals the user's id

#### Scenario: Unauthenticated request is rejected
- **WHEN** no JWT cookie is present or the token is invalid/expired
- **THEN** the endpoint returns `401 Unauthorized`
