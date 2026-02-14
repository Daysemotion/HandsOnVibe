import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ContextChipsRow } from '@/components/context-chips-row';
import { radius, spacing, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

type ComposerProps = {
  text: string;
  contextChips: string[];
  onChangeText: (value: string) => void;
  onAttach: () => void;
  onSend: () => void;
  onRemoveChip: (value: string) => void;
};

export const Composer = ({
  text,
  contextChips,
  onChangeText,
  onAttach,
  onSend,
  onRemoveChip,
}: ComposerProps) => {
  const { colors } = useAppTheme();
  const hasText = text.trim().length > 0;

  return (
    <View style={{ gap: spacing.xs }}>
      <ContextChipsRow chips={contextChips} onRemove={onRemoveChip} />

      <View
        style={{
          borderRadius: radius.card + 8,
          borderCurve: 'continuous',
          borderColor: colors.separator,
          borderWidth: ui.hairline,
          backgroundColor: colors.surface,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: spacing.xs,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          minHeight: ui.minTouch + 8,
        }}
        testID="composer"
      >
        <Pressable
          accessibilityLabel="Attach"
          testID="attach-button"
          onPress={onAttach}
          style={({ pressed }) => ({
            minWidth: 30,
            minHeight: 30,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            backgroundColor: pressed ? colors.surfaceMuted : colors.surfaceElevated,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
          })}
        >
          <MaterialIcons name="add" size={18} color={colors.textMuted} />
        </Pressable>

        <TextInput
          testID="composer-input"
          placeholder="Ask anything about your code..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={onChangeText}
          textAlignVertical="top"
          style={{
            flex: 1,
            minHeight: ui.minTouch,
            maxHeight: 140,
            color: colors.text,
            fontSize: 14,
            lineHeight: 20,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        />

        <Pressable
          accessibilityLabel="Send"
          testID="send-button"
          disabled={!hasText}
          onPress={onSend}
          style={({ pressed }) => ({
            width: 34,
            height: 34,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
            backgroundColor: hasText ? colors.accent : colors.separator,
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <MaterialIcons name="arrow-upward" size={17} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};
