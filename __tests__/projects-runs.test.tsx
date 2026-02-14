import React from 'react';

import { ProjectsScreen } from '@/features/projects/projects-screen';
import { RunsScreen } from '@/features/runs/runs-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('supporting screens', () => {
  it('renders projects list content', () => {
    const { getByTestId, getAllByText } = renderWithProviders(<ProjectsScreen />);

    expect(getByTestId('projects-screen')).toBeTruthy();
    expect(getAllByText('Vibe Frontend').length).toBeGreaterThan(0);
  });

  it('renders runs list content', () => {
    const { getByTestId, getAllByText } = renderWithProviders(<RunsScreen />);

    expect(getByTestId('runs-screen')).toBeTruthy();
    expect(getAllByText('Create login API endpoints').length).toBeGreaterThan(0);
  });
});
