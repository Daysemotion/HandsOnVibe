import React from 'react';

import { LoginScreen } from '@/features/auth/login-screen';
import { ProviderCallbackScreen } from '@/features/auth/provider-callback-screen';
import { ModelsScreen } from '@/features/settings/models-screen';
import { ProjectSkillsScreen } from '@/features/settings/project-skills-screen';
import { SettingsHomeScreen } from '@/features/settings/settings-home-screen';
import { SkillsScreen } from '@/features/settings/skills-screen';
import { UsageScreen } from '@/features/settings/usage-screen';
import { renderWithProviders } from '@/test-utils/render-with-providers';

describe('auth and settings pages', () => {
  it('renders login and provider callback screens', () => {
    const login = renderWithProviders(<LoginScreen />);
    expect(login.getByTestId('login-screen')).toBeTruthy();
    expect(login.getByTestId('login-google')).toBeTruthy();

    const callback = renderWithProviders(<ProviderCallbackScreen />);
    expect(callback.getByTestId('provider-callback-screen')).toBeTruthy();
  });

  it('renders settings home and sections', () => {
    const { getByTestId } = renderWithProviders(<SettingsHomeScreen />);
    expect(getByTestId('settings-screen')).toBeTruthy();
    expect(getByTestId('settings-open-models')).toBeTruthy();
    expect(getByTestId('settings-open-usage')).toBeTruthy();
    expect(getByTestId('settings-open-skills')).toBeTruthy();
    expect(getByTestId('settings-open-project-skills')).toBeTruthy();
  });

  it('renders models, usage, and skills pages', () => {
    const models = renderWithProviders(<ModelsScreen />);
    expect(models.getByTestId('settings-models-screen')).toBeTruthy();

    const usage = renderWithProviders(<UsageScreen />);
    expect(usage.getByTestId('settings-usage-screen')).toBeTruthy();
    expect(usage.getByTestId('usage-period-7d')).toBeTruthy();

    const skills = renderWithProviders(<SkillsScreen />);
    expect(skills.getByTestId('settings-skills-screen')).toBeTruthy();
    expect(skills.getByTestId('skills-scope-global')).toBeTruthy();
  });

  it('renders project skills page', () => {
    const { getByTestId } = renderWithProviders(<ProjectSkillsScreen />);
    expect(getByTestId('settings-project-skills-screen')).toBeTruthy();
  });
});
