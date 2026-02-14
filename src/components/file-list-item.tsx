import React from 'react';
import { Text, View } from 'react-native';

import type { FileItem } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const FileListItem = ({ file }: { file: FileItem }) => {
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
        gap: spacing.xs,
      }}
    >
      <Text selectable style={{ ...typography.body, color: colors.text }}>
        {file.path}
      </Text>
      <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
        {file.changedAt}
      </Text>
    </View>
  );
};
