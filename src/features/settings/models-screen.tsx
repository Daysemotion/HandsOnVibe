import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { providerConnections } from '@/features/mock-data';
import type { Status } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const statusDot: Record<Status, string> = {
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  idle: '#CBD5E1',
  running: '#3B82F6',
};

const getActionLabel = (status: Status) => {
  if (status === 'success') return 'Manage';
  if (status === 'idle') return 'Setup';
  if (status === 'warning') return 'Resume OAuth';
  return 'Review';
};

export const ModelsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: ui.screenPadding,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.sm,
      }}
      testID="settings-models-screen"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
          Model Providers
        </Text>
        <Pressable
          style={({ pressed }) => ({
            minHeight: 34,
            borderRadius: radius.pill,
            borderWidth: ui.hairline,
            borderColor: `${colors.accent}66`,
            backgroundColor: pressed ? `${colors.accent}24` : `${colors.accent}10`,
            paddingHorizontal: spacing.sm,
            justifyContent: 'center',
          })}
        >
          <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '700' }}>
            + Connect
          </Text>
        </Pressable>
      </View>

      {providerConnections.map((provider) => (
        <View
          key={provider.id}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
              {provider.provider}
            </Text>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: radius.pill,
                backgroundColor: statusDot[provider.status],
              }}
            />
          </View>

          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            {provider.defaultModel}
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            {provider.accountLabel}
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
            {(provider.capabilities ?? []).map((capability) => (
              <Text
                key={capability}
                selectable
                style={{
                  ...typography.meta,
                  color: colors.textMuted,
                  backgroundColor: colors.surfaceMuted,
                  borderRadius: 8,
                  paddingHorizontal: spacing.xs,
                  paddingVertical: 2,
                  overflow: 'hidden',
                }}
              >
                {capability}
              </Text>
            ))}
          </View>

          <Pressable
            testID={`models-provider-action-${provider.id}`}
            style={({ pressed }) => ({
              marginTop: spacing.xs,
              minHeight: ui.minTouch,
              borderRadius: radius.soft,
              borderCurve: 'continuous',
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Text selectable style={{ ...typography.meta, color: colors.text, fontWeight: '700' }}>
              {getActionLabel(provider.status)}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
