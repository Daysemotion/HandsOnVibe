import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type QuickChipsProps = {
  chips: readonly string[];
  onPressChip: (value: string) => void;
};

export const QuickChips = ({ chips, onPressChip }: QuickChipsProps) => {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap: spacing.xs,
      }}
      testID="quick-chips"
    >
      {chips.slice(0, 4).map((chip) => (
        <Pressable
          key={chip}
          accessibilityLabel={chip}
          onPress={() => onPressChip(chip)}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
          })}
        >
          <Text selectable style={{ ...typography.meta, color: colors.text }}>
            {chip}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
