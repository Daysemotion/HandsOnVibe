import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            backgroundColor: colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="description" size={14} color={colors.textMuted} />
        </View>
        <Text selectable style={{ ...typography.body, color: colors.text, flex: 1 }}>
          {file.path}
        </Text>
      </View>
      <Text selectable style={{ ...typography.meta, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>
        {file.changedAt}
      </Text>
    </View>
  );
};
