import React from 'react';
import { Text, View } from 'react-native';

import { StatusChip } from '@/components/status-chip';
import type { RunItem } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const RunListItem = ({ run }: { run: RunItem }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        borderColor: colors.separator,
        borderWidth: ui.hairline,
        backgroundColor: colors.surface,
        padding: spacing.sm,
        gap: spacing.xs,
      }}
    >
      <Text selectable style={{ ...typography.body, color: colors.text }}>
        {run.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <StatusChip status={run.status} />
        <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
          {run.timeLabel}
        </Text>
      </View>
    </View>
  );
};
