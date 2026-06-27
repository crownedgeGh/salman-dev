## ADDED Requirements

### Requirement: Dashboard displays KPI stat cards
The dashboard page SHALL display a row of at least four KPI stat cards showing: Total Users, Properties Listed, Active Ads, and Total Revenue. Each card SHALL show the metric value, a label, a percentage change badge (positive/negative), and an icon.

#### Scenario: Stat cards rendered
- **WHEN** admin navigates to `/admin`
- **THEN** four stat cards are visible in a responsive grid (4 columns on lg+, 2 columns on md, 1 column on sm)

#### Scenario: Positive change shown in green badge
- **WHEN** a KPI metric has increased compared to the previous period
- **THEN** the change badge shows a green upward arrow with the percentage

#### Scenario: Negative change shown in red badge
- **WHEN** a KPI metric has decreased
- **THEN** the change badge shows a red downward arrow with the percentage

---

### Requirement: Dashboard displays an activity trend chart
The dashboard SHALL include an area chart showing user registrations and property listings over the last 30 days. The chart SHALL use amber and muted tones consistent with the admin theme.

#### Scenario: Chart renders with mock data
- **WHEN** admin views the dashboard
- **THEN** an area chart is visible with labeled X-axis (dates) and Y-axis (count), and a legend distinguishing users vs. properties

---

### Requirement: Dashboard displays recent activity feed
The dashboard SHALL show a "Recent Activity" list of the latest 8 platform events (e.g., "New user registered", "Property #42 listed", "Ad #7 approved"). Each item SHALL show an icon, description, and relative timestamp.

#### Scenario: Activity feed rendered
- **WHEN** admin views the dashboard
- **THEN** up to 8 recent activity items are shown in chronological order (newest first)

---

### Requirement: Dashboard displays a bar chart for ad performance
The dashboard SHALL include a bar chart comparing impressions vs. clicks for the top 5 active ads.

#### Scenario: Ad performance chart visible
- **WHEN** admin views the dashboard
- **THEN** a bar chart with two grouped bars per ad (impressions, clicks) is visible below the activity trend chart
