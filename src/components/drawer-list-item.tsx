import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { StatusChip } from '@/components/status-chip';
import type { RecentThread } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const DrawerListItem = ({
  item,
  isActive,
  onPress,
}: {
  item: RecentThread;
  isActive: boolean;
  onPress: () => void;
}) => {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      testID={`drawer-item-${item.id}`}
      style={({ pressed }) => ({
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        borderColor: colors.separator,
        borderWidth: ui.hairline,
        backgroundColor: isActive || pressed ? colors.surfaceElevated : colors.surface,
        padding: spacing.sm,
        gap: spacing.xs,
      })}
    >
      <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: isActive ? '600' : '500' }}>
        {item.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        <StatusChip status={item.status} />
        <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
          {item.timeLabel}
        </Text>
      </View>
    </Pressable>
  );
};
