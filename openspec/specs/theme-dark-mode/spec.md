## ADDED Requirements

### Requirement: App supports light and dark mode
The application SHALL support both light and dark color modes using `next-themes`. The active mode SHALL be persisted in `localStorage`. On first load, the system's preferred color scheme SHALL be used as the default.

#### Scenario: Dark mode toggle switches theme
- **WHEN** user clicks the dark/light mode toggle in the navbar
- **THEN** the application theme switches between light and dark instantly

#### Scenario: Theme persists across page refresh
- **WHEN** user sets dark mode and refreshes the page
- **THEN** dark mode is still active after the refresh

#### Scenario: System preference is respected on first load
- **WHEN** a new user visits the site with no stored preference and their OS is in dark mode
- **THEN** the app loads in dark mode

### Requirement: Theme toggle is accessible from the navbar
A dark/light mode toggle icon button SHALL be present in the navigation bar on all pages.

#### Scenario: Toggle is visible in navbar
- **WHEN** user views any page
- **THEN** a moon/sun icon toggle button is visible in the top navigation bar
