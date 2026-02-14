import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DSIconButton } from '@/design-system';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type SettingsHomeScreenProps = {
  onOpenMenu?: () => void;
  onOpenModels?: () => void;
  onOpenUsage?: () => void;
  onOpenSkills?: () => void;
  onOpenProjectSkills?: () => void;
};

type SettingsAction = {
  key: 'models' | 'usage' | 'skills' | 'project-skills';
  title: string;
  description: string;
  onPress?: () => void;
};

export const SettingsHomeScreen = ({
  onOpenMenu,
  onOpenModels,
  onOpenUsage,
  onOpenSkills,
  onOpenProjectSkills,
}: SettingsHomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const actions: SettingsAction[] = [
    {
      key: 'models',
      title: 'Model providers',
      description: 'OAuth connections and default models',
      onPress: onOpenModels,
    },
    {
      key: 'usage',
      title: 'Usage statistics',
      description: 'Token volume, requests, and cost trend',
      onPress: onOpenUsage,
    },
    {
      key: 'skills',
      title: 'Global skills',
      description: 'Manage active and discoverable skills',
      onPress: onOpenSkills,
    },
    {
      key: 'project-skills',
      title: 'Project skills',
      description: 'Override skill sets for this workspace',
      onPress: onOpenProjectSkills,
    },
  ];

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
      testID="settings-screen"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flex: 1 }}>
          <DSIconButton
            icon="menu"
            testID="settings-menu-button"
            onPress={onOpenMenu}
            iconColor={colors.text}
          />

          <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
            Settings & Usage
          </Text>
        </View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: radius.pill,
            backgroundColor: '#E0F2FE',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text selectable style={{ ...typography.meta, color: '#0284C7', fontWeight: '700' }}>
            JD
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          padding: spacing.sm,
          gap: spacing.xs,
        }}
      >
        <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
          John Doe
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Text
            selectable
            style={{
              ...typography.meta,
              color: '#15803D',
              backgroundColor: '#DCFCE7',
              paddingHorizontal: spacing.xs,
              paddingVertical: 2,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            Pro Plan
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            johndoe@example.com
          </Text>
        </View>
      </View>

      <View style={{ gap: spacing.xs }}>
        {actions.map((action) => (
          <Pressable
            key={action.key}
            onPress={action.onPress}
            testID={`settings-open-${action.key}`}
            style={({ pressed }) => ({
              borderRadius: radius.card,
              borderCurve: 'continuous',
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
              padding: spacing.md,
              gap: spacing.xxs,
            })}
          >
            <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
              {action.title}
            </Text>
            <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
              {action.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};
