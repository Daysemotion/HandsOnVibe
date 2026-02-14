import type {
  ChatMessage,
  DrawerSectionKey,
  FileItem,
  ProjectItem,
  RecentThread,
  RunItem,
  ToolTab,
} from '@/features/types';

export const projectOptions: ProjectItem[] = [
  { id: 'p-1', name: 'recipe-app', updatedAt: '12m ago' },
  { id: 'p-2', name: 'todo-app', updatedAt: '20m ago' },
  { id: 'p-3', name: 'chat-app', updatedAt: '38m ago' },
];

export const recentThreadsBySection: Record<DrawerSectionKey, RecentThread[]> = {
  today: [
    { id: 't-1', title: 'Implement user login', status: 'success', timeLabel: '12m ago' },
    { id: 't-2', title: 'Implement profile screen', status: 'idle', timeLabel: '20m ago' },
  ],
  yesterday: [{ id: 't-3', title: 'Add onboarding UI', status: 'warning', timeLabel: '38m ago' }],
  previousWeek: [{ id: 't-4', title: 'Update README', status: 'success', timeLabel: '1h ago' }],
};

export const starterMessages: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'user',
    text: 'Implement user login',
    meta: 'email/password',
  },
  {
    id: 'm-2',
    role: 'assistant',
    text: "Here's the updated plan. I'll start working on it now.",
    cards: [
      {
        id: 'c-1',
        title: 'Plan',
        variant: 'plan',
        lines: [
          'Set up login form in LoginScreen.tsx',
          'Implement email/password auth flow',
          'Ensure tests for login pass',
        ],
      },
      {
        id: 'c-2',
        title: 'Tests result',
        variant: 'tests',
        status: 'success',
        lines: ['Creating login.tsx tests...'],
      },
    ],
  },
];

export const quickChipLabels = ['Split tasks', 'Run tests', 'Create PR', 'Open Ralph'] as const;

export const ralphTasks = [
  'Improve login feature by adding email/password validation',
  'Create LoginScreen.tsx task',
  'Fix failing tests',
  'Document login API in README',
];

export const clewResults = [
  { id: 'cl-1', label: 'src/features/chat/chat-screen.tsx', snippet: 'composer and quick chips' },
  { id: 'cl-2', label: 'src/state/ui-store.tsx', snippet: 'context chip insertion state' },
  { id: 'cl-3', label: 'src/features/mock-data.ts', snippet: 'message and thread fixtures' },
];

export const fileItems: FileItem[] = [
  { id: 'f-1', path: 'src/features/chat/chat-screen.tsx', changedAt: '5m ago' },
  { id: 'f-2', path: 'src/components/tools-panel.tsx', changedAt: '11m ago' },
  { id: 'f-3', path: 'src/state/ui-store.tsx', changedAt: '18m ago' },
];

export const runItems: RunItem[] = [
  { id: 'r-1', title: 'Update profile UI', status: 'success', timeLabel: '20m ago' },
  { id: 'r-2', title: 'Implement profile screen', status: 'idle', timeLabel: 'Idle' },
  { id: 'r-3', title: 'Add onboarding UI', status: 'warning', timeLabel: '38m ago' },
];

export const toolTabs: ToolTab[] = ['ralph', 'clew', 'files', 'runs'];
