# ShieldLine — SMS Spam Classifier mockup

A self-contained, clickable HTML prototype generated from `SMS-SpamClassifier-PRD.pdf`, following the
six-phase workflow in the `mockup-generator` agent (ingest → plan → design system → build → self-review → handoff).
No build step — open `index.html` directly in a browser.

## How to open

```
open index.html
```

or open `index.html` in any browser. Every screen links to the others; start from the hub.

## Screens

| # | Screen | PRD traceability |
|---|--------|------------------|
| 00 | [index.html](index.html) — Mockup hub | Personas, flow map, screen directory |
| 01 | [Sign in](screens/01-sign-in.html) | Entry point for the security console |
| 02 | [Dashboard](screens/02-dashboard.html) | §1 Success Metrics, Flow 1 |
| 03 | [Live feed](screens/03-live-feed.html) | Flow 1 — real-time classification stream, FR1–FR3 |
| 04 | [Quarantine](screens/04-quarantine.html) | Flow 4, FR4, FR10 (auto-expiry shows hash only) |
| 05 | [Review queue](screens/05-review-queue.html) | Flow 5, FR6 — human-in-the-loop for low-confidence band |
| 06 | [Message detail](screens/06-message-detail.html) | §4.4 Explainability — TF-IDF terms, SentiWordNet, audit trail |
| 07 | [Report an issue](screens/07-report-issue.html) | Flow 2, Story 2 — end-user portal, mobile frame |
| 08 | [Alerts & campaigns](screens/08-alerts.html) | Flow 4, FR7 — spike detection, weekly report |
| 09 | [Model & retraining](screens/09-model-retraining.html) | Flow 3, FR5, §5.1 — exact 4-model comparison table |
| 10 | [Settings & governance](screens/10-settings.html) | §4.3 — items that require human approval |

## Personas

- **Priya Nandakumar** — IT Security Manager / CISO (Story 1, Story 4): dashboard, alerts, settings/governance
- **Marcus Webb** — Business Operations Manager (Story 2): the "report a misclassification" mobile portal
- **Jordan Lee** — Telecom / Platform Engineer (Story 3): API keys, integration-facing settings
- **Devon Reyes** — ML / Review Analyst (Flow 5, FR6): review queue, model & retraining

## Assumptions made (the PRD doesn't specify these — invented for a believable prototype)

- **Product name "ShieldLine"** — the PRD describes the system functionally but doesn't name it.
- **Persona names** (Priya Nandakumar, Marcus Webb, Jordan Lee, Devon Reyes, Aisha Mensah, Sankar Kumar
  Palaniappan) are invented to make the role-based screens concrete; the PRD only describes roles/segments.
- **Sample message text, sender IDs, hashes, and timestamps** (e.g. "WINNER!! As a valued customer…",
  `ACME-REWARDS`, `sha256:7c41af9e2b…b209`) are fabricated but written in the style of the PRD's domain
  (UCI SMS-Spam-style spam/ham/phishing copy) to avoid lorem ipsum.
- **Quarantine confidence threshold (≥ 85%)** and **low-confidence review boundary (40–60%)** are inferred
  from the PRD's deployment/shadow-mode discussion (§6) and the "human approval" list (§4.3); the PRD gives
  the model's accuracy figures but not the operational threshold values, so these are reasonable placeholders
  shown as adjustable, approval-gated settings.
- **Retention window (30 days)** for quarantined messages is an assumption consistent with FR10's "store
  hash only after expiry" requirement; the PRD does not give an exact number of days.
- **Model comparison figures on screen 09** are reproduced verbatim from PRD §5.1 (Decision Tree
  before/after pruning, Random Forest before/after pruning) — these are not invented.

## Open questions carried over from the PRD (§11)

- Should the confidence threshold for quarantine differ by message category (e.g., banking OTPs vs.
  promotional content)? — surfaced as a callout on the **Settings → Classification thresholds** tab.
- How should the system handle messages in languages other than English? — not yet represented in the
  mockup; would affect the live feed filters and the explainability view.
- What is the exact SLA for human review of low-confidence messages? — the **Review queue** screen shows
  an assumed "respond within ~1–2 hours" SLA countdown as a placeholder.

## Design system

A single dark-theme token set (CSS custom properties in [assets/styles.css](assets/styles.css), mirrored
into a Tailwind `theme.extend` config block in every page's `<head>`) is reused across all 11 files:
background `#0a0e16`, surfaces `#11161f`/`#161c28`/`#1d2433`, accent `#38bdf8`, and semantic colors for
spam/ham/uncertain/info. Shared interactivity (`assets/app.js`) drives tabs, modals, dropdown menus, the
mobile sidebar toggle, and toast notifications via `data-*` attributes — no framework, no build step.
