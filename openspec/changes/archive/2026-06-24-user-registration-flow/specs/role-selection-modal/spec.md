## ADDED Requirements

### Requirement: Role selection modal displayed on Register click
The system SHALL display a modal dialog when the user clicks the Register button in the Navbar. The modal SHALL present three role cards: Buyer, Owner, and Broker, each with a react-icon, a title, and a one-line description. The modal SHALL close when the user selects a role or presses Escape / clicks the overlay.

#### Scenario: Register button opens the modal
- **WHEN** an unauthenticated user clicks the Register button in the Navbar
- **THEN** a modal overlay appears with three role-selection cards (Buyer, Owner, Broker)

#### Scenario: Role card navigates to correct registration page
- **WHEN** the user clicks a role card (e.g., Buyer)
- **THEN** the modal closes and the user is navigated to the corresponding registration page (`/register/buyer`, `/register/owner`, `/register/broker`)

#### Scenario: Modal dismisses on overlay click
- **WHEN** the user clicks outside the modal card area
- **THEN** the modal closes without navigating anywhere

#### Scenario: Modal is responsive
- **WHEN** the viewport is mobile width (< 768 px)
- **THEN** the three role cards stack vertically and the modal fills the screen width with padding
