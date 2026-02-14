export type Status = 'success' | 'warning' | 'danger' | 'idle';

export type DrawerSectionKey = 'today' | 'yesterday' | 'previousWeek';

export type RecentThread = {
  id: string;
  title: string;
  status: Status;
  timeLabel: string;
};

export type AssistantCardVariant = 'plan' | 'files' | 'tests';

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
};

export type FileItem = {
  id: string;
  path: string;
  changedAt: string;
};

export type RunItem = {
  id: string;
  title: string;
  status: Status;
  timeLabel: string;
};

export type ToolTab = 'ralph' | 'clew' | 'files' | 'runs';
