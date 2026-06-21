## ADDED Requirements

### Requirement: "Call Broker" button triggers phone call on mobile
On mobile viewports (< 768px), the "Call Broker" button on a property card SHALL render as an anchor tag with `href="tel:+91XXXXXXXXXX"`, opening the device's native dialpad regardless of the user's login state.

#### Scenario: Mobile call button opens dialpad
- **WHEN** user taps "Call Broker" on a mobile device
- **THEN** the device's native phone dialpad is opened with the broker's number pre-filled

### Requirement: "Call Broker" on web reveals number only when logged in
On desktop/web viewports (≥ 768px), the "Call Broker" button SHALL:
- If the user is NOT logged in: show a button that, when clicked, displays a tooltip or inline message saying "Login to view broker's number"
- If the user IS logged in: reveal the broker's phone number as text on the card

#### Scenario: Web - unauthenticated user clicks "Call Broker"
- **WHEN** user on desktop is not logged in and clicks "Call Broker"
- **THEN** a message "Login to view broker's number" is shown (tooltip or inline)

#### Scenario: Web - authenticated user sees phone number
- **WHEN** user on desktop is logged in
- **THEN** the broker's phone number is displayed as visible text on the card

### Requirement: Broker phone number is not in the DOM when hidden
When the phone number should not be visible, the phone number string SHALL NOT be present in the rendered HTML DOM. It SHALL NOT be CSS-hidden only.

#### Scenario: Number absent from DOM when logged out (web)
- **WHEN** the user is not logged in (web)
- **THEN** the broker's phone number string is not present anywhere in the rendered HTML
