import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { ContextChipsRow } from '@/components/context-chips-row';
import { radius, spacing, typography, ui } from '@/theme/tokens';
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

  return (
    <View style={{ gap: spacing.xs }}>
      <ContextChipsRow chips={contextChips} onRemove={onRemoveChip} />

      <View
        style={{
          minHeight: ui.minTouch,
          borderRadius: radius.card,
          borderCurve: 'continuous',
          borderColor: colors.separator,
          borderWidth: ui.hairline,
          backgroundColor: colors.surface,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: spacing.xs,
          paddingHorizontal: spacing.xs,
          paddingVertical: spacing.xs,
        }}
        testID="composer"
      >
        <Pressable
          accessibilityLabel="Attach"
          testID="attach-button"
          onPress={onAttach}
          style={({ pressed }) => ({
            minWidth: ui.minTouch,
            minHeight: ui.minTouch,
            borderRadius: radius.pill,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
          })}
        >
          <Text selectable style={{ ...typography.title, color: colors.textMuted }}>
            +
          </Text>
        </Pressable>

        <TextInput
          testID="composer-input"
          placeholder="Ask something..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            maxHeight: 120,
            color: colors.text,
            ...typography.body,
            paddingVertical: spacing.xs,
          }}
        />

        <Pressable
          accessibilityLabel="Send"
          testID="send-button"
          onPress={onSend}
          style={({ pressed }) => ({
            minWidth: ui.minTouch,
            minHeight: ui.minTouch,
            borderRadius: radius.pill,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed ? colors.accent : colors.accent,
            opacity: text.trim() ? 1 : 0.5,
          })}
        >
          <Text selectable style={{ ...typography.meta, color: '#FFFFFF', fontWeight: '600' }}>
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
