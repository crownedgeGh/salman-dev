## ADDED Requirements

### Requirement: Dummy data contains 20+ realistic property listings
The `src/data/properties.ts` file SHALL export an array of at least 20 property listing objects representing realistic Raipur, Chhattisgarh listings. Listings SHALL cover multiple property types: House, Shop, Flat, Plot, Home, Office, Warehouse. Localities SHALL include real Raipur areas (e.g., Shankar Nagar, Telibandha, Pandri, Mowa, VIP Road, Khamardih, Avanti Vihar, Pachpedi Naka). Prices SHALL be in Indian Rupees (₹) in Lakh/Crore format. Area SHALL be in sq.ft or Gaj.

#### Scenario: Data file exports correct shape
- **WHEN** `src/data/properties.ts` is imported
- **THEN** it exports an array where each item has: id, type, title, description, area, price, city, locality, purpose, postedAt, and broker (with name and phone)

#### Scenario: Data covers all property types
- **WHEN** the data array is examined
- **THEN** at least one listing exists for each of: House, Shop, Flat, Plot, Home, Office, Warehouse

### Requirement: Dummy data contains 5+ broker profiles
The `src/data/brokers.ts` file SHALL export an array of at least 5 broker profiles. Each broker SHALL have: id, name, phone, and yearsExperience.

#### Scenario: Broker data file exports correct shape
- **WHEN** `src/data/brokers.ts` is imported
- **THEN** it exports an array where each item has: id, name, phone, and yearsExperience

### Requirement: Data types are strictly typed with TypeScript interfaces
All data shapes SHALL be defined as TypeScript interfaces/types exported from `src/types/index.ts`. All data files SHALL use these types.

#### Scenario: TypeScript interfaces are importable
- **WHEN** a component imports from `src/types/index.ts`
- **THEN** it can use `Property`, `Broker`, and `Service` types with full TypeScript autocomplete
