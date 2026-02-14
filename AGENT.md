# AGENTS.md — Mobile VibeCoding UI Rules

## Tech
- Expo + React Native + TypeScript
- Use Expo Router for navigation.
- Prefer functional components + hooks.
- Keep dependencies minimal.

## UI Principles
- Minimal UI: fewer borders, more whitespace.
- Chat-first: main screen is chat, others are supporting surfaces.
- Diffuse color usage: system-like colors, no heavy branding.
- Light/Dark must both look correct.

## Architecture
- /app for routes (expo-router)
- /src/components for reusable UI
- /src/theme for tokens and helpers
- /src/state for app state (store)
- /src/features for feature modules (chat, tools, runs)

## Output Expectations
- Always implement UI with clean components.
- Provide story/demo data for screens (mock).
- Don’t overbuild: create only what the spec requests.
- After implementation, run typecheck and fix lint errors.