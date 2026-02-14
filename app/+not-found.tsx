import React from 'react';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { spacing, typography } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export default function NotFoundScreen() {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        backgroundColor: colors.bg,
      }}
    >
      <Text selectable style={{ ...typography.title, color: colors.text }}>
        Page not found
      </Text>
      <Link href="/chat" style={{ ...typography.body, color: colors.accent }}>
        Go to chat
      </Link>
    </View>
  );
}
