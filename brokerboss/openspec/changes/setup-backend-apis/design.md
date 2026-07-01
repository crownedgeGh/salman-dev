## Context

The current application uses static/dummy data on the frontend to display property listings and handle user flows. To make the application functional, dynamic, and production-ready, we need to transition to a backend architecture that serves data via a REST API from a real database.

## Goals / Non-Goals

**Goals:**
- Setup a backend for APIs (e.g. Next.js API routes).
- Connect the backend to MongoDB using Mongoose.
- Implement CRUD APIs for `properties` and other main entities.
- Implement an `auth` API and `users` API (read-only or non-CRUD as per requirements).
- Replace fetch requests with Axios on the frontend.
- Integrate the frontend with these real APIs.
- Remove dummy data from components.

**Non-Goals:**
- Full implementation of user CRUD (user entity is restricted to certain endpoints).
- Building complex third-party API integrations (only focusing on our own MongoDB backend for now).

## Decisions

- **Framework**: Next.js App Router API Routes (`app/api/...`) since the frontend is Next.js, allowing a full-stack unified codebase.
- **Database**: MongoDB with Mongoose ODM. It's flexible and fast to iterate for properties and users. We will manage data initially via MongoDB Compass.
- **HTTP Client**: `axios` instead of `fetch` for its interceptor support, automatic JSON parsing, and cleaner error handling syntax.
- **Auth approach**: Standard API endpoints for authentication.

## Risks / Trade-offs

- [Data Migration] → We need to ensure we migrate any complex dummy data shapes to MongoDB schemas accurately so frontend components don't break.
- [Axios Bundle Size] → Slightly larger than native fetch, but acceptable for the convenience and consistency it brings.

## Migration Plan

1. Setup DB connection utility and Mongoose schemas.
2. Build and test API routes via Postman/Compass.
3. Swap out frontend dummy data with Axios calls to the new endpoints sequentially (properties first, then auth).
4. Remove old dummy files completely.

## Open Questions

- Should we use NextAuth.js for the authentication API, or build a custom JWT solution? (Assuming custom basic endpoints if unspecified).
