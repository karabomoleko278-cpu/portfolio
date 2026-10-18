---
name: Tactical Edge Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for industrial-grade clarity, operational responsiveness, and high-stakes command execution. Designed specifically for mission-critical operators, automation supervisors, and plant engineers managing multi-node topology, the visual identity blends Modern Technical Precision with High-Affordance Tablet Ergonomics. 

The aesthetic is clean, calibrated, and crisp. It eliminates superfluous decoration in favor of structural clarity, high semantic readability, and explicit tactile feedback. Interfaces convey real-time vitality and rock-solid stability under varied lighting environments—from brightly lit control rooms to field floor inspections. Every visual primitive enforces low cognitive load through distinct state categorization, precise metric alignment, and spatial hierarchy optimized for two-thumb landscape tablet control.

## Colors

The palette is tuned for high visual hierarchy against a clean `#f8fafc` canvas, segregating structural containers, diagnostic feedback, and actuation surfaces.

### Semantic Palette & Roles
- **Canvas Base (`#f8fafc`):** Non-distracting foundation reducing optical fatigue during long monitoring shifts.
- **Card & Panel Surface (`#ffffff`):** Pure white modular tiles with hairline delineation to prioritize interactive focal points.
- **Structural Strokes (`#e2e8f0`):** Low-contrast dividers and borders framing data modules without visual clutter.
- **Precision Royal Blue (`#2563eb`):** Primary command triggers, active mesh routes, focused states, and navigational anchors.
- **Actuator Violet (`#8b5cf6` / Substrate `#ede9fe`):** Secondary accent reserved for physical actuator overrides, remote relays, payload triggers, and synthetic logic routines.
- **Emerald Green (`#10b981` / Substrate `#d1fae5`):** Nominal telemetry, healthy mesh health, synchronized beacons, and confirmed states.
- **Vivid Amber (`#f59e0b` / Substrate `#fef3c7`):** Transient latency, network packet drops, reversible overrides, and cautionary status.
- **Vivid Crimson (`#ef4444` / Substrate `#fee2e2`):** Fault conditions, hardware tamper, unacknowledged trips, and emergency isolation interlocks.

### Typography Hierarchy Tokens
- **Slate Heavy (`#0f172a`):** Critical telemetry readouts, dominant headers, and active state switches.
- **Slate Core (`#334155`):** Standard telemetry data, labels, node IDs, and primary body content.
- **Slate Muted (`#64748b`):** Metric units, secondary metadata, passive timestamps, and deactivated states.

## Typography

Typography balances rapid scanning with dense numerical telemetry. 

- **Space Grotesk** powers viewports, section titles, and status dashboards with technical authority and clean geometric construction.
- **Inter** provides neutral, transparent readability across high-frequency prose, operational manifests, configuration tables, and inspector overlays.
- **JetBrains Mono** governs all data density layers: MAC/IPv6 addresses, payload byte counters, sensor values, latency tickers, and timestamps. Tabular numerals ensure jitter-free real-time telemetry streaming.

## Layout & Spacing

The layout is anchored to the 2560x1600 landscape ratio (WQXGA 16:10) of the Samsung Galaxy Tab S7. Layout logic follows a 12-column fluid grid tailored to horizontal tablet orientation with peripheral thumb navigation zones.

### Touch Ergonomics & Reach Zones
- **Edge Margin (`margin-tablet`: 2rem / 32px):** Isolates edge bezels, preventing accidental edge-swipe gestures on the tablet hardware.
- **Thumb Reach Zones:** Primary command buttons, mode toggles, and emergency stops are prioritized within the outer 25% horizontal quadrants (Columns 1–3 and 10–12).
- **Core Viewport:** The middle 6 columns contain continuous streaming graphs, node-link topological maps, and parameter adjustment matrices.
- **Grid Gutters (`gutter`: 16px, `gutter-lg`: 24px):** Maintain crisp optical separation between dense sensor groupings without requiring heavy line containment.
- **Density Control:** Dense layout tiles utilize internal `space-sm` and `space-md` gaps while preserving an absolute 48x48px bounding box for touch targets.

## Elevation & Depth

Visual hierarchy uses a crisp hybrid of tonal surface layering, hairline boundary containment, and diffuse ambient light projection.

### Elevation Levels
- **Level 0 (Canvas):** `#f8fafc` flat background substrate.
- **Level 1 (Card & Module Baselines):** Pure White (`#ffffff`) background bordered with a 1px solid `#e2e8f0` line. Soft ambient shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 6px -2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Active Interactive Modules & Sliders):** Pure White (`#ffffff`) with border `#cbd5e1`. Elevation shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Tactical Drawers & Parameter Flyouts):** Pure White (`#ffffff`) accompanied by a subtle `#2563eb` tinted shadow: `0 10px 15px -3px rgba(37, 99, 235, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`.
- **Level 4 (Critical Alert Sheets & Confirmation Modals):** Pure White (`#ffffff`) accented with a 2px top stroke (colored by alert severity) and deep floating shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.

## Shapes

The design system establishes a consistent structural geometry centered on `rounded-xl` tokens (12px to 16px) for major card modules and touch panels, softened down to 8px (`rounded-md`) for micro controls.

- **Primary Cards and Telemetry Panels:** Outer radius of 16px (`1rem`), matching modern tablet hardware contours.
- **Interactive Controls (Buttons, Inputs, Selectors):** Uniform radius of 12px (`0.75rem`) providing comfortable visual landing zones for fingertips.
- **Pills and Indicators:** Fully rounded (`9999px`) for runtime indicators, node count badges, and telemetry state pills.
- **Data Wells and Inset Telemetry Gauges:** Inner radius of 8px (`0.5rem`) with inset borders to indicate read-only or nested status.

## Components

### Buttons & Actuators
- **Touch Target:** Strict minimum of 48x48px (physical touch zone), with visual padding configured as 12px vertical by 20px horizontal.
- **Primary Command:** Solid `#2563eb`, typography pure white `headline-sm`, 12px roundedness. Active feedback: scales down to `0.98` with `#1d4ed8`.
- **Actuator Trigger:** Solid `#8b5cf6` with `#ede9fe` border. Used exclusively for relay switching, motor actuation, and output driving.
- **Secondary / Ghost:** Transparent base with `#e2e8f0` border, `#334155` text, and `#f1f5f9` hover/pressed fills.
- **Destructive / E-Stop:** Pure White interior with a 2px solid `#ef4444` border, `#ef4444` text; transforms to full `#ef4444` fill on 1.5s press-and-hold confirmation.

### Telemetry Cards
- **Construction:** `#ffffff` surface, 16px corner radius, 1px `#e2e8f0` border, inner padding of 20px.
- **Header Structure:** Space Grotesk section label left-aligned; real-time indicator pill (`Emerald`, `Amber`, or `Crimson`) right-aligned.
- **Data Display:** Numerical values displayed in `JetBrains Mono` (`headline-xl`) paired with micro units (`label-sm` in `#64748b`).

### Chips & Node Badges
- **Status Chips:** 32px height, 12px horizontal padding, 9999px pill radius.
  - *Nominal:* `#d1fae5` background, `#065f46` text, pulsing 6px `#10b981` dot.
  - *Warning:* `#fef3c7` background, `#92400e` text, static 6px `#f59e0b` dot.
  - *Critical:* `#fee2e2` background, `#991b1b` text, blinking 6px `#ef4444` dot.
- **Metric Chips:** `#f1f5f9` background, `#334155` mono text, subtle border `#e2e8f0`.

### Form Inputs & Adjusters
- **Text & IP Fields:** 48px height, `#ffffff` background, 1px `#cbd5e1` outline, 12px radius, monospace input text. Focused state: 2px `#2563eb` outline with zero layout shift.
- **Steppers & Sliders:** Sliders feature a 32px diameter thumb with elevation level 2, sliding along a 6px track. Actuator-linked sliders use `#8b5cf6` active track fills.

### Selection Controls
- **Checkboxes & Radios:** Scaled to 24x24px physical graphic inside a 48x48px invisible touch-target bounding frame. Checkbox border is 2px `#cbd5e1`; fills with `#2563eb` and displays a bold white check mark when active.

### Lists & Telemetry Logs
- **Log Items:** Row height of 56px to ensure one-tap tablet selection. Alternating hairline separators (`#f1f5f9`).
- **Data Columns:** Left-anchored timestamp (`label-sm`), middle-anchored node identifier (`label-md`), and right-anchored state payload with proportional bar charts.