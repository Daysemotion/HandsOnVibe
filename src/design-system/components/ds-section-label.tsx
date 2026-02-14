import React from 'react';
import { Text } from 'react-native';

import { typography } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type DSSectionLabelProps = {
  label: string;
};

export const DSSectionLabel = ({ label }: DSSectionLabelProps) => {
  const { colors } = useAppTheme();

  return (
    <Text
      selectable
      style={{
        ...typography.meta,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
        fontWeight: '600',
      }}
    >
      {label}
    </Text>
  );
};
