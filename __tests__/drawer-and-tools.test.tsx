import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { ChatScreen } from '@/features/chat/chat-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('drawer and tools interactions', () => {
  it('selecting thread adds thread context chip', () => {
    const { getByTestId, getByText } = renderWithProviders(<ChatScreen />);

    fireEvent.press(getByTestId('menu-button'));
    fireEvent.press(getByTestId('drawer-item-t-3'));

    expect(getByText('thread: Mobile Layout Bug')).toBeTruthy();
  });

  it('switches tool panel tabs and keeps panel visible', () => {
    const { getByTestId } = renderWithProviders(<ChatScreen />);

    fireEvent.press(getByTestId('tools-button'));
    fireEvent.press(getByTestId('tool-tab-runs'));
    fireEvent.press(getByTestId('tool-tab-files'));

    expect(getByTestId('tools-panel')).toBeTruthy();
  });
});
