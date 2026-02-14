import React, { type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, spacing, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type DSCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
};

export const DSCard = ({ children, style, padding = spacing.sm }: DSCardProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        {
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
