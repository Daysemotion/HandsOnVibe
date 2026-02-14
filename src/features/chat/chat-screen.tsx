import React, { useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { AssistantCard } from '@/components/assistant-card';
import { Composer } from '@/components/composer';
import { LeftDrawer } from '@/components/left-drawer';
import { MessageBubble } from '@/components/message-bubble';
import { QuickChips } from '@/components/quick-chips';
import { ToolsPanel } from '@/components/tools-panel';
import { DSSearchField } from '@/design-system';
import { projectOptions, quickChipLabels, starterMessages } from '@/features/mock-data';
import type { ChatMessage, RecentThread } from '@/features/types';
import { useUIStore } from '@/state/ui-store';
import { spacing, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const openByChipMap: Record<string, 'ralph' | 'runs' | undefined> = {
  'Open Ralph': 'ralph',
  'Run tests': 'runs',
};

export const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useAppTheme();
  const {
    state,
    setThread,
    openDrawer,
    closeDrawer,
    openToolsPanel,
    closeToolsPanel,
    setComposerText,
    addContextChip,
    removeContextChip,
  } = useUIStore();

  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 16 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderRelease: (event, gestureState) => {
        const startX = event.nativeEvent.pageX - gestureState.dx;

        if (!state.isDrawerOpen && startX < 24 && gestureState.dx > 40) {
          openDrawer();
        }

        if (state.isDrawerOpen && gestureState.dx < -40) {
          closeDrawer();
        }

        if (!state.isToolsPanelOpen && startX > width - 24 && gestureState.dx < -40) {
          openToolsPanel();
        }

        if (state.isToolsPanelOpen && gestureState.dx > 40) {
          closeToolsPanel();
        }
      },
    }),
  ).current;

  const activeProject = useMemo(
    () => projectOptions.find((project) => project.id === state.activeProjectId) ?? projectOptions[0],
    [state.activeProjectId],
  );

  const handleSend = () => {
    const value = state.composerText.trim();
    if (!value) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        role: 'user',
        text: value,
        meta: 'Just now',
      },
    ]);
    setComposerText('');
  };

  const handleQuickChip = (chip: string) => {
    const targetTab = openByChipMap[chip];
    if (targetTab) {
      openToolsPanel(targetTab);
      return;
    }

    addContextChip(chip.toLowerCase());
  };

  const selectThread = (thread: RecentThread) => {
    setThread(thread.id);
    setMessages(starterMessages);
    addContextChip(`thread: ${thread.title}`);
  };

  const shouldShowOverlay = state.isDrawerOpen || state.isToolsPanelOpen;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
      }}
      {...panResponder.panHandlers}
      testID="chat-screen"
    >
      <View
        style={{
          paddingTop: insets.top + spacing.xs,
          paddingHorizontal: ui.screenPadding,
          gap: spacing.sm,
          backgroundColor: colors.bg,
        }}
      >
        <AppHeader
          projectName={activeProject.name}
          onPressProject={openDrawer}
          onPressMenu={openDrawer}
          onPressTools={() => openToolsPanel('claw')}
        />

        <DSSearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {
            const query = searchQuery.trim();
            if (query.length > 0) {
              addContextChip(`search: ${query}`);
              setSearchQuery('');
            }
          }}
          placeholder="Search project context..."
        />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: ui.screenPadding,
          gap: spacing.sm,
          paddingTop: spacing.md,
          paddingBottom: 228,
          backgroundColor: colors.bg,
        }}
      >
        {messages.map((message) => (
          <View key={message.id} style={{ gap: spacing.xs }}>
            <MessageBubble message={message} />
            {message.cards?.map((card) => <AssistantCard key={card.id} card={card} />)}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: ui.hairline,
          borderTopColor: colors.separator,
          backgroundColor: colors.bg,
          paddingHorizontal: ui.screenPadding,
          paddingTop: spacing.xs,
          paddingBottom: insets.bottom + spacing.xs,
          gap: spacing.xs,
        }}
      >
        <QuickChips chips={quickChipLabels} onPressChip={handleQuickChip} />
        <Composer
          text={state.composerText}
          contextChips={state.contextChips}
          onChangeText={setComposerText}
          onAttach={() => openToolsPanel('files')}
          onSend={handleSend}
          onRemoveChip={removeContextChip}
        />
      </View>

      {shouldShowOverlay ? (
        <Pressable
          onPress={() => {
            closeDrawer();
            closeToolsPanel();
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: colors.backdrop,
          }}
          testID="panel-backdrop"
        />
      ) : null}

      <LeftDrawer
        visible={state.isDrawerOpen}
        activeThreadId={state.activeThreadId}
        onClose={closeDrawer}
        onSelectThread={selectThread}
      />

      <ToolsPanel
        visible={state.isToolsPanelOpen}
        activeTab={state.activeToolTab}
        onClose={closeToolsPanel}
        onSelectTab={openToolsPanel}
        onAddContext={addContextChip}
      />
    </View>
  );
};
