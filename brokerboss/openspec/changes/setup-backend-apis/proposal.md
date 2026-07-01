## Why

We need to transition from using static dummy/demo data to a real backend to support dynamic content and user interactions in the application. This will involve setting up APIs for properties, authentication, and other entities to ensure the frontend reflects live data and supports full CRUD operations.

## What Changes

- Create backend APIs for properties, users, and authentication.
- Implement full CRUD endpoints for properties and other entities (excluding users).
- Set up the necessary backend configuration (e.g., MongoDB, API routing).
- Wire the frontend to communicate with these new backend APIs.
- Replace fetch API calls with Axios for HTTP requests in the frontend.
- Remove all dummy and demo data from the frontend components and replace it with real data fetched from the APIs.

## Capabilities

### New Capabilities
- `properties-api`: CRUD API for managing property listings.
- `auth-api`: API for user authentication (login, registration).
- `users-api`: API for fetching user information (no full CRUD per requirements).
- `frontend-backend-integration`: Wiring frontend components to use Axios and consume the new APIs.

### Modified Capabilities


## Impact

- Frontend data fetching layers (replacing fetch with axios).
- Backend API routes and database models (using MongoDB Compass for DB management).
- All UI components currently using dummy data.
