# AGENT.md

## Project Context
- Product: HandsonVibe mobile app
- Stack: Expo Router + React Native + TypeScript
- Goal: Keep UI and UX aligned with Stitch references while preserving our service flow.

## Non-Negotiable UI Rules
- Sidebar-first navigation:
  - Bottom tab bar is hidden.
  - Main navigation is controlled from the left drawer.
- Header pattern:
  - Borderless icon buttons.
  - `space-between` layout.
  - Title/project switch centered between left and right actions.
- Typography:
  - Follow shared tokens only (`@/design-system` or `@/theme/tokens`).
  - Default body/meta sizes must match current Stitch-tuned values.
- Touch targets:
  - Minimum `44x44`.
- Shapes:
  - Use continuous rounded corners where appropriate.
- Visual consistency:
  - Avoid ad-hoc colors, border radius, and spacing values in screens.

## Design System Source of Truth
- Use `src/design-system` as the first choice for new UI.
- Reuse:
  - `DSIconButton`
  - `DSSearchField`
  - `DSCard`
  - `DSSectionLabel`
- Tokens:
  - Colors, spacing, radius, type scales from `@/design-system`.

## Architecture Rules
- Routes: `app/`
- Reusable UI: `src/components/` and `src/design-system/`
- Feature screens: `src/features/`
- State: `src/state/`
- Theme/tokens: `src/theme/`

## Implementation Checklist
- No direct style duplication if a design-system component can be reused.
- Keep interactions simple and predictable (press feedback, clear states).
- Ensure safe area handling on top and bottom.
- Keep copy selectable for important UI text where appropriate.

## QA Before Finishing
- `npm run typecheck`
- `npm run lint`
- `npm run test:ci`

## Prohibited Patterns
- Reintroducing visible bottom navigation.
- Bordered or pill-heavy icon buttons in top headers.
- Hardcoded one-off style values when equivalent tokens exist.
- Building new page layouts without matching the established Stitch pattern.
