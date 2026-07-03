## ADDED Requirements

### Requirement: Profile completion percentage is calculated client-side
The system SHALL compute a profile completion percentage by checking which role-specific fields in the user's profile object are non-empty and non-null, then dividing by the total expected fields for that role.

#### Scenario: Broker with all fields filled shows 100%
- **WHEN** a broker user has all 9 expected fields filled (name, email, phone, city, firmName, areasOfOperation, reraNumber, yearsOfExperience, bio)
- **THEN** the completion ring displays 100%

#### Scenario: Broker with 5 of 9 fields filled shows ~56%
- **WHEN** a broker user has 5 of 9 expected fields filled
- **THEN** the completion ring displays approximately 56% (rounded to nearest integer)

#### Scenario: Role-specific field sets are used
- **WHEN** a buyer views their profile
- **THEN** the percentage is computed against buyer-specific fields (name, email, phone, city, budgetRange, propertyTypes, preferredArea), not broker/owner fields

### Requirement: Profile completion ring is a circular SVG indicator
The system SHALL render the completion percentage as a circular progress ring using SVG (stroke-dasharray/stroke-dashoffset technique), displaying the percentage number in the center of the ring and a label below it.

#### Scenario: Ring visually reflects completion
- **WHEN** the user's profile is 70% complete
- **THEN** the ring arc covers 70% of the circle circumference, the number "70%" is shown centered inside the ring

#### Scenario: Ring color changes by completion level
- **WHEN** completion is below 40%
- **THEN** the ring stroke color is red/warning

- **WHEN** completion is between 40% and 79%
- **THEN** the ring stroke color is amber/yellow

- **WHEN** completion is 80% or above
- **THEN** the ring stroke color is green/success

### Requirement: Completion ring is shown at the top of My Profile tab
The completion ring SHALL appear prominently at the top of the My Profile section, above the editable fields.

#### Scenario: Ring is visible before scrolling
- **WHEN** the user opens the My Profile tab
- **THEN** the profile completion ring is the first visible element, followed by the editable form fields
