import type {
  ChatMessage,
  ClawResult,
  DrawerSectionKey,
  FileItem,
  ModelUsageStat,
  ProjectItem,
  ProviderConnection,
  RalphTask,
  RecentThread,
  RunItem,
  SkillItem,
  ToolTab,
} from '@/features/types';

export const projectOptions: ProjectItem[] = [
  {
    id: 'p-1',
    name: 'Vibe Frontend',
    updatedAt: 'Updated yesterday',
    stack: 'React Native',
    badge: 'JS',
  },
  {
    id: 'p-2',
    name: 'Backend Services',
    updatedAt: 'main branch',
    stack: 'Go',
    badge: 'GO',
  },
  {
    id: 'p-3',
    name: 'Data Pipeline',
    updatedAt: 'processing-v2',
    stack: 'Python',
    badge: 'PY',
  },
];

export const recentThreadsBySection: Record<DrawerSectionKey, RecentThread[]> = {
  today: [
    {
      id: 't-1',
      title: 'Refactoring Auth',
      status: 'running',
      timeLabel: '2m',
      summary: 'Discussing new JWT implementation details...',
      iconLabel: 'R',
      iconTone: 'purple',
    },
    {
      id: 't-2',
      title: 'API Optimization',
      status: 'idle',
      timeLabel: '1h',
      summary: 'Improving response times for dashboard endpoints...',
      iconLabel: 'A',
      iconTone: 'blue',
    },
    {
      id: 't-3',
      title: 'Mobile Layout Bug',
      status: 'warning',
      timeLabel: '3h',
      summary: 'Header overlapping content on iPhone SE.',
      iconLabel: 'M',
      iconTone: 'green',
    },
  ],
  yesterday: [
    {
      id: 't-4',
      title: 'Tooling cleanup',
      status: 'success',
      timeLabel: '18h',
      summary: 'Removed stale scripts and lint overrides.',
      iconLabel: 'T',
      iconTone: 'orange',
    },
  ],
  previousWeek: [
    {
      id: 't-5',
      title: 'Onboarding copy pass',
      status: 'success',
      timeLabel: '3d',
      summary: 'Applied revised tone and step descriptions.',
      iconLabel: 'O',
      iconTone: 'slate',
    },
  ],
};

export const drawerLibraryItems = [
  { id: 'lib-1', title: 'Saved Snippets', tone: 'purple' as const },
  { id: 'lib-2', title: 'History', tone: 'blue' as const },
];

export const starterMessages: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'assistant',
    text:
      "I've analyzed the userController.ts file. It looks like getUser is missing error handling for unknown IDs.",
    meta: 'Agent · 10:23 AM',
  },
  {
    id: 'm-2',
    role: 'user',
    text:
      'Good catch. Implement try-catch and return 404 when user is null. Also add proper TypeScript types.',
  },
  {
    id: 'm-3',
    role: 'assistant',
    text: 'Updated snippet',
    cards: [
      {
        id: 'c-1',
        title: 'Updated Snippet',
        variant: 'code',
        lines: [
          'try {',
          '  const user = await db.findUnique({ where: { id } });',
          '  if (!user) throw new Error("User not found");',
          '  return user;',
          '} catch (error) {',
          '  console.error(error);',
          '  return null;',
          '}',
        ],
      },
    ],
  },
  {
    id: 'm-4',
    role: 'user',
    text: 'Looks correct. Apply it to the file.',
    meta: 'Just now',
  },
];

export const quickChipLabels = ['Split tasks', 'Run tests', 'Create PR', 'Open Ralph'] as const;

export const ralphPlanTasks: RalphTask[] = [
  {
    id: 'rt-1',
    title: 'Set up database schema',
    note: 'Completed 10m ago',
    state: 'done',
  },
  {
    id: 'rt-2',
    title: 'Create login API endpoints',
    note: 'In progress · Step 2/3',
    state: 'active',
    subtasks: ['Define request types', 'Implement validation logic', 'Connect to DB service'],
  },
  {
    id: 'rt-3',
    title: 'Frontend integration',
    note: 'Waiting for API',
    state: 'pending',
  },
];

export const ralphSuggestions = [
  { id: 'rs-1', title: 'Add password reset flow', subtitle: 'Recommended for auth systems' },
];

export const clawRecentFiles: ClawResult[] = [
  {
    id: 'clf-1',
    label: 'App.tsx',
    path: 'src/components',
    snippet: 'App shell and routing composition',
    badge: 'TS',
    badgeTone: 'blue',
  },
  {
    id: 'clf-2',
    label: 'utils.js',
    path: 'src/lib/helpers',
    snippet: 'Shared helper methods',
    badge: 'JS',
    badgeTone: 'yellow',
  },
];

export const clawResults: ClawResult[] = [
  {
    id: 'cl-1',
    label: 'userController.ts',
    path: 'server/controllers',
    snippet: 'export async function getUser(id: string) { ... }',
    badge: 'TS',
    badgeTone: 'blue',
    preview: [
      'export async function getUser(id: string) {',
      '  const user = await db.findUnique({ where: { id } });',
      '  return user;',
      '}',
    ],
  },
  {
    id: 'cl-2',
    label: 'AuthContext.tsx',
    path: 'src/context',
    snippet: 'context provider initialization',
    badge: 'RC',
    badgeTone: 'cyan',
  },
  {
    id: 'cl-3',
    label: 'README.md',
    path: 'root',
    snippet: 'setup instructions and scripts',
    badge: 'MD',
    badgeTone: 'slate',
  },
  {
    id: 'cl-4',
    label: 'styles.css',
    path: 'src/styles',
    snippet: 'legacy web style tokens',
    badge: 'CSS',
    badgeTone: 'purple',
    faded: true,
  },
];

export const fileItems: FileItem[] = [
  { id: 'f-1', path: 'src/features/chat/chat-screen.tsx', changedAt: '5m ago', badge: 'TS' },
  { id: 'f-2', path: 'src/components/tools-panel.tsx', changedAt: '11m ago', badge: 'TS' },
  { id: 'f-3', path: 'docs/ui-spec.md', changedAt: '25m ago', badge: 'MD' },
];

export const runItems: RunItem[] = [
  {
    id: 'r-1',
    title: 'Create login API endpoints',
    status: 'running',
    timeLabel: 'now',
    summary: 'Applying validation + try/catch handling',
    model: 'claude-sonnet-4',
  },
  {
    id: 'r-2',
    title: 'Run auth test suite',
    status: 'success',
    timeLabel: '12m',
    summary: '18 passed, 0 failed',
    model: 'gpt-4.1',
  },
  {
    id: 'r-3',
    title: 'Update onboarding copy',
    status: 'warning',
    timeLabel: '38m',
    summary: 'Needs product review before merge',
    model: 'gemini-2.5-pro',
  },
];

export const toolTabs: ToolTab[] = ['ralph', 'claw', 'files', 'runs'];

export const providerConnections: ProviderConnection[] = [
  {
    id: 'pc-1',
    provider: 'OpenAI',
    accountLabel: 'owner@handsonvibe.dev',
    status: 'success',
    defaultModel: 'GPT-4o, GPT-4.1',
    lastSynced: '2m ago',
    capabilities: ['Chat', 'Completion'],
  },
  {
    id: 'pc-2',
    provider: 'Anthropic',
    accountLabel: 'team-agent@work.io',
    status: 'success',
    defaultModel: 'Claude Sonnet 4',
    lastSynced: '8m ago',
    capabilities: ['Chat'],
  },
  {
    id: 'pc-3',
    provider: 'Mistral AI',
    accountLabel: 'Not connected',
    status: 'idle',
    defaultModel: 'Mistral Large',
    lastSynced: 'never',
    capabilities: ['Setup'],
  },
];

export const usageStatsByModel: ModelUsageStat[] = [
  {
    id: 'u-1',
    model: 'GPT-4o',
    requests: 412,
    inputTokens: 850000,
    outputTokens: 220000,
    failureRate: '1.1%',
    estimatedCost: '$9.84',
    ratio: 70,
  },
  {
    id: 'u-2',
    model: 'Claude 3.5 Sonnet',
    requests: 190,
    inputTokens: 320000,
    outputTokens: 118000,
    failureRate: '2.0%',
    estimatedCost: '$4.62',
    ratio: 25,
  },
  {
    id: 'u-3',
    model: 'Gemini 2.5 Pro',
    requests: 64,
    inputTokens: 42000,
    outputTokens: 16000,
    failureRate: '0.7%',
    estimatedCost: '$0.93',
    ratio: 5,
  },
];

export const installedSkills: SkillItem[] = [
  {
    id: 'sk-1',
    name: 'Frontend Development',
    description: 'React, Tailwind, HTML',
    version: '1.6.2',
    scope: 'global',
    installState: 'installed',
    permissions: ['files', 'commands'],
  },
  {
    id: 'sk-2',
    name: 'UI/UX Design',
    description: 'Figma and prototyping workflows',
    version: '2.1.0',
    scope: 'global',
    installState: 'installed',
    permissions: ['files'],
  },
  {
    id: 'sk-3',
    name: 'Project QA checks',
    description: 'Quality gates for CI-ready review',
    version: '0.9.4',
    scope: 'project',
    installState: 'installed',
    permissions: ['files', 'commands'],
  },
];

export const discoverSkills: SkillItem[] = [
  {
    id: 'sk-4',
    name: 'Data Analysis',
    description: 'Python, SQL, notebooks',
    version: '1.0.0',
    scope: 'global',
    installState: 'available',
    permissions: ['files'],
  },
  {
    id: 'sk-5',
    name: 'DevOps',
    description: 'Docker and CI/CD setup helpers',
    version: '1.0.3',
    scope: 'project',
    installState: 'available',
    permissions: ['files', 'commands'],
  },
  {
    id: 'sk-6',
    name: 'Cybersecurity',
    description: 'Coming soon',
    version: '0.0.0',
    scope: 'project',
    installState: 'locked',
    permissions: [],
  },
];
