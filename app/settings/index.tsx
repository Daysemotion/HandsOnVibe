import React from 'react';
import { router } from 'expo-router';

import { SettingsHomeScreen } from '@/features/settings/settings-home-screen';

export default function SettingsRoute() {
  return (
    <SettingsHomeScreen
      onOpenMenu={() => router.back()}
      onOpenModels={() => router.push('/settings/models')}
      onOpenUsage={() => router.push('/settings/usage')}
      onOpenSkills={() => router.push('/settings/skills')}
      onOpenProjectSkills={() => router.push('/settings/project-skills')}
    />
  );
}
