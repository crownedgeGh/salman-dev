## ADDED Requirements

### Requirement: Services page lists 6 broker services
The Services page (`/services`) SHALL display exactly 6 services offered by BrokerBoss, each rendered as a card containing a react-icons icon, service name, and a 2–3 sentence description.

The 6 services SHALL be:
1. **Property Listing** — List your property with us and reach thousands of verified buyers and tenants across Raipur
2. **Broker Verification** — Get a verified broker badge to build trust with buyers and differentiate from unverified agents
3. **Market Valuation** — Receive an expert estimate of your property's current market value based on Raipur locality data
4. **Legal Assistance** — Get end-to-end help with documentation, registration, and property transfer paperwork
5. **Investment Advisory** — Connect with expert advisors who help identify high-ROI properties for investment in Chhattisgarh
6. **Rental Management** — Let us manage your rental property — from tenant screening to rent collection

#### Scenario: All 6 services are displayed
- **WHEN** user navigates to /services
- **THEN** exactly 6 service cards are rendered, each with an icon, name, and description

### Requirement: Services page has an informational hero section
The Services page SHALL include a hero/header section with a headline and supporting text before the service cards.

#### Scenario: Hero section renders
- **WHEN** user visits /services
- **THEN** a hero section with a headline like "Our Services" and a supporting subtitle is visible above the cards
