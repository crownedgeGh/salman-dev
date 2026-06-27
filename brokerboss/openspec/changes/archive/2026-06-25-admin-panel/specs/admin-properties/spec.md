## ADDED Requirements

### Requirement: Properties page lists all property listings in AdminTable
The properties page SHALL display all properties via the `AdminTable` component with the following columns: Thumbnail, Title, Type, Location, Price, Status (Active/Sold/Pending), Owner (username), Date Listed, and Actions (View, Delete).

#### Scenario: Properties table rendered on desktop
- **WHEN** admin navigates to `/admin/properties` on a screen ≥ 1024px
- **THEN** a full table is shown with all nine columns and one row per property

#### Scenario: Properties shown as cards on mobile
- **WHEN** admin navigates to `/admin/properties` on a screen < 1024px
- **THEN** each property is displayed as a card with a thumbnail image at the top, all fields as label-value pairs, and action buttons at the bottom

---

### Requirement: Properties page supports search by title or location
A search input SHALL filter the visible property rows in real-time. The filter SHALL be case-insensitive and match against the Title and Location fields.

#### Scenario: Search filters table
- **WHEN** admin types "karachi" in the search box
- **THEN** only rows where Title or Location contains "karachi" (case-insensitive) remain visible

---

### Requirement: Properties page supports filter by status
A status filter dropdown (All / Active / Sold / Pending) SHALL further narrow the displayed results alongside the search query.

#### Scenario: Status filter applied
- **WHEN** admin selects "Sold" from the status dropdown
- **THEN** only properties with Status = "Sold" are shown in the table/cards

---

### Requirement: Admin can delete a property listing
Each property row/card SHALL have a "Delete" action. Clicking it SHALL show a confirmation dialog. Confirming SHALL remove the property from the displayed list (mock action).

#### Scenario: Delete confirmation shown
- **WHEN** admin clicks "Delete" on a property row
- **THEN** a modal confirmation dialog appears

#### Scenario: Property removed after confirmation
- **WHEN** admin confirms deletion
- **THEN** the property row/card is removed and a success toast is shown

---

### Requirement: Admin can view property details
Each property row/card SHALL have a "View" action that navigates to the existing property detail page (`/properties/[id]`).

#### Scenario: View navigates to detail page
- **WHEN** admin clicks "View" on a property row
- **THEN** the browser navigates to `/properties/[id]` in a new tab
