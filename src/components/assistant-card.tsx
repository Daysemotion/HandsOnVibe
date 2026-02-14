import React from 'react';
import { Text, View } from 'react-native';

import { StatusChip } from '@/components/status-chip';
import type { AssistantCardData } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const AssistantCard = ({ card }: { card: AssistantCardData }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        borderRadius: radius.card,
        borderCurve: 'continuous',
        borderWidth: ui.hairline,
        borderColor: colors.separator,
        backgroundColor: colors.surface,
        padding: spacing.sm,
        gap: spacing.xs,
      }}
      testID={`assistant-card-${card.id}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
          {card.title}
        </Text>
        {card.status ? <StatusChip status={card.status} /> : null}
      </View>
      {card.lines.map((line) => (
        <Text key={line} selectable style={{ ...typography.body, color: colors.textMuted }}>
          {line}
        </Text>
      ))}
    </View>
  );
};
