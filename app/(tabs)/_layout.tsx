import React from 'react';
import { Tabs } from 'expo-router';

import { useAppTheme } from '@/theme/use-app-theme';

export const unstable_settings = {
  initialRouteName: 'chat',
};

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.separator,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="projects" options={{ title: 'Projects' }} />
      <Tabs.Screen name="runs" options={{ title: 'Runs' }} />
    </Tabs>
  );
}
