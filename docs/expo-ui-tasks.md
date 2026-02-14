# Expo UI Implementation Tasks (React Native + Expo)

This task list is based on:
- `/Users/mac/HandsonVibe/docs/ui-spec.md`
- `/Users/mac/HandsonVibe/images/mock-up.png`
- `/Users/mac/HandsonVibe/AGENT.md`

Goal:
- Build a chat-first mobile UI where the owner can run Expo and verify a completed, navigable UI on device/emulator.

## Completion Criteria (Global DoD)

- `npx expo start` runs without runtime crash.
- On iOS and Android, the following are visually and functionally present:
  - Tabs: `Chat`, `Projects`, `Runs`
  - Chat screen with header, context chips, message list, quick chips, composer
  - Left drawer with Recent sections and Settings
  - Right tools panel with tabs: Ralph, Clew, Files, Runs
- Light/Dark theme both render correctly with system-like colors.
- No TypeScript errors and no lint errors in the implemented scope.
- `npm run test:ci` passes (UI/component/state tests included).
- Every task is considered complete only after related tests are added/updated and passing.

## Test Gate Rules (Mandatory)

- For every implementation change, add or update automated tests in the same task.
- Do not start the next task until current task tests pass.
- If tests fail, fix tests and/or implementation before progressing.
- Keep tests close to feature boundaries:
  - UI component tests (render, interaction, states)
  - Screen integration tests (critical flows)
  - State/store tests (actions/selectors/transitions)
- Minimum gate per task:
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run test:ci`

## Git Workflow Rules (Mandatory)

- Initialize and maintain `.gitignore` for Expo/React Native generated artifacts.
- Do not progress to the next task unless current task changes are:
  - committed locally
  - pushed to remote branch successfully
- Recommended commit flow per task:
  1. `git add -A`
  2. `git commit -m "feat(ui): complete Tn <short-summary>"`
  3. `git push origin <branch>`
- Required verification before next task:
  - `git status` shows clean working tree
  - remote push command completed successfully
- Commit scope rule:
  - include implementation + tests for the same task in one commit set
  - avoid mixing unrelated tasks in a single commit

## Task Breakdown

## T0. Project Bootstrap (if repo is not initialized)
- [ ] Initialize Expo app with TypeScript and Expo Router.
- [ ] Ensure directory structure exists:
  - `app/` (routes only)
  - `src/components/`
  - `src/theme/`
  - `src/state/`
  - `src/features/`
- [ ] Configure required baseline packages for navigation, gesture, animation, safe area.
- [ ] Configure test toolchain for Expo/RN:
  - Jest + `jest-expo`
  - React Native Testing Library
  - jest setup file and testing helpers
- [ ] Add scripts: `test`, `test:watch`, `test:ci`.
- [ ] Add first smoke test that renders app root route.
- [ ] Add `.gitignore` for Expo/React Native project outputs.

Acceptance:
- [ ] App launches to a non-blank route (`/` mapped to chat flow).
- [ ] Expo Router resolves routes without warnings.
- [ ] Test command passes with initial smoke test.
- [ ] `.gitignore` is present and excludes generated artifacts.

## T1. Route and Navigation Skeleton
- [ ] Create root layouts and tab layout.
- [ ] Implement three tabs only: `Chat`, `Projects`, `Runs`.
- [ ] Set default entry to `/(tabs)/chat`.
- [ ] Add placeholders for drawer and tools panel entry actions in header.

Acceptance:
- [ ] User can switch all three tabs.
- [ ] Back behavior is predictable (no broken navigation stack).
- [ ] Navigation/tab behavior tests pass.

## T2. Design Tokens and Theme Foundation
- [ ] Create spacing, radius, separator tokens in `src/theme`.
- [ ] Implement typography scale:
  - Title `18/semibold`
  - Body `15/regular`
  - Meta `12/regular`
  - Code/log `12/mono`
- [ ] Implement Light/Dark color tokens (bg, surface, text, textMuted, separator, accent, status).

Acceptance:
- [ ] Changing OS theme updates the UI style with readable contrast.
- [ ] Tokens are used by screens/components, not hardcoded ad hoc values.
- [ ] Theme token and color-mode switching tests pass.

## T3. Core Chat Screen (MVP UI)
- [ ] Build `AppHeader`:
  - Project switch
  - Search action
  - Menu action
- [ ] Build optional `ContextChipsRow` (`task: login` style).
- [ ] Build `MessageBubble` for user/assistant.
- [ ] Build assistant compact cards:
  - `PlanCard`
  - `FilesCard`
  - `TestsCard`
- [ ] Build `QuickChips` row (max 4).
- [ ] Build `Composer`:
  - Left: attach/context
  - Middle: multiline input
  - Right: send button

Acceptance:
- [ ] Chat page mirrors the spec structure and mock-up information hierarchy.
- [ ] Composer works with multiline input and does not overlap unsafe areas.
- [ ] Chat screen/component tests pass (header, chips, message list, composer interactions).

## T4. Left Drawer (Recent)
- [ ] Implement left drawer open/close via menu icon and swipe gesture.
- [ ] Drawer contains:
  - Header `Recent`
  - Search input
  - Sections: Today / Yesterday / Previous 7 days
  - Row item: title, status chip, time, subtle icon
  - Bottom `Settings`
- [ ] Wire drawer item selection to load selected thread context in chat.

Acceptance:
- [ ] Drawer interaction is smooth and deterministic.
- [ ] Selecting a recent item updates active chat thread context.
- [ ] Drawer interaction tests pass (open/close, section render, thread select callback).

## T5. Right Tools Panel
- [ ] Implement right slide panel open/close from header or quick chip.
- [ ] `ToolPanelTabs`: Ralph | Clew | Files | Runs.
- [ ] Ralph tab:
  - Goal input
  - Breakdown task cards
  - CTA `Create tasks`
- [ ] Clew tab:
  - Search input
  - Result list + snippet preview
  - CTA `Add context`
- [ ] Files tab: simple file list.
- [ ] Runs tab: run list with status.
- [ ] Implement `Add context` action to inject context chip in composer area.

Acceptance:
- [ ] All four tabs render and switch correctly.
- [ ] `Add context` modifies composer context state as expected.
- [ ] Tools panel tests pass (tab switch, Ralph/Clew CTA paths, Add context behavior).

## T6. Supporting Screens (Projects, Runs)
- [ ] Build minimal but coherent `Projects` and `Runs` tab screens.
- [ ] Reuse list item components (`RunListItem`, `FileListItem`) where applicable.
- [ ] Keep visual style consistent with chat surface system.

Acceptance:
- [ ] Tabs are not placeholders; each has usable list content with mock data.
- [ ] Projects/Runs screen tests pass (list rendering, status visibility, basic interactions).

## T7. Shared State and Mock Data
- [ ] Define UI/app state store:
  - Active project
  - Active thread
  - Drawer open state
  - Tools panel open state
  - Active tool tab
  - Composer text/context chips
- [ ] Add mock data sets for recent threads, messages, plans/files/tests, runs.

Acceptance:
- [ ] No screen is empty at first load.
- [ ] All core interactions are demoable without backend.
- [ ] Store/state unit tests pass (thread selection, panel open state, composer context insertion).

## T8. Interaction Polish and Accessibility
- [ ] Ensure minimum touch target around interactive controls.
- [ ] Add visible pressed/focus states for controls.
- [ ] Keep animations lightweight (roughly 150-250ms), avoid layout jank.
- [ ] Verify separators, spacing, corner radius match spec feel.
- [ ] Validate text contrast for light/dark.

Acceptance:
- [ ] UI feels stable and readable across devices and themes.
- [ ] Interaction/accessibility-focused tests pass (press states, critical labels/roles, key flows).

## T9. Final Verification and Handoff
- [ ] Run typecheck.
- [ ] Run lint and fix all introduced issues.
- [ ] Run full test suite in CI mode and ensure pass.
- [ ] Run Expo and verify on at least one iOS target and one Android target (emulator or physical device).
- [ ] Validate final checklist below.
- [ ] Ensure every completed task has matching commit(s) and push history.

Final UI checklist:
- [ ] Header contains project switch, search, menu.
- [ ] Context chip row is visible when context exists.
- [ ] Message list includes bubbles and assistant cards.
- [ ] Quick chips show max 4 actions.
- [ ] Composer has attach, multiline input, send.
- [ ] Left drawer has Recent sections and Settings.
- [ ] Right panel has Ralph/Clew/Files/Runs tabs.
- [ ] Clew `Add context` adds a chip to composer area.
- [ ] Projects and Runs tabs render meaningful content.
- [ ] Final automated tests are all green and match implemented UI behavior.

## Recommended Execution Order

1. T0 -> T1 -> T2
2. T3
3. T4 + T5
4. T6 + T7
5. T8 -> T9

## Runtime Verification Commands

Use one package manager consistently (npm/pnpm/yarn).

```bash
# install deps
npm install

# run app
npx expo start

# typecheck
npx tsc --noEmit

# lint
npm run lint

# unit/integration tests (watch)
npm run test:watch

# full test gate for each task / CI
npm run test:ci

# git gate per task
git status
git add -A
git commit -m "feat(ui): complete Tn <short-summary>"
git push origin <branch>
```
