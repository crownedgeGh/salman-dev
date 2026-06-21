## ADDED Requirements

### Requirement: Properties page has a sidebar filter panel
The Properties page (`/properties`) SHALL display a sidebar filter panel on desktop and a slide-over sheet (drawer) on mobile, containing filters for: Property Type (multi-select), Purpose (Sale / Rent), City/Locality (dropdown), and Price Range (min/max inputs or range slider).

#### Scenario: Desktop sidebar is visible
- **WHEN** viewport is desktop width
- **THEN** the filter panel is rendered as a persistent left sidebar alongside the card grid

#### Scenario: Mobile filter opens as sheet
- **WHEN** viewport is mobile width and user taps the "Filters" button
- **THEN** a slide-over drawer opens containing the filter options

### Requirement: Filters narrow the displayed listings
When any filter is applied, the listing card grid SHALL immediately update to show only listings matching ALL active filters simultaneously.

#### Scenario: Filter by property type
- **WHEN** user selects "Flat" from the Property Type filter
- **THEN** only Flat listings are shown in the grid

#### Scenario: Filter by purpose
- **WHEN** user selects "Rent" from the Purpose filter
- **THEN** only rental listings are shown

#### Scenario: Multiple filters combine as AND
- **WHEN** user selects type "Shop" AND purpose "Sale"
- **THEN** only listings that are both type Shop AND for Sale are shown

### Requirement: Filters can be cleared
A "Clear Filters" button SHALL be available when any filter is active. Clicking it SHALL reset all filters to their default state.

#### Scenario: Clear filters button appears
- **WHEN** at least one filter is active
- **THEN** a "Clear Filters" button is visible

#### Scenario: Clear filters resets to full listing
- **WHEN** user clicks "Clear Filters"
- **THEN** all filter values are reset and all listings are displayed
