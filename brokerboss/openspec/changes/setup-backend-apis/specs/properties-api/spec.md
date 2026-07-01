## ADDED Requirements

### Requirement: Property CRUD API
The system SHALL provide a set of REST endpoints to create, read, update, and delete property listings.

#### Scenario: Fetch all properties
- **WHEN** a client makes a GET request to `/api/properties`
- **THEN** the system returns a list of all property records from the database

#### Scenario: Create a new property
- **WHEN** a client makes a POST request to `/api/properties` with valid property data
- **THEN** the system creates a new property record and returns the created object
