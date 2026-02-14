import React from 'react';

import { ProjectsScreen } from '@/features/projects/projects-screen';
import { RunsScreen } from '@/features/runs/runs-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('supporting screens', () => {
  it('renders projects list content', () => {
    const { getByTestId, getByText } = renderWithProviders(<ProjectsScreen />);

    expect(getByTestId('projects-screen')).toBeTruthy();
    expect(getByText('recipe-app')).toBeTruthy();
  });

  it('renders runs list content', () => {
    const { getByTestId, getByText } = renderWithProviders(<RunsScreen />);

    expect(getByTestId('runs-screen')).toBeTruthy();
    expect(getByText('Update profile UI')).toBeTruthy();
  });
});
