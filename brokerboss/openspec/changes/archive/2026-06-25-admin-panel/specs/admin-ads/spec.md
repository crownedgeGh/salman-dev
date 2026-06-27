## ADDED Requirements

### Requirement: Ads page displays dual-format image upload containers
The ads page SHALL display two image upload containers side-by-side (stacked on mobile):
1. **Landscape (16:9)** — labelled "Banner Ad (16:9)" for wide-format placements
2. **Portrait (9:16)** — labelled "Story Ad (9:16)" for vertical/story placements

Each container SHALL maintain its exact aspect ratio via CSS, display a dashed border with a centered upload icon and helper text, and allow clicking to open the native file picker (accept: image/*).

#### Scenario: Upload containers shown with correct aspect ratios
- **WHEN** admin navigates to `/admin/ads`
- **THEN** two upload containers are visible: one in 16:9 ratio and one in 9:16 ratio

#### Scenario: File picker opens on click
- **WHEN** admin clicks on either upload container
- **THEN** the native OS file picker opens filtered to image files

---

### Requirement: Ad image uploader shows preview after file selection
After a file is selected, the upload container SHALL replace the placeholder with an `<img>` preview of the chosen image, maintaining the container's aspect ratio (object-fit: cover).

#### Scenario: Preview replaces placeholder (16:9)
- **WHEN** admin selects an image for the 16:9 container
- **THEN** the container displays a cropped preview of the image in 16:9 ratio

#### Scenario: Preview replaces placeholder (9:16)
- **WHEN** admin selects an image for the 9:16 container
- **THEN** the container displays a cropped preview of the image in 9:16 ratio

---

### Requirement: Ad image uploader allows clearing the selected image
Each upload container SHALL include a clear/remove button (×) that appears on hover over a previewed image, allowing the admin to reset the container back to the placeholder state.

#### Scenario: Clear button visible on hover
- **WHEN** an image is previewed and admin hovers over the container
- **THEN** a circular × button appears in the top-right corner of the container

#### Scenario: Container resets on clear
- **WHEN** admin clicks the × button
- **THEN** the preview is removed and the upload placeholder is restored

---

### Requirement: Ads page lists active ads in AdminTable
Below the upload section, the ads page SHALL display a table/card list of all ads with columns: ID, Title, Format (Banner/Story), Status (Active/Paused/Expired), Impressions, Clicks, CTR (%), Owner, Expiry Date, and Actions (Pause/Activate, Delete).

#### Scenario: Ads table rendered on desktop
- **WHEN** admin views `/admin/ads` on screen ≥ 1024px
- **THEN** a full table with all ten columns is visible below the upload containers

#### Scenario: Ads shown as cards on mobile
- **WHEN** admin views `/admin/ads` on screen < 1024px
- **THEN** each ad is a card with all fields as label-value pairs and action buttons

---

### Requirement: Admin can pause or activate an ad
Each ad row/card SHALL have a toggle action to switch status between "Active" and "Paused".

#### Scenario: Ad paused
- **WHEN** admin clicks "Pause" on an Active ad
- **THEN** the ad's status badge changes to "Paused" (yellow) and the action label becomes "Activate"

#### Scenario: Ad activated
- **WHEN** admin clicks "Activate" on a Paused ad
- **THEN** the ad's status badge changes to "Active" (green)
