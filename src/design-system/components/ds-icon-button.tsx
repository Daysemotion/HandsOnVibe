import React from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { radius, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type DSIconButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  iconSize?: number;
  iconColor?: string;
  emphasis?: 'ghost' | 'muted';
  dot?: boolean;
};

export const DSIconButton = ({
  icon,
  onPress,
  testID,
  accessibilityLabel,
  iconSize = 20,
  iconColor,
  emphasis = 'ghost',
  dot = false,
}: DSIconButtonProps) => {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => ({
        width: ui.minTouch,
        height: ui.minTouch,
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        backgroundColor: pressed
          ? colors.surfaceMuted
          : emphasis === 'muted'
            ? colors.surfaceMuted
            : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <MaterialIcons name={icon} size={iconSize} color={iconColor ?? colors.textMuted} />
      {dot ? (
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 6,
            height: 6,
            borderRadius: radius.pill,
            backgroundColor: '#EF4444',
          }}
        />
      ) : null}
    </Pressable>
  );
};
