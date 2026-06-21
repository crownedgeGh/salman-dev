## ADDED Requirements

### Requirement: Property card displays all textual listing data
Each property card SHALL display: property type badge, title, short description (max 3 lines), locality (general area, not full address), city, area size, price, purpose (Sale/Rent), and broker name. The card SHALL NOT display images, videos, or full street addresses.

#### Scenario: Card renders all required fields
- **WHEN** a property listing is rendered as a card
- **THEN** the card shows property type, title, description, locality, city, area, price, purpose, and broker name

#### Scenario: Card omits sensitive data
- **WHEN** a property listing is rendered as a card
- **THEN** no full street address, plot number, or images are shown

### Requirement: Card grid is fully responsive
The listing grid SHALL render 4 columns on desktop (≥1280px), 3 columns on tablet (768px–1279px), and 2 columns on mobile (<768px).

#### Scenario: Desktop grid layout
- **WHEN** viewport width is 1280px or wider
- **THEN** property cards render in a 4-column grid

#### Scenario: Tablet grid layout
- **WHEN** viewport width is between 768px and 1279px
- **THEN** property cards render in a 3-column grid

#### Scenario: Mobile grid layout
- **WHEN** viewport width is below 768px
- **THEN** property cards render in a 2-column grid

### Requirement: Property type is visually distinguished
Each card SHALL display a colored badge indicating the property type (House, Shop, Flat, Plot, Home, Office, Warehouse).

#### Scenario: Type badge is visible
- **WHEN** a card is rendered
- **THEN** a badge with the property type label is prominently displayed on the card

### Requirement: "Posted by" broker name is shown on card
Each card SHALL display the broker's display name prefixed with "Posted by:".

#### Scenario: Broker attribution shown
- **WHEN** a card is rendered with a broker name
- **THEN** the text "Posted by: <Broker Name>" is visible on the card
