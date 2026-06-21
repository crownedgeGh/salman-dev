## ADDED Requirements

### Requirement: Contact page displays Raipur office information
The Contact Us page (`/contact`) SHALL display the following fictional but realistic Raipur office information:
- **Office Name**: BrokerBoss Raipur Office
- **Address**: Plot No. 12, Civic Centre Road, Shankar Nagar, Raipur, Chhattisgarh – 492007
- **Phone**: +91 77140 00000
- **Email**: contact@brokerboss.in
- **Working Hours**: Mon–Sat, 9:00 AM – 7:00 PM

#### Scenario: Office details are visible
- **WHEN** user visits /contact
- **THEN** office address, phone number, email, and working hours are all displayed

### Requirement: Contact page embeds a Google Maps iframe
The Contact page SHALL include an embedded Google Maps `<iframe>` centered on Raipur, Chhattisgarh. The embed SHALL be responsive (full width, fixed height of ~400px).

#### Scenario: Map renders on contact page
- **WHEN** user visits /contact
- **THEN** an embedded map showing the Raipur area is visible

### Requirement: Contact page includes a contact form
The Contact page SHALL include a contact form with fields: Name, Email, Phone (optional), Message, and a Submit button. The form is for UI demonstration only (no submission logic required).

#### Scenario: Contact form fields are rendered
- **WHEN** user visits /contact
- **THEN** form fields for Name, Email, Phone, and Message are visible with a Submit button
