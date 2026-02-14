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
      {chips.slice(0, 4).map((chip, index) => (
        <Pressable
          key={chip}
          accessibilityLabel={chip}
          onPress={() => onPressChip(chip)}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            borderColor: index === 0 ? colors.accent : colors.separator,
            borderWidth: ui.hairline,
            backgroundColor:
              pressed || index === 0 ? `${colors.accent}${index === 0 ? '14' : '0F'}` : colors.surface,
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
          })}
        >
          <Text
            selectable
            style={{
              ...typography.meta,
              color: index === 0 ? colors.accent : colors.text,
              fontWeight: '600',
            }}
          >
            {chip}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
