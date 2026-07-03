## ADDED Requirements

### Requirement: User panel shell opens on profile icon click
The system SHALL render a right-side slide-in `Sheet` panel when the authenticated user clicks their profile pill in the Navbar (desktop). On mobile, a dedicated "My Account" button SHALL appear inside the existing mobile menu Sheet to open the user panel.

#### Scenario: Opens user panel from desktop navbar
- **WHEN** a logged-in user clicks the profile pill/avatar in the desktop Navbar
- **THEN** a right-side Sheet opens with two tab options: "My Listings" and "My Profile"

#### Scenario: Opens user panel from mobile menu
- **WHEN** a logged-in user opens the mobile hamburger menu and taps "My Account"
- **THEN** the mobile menu closes and the user panel Sheet opens

#### Scenario: Panel does not open when not logged in
- **WHEN** an unauthenticated user is viewing the site
- **THEN** the profile pill is not rendered; clicking Login navigates to `/login`

### Requirement: User panel displays user identity header
The Sheet header SHALL display the logged-in user's name, role badge, and avatar initial at the top of the panel.

#### Scenario: Header shows user details
- **WHEN** the user panel opens
- **THEN** the header shows the user's first name, a role badge (Buyer / Owner / Broker), and a circular avatar with the first letter of their name

### Requirement: Tab navigation between sections
The user panel SHALL have two clearly labelled tabs at the top: "My Listings" and "My Profile". Only one section is visible at a time.

#### Scenario: Default tab is My Listings
- **WHEN** the panel opens for the first time in a session
- **THEN** the "My Listings" tab is active and listing content is shown

#### Scenario: Switching tabs
- **WHEN** the user clicks the "My Profile" tab
- **THEN** the profile editing UI replaces the listings content without closing the panel
