import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type ContextChipsRowProps = {
  chips: string[];
  onRemove?: (value: string) => void;
};

export const ContextChipsRow = ({ chips, onRemove }: ContextChipsRowProps) => {
  const { colors } = useAppTheme();

  if (!chips.length) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap: spacing.xs,
      }}
      testID="context-chips-row"
    >
      {chips.map((chip) => (
        <View
          key={chip}
          style={{
            backgroundColor: `${colors.accent}12`,
            borderColor: `${colors.accent}40`,
            borderWidth: ui.hairline,
            borderRadius: radius.pill,
            minHeight: 32,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            paddingHorizontal: spacing.sm,
          }}
        >
          <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '600' }}>
            {chip}
          </Text>
          {onRemove ? (
            <Pressable
              accessibilityLabel={`Remove ${chip}`}
              testID={`chip-remove-${chip}`}
              onPress={() => onRemove(chip)}
              style={({ pressed }) => ({
                borderRadius: radius.pill,
                paddingHorizontal: spacing.xs,
                paddingVertical: 2,
                backgroundColor: pressed ? `${colors.accent}25` : 'transparent',
              })}
            >
              <Text selectable style={{ ...typography.meta, color: colors.accentStrong, fontWeight: '700' }}>
                x
              </Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
};
