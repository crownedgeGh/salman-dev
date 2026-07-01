## ADDED Requirements

### Requirement: Axios API Integration
The frontend application SHALL use Axios to communicate with the backend APIs and consume real data instead of dummy data.

#### Scenario: Load properties on home page
- **WHEN** a user navigates to the home page or properties page
- **THEN** the frontend makes an Axios call to the properties API and renders the real data
