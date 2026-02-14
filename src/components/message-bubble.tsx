import React from 'react';
import { Text, View } from 'react-native';

import type { ChatMessage } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const { colors } = useAppTheme();
  const isUser = message.role === 'user';

  return (
    <View
      style={{
        maxWidth: '88%',
        borderRadius: radius.card,
        borderCurve: 'continuous',
        backgroundColor: isUser ? colors.bubbleUser : colors.bubbleAssistant,
        borderColor: colors.separator,
        borderWidth: ui.hairline,
        padding: spacing.sm,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        gap: spacing.xs,
      }}
      testID={`message-${message.id}`}
    >
      <Text selectable style={{ ...typography.body, color: colors.text }}>
        {message.text}
      </Text>
      {message.meta ? (
        <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
          {message.meta}
        </Text>
      ) : null}
    </View>
  );
};
