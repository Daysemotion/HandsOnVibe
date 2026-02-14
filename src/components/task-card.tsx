import React from 'react';
import { Text, View } from 'react-native';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const TaskCard = ({ text }: { text: string }) => {
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
      }}
    >
      <Text selectable style={{ ...typography.body, color: colors.text }}>
        {text}
      </Text>
    </View>
  );
};
