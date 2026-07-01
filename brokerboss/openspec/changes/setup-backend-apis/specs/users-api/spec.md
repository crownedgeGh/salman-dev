## ADDED Requirements

### Requirement: User Read API
The system SHALL provide endpoints to fetch user information, without full CRUD capabilities.

#### Scenario: Fetch user profile
- **WHEN** a client makes a GET request to `/api/users/profile` with a valid session
- **THEN** the system returns the authenticated user's details
