import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { StatusChip } from '@/components/status-chip';
import type { AssistantCardData } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const AssistantCard = ({ card }: { card: AssistantCardData }) => {
  const { colors } = useAppTheme();

  if (card.variant === 'code') {
    return (
      <View
        style={{
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
        testID={`assistant-card-${card.id}`}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            borderBottomWidth: ui.hairline,
            borderBottomColor: colors.separator,
            backgroundColor: colors.surfaceMuted,
          }}
        >
          <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontWeight: '600' }}>
            {'</>'} {card.title}
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            TypeScript
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, gap: 2 }}>
          {card.lines.map((line) => (
            <Text key={line} selectable style={{ ...typography.code, color: colors.text }}>
              {line}
            </Text>
          ))}
        </View>

        <View
          style={{
            borderTopWidth: ui.hairline,
            borderTopColor: colors.separator,
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            alignItems: 'flex-end',
            backgroundColor: colors.surfaceMuted,
          }}
        >
          <Pressable>
            <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '600' }}>
              Copy
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

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
