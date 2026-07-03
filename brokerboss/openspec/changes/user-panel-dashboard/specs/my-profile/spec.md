## ADDED Requirements

### Requirement: My Profile displays role-specific user fields
The system SHALL display only the fields relevant to the logged-in user's role. Broker fields are shown for brokers, owner fields for owners, and buyer fields for buyers.

#### Scenario: Broker sees broker-specific fields
- **WHEN** a user with role `broker` opens My Profile
- **THEN** the following fields are shown: Name, Email, Phone, City, Firm Name, Areas of Operation, RERA Number, Years of Experience, Bio

#### Scenario: Owner sees owner-specific fields
- **WHEN** a user with role `owner` opens My Profile
- **THEN** the following fields are shown: Name, Email, Phone, City, Area, Property Type, Description

#### Scenario: Buyer sees buyer-specific fields
- **WHEN** a user with role `buyer` opens My Profile
- **THEN** the following fields are shown: Name, Email, Phone, City, Budget Range, Property Types (interested in), Preferred Area

### Requirement: My Profile fields are editable
All displayed profile fields SHALL be editable via appropriate inputs. Email is shown as read-only (cannot be changed via this form for security reasons). Role is shown as a read-only badge.

#### Scenario: User can edit profile fields
- **WHEN** the user is in the My Profile tab
- **THEN** all fields except Email and Role are editable inline

#### Scenario: Email is read-only
- **WHEN** the user views My Profile
- **THEN** the email field is displayed but not editable (shown as plain text or a disabled input)

### Requirement: Profile updates are persisted via PUT
The system SHALL send a `PUT /api/users/profile` request with the updated profile data when the user submits the profile form.

#### Scenario: Successful profile update
- **WHEN** the user edits fields and clicks "Save Profile"
- **THEN** a `PUT /api/users/profile` request is sent, on `200` response a success toast is shown and the `AuthContext` userProfile state is updated with the new data

#### Scenario: API error on profile save
- **WHEN** the `PUT /api/users/profile` request returns a non-200 status
- **THEN** an error toast is shown and the form data is preserved

### Requirement: PUT /api/users/profile endpoint is JWT-protected
The system SHALL add a `PUT` handler to `/api/users/profile` that reads the JWT cookie to identify the user, updates only allowed fields, and never modifies the password field.

#### Scenario: Authenticated profile update succeeds
- **WHEN** a valid JWT cookie is present and a valid JSON body is sent
- **THEN** the user's document is updated (excluding password), and the updated user object is returned with `200`

#### Scenario: Unauthenticated update is rejected
- **WHEN** no valid JWT cookie is present
- **THEN** the endpoint returns `401 Unauthorized` and no data is modified
