import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usageStatsByModel } from '@/features/mock-data';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const periods = ['Today', '7D', '30D', 'Custom'] as const;

export const UsageScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<(typeof periods)[number]>('7D');

  const totalTokens = useMemo(
    () => usageStatsByModel.reduce((sum, item) => sum + item.inputTokens + item.outputTokens, 0),
    [],
  );

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
      testID="settings-usage-screen"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
          Usage Statistics
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.xs }}>
          {periods.map((period) => {
            const selected = selectedPeriod === period;
            return (
              <Pressable
                key={period}
                onPress={() => setSelectedPeriod(period)}
                testID={`usage-period-${period.toLowerCase()}`}
                style={({ pressed }) => ({
                  minHeight: 30,
                  borderRadius: radius.pill,
                  borderCurve: 'continuous',
                  borderWidth: ui.hairline,
                  borderColor: selected ? colors.separator : 'transparent',
                  backgroundColor: selected || pressed ? colors.surface : 'transparent',
                  justifyContent: 'center',
                  paddingHorizontal: spacing.xs,
                })}
              >
                <Text selectable style={{ ...typography.meta, color: selected ? colors.text : colors.textMuted }}>
                  {period}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          padding: spacing.md,
          gap: spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: spacing.xs }}>
          <Text selectable style={{ ...typography.title, color: colors.text, fontSize: 34, lineHeight: 36, fontWeight: '700' }}>
            {(totalTokens / 1_000_000).toFixed(1)}M
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            tokens used this period
          </Text>
        </View>

        <View
          style={{
            borderRadius: radius.soft,
            backgroundColor: colors.surfaceMuted,
            height: 110,
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            gap: spacing.xs,
          }}
        >
          {[20, 50, 38, 72, 64, 80, 76].map((height, index) => (
            <View key={`${height}-${index}`} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <View style={{ width: `${height}%`, height: 3, borderRadius: radius.pill, backgroundColor: colors.accent }} />
            </View>
          ))}
        </View>

        <View style={{ gap: spacing.sm }}>
          {usageStatsByModel.map((item) => (
            <View key={item.id} style={{ gap: spacing.xs }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text selectable style={{ ...typography.body, color: colors.text }}>{item.model}</Text>
                <Text selectable style={{ ...typography.meta, color: colors.text, fontWeight: '700' }}>
                  {item.ratio ?? 0}%
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  borderRadius: radius.pill,
                  backgroundColor: colors.surfaceMuted,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${item.ratio ?? 0}%`,
                    height: '100%',
                    backgroundColor: item.model.includes('Claude') ? '#818CF8' : colors.accent,
                  }}
                />
              </View>
              <Text selectable style={{ ...typography.meta, color: colors.textMuted, textAlign: 'right' }}>
                {item.inputTokens.toLocaleString()} tokens
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
