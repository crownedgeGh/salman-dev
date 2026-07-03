## ADDED Requirements

### Requirement: Edit Property modal opens pre-filled
The system SHALL open a modal dialog when "Edit Property" is clicked, with all editable fields pre-populated from the existing property data.

#### Scenario: Form is pre-filled on open
- **WHEN** the user clicks "Edit Property" on a listing card
- **THEN** a modal/dialog opens with the property's current title, type, purpose, price, area, locality, city, description, and available spec fields (BHK, furnishing, bathroom) pre-populated

### Requirement: Edit Property form submits changes via PUT
The system SHALL send a `PUT /api/properties/[id]` request with the updated property data when the user submits the edit form.

#### Scenario: Successful property update
- **WHEN** the user edits fields and clicks "Save Changes"
- **THEN** a `PUT /api/properties/[id]` request is sent, and on `200` response the modal closes and the My Listings list refreshes to show updated data

#### Scenario: Validation prevents empty required fields
- **WHEN** the user clears a required field (title, type, price) and tries to submit
- **THEN** an inline error message is shown and the request is NOT sent

#### Scenario: API error on save
- **WHEN** the `PUT` request returns a non-200 status
- **THEN** an error toast/message is shown and the modal remains open

### Requirement: Edit Property modal can be dismissed
The modal SHALL have a close button and shall close when the user clicks outside it or presses Escape, discarding unsaved changes.

#### Scenario: Close without saving
- **WHEN** the user clicks the modal's X button or the backdrop
- **THEN** the modal closes and no changes are persisted

### Requirement: Edit form fields mirror property schema
The edit form SHALL include fields matching the full property schema: title, type (select), purpose (select: Sale/Rent), price, area, locality, city, description. It SHALL also include BHK, furnishing, bathroom, areaSize, areaUnit where applicable.

#### Scenario: All schema-mapped fields are editable
- **WHEN** the edit modal is open
- **THEN** the user can modify any of the above fields via appropriate input controls (text inputs, selects, textareas)
