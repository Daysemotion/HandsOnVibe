import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RunListItem } from '@/components/run-list-item';
import { runItems } from '@/features/mock-data';
import { spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const RunsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: ui.screenPadding,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.sm,
      }}
      testID="runs-screen"
    >
      <Text selectable style={{ ...typography.title, color: colors.text }}>
        Runs
      </Text>
      {runItems.map((run) => (
        <RunListItem key={run.id} run={run} />
      ))}
    </ScrollView>
  );
};
