import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { LeftDrawer } from '@/components/left-drawer';
import { ToolsPanel } from '@/components/tools-panel';
import { projectOptions } from '@/features/mock-data';
import type { RecentThread } from '@/features/types';
import { useUIStore } from '@/state/ui-store';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const badgeTone = {
  JS: { bg: '#FFF0DE', text: '#EA580C' },
  GO: { bg: '#E6F0FF', text: '#2563EB' },
  PY: { bg: '#FFE7EC', text: '#E11D48' },
  DOC: { bg: '#EEF2F7', text: '#64748B' },
} as const;

export const ProjectsScreen = () => {
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
    <View style={{ flex: 1, backgroundColor: colors.bg }} testID="projects-screen">
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
          onPressTools={() => openToolsPanel('files')}
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
          Projects
        </Text>

        {projectOptions.map((project) => {
          const badge = project.badge ?? 'DOC';
          const palette = badgeTone[badge as keyof typeof badgeTone] ?? badgeTone.DOC;

          return (
            <View
              key={project.id}
              style={{
                borderRadius: radius.card,
                borderCurve: 'continuous',
                borderWidth: ui.hairline,
                borderColor: colors.separator,
                backgroundColor: colors.surface,
                padding: spacing.sm,
                gap: spacing.xs,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: radius.pill,
                    backgroundColor: palette.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text selectable style={{ ...typography.meta, color: palette.text, fontWeight: '700' }}>
                    {badge}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
                    {project.name}
                  </Text>
                  <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
                    {project.stack} - {project.updatedAt}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
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
