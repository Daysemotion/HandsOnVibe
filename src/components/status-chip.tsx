import React from 'react';
import { Text, View } from 'react-native';

import type { Status } from '@/features/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const idleBg = {
  light: '#EEF0F4',
  dark: '#283040',
} as const;

const idleText = {
  light: '#5C6472',
  dark: '#C0C7D4',
} as const;

export const StatusChip = ({ status }: { status: Status }) => {
  const { colorScheme, colors } = useAppTheme();
  const scheme = colorScheme as 'light' | 'dark';

  const palette =
    status === 'idle'
      ? {
          bg: idleBg[scheme],
          text: idleText[scheme],
        }
      : colors.tone[status];

  return (
    <View
      style={{
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xxs,
        borderRadius: radius.pill,
        backgroundColor: palette.bg,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        selectable
        style={{
          ...typography.meta,
          color: palette.text,
          fontWeight: '600',
        }}
      >
        {status}
      </Text>
    </View>
  );
};
