import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import type { ChatMessage } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const { colors } = useAppTheme();
  const isUser = message.role === 'user';

  return (
    <View
      style={{
        maxWidth: '92%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        gap: spacing.xs,
      }}
      testID={`message-${message.id}`}
    >
      {!isUser ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.xs }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: radius.pill,
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: colors.surfaceMuted,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="smart-toy" size={12} color={colors.textMuted} />
          </View>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            {message.meta ?? 'Agent'}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          borderRadius: radius.card,
          borderCurve: 'continuous',
          backgroundColor: isUser ? colors.bubbleUser : colors.bubbleAssistant,
          borderColor: colors.separator,
          borderWidth: ui.hairline,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.sm,
        }}
      >
        <Text selectable style={{ ...typography.body, color: colors.text }}>
          {message.text}
        </Text>
      </View>

      {isUser && message.meta ? (
        <Text
          selectable
          style={{
            ...typography.meta,
            color: colors.textMuted,
            textAlign: 'right',
            paddingHorizontal: spacing.xs,
          }}
        >
          {message.meta}
        </Text>
      ) : null}
    </View>
  );
};
