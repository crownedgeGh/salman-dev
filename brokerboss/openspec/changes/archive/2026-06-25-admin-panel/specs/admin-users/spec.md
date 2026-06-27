## ADDED Requirements

### Requirement: Users page lists all registered users in AdminTable
The users page SHALL display all registered users via the `AdminTable` component with the following columns: Avatar, Username, Email, Location, Properties Listed, Status (Active/Blocked), and Actions.

#### Scenario: Users table rendered on desktop
- **WHEN** admin navigates to `/admin/users` on a screen ≥ 1024px
- **THEN** a full table is shown with all seven columns and one row per user

#### Scenario: Users shown as cards on mobile
- **WHEN** admin navigates to `/admin/users` on a screen < 1024px
- **THEN** each user is displayed as a card showing all fields as label-value pairs with action buttons at the bottom

---

### Requirement: Users page supports search by name or email
A search input SHALL filter the visible user rows in real-time as the admin types. The filter SHALL be case-insensitive and match against both username and email fields.

#### Scenario: Search filters table
- **WHEN** admin types "john" in the search box
- **THEN** only rows where username or email contains "john" (case-insensitive) remain visible

---

### Requirement: Admin can delete a user
Each user row/card SHALL have a "Delete" action. Clicking it SHALL show a confirmation dialog. Confirming SHALL remove the user from the displayed list (mock action).

#### Scenario: Delete confirmation shown
- **WHEN** admin clicks "Delete" on a user row
- **THEN** a modal confirmation dialog appears with "Delete User" and "Cancel" buttons

#### Scenario: User removed after confirmation
- **WHEN** admin confirms deletion
- **THEN** the user row/card is removed from the table and a success toast is shown

---

### Requirement: Admin can block a user
Each user row/card SHALL have a "Block" action. Clicking it SHALL toggle the user's status between "Active" and "Blocked". A blocked user's status badge SHALL appear in red.

#### Scenario: User blocked
- **WHEN** admin clicks "Block" on an Active user
- **THEN** the user's Status badge changes to "Blocked" (red) and the action label changes to "Unblock"

#### Scenario: User unblocked
- **WHEN** admin clicks "Unblock" on a Blocked user
- **THEN** the user's Status badge changes to "Active" (green)
