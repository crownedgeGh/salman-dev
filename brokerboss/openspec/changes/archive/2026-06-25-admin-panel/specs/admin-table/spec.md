## ADDED Requirements

### Requirement: AdminTable renders as a standard HTML table on desktop
On screens ≥ 1024px (`lg` breakpoint), the `AdminTable` component SHALL render a styled `<table>` element with a `<thead>` row of column labels and `<tbody>` rows of data. The component SHALL accept `columns` (array of `{ key, label, render? }`) and `data` (array of objects) props.

#### Scenario: Table rendered with columns and rows
- **WHEN** `AdminTable` is rendered with 7 columns and 20 data items on a desktop screen
- **THEN** a `<table>` with 7 header cells and 20 body rows is visible

#### Scenario: Custom render function respected
- **WHEN** a column definition includes a `render` function (e.g., to show a Badge)
- **THEN** the cell renders the output of that function instead of raw text

---

### Requirement: AdminTable renders as cards on mobile and tablet
On screens < 1024px, the `AdminTable` component SHALL hide the `<table>` and render each data item as a shadcn `Card`. Each card SHALL list all columns as label-value pairs, with the first column's value displayed prominently as the card title.

#### Scenario: Cards visible on mobile
- **WHEN** `AdminTable` is rendered on a screen < 1024px
- **THEN** no `<table>` is visible; instead, one card per data item is displayed

#### Scenario: Card shows all column values
- **WHEN** a card is rendered
- **THEN** each column label appears on the left and the corresponding value on the right for every column

---

### Requirement: AdminTable supports client-side pagination
The `AdminTable` component SHALL paginate data client-side with a configurable `pageSize` prop (default: 10). It SHALL render Previous/Next controls and a "Page X of Y" indicator below the table/cards.

#### Scenario: First page shown by default
- **WHEN** `AdminTable` receives 25 items with `pageSize=10`
- **THEN** only the first 10 items are rendered and the indicator shows "Page 1 of 3"

#### Scenario: Next page navigates forward
- **WHEN** admin clicks "Next"
- **THEN** items 11–20 are rendered and the indicator shows "Page 2 of 3"

#### Scenario: Previous button disabled on first page
- **WHEN** admin is on page 1
- **THEN** the "Previous" button is disabled

---

### Requirement: AdminTable supports an external search query prop
The `AdminTable` component SHALL accept an optional `searchQuery` string prop. When provided, it SHALL filter the data by checking if any column value (as a string) contains the query (case-insensitive), and reset to page 1 on each query change.

#### Scenario: Search filters visible rows
- **WHEN** `searchQuery="karachi"` is passed
- **THEN** only rows where at least one cell value contains "karachi" (case-insensitive) are shown

#### Scenario: Empty state shown when no match
- **WHEN** the search query matches no rows
- **THEN** an empty state message "No results found" is displayed in place of the table/cards
