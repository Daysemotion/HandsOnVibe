import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import type { RalphTask } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const stateMeta: Record<
  RalphTask['state'],
  { label: string; tone: string; icon: keyof typeof MaterialIcons.glyphMap }
> = {
  done: { label: 'Done', tone: '#16A34A', icon: 'check-circle' },
  active: { label: 'In Progress', tone: '#137FEC', icon: 'play-circle-filled' },
  pending: { label: 'Pending', tone: '#6B7280', icon: 'schedule' },
};

export const TaskCard = ({ task }: { task: RalphTask }) => {
  const { colors } = useAppTheme();
  const meta = stateMeta[task.state];

  return (
    <View
      style={{
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        borderColor: task.state === 'active' ? `${colors.accent}66` : colors.separator,
        borderWidth: ui.hairline,
        backgroundColor: task.state === 'active' ? `${colors.accent}0B` : colors.surface,
        padding: spacing.sm,
        gap: spacing.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xs }}>
        <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600', flex: 1 }}>
          {task.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <MaterialIcons name={meta.icon} size={13} color={meta.tone} />
          <Text selectable style={{ ...typography.meta, color: meta.tone, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
        {task.note}
      </Text>

      {task.subtasks?.length ? (
        <View style={{ gap: spacing.xxs, marginTop: spacing.xxs }}>
          {task.subtasks.map((subtask) => (
            <Text key={subtask} selectable style={{ ...typography.meta, color: colors.textMuted }}>
              - {subtask}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};
