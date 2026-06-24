## ADDED Requirements

### Requirement: Broker registration form captures required fields
The system SHALL provide a registration form at `/register/broker` with the following fields:
- Full Name (text, required)
- Firm / Agency Name (text, required)
- Phone Number (tel, required)
- City (text, required)
- Areas of Operation (text, required – comma-separated)
- RERA / License Number (text, optional)
- Years of Experience (number, optional, min 0)
- Brief Bio (textarea, optional, max 300 chars)
The form SHALL NOT include any image upload or full street address field.

#### Scenario: Successful broker registration
- **WHEN** a user fills all required fields and submits the Broker form
- **THEN** `AuthContext.register('broker', profile)` is called, `userRole` is set to `'broker'`, and the user is redirected to the homepage

#### Scenario: Required field validation
- **WHEN** the user submits the form with required fields empty
- **THEN** inline error messages appear below each empty required field and the form is not submitted

#### Scenario: Form is fully responsive
- **WHEN** the form is viewed on a mobile viewport (< 768 px)
- **THEN** all fields render in a single column with full-width inputs

#### Scenario: No image or full-address field present
- **WHEN** the Broker registration page is rendered
- **THEN** no file/image upload input and no street-address input field SHALL be present in the DOM
