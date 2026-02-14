import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flex: 1 }}>
          <MaterialIcons name="play-circle-outline" size={16} color={colors.textMuted} />
          <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600', flex: 1 }}>
            {run.title}
          </Text>
        </View>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
          {run.timeLabel}
        </Text>
      </View>

      {run.summary ? (
        <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
          {run.summary}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <StatusChip status={run.status} />
        {run.model ? (
          <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
            {run.model}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
