import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { DSIconButton } from '@/design-system';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type AppHeaderProps = {
  projectName: string;
  onPressProject: () => void;
  onPressMenu: () => void;
  onPressTools: () => void;
};

export const AppHeader = ({
  projectName,
  onPressProject,
  onPressMenu,
  onPressTools,
}: AppHeaderProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      testID="chat-header"
    >
      <DSIconButton icon="menu" testID="menu-button" onPress={onPressMenu} />

      <Pressable
        accessibilityLabel="Switch project"
        testID="project-switch"
        onPress={onPressProject}
        style={({ pressed }) => ({
          flex: 1,
          minHeight: ui.minTouch,
          borderRadius: radius.soft,
          borderCurve: 'continuous',
          backgroundColor: pressed ? colors.surfaceMuted : 'transparent',
          marginHorizontal: spacing.xs,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        })}
      >
        <Text
          numberOfLines={1}
          selectable
          style={{ ...typography.body, color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: '600' }}
        >
          {projectName}
        </Text>
        <MaterialIcons name="expand-more" size={16} color={colors.textMuted} />
      </Pressable>

      <DSIconButton icon="inventory" testID="tools-button" onPress={onPressTools} dot />
    </View>
  );
};
