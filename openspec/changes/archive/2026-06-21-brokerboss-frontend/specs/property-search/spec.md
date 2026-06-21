## ADDED Requirements

### Requirement: Global search bar filters listings in real-time
The Home page SHALL include a prominent search bar. As the user types, displayed listing cards SHALL be filtered in real-time to show only cards matching the query against: property type, locality, city, or description fields. The search SHALL be case-insensitive.

#### Scenario: Search filters by locality
- **WHEN** user types "Shankar Nagar" in the search bar
- **THEN** only cards with locality containing "Shankar Nagar" are displayed

#### Scenario: Search filters by property type
- **WHEN** user types "shop" in the search bar
- **THEN** only cards with property type "Shop" are displayed

#### Scenario: Search is case-insensitive
- **WHEN** user types "flat" (lowercase) in the search bar
- **THEN** cards with type "Flat" are shown regardless of case

#### Scenario: Empty search shows all listings
- **WHEN** the search bar is empty
- **THEN** all available listing cards are displayed

#### Scenario: No match shows empty state
- **WHEN** search query matches no listings
- **THEN** an empty state message "No properties found" is displayed
