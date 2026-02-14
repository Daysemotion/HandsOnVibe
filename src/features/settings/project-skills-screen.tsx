import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { discoverSkills, installedSkills } from '@/features/mock-data';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const ProjectSkillsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const installedProjectSkills = installedSkills.filter((skill) => skill.scope === 'project');
  const availableProjectSkills = discoverSkills.filter((skill) => skill.scope === 'project');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: ui.screenPadding,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.md,
      }}
      testID="settings-project-skills-screen"
    >
      <View style={{ gap: spacing.xxs }}>
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
          Project Skills
        </Text>
        <Text selectable style={{ ...typography.body, color: colors.textMuted }}>
          Override global skills for this repository.
        </Text>
      </View>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
          Enabled in project
        </Text>
        {installedProjectSkills.map((skill) => (
          <View
            key={skill.id}
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
              {skill.name}
            </Text>
            <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
              {skill.description}
            </Text>
            <Pressable
              testID={`project-skill-disable-${skill.id}`}
              style={({ pressed }) => ({
                minHeight: ui.minTouch,
                borderRadius: radius.soft,
                borderCurve: 'continuous',
                borderWidth: ui.hairline,
                borderColor: colors.separator,
                backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: spacing.xs,
              })}
            >
              <Text selectable style={{ ...typography.meta, color: colors.text, fontWeight: '700' }}>
                Disable override
              </Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
          Add to project
        </Text>
        {availableProjectSkills.map((skill) => (
          <View
            key={skill.id}
            style={{
              borderRadius: radius.card,
              borderCurve: 'continuous',
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: colors.surface,
              padding: spacing.md,
              gap: spacing.xs,
              opacity: skill.installState === 'locked' ? 0.65 : 1,
            }}
          >
            <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
              {skill.name}
            </Text>
            <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
              {skill.description}
            </Text>
            <Pressable
              disabled={skill.installState === 'locked'}
              testID={`project-skill-enable-${skill.id}`}
              style={({ pressed }) => ({
                minHeight: ui.minTouch,
                borderRadius: radius.soft,
                borderCurve: 'continuous',
                borderWidth: ui.hairline,
                borderColor: colors.separator,
                backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: spacing.xs,
              })}
            >
              <Text selectable style={{ ...typography.meta, color: colors.text, fontWeight: '700' }}>
                {skill.installState === 'locked' ? 'Locked' : 'Enable for project'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
