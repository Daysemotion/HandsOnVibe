export type Status = 'success' | 'warning' | 'danger' | 'idle' | 'running';

export type DrawerSectionKey = 'today' | 'yesterday' | 'previousWeek';

export type RecentThread = {
  id: string;
  title: string;
  status: Status;
  timeLabel: string;
  summary?: string;
  iconLabel?: string;
  iconTone?: 'purple' | 'blue' | 'green' | 'orange' | 'slate';
};

export type AssistantCardVariant = 'plan' | 'files' | 'tests' | 'code';

export type AssistantCardData = {
  id: string;
  title: string;
  lines: string[];
  variant: AssistantCardVariant;
  status?: Status;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  meta?: string;
  cards?: AssistantCardData[];
};

export type ProjectItem = {
  id: string;
  name: string;
  updatedAt: string;
  stack?: string;
  branch?: string;
  badge?: string;
};

export type FileItem = {
  id: string;
  path: string;
  changedAt: string;
  badge?: string;
};

export type RunItem = {
  id: string;
  title: string;
  status: Status;
  timeLabel: string;
  summary?: string;
  model?: string;
};

export type ToolTab = 'ralph' | 'claw' | 'files' | 'runs';

export type ClawResult = {
  id: string;
  label: string;
  path: string;
  snippet: string;
  badge: string;
  badgeTone: 'blue' | 'yellow' | 'cyan' | 'slate' | 'purple';
  preview?: string[];
  faded?: boolean;
};

export type RalphTask = {
  id: string;
  title: string;
  note: string;
  state: 'done' | 'active' | 'pending';
  subtasks?: string[];
};

export type ProviderConnection = {
  id: string;
  provider: string;
  accountLabel: string;
  status: Status;
  defaultModel: string;
  lastSynced: string;
  capabilities?: string[];
};

export type ModelUsageStat = {
  id: string;
  model: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  failureRate: string;
  estimatedCost: string;
  ratio?: number;
};

export type SkillItem = {
  id: string;
  name: string;
  description: string;
  version: string;
  scope: 'global' | 'project';
  installState: 'installed' | 'available' | 'locked';
  permissions: string[];
};
