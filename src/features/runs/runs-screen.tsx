import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { LeftDrawer } from '@/components/left-drawer';
import { RunListItem } from '@/components/run-list-item';
import { ToolsPanel } from '@/components/tools-panel';
import { projectOptions, runItems } from '@/features/mock-data';
import type { RecentThread } from '@/features/types';
import { useUIStore } from '@/state/ui-store';
import { spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const RunsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const {
    state,
    setThread,
    openDrawer,
    closeDrawer,
    openToolsPanel,
    closeToolsPanel,
    addContextChip,
  } = useUIStore();

  const activeProject = useMemo(
    () => projectOptions.find((project) => project.id === state.activeProjectId) ?? projectOptions[0],
    [state.activeProjectId],
  );

  const shouldShowOverlay = state.isDrawerOpen || state.isToolsPanelOpen;

  const selectThread = (thread: RecentThread) => {
    setThread(thread.id);
    addContextChip(`thread: ${thread.title}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} testID="runs-screen">
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
          onPressTools={() => openToolsPanel('runs')}
        />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: colors.bg }}
        contentContainerStyle={{
          paddingTop: spacing.md,
          paddingHorizontal: ui.screenPadding,
          paddingBottom: insets.bottom + spacing.xl,
          gap: spacing.sm,
        }}
      >
        <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
          Runs
        </Text>
        {runItems.map((run) => (
          <RunListItem key={run.id} run={run} />
        ))}
      </ScrollView>

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
