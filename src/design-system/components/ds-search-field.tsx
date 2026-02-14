import React from 'react';
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputSubmitEditingEventData,
  type ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type DSSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  testID?: string;
  onSubmitEditing?: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const DSSearchField = ({
  value,
  onChangeText,
  placeholder,
  testID,
  onSubmitEditing,
  containerStyle,
}: DSSearchFieldProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        {
          position: 'relative',
        },
        containerStyle,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          left: spacing.sm,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <MaterialIcons name="search" size={18} color={colors.textMuted} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        testID={testID}
        style={{
          minHeight: ui.minTouch,
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderWidth: ui.hairline,
          borderColor: colors.separator,
          backgroundColor: colors.surface,
          color: colors.text,
          ...typography.body,
          paddingLeft: 38,
          paddingRight: spacing.sm,
        }}
      />
    </View>
  );
};
