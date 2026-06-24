## ADDED Requirements

### Requirement: Owner registration form captures required fields
The system SHALL provide a registration form at `/register/owner` with the following fields:
- Full Name (text, required)
- Phone Number (tel, required)
- City (text, required)
- Area / Locality (text, required)
- Property Type Offered (select: Flat / House / Shop / Plot / Office, required)
- Brief Description (textarea, optional, max 300 chars)
The form SHALL NOT include any image upload or full street address field. All labels and inputs SHALL use theme CSS variables only.

#### Scenario: Successful owner registration
- **WHEN** a user fills all required fields and submits the Owner form
- **THEN** `AuthContext.register('owner', profile)` is called, `userRole` is set to `'owner'`, and the user is redirected to the homepage

#### Scenario: Required field validation
- **WHEN** the user submits the form with one or more required fields empty
- **THEN** inline error messages appear below each empty required field and the form is not submitted

#### Scenario: Form is fully responsive
- **WHEN** the form is viewed on a mobile viewport (< 768 px)
- **THEN** all fields render in a single column with full-width inputs and readable labels

#### Scenario: No image or full-address field present
- **WHEN** the Owner registration page is rendered
- **THEN** no file/image upload input and no street-address input field SHALL be present in the DOM
