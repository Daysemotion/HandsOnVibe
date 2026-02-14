import React from 'react';

import { ChatScreen } from '@/features/chat/chat-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('app smoke', () => {
  it('renders chat screen without crashing', () => {
    const { getByTestId } = renderWithProviders(<ChatScreen />);

    expect(getByTestId('chat-screen')).toBeTruthy();
    expect(getByTestId('chat-header')).toBeTruthy();
  });
});
