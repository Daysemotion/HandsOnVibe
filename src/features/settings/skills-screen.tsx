import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { discoverSkills, installedSkills } from '@/features/mock-data';
import type { SkillItem } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const scopes: SkillItem['scope'][] = ['global', 'project'];

const iconTone = [
  { bg: '#E8F1FF', text: '#2563EB', label: 'FE' },
  { bg: '#F3E8FF', text: '#7C3AED', label: 'UX' },
  { bg: '#FFF0DE', text: '#EA580C', label: 'DA' },
  { bg: '#E7F8EC', text: '#16A34A', label: 'DV' },
  { bg: '#EEF2F7', text: '#64748B', label: 'LK' },
] as const;

export const SkillsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [selectedScope, setSelectedScope] = useState<SkillItem['scope']>('global');
  const [query, setQuery] = useState('');

  const installed = installedSkills.filter(
    (item) => item.scope === selectedScope && item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const library = discoverSkills.filter(
    (item) => item.scope === selectedScope && item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} testID="settings-skills-screen">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: ui.screenPadding,
          paddingBottom: 120,
          gap: spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
            Manage Skills
          </Text>
          <Pressable>
            <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '700' }}>
              Edit
            </Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.xs }}>
          {scopes.map((scope) => {
            const selected = selectedScope === scope;
            return (
              <Pressable
                key={scope}
                onPress={() => setSelectedScope(scope)}
                testID={`skills-scope-${scope}`}
                style={({ pressed }) => ({
                  minHeight: 34,
                  borderRadius: radius.pill,
                  borderCurve: 'continuous',
                  borderWidth: ui.hairline,
                  borderColor: selected ? `${colors.accent}66` : colors.separator,
                  backgroundColor: selected || pressed ? `${colors.accent}10` : colors.surface,
                  paddingHorizontal: spacing.sm,
                  justifyContent: 'center',
                })}
              >
                <Text
                  selectable
                  style={{
                    ...typography.meta,
                    color: selected ? colors.accent : colors.textMuted,
                    textTransform: 'capitalize',
                    fontWeight: '700',
                  }}
                >
                  {scope}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Find skills..."
          placeholderTextColor={colors.textMuted}
          style={{
            minHeight: ui.minTouch,
            borderRadius: radius.soft,
            borderWidth: ui.hairline,
            borderColor: colors.separator,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.sm,
            color: colors.text,
            ...typography.body,
          }}
        />

        <View style={{ gap: spacing.xs }}>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
            Active Skills
          </Text>
          {installed.map((skill, index) => {
            const palette = iconTone[index % iconTone.length];

            return (
              <View
                key={skill.id}
                style={{
                  borderRadius: radius.card,
                  borderCurve: 'continuous',
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surface,
                  padding: spacing.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: radius.pill,
                    backgroundColor: palette.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text selectable style={{ ...typography.meta, color: palette.text, fontWeight: '700' }}>
                    {palette.label}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
                    {skill.name}
                  </Text>
                  <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
                    {skill.description}
                  </Text>
                </View>

                <View
                  style={{
                    width: 34,
                    height: 20,
                    borderRadius: radius.pill,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text selectable style={{ ...typography.meta, color: '#FFFFFF', fontWeight: '700' }}>
                    ON
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ gap: spacing.xs }}>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
            Library
          </Text>
          {library.map((skill, index) => {
            const palette = iconTone[(index + 2) % iconTone.length];
            const locked = skill.installState === 'locked';

            return (
              <View
                key={skill.id}
                style={{
                  borderRadius: radius.card,
                  borderCurve: 'continuous',
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surface,
                  padding: spacing.sm,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  opacity: locked ? 0.65 : 1,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: radius.pill,
                    backgroundColor: palette.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text selectable style={{ ...typography.meta, color: palette.text, fontWeight: '700' }}>
                    {palette.label}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
                    {skill.name}
                  </Text>
                  <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
                    {skill.description}
                  </Text>
                </View>

                {locked ? (
                  <Text
                    selectable
                    style={{
                      ...typography.meta,
                      color: colors.textMuted,
                      backgroundColor: colors.surfaceMuted,
                      borderRadius: radius.soft,
                      paddingHorizontal: spacing.xs,
                      paddingVertical: 3,
                      overflow: 'hidden',
                      fontWeight: '700',
                    }}
                  >
                    LOCKED
                  </Text>
                ) : (
                  <Pressable
                    testID={`skill-action-${skill.id}`}
                    style={({ pressed }) => ({
                      width: 30,
                      height: 30,
                      borderRadius: radius.pill,
                      borderWidth: ui.hairline,
                      borderColor: colors.separator,
                      backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <Text selectable style={{ ...typography.body, color: colors.accent, fontWeight: '700' }}>
                      +
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: ui.screenPadding,
          paddingTop: spacing.sm,
          paddingBottom: insets.bottom + spacing.sm,
          borderTopWidth: ui.hairline,
          borderTopColor: `${colors.separator}AA`,
          backgroundColor: colors.bg,
        }}
      >
        <Pressable
          style={({ pressed }) => ({
            minHeight: 50,
            borderRadius: radius.soft,
            borderCurve: 'continuous',
            backgroundColor: pressed ? colors.accentStrong : colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Text selectable style={{ ...typography.body, color: '#FFFFFF', fontWeight: '700' }}>
            Create Custom Skill
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
