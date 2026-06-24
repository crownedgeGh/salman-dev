## Why

BrokerBoss currently has a placeholder login toggle with no real authentication or role-based onboarding. Users—buyers, property owners, and brokers—need a structured registration flow that captures role-specific information and unlocks role-appropriate features (like the POST AD button for owners and brokers) from the very first interaction.

## What Changes

- Add a **Register** button to the Navbar alongside the existing Login button
- On clicking Register, show a **role-selection popup** with three options: Buyer, Owner, Broker
- **Owner registration**: Full-page form capturing personal details, property-related info (city, area, property type offered, contact), no image/address fields
- **Broker registration**: Full-page form capturing professional details (name, firm name, city, area of operation, license/RERA number, contact info), no image/address fields
- **Buyer registration**: Full-page form with property-type preference selector (flat, shop, home, plot, office – multi-select), plus buyer profile details (name, phone, city, budget range, preferred areas)
- **POST AD button** appears in Navbar only for logged-in Owner and Broker users; Buyers never see it
- Extend `AuthContext` to store user role (`buyer | owner | broker | null`) and basic profile info
- All forms and modals are fully responsive, use only react-icons, and follow the existing theme CSS variables (no custom color overrides)

## Capabilities

### New Capabilities
- `role-selection-modal`: Role-selection popup shown on clicking Register; presents Buyer / Owner / Broker cards
- `owner-registration-form`: Multi-field registration form page for property owners
- `broker-registration-form`: Multi-field registration form page for brokers/agents
- `buyer-registration-form`: Multi-field registration form with multi-select property-type preferences for buyers
- `post-ad-button`: Navbar button visible only to authenticated Owner and Broker users

### Modified Capabilities
- `auth-context`: Extend to hold `userRole` and `userProfile` state alongside `isLoggedIn`; expose `register(role, profile)` and `logout()` actions

## Impact

- `context/AuthContext.js` — extended with role + profile state
- `components/layout/Navbar.jsx` — Register button, POST AD button (conditional on role)
- New components: `components/auth/RegisterModal.jsx`, `components/auth/OwnerForm.jsx`, `components/auth/BrokerForm.jsx`, `components/auth/BuyerForm.jsx`
- No backend/API changes; all state is client-side for now
- No new dependencies required; react-icons already installed
