## 1. Backend Setup & Infrastructure

- [x] 1.1 Add `mongoose` and `axios` to dependencies
- [x] 1.2 Setup MongoDB connection utility (`lib/db.js` or similar)
- [x] 1.3 Create Mongoose schemas for Property and User entities

## 2. Properties API Implementation

- [x] 2.1 Create GET `/api/properties` endpoint to list properties
- [x] 2.2 Create POST `/api/properties` endpoint to add a property
- [x] 2.3 Create GET `/api/properties/[id]` endpoint to fetch single property
- [x] 2.4 Create PUT `/api/properties/[id]` endpoint to update a property
- [x] 2.5 Create DELETE `/api/properties/[id]` endpoint to remove a property

## 3. Auth & Users API Implementation

- [x] 3.1 Create POST `/api/auth/login` and `/api/auth/register` endpoints
- [x] 3.2 Create GET `/api/users/profile` endpoint

## 4. Frontend Integration & Data Cleanup

- [x] 4.1 Replace `fetch` with `axios` on the home/properties page to fetch real properties from API
- [x] 4.2 Replace `fetch` with `axios` in authentication components
- [x] 4.3 Locate and remove all dummy/demo data files and references in the codebase
