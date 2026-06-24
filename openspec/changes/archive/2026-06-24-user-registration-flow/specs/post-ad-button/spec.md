## ADDED Requirements

### Requirement: POST AD button visible only to Owner and Broker users
The system SHALL render a POST AD button in the Navbar (both desktop and mobile views) if and only if the currently authenticated user has `userRole === 'owner'` or `userRole === 'broker'`. Buyer users and unauthenticated users SHALL NOT see this button.

#### Scenario: POST AD visible for Owner
- **WHEN** a user with role `owner` is logged in
- **THEN** a POST AD button appears in the Navbar desktop right-controls section

#### Scenario: POST AD visible for Broker
- **WHEN** a user with role `broker` is logged in
- **THEN** a POST AD button appears in the Navbar desktop right-controls section

#### Scenario: POST AD hidden for Buyer
- **WHEN** a user with role `buyer` is logged in
- **THEN** no POST AD button is present in the Navbar DOM

#### Scenario: POST AD hidden when logged out
- **WHEN** no user is logged in
- **THEN** no POST AD button is present in the Navbar DOM

#### Scenario: POST AD button present in mobile sheet for Owner/Broker
- **WHEN** an Owner or Broker user opens the mobile navigation sheet
- **THEN** the POST AD button is visible inside the sheet
