# UI Spec — Minimal VibeCoding Mobile (Chat-first)

## Goal
- Mobile layout like ChatGPT app: main screen is a chat composer + message list.
- Minimal, modern, system-color-based. Supports Light/Dark.
- Provide quick navigation to: Recent work, Ralph, Clew.

## Platforms
- Expo + React Native
- iOS + Android
- Typography: system font
- Icons: simple line icons only

## Navigation (Expo Router)
- Main entry: /(tabs)/chat as default route
- Tabs: Chat, Projects, Runs (3 tabs only)
- Left Drawer: Recent (threads), Projects list, Settings
- Slide Panel (right): Tools panel with Ralph / Clew / Files / Runs

## Screens
### 1) Chat (Home)
- Top bar: [Project switch] [Search] [Menu]
- Context row (optional): "task: login" chip style
- Message list: bubbles + compact cards (Plan, Files, Tests)
- Composer:
  - Left: "+" attach/context
  - Middle: multiline input
  - Right: send button
  - Above composer: quick chips (max 4): Split tasks, Run tests, Create PR, Open Ralph

### 2) Drawer (Left)
- Header: "Recent"
- Search input
- Sections:
  - Today
  - Yesterday
  - Previous 7 days
- Each item: title, status chip, time, subtle icon
- Bottom: Settings

### 3) Tools Slide Panel (Right)
Tabs: Ralph | Clew | Files | Runs
- Ralph (Planner):
  - Goal input
  - Breakdown list (task cards)
  - CTA button: "Create tasks"
- Clew (Code Explorer):
  - search input (files/symbols)
  - results list
  - preview snippet
  - CTA: "Add context"
- Files:
  - simple file list
- Runs:
  - run list with status

## Visual Style
### Spacing
- Base grid: 4pt
- Screen padding: 16
- Card padding: 12
- Corner radius: 14
- Hairline separators: 1px, very subtle

### Typography (approx)
- Title: 18/semibold
- Body: 15/regular
- Meta: 12/regular
- Code/log: 12/mono

### Color Tokens (use system-ish)
- bg: system background
- surface: secondary background
- text: primary label
- textMuted: secondary label
- separator: subtle
- accent: platform default (iOS blue / Android dynamic if available)
- status:
  - success: subtle green tint
  - warning: subtle amber tint
  - danger: subtle red tint
(Do NOT use loud saturated colors)

## Components
- AppHeader
- ContextChipsRow
- MessageBubble (user/assistant)
- AssistantCard (PlanCard, FilesCard, TestsCard)
- Composer (Input + actions)
- QuickChips
- DrawerListItem
- ToolPanelTabs
- TaskCard
- RunListItem
- FileListItem

## Interaction
- Drawer opens from left swipe or menu icon
- Tool panel opens from right icon in header or quick chip
- Selecting item in drawer loads that thread in chat
- "Add context" inserts a context chip into chat input area