# HandsonVibe Design System

This folder is the single source of truth for visual consistency.

## Foundations
- Use tokens from `@/design-system` only.
- Do not hardcode spacing, radius, or text sizes in screens unless there is a verified exception.
- Keep minimum touch target at `44x44`.

## Core Components
- `DSIconButton`: Borderless icon button matching Stitch interaction style.
- `DSSearchField`: Standard search input with leading icon.
- `DSCard`: Surface card container for list/detail blocks.
- `DSSectionLabel`: Uppercase section label for grouped lists.

## Screen Pattern
- Header row (`space-between`)
- Search field
- Scrollable content
- Sticky composer/action area

## Navigation Pattern
- Bottom tab bar stays hidden.
- Sidebar (drawer) is the primary navigation surface.
- Settings entry is placed in header or drawer icon actions.

## Usage
```ts
import { DSIconButton, DSSearchField, DSCard, DSSectionLabel } from '@/design-system';
```
