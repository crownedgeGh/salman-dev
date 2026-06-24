## ADDED Requirements

### Requirement: Buyer registration form with multi-select property types
The system SHALL provide a registration form at `/register/buyer` with the following sections:

**Property Preference Section (multi-select pill toggles):**
- Property types: Flat, House, Shop, Plot, Office (at least one must be selected, required)

**Profile Details Section:**
- Full Name (text, required)
- Phone Number (tel, required)
- City (text, required)
- Preferred Area / Locality (text, optional)
- Budget Range (select: Under ₹20L / ₹20L–₹50L / ₹50L–₹1Cr / ₹1Cr–₹2Cr / Above ₹2Cr, required)
- Additional Notes (textarea, optional, max 200 chars)

The form SHALL NOT include any image upload or full street address field. Property type toggles SHALL visually distinguish selected vs unselected states using `--primary` and `--accent` theme tokens.

#### Scenario: Successful buyer registration
- **WHEN** a user selects at least one property type, fills all required profile fields, and submits the form
- **THEN** `AuthContext.register('buyer', profile)` is called with `propertyTypes` as an array, `userRole` is set to `'buyer'`, and the user is redirected to the homepage

#### Scenario: Property type multi-select toggle
- **WHEN** the user clicks a property type pill (e.g., Flat)
- **THEN** the pill visually toggles to selected state; clicking again deselects it

#### Scenario: At least one property type required
- **WHEN** the user submits the form without selecting any property type
- **THEN** an error message appears near the property type section and the form is not submitted

#### Scenario: Form is fully responsive
- **WHEN** the form is viewed on a mobile viewport (< 768 px)
- **THEN** property type pills wrap in a row and profile fields display in a single column

#### Scenario: POST AD button absent for buyer
- **WHEN** a buyer user is logged in
- **THEN** no POST AD button is visible in the Navbar
