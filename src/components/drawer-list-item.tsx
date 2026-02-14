import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { StatusChip } from '@/components/status-chip';
import type { RecentThread } from '@/features/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const tonePalette = {
  purple: { bg: '#F3E8FF', text: '#7C3AED' },
  blue: { bg: '#E6F0FF', text: '#2563EB' },
  green: { bg: '#E7F8EC', text: '#16A34A' },
  orange: { bg: '#FFF0DE', text: '#EA580C' },
  slate: { bg: '#EEF2F7', text: '#5B6472' },
} as const;

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
  const palette = tonePalette[item.iconTone ?? 'slate'];

  return (
    <Pressable
      onPress={onPress}
      testID={`drawer-item-${item.id}`}
      style={({ pressed }) => ({
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        backgroundColor: pressed || isActive ? colors.surfaceElevated : 'transparent',
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.pill,
            backgroundColor: palette.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text selectable style={{ ...typography.meta, color: palette.text, fontWeight: '700' }}>
            {item.iconLabel ?? item.title.slice(0, 1).toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1, gap: 2, paddingTop: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xs }}>
            <Text
              numberOfLines={1}
              selectable
              style={{ ...typography.body, color: colors.text, fontWeight: isActive ? '700' : '600', flex: 1 }}
            >
              {item.title}
            </Text>
            <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
              {item.timeLabel}
            </Text>
          </View>

          {item.summary ? (
            <Text numberOfLines={1} selectable style={{ ...typography.meta, color: colors.textMuted }}>
              {item.summary}
            </Text>
          ) : null}

          <StatusChip status={item.status} />
        </View>
      </View>
    </Pressable>
  );
};
