import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type AppHeaderProps = {
  projectName: string;
  onPressProject: () => void;
  onPressSearch: () => void;
  onPressMenu: () => void;
  onPressTools: () => void;
};

export const AppHeader = ({
  projectName,
  onPressProject,
  onPressSearch,
  onPressMenu,
  onPressTools,
}: AppHeaderProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.sm,
      }}
      testID="chat-header"
    >
      <Pressable
        accessibilityLabel="Switch project"
        testID="project-switch"
        onPress={onPressProject}
        style={({ pressed }) => ({
          minHeight: ui.minTouch,
          borderRadius: radius.pill,
          backgroundColor: colors.surface,
          borderColor: colors.separator,
          borderWidth: ui.hairline,
          paddingHorizontal: spacing.md,
          justifyContent: 'center',
          opacity: pressed ? 0.75 : 1,
        })}
      >
        <Text selectable style={{ ...typography.title, color: colors.text }}>
          {projectName}
        </Text>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        <Pressable
          accessibilityLabel="Search"
          testID="search-button"
          onPress={onPressSearch}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            minWidth: ui.minTouch,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Text selectable style={{ ...typography.meta, color: colors.text }}>
            Search
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Open tools panel"
          testID="tools-button"
          onPress={onPressTools}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            minWidth: ui.minTouch,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Text selectable style={{ ...typography.meta, color: colors.text }}>
            Tools
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Open recent drawer"
          testID="menu-button"
          onPress={onPressMenu}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            minWidth: ui.minTouch,
            borderRadius: radius.pill,
            backgroundColor: colors.surface,
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Text selectable style={{ ...typography.meta, color: colors.text }}>
            Menu
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
