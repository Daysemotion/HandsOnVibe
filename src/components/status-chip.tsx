import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import type { Status } from '@/features/types';
import { radius, spacing, typography } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const neutralPalette = {
  light: { bg: '#EEF2F7', text: '#5D6A7A' },
  dark: { bg: '#243243', text: '#B9C5D5' },
} as const;

const runningPalette = {
  light: { bg: '#E9F3FF', text: '#0F67C8' },
  dark: { bg: '#1D3551', text: '#9DC7FF' },
} as const;

const labelMap: Record<Status, string> = {
  success: 'done',
  warning: 'warning',
  danger: 'failed',
  idle: 'idle',
  running: 'running',
};

const iconMap: Record<Status, keyof typeof MaterialIcons.glyphMap> = {
  success: 'check-circle',
  warning: 'warning',
  danger: 'error',
  idle: 'pause-circle-outline',
  running: 'play-circle-filled',
};

export const StatusChip = ({ status }: { status: Status }) => {
  const { colorScheme, colors } = useAppTheme();
  const scheme = colorScheme as 'light' | 'dark';

  const palette =
    status === 'idle'
      ? neutralPalette[scheme]
      : status === 'running'
        ? runningPalette[scheme]
        : colors.tone[status];

  return (
    <View
      style={{
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: radius.pill,
        backgroundColor: palette.bg,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <MaterialIcons name={iconMap[status]} size={11} color={palette.text} />
      <Text
        selectable
        style={{
          ...typography.meta,
          color: palette.text,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 0.2,
        }}
      >
        {labelMap[status]}
      </Text>
    </View>
  );
};
