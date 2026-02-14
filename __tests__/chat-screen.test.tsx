import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { ChatScreen } from '@/features/chat/chat-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('chat screen', () => {
  it('sends message from composer', () => {
    const { getByTestId, getByText } = renderWithProviders(<ChatScreen />);

    fireEvent.changeText(getByTestId('composer-input'), 'new message');
    fireEvent.press(getByTestId('send-button'));

    expect(getByText('new message')).toBeTruthy();
    expect(getByTestId('composer-input').props.value).toBe('');
  });

  it('opens drawer from menu and closes via backdrop', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<ChatScreen />);

    fireEvent.press(getByTestId('menu-button'));
    expect(getByTestId('panel-backdrop')).toBeTruthy();

    fireEvent.press(getByTestId('panel-backdrop'));
    expect(queryByTestId('panel-backdrop')).toBeNull();
  });

  it('adds context chip from claw result', () => {
    const { getByTestId, getByText } = renderWithProviders(<ChatScreen />);

    fireEvent.press(getByTestId('tools-button'));
    fireEvent.press(getByTestId('tool-tab-claw'));
    fireEvent.press(getByTestId('claw-add-context-cl-1'));

    expect(getByText('file: server/controllers/userController.ts')).toBeTruthy();
  });
});
