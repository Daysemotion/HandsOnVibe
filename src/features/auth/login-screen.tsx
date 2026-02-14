import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type LoginScreenProps = {
  onPressGoogle?: () => void;
  onPressGithub?: () => void;
  onPressEmailLink?: () => void;
};

type LoginAction = {
  key: 'google' | 'github' | 'email';
  label: string;
  onPress?: () => void;
};

export const LoginScreen = ({
  onPressGoogle,
  onPressGithub,
  onPressEmailLink,
}: LoginScreenProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const actions: LoginAction[] = [
    { key: 'google', label: 'Continue with Google', onPress: onPressGoogle },
    { key: 'github', label: 'Continue with GitHub', onPress: onPressGithub },
    { key: 'email', label: 'Continue with Email Link', onPress: onPressEmailLink },
  ];

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
      testID="login-screen"
    >
      <View style={{ gap: spacing.xs }}>
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700', fontSize: 26, lineHeight: 30 }}>
          Sign in to HandsOnVibe
        </Text>
        <Text selectable style={{ ...typography.body, color: colors.textMuted }}>
          Sync projects, runs, provider connections, and skill state across devices.
        </Text>
      </View>

      <View style={{ gap: spacing.xs }}>
        {actions.map((action) => (
          <Pressable
            key={action.key}
            onPress={action.onPress}
            testID={`login-${action.key}`}
            style={({ pressed }) => ({
              minHeight: ui.minTouch + 2,
              borderRadius: radius.soft,
              borderCurve: 'continuous',
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
              paddingHorizontal: spacing.md,
              justifyContent: 'center',
            })}
          >
            <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
              {action.label}
            </Text>
          </Pressable>
        ))}
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
          Security
        </Text>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
          OAuth tokens are encrypted and stored in secure keychain storage.
        </Text>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
          Workspace permissions are enforced per run and per skill.
        </Text>
      </View>
    </ScrollView>
  );
};
