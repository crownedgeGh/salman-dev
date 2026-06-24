## 1. AuthContext Extension

- [x] 1.1 Add `userRole` (string | null) and `userProfile` (object | null) state to `AuthContext.js`
- [x] 1.2 Implement `register(role, profile)` action that sets `isLoggedIn`, `userRole`, and `userProfile`
- [x] 1.3 Implement `logout()` action that resets all three values to initial defaults
- [x] 1.4 Retain `toggleLogin()` for backward compatibility (mark as deprecated via comment)
- [x] 1.5 Update `AuthContext` default value shape to include `userRole`, `userProfile`, `register`, `logout`

## 2. Role Selection Modal

- [x] 2.1 Create `components/auth/RegisterModal.jsx` with a shadcn/ui Dialog
- [x] 2.2 Add three role cards (Buyer, Owner, Broker) using react-icons and theme-only colours
- [x] 2.3 Wire each card's onClick to close the modal and navigate to the correct `/register/<role>` route
- [x] 2.4 Ensure modal is responsive: cards stack vertically on mobile, row on desktop

## 3. Navbar Updates

- [x] 3.1 Add a **Register** button next to the Login button in the desktop Navbar right-controls
- [x] 3.2 Add the **Register** button entry in the mobile Sheet footer section
- [x] 3.3 Wire the Register button to open `RegisterModal`
- [x] 3.4 Add conditional **POST AD** button: visible only when `userRole === 'owner' || userRole === 'broker'`
- [x] 3.5 Add POST AD button inside the mobile Sheet for Owner/Broker users
- [x] 3.6 Replace existing `toggleLogin` logout usage with `logout()` from updated AuthContext
- [x] 3.7 Show user's name or role badge next to Logout when logged in

## 4. Owner Registration Page & Form

- [x] 4.1 Create Next.js page at `app/register/owner/page.js`
- [x] 4.2 Create `components/auth/OwnerForm.jsx` with fields: Full Name, Phone, City, Area, Property Type (select), Description (textarea)
- [x] 4.3 Implement client-side required-field validation with inline error messages
- [x] 4.4 Wire form submission to `AuthContext.register('owner', profile)` and redirect to `/`
- [x] 4.5 Ensure no image upload or street-address field is present
- [x] 4.6 Verify form is fully responsive (single-column on mobile, two-column on desktop ≥768 px)

## 5. Broker Registration Page & Form

- [x] 5.1 Create Next.js page at `app/register/broker/page.js`
- [x] 5.2 Create `components/auth/BrokerForm.jsx` with fields: Full Name, Firm Name, Phone, City, Areas of Operation, RERA/License No., Years of Experience, Bio
- [x] 5.3 Implement client-side required-field validation with inline error messages
- [x] 5.4 Wire form submission to `AuthContext.register('broker', profile)` and redirect to `/`
- [x] 5.5 Ensure no image upload or street-address field is present
- [x] 5.6 Verify form is fully responsive (single-column on mobile, two-column on desktop)

## 6. Buyer Registration Page & Form

- [x] 6.1 Create Next.js page at `app/register/buyer/page.js`
- [x] 6.2 Create `components/auth/BuyerForm.jsx` with multi-select pill toggles for: Flat, House, Shop, Plot, Office
- [x] 6.3 Add profile fields: Full Name, Phone, City, Preferred Area, Budget Range (select), Additional Notes
- [x] 6.4 Style selected pill toggles using `--primary`/`--accent` theme tokens; deselected using `--muted`
- [x] 6.5 Implement validation: at least one property type selected + required profile fields
- [x] 6.6 Wire form submission to `AuthContext.register('buyer', { ...profile, propertyTypes: [...] })` and redirect to `/`
- [x] 6.7 Verify form is fully responsive (pills wrap on mobile, profile fields single-column)

## 7. POST AD Placeholder Page

- [x] 7.1 Create `app/post-ad/page.js` as a placeholder page with a theme-consistent layout and "Coming Soon" message
- [x] 7.2 Wire the Navbar POST AD button to route to `/post-ad`

## 8. Polish & Verification

- [x] 8.1 Confirm all new UI elements use only react-icons (no emoji) and theme CSS variable colours
- [x] 8.2 Test full register flow for each role end-to-end in the browser
- [x] 8.3 Verify POST AD button visibility for Owner, Broker, Buyer, and logged-out states
- [x] 8.4 Test all three forms on mobile viewport (375 px width) for responsive layout
- [x] 8.5 Confirm logout resets role and removes POST AD button from Navbar
