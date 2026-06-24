## MODIFIED Requirements

### Requirement: AuthContext exposes role and profile alongside login state
The system's `AuthContext` SHALL expose the following values and actions:
- `isLoggedIn` (boolean) — true when a user is registered/logged in
- `userRole` (string | null) — one of `'buyer'`, `'owner'`, `'broker'`, or `null` when logged out
- `userProfile` (object | null) — role-specific profile data collected at registration, or `null` when logged out
- `register(role, profile)` — sets `isLoggedIn` to `true`, stores `role` in `userRole`, stores `profile` in `userProfile`
- `logout()` — resets all three state values to their initial defaults (`false`, `null`, `null`)
- `toggleLogin()` SHALL be retained for backward compatibility but SHALL be considered deprecated

#### Scenario: register() sets user role and profile
- **WHEN** `register('owner', { name: 'Ali', phone: '9876543210', city: 'Raipur', area: 'Shankar Nagar', propertyType: 'Flat' })` is called
- **THEN** `isLoggedIn` becomes `true`, `userRole` becomes `'owner'`, and `userProfile` equals the provided object

#### Scenario: logout() clears all auth state
- **WHEN** `logout()` is called after a user is registered
- **THEN** `isLoggedIn` becomes `false`, `userRole` becomes `null`, and `userProfile` becomes `null`

#### Scenario: Initial state is unauthenticated
- **WHEN** the AuthProvider first mounts
- **THEN** `isLoggedIn` is `false`, `userRole` is `null`, and `userProfile` is `null`
