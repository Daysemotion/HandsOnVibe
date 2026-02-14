import { initialUIState, uiReducer } from '@/state/ui-store';

describe('ui store reducer', () => {
  it('opens and closes drawer', () => {
    const opened = uiReducer(initialUIState, { type: 'OPEN_DRAWER' });
    const closed = uiReducer(opened, { type: 'CLOSE_DRAWER' });

    expect(opened.isDrawerOpen).toBe(true);
    expect(closed.isDrawerOpen).toBe(false);
  });

  it('opens tools and switches active tab', () => {
    const next = uiReducer(initialUIState, { type: 'OPEN_TOOLS', tab: 'claw' });

    expect(next.isToolsPanelOpen).toBe(true);
    expect(next.activeToolTab).toBe('claw');
  });

  it('adds and removes context chips', () => {
    const withChip = uiReducer(initialUIState, { type: 'ADD_CONTEXT_CHIP', value: 'file: a.tsx' });
    const removed = uiReducer(withChip, { type: 'REMOVE_CONTEXT_CHIP', value: 'file: a.tsx' });

    expect(withChip.contextChips).toContain('file: a.tsx');
    expect(removed.contextChips).not.toContain('file: a.tsx');
  });
});
