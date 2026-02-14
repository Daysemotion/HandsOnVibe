import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { projectOptions } from '@/features/mock-data';
import type { ToolTab } from '@/features/types';

export type UIState = {
  activeProjectId: string;
  activeThreadId: string;
  isDrawerOpen: boolean;
  isToolsPanelOpen: boolean;
  activeToolTab: ToolTab;
  composerText: string;
  contextChips: string[];
};

export const initialUIState: UIState = {
  activeProjectId: projectOptions[0]?.id ?? 'p-1',
  activeThreadId: 't-1',
  isDrawerOpen: false,
  isToolsPanelOpen: false,
  activeToolTab: 'ralph',
  composerText: '',
  contextChips: ['task: login'],
};

type UIAction =
  | { type: 'SET_PROJECT'; projectId: string }
  | { type: 'SET_THREAD'; threadId: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'OPEN_TOOLS'; tab?: ToolTab }
  | { type: 'CLOSE_TOOLS' }
  | { type: 'SET_COMPOSER_TEXT'; value: string }
  | { type: 'ADD_CONTEXT_CHIP'; value: string }
  | { type: 'REMOVE_CONTEXT_CHIP'; value: string };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, activeProjectId: action.projectId };
    case 'SET_THREAD':
      return { ...state, activeThreadId: action.threadId, isDrawerOpen: false };
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true, isToolsPanelOpen: false };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'OPEN_TOOLS':
      return {
        ...state,
        isToolsPanelOpen: true,
        isDrawerOpen: false,
        activeToolTab: action.tab ?? state.activeToolTab,
      };
    case 'CLOSE_TOOLS':
      return { ...state, isToolsPanelOpen: false };
    case 'SET_COMPOSER_TEXT':
      return { ...state, composerText: action.value };
    case 'ADD_CONTEXT_CHIP': {
      const normalized = action.value.trim();
      if (!normalized || state.contextChips.includes(normalized)) {
        return state;
      }
      return { ...state, contextChips: [...state.contextChips, normalized] };
    }
    case 'REMOVE_CONTEXT_CHIP':
      return {
        ...state,
        contextChips: state.contextChips.filter((chip) => chip !== action.value),
      };
    default:
      return state;
  }
};

type UIStoreValue = {
  state: UIState;
  setProject: (projectId: string) => void;
  setThread: (threadId: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openToolsPanel: (tab?: ToolTab) => void;
  closeToolsPanel: () => void;
  setComposerText: (value: string) => void;
  addContextChip: (value: string) => void;
  removeContextChip: (value: string) => void;
};

const UIStoreContext = createContext<UIStoreValue | null>(null);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const value = useMemo<UIStoreValue>(
    () => ({
      state,
      setProject: (projectId) => dispatch({ type: 'SET_PROJECT', projectId }),
      setThread: (threadId) => dispatch({ type: 'SET_THREAD', threadId }),
      openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
      closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
      openToolsPanel: (tab) => dispatch({ type: 'OPEN_TOOLS', tab }),
      closeToolsPanel: () => dispatch({ type: 'CLOSE_TOOLS' }),
      setComposerText: (value) => dispatch({ type: 'SET_COMPOSER_TEXT', value }),
      addContextChip: (value) => dispatch({ type: 'ADD_CONTEXT_CHIP', value }),
      removeContextChip: (value) => dispatch({ type: 'REMOVE_CONTEXT_CHIP', value }),
    }),
    [state],
  );

  return <UIStoreContext.Provider value={value}>{children}</UIStoreContext.Provider>;
};

export const useUIStore = () => {
  const store = useContext(UIStoreContext);
  if (!store) {
    throw new Error('useUIStore must be used inside UIProvider');
  }
  return store;
};
