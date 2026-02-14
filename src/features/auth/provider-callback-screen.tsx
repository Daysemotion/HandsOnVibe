import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type ProviderCallbackScreenProps = {
  providerName?: string;
  onFinish?: () => void;
};

export const ProviderCallbackScreen = ({
  providerName = 'provider',
  onFinish,
}: ProviderCallbackScreenProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: ui.screenPadding,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.md,
      }}
      testID="provider-callback-screen"
    >
      <View style={{ gap: spacing.xs }}>
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
          Completing OAuth
        </Text>
        <Text selectable style={{ ...typography.body, color: colors.textMuted }}>
          Finishing secure connection for {providerName}.
        </Text>
      </View>

      <View
        style={{
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          padding: spacing.md,
          gap: spacing.xs,
        }}
      >
        <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
          Account linked successfully
        </Text>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
          You can now manage models and usage in Settings.
        </Text>
      </View>

      <Pressable
        onPress={onFinish}
        testID="provider-callback-finish"
        style={({ pressed }) => ({
          minHeight: ui.minTouch + 2,
          borderRadius: radius.soft,
          borderCurve: 'continuous',
          backgroundColor: pressed ? colors.accentStrong : colors.accent,
          paddingHorizontal: spacing.md,
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <Text selectable style={{ ...typography.body, color: '#FFFFFF', fontWeight: '700' }}>
          Back to Settings
        </Text>
      </Pressable>
    </ScrollView>
  );
};
