import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FileListItem } from '@/components/file-list-item';
import { RunListItem } from '@/components/run-list-item';
import { TaskCard } from '@/components/task-card';
import { ToolPanelTabs } from '@/components/tool-panel-tabs';
import {
  clewResults,
  fileItems,
  ralphTasks,
  runItems,
  toolTabs,
} from '@/features/mock-data';
import type { ToolTab } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const panelWidth = 340;

type ToolsPanelProps = {
  visible: boolean;
  activeTab: ToolTab;
  onClose: () => void;
  onSelectTab: (tab: ToolTab) => void;
  onAddContext: (value: string) => void;
};

export const ToolsPanel = ({
  visible,
  activeTab,
  onClose,
  onSelectTab,
  onAddContext,
}: ToolsPanelProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [goal, setGoal] = useState('Improve login feature by adding email/password authentication');
  const [clewQuery, setClewQuery] = useState('');
  const translateX = useRef(new Animated.Value(panelWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : panelWidth,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: panelWidth,
        borderLeftWidth: ui.hairline,
        borderLeftColor: colors.separator,
        backgroundColor: colors.surface,
        transform: [{ translateX }],
      }}
      testID="tools-panel"
    >
      <View
        style={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
          flex: 1,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text selectable style={{ ...typography.title, color: colors.text }}>
            Tools
          </Text>
          <Pressable
            testID="tools-close-button"
            onPress={onClose}
            style={({ pressed }) => ({
              minWidth: ui.minTouch,
              minHeight: ui.minTouch,
              borderRadius: radius.pill,
              borderWidth: ui.hairline,
              borderColor: colors.separator,
              backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
              Close
            </Text>
          </Pressable>
        </View>

        <ToolPanelTabs activeTab={activeTab} onSelect={onSelectTab} />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === toolTabs[0] ? (
            <>
              <Text selectable style={{ ...typography.title, color: colors.text }}>
                Ralph
              </Text>
              <Text selectable style={{ ...typography.body, color: colors.textMuted }}>
                The code planner
              </Text>
              <TextInput
                value={goal}
                onChangeText={setGoal}
                multiline
                testID="ralph-goal-input"
                style={{
                  borderRadius: radius.soft,
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surfaceElevated,
                  color: colors.text,
                  ...typography.body,
                  padding: spacing.sm,
                  minHeight: 96,
                }}
              />
              {ralphTasks.map((task) => (
                <TaskCard key={task} text={task} />
              ))}
              <Pressable
                onPress={() => onAddContext('ralph plan')}
                testID="ralph-create-tasks"
                style={({ pressed }) => ({
                  minHeight: ui.minTouch,
                  borderRadius: radius.soft,
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                <Text selectable style={{ ...typography.body, color: colors.text }}>
                  Create tasks
                </Text>
              </Pressable>
            </>
          ) : null}

          {activeTab === toolTabs[1] ? (
            <>
              <Text selectable style={{ ...typography.title, color: colors.text }}>
                Clew
              </Text>
              <TextInput
                value={clewQuery}
                onChangeText={setClewQuery}
                placeholder="Search files/symbols"
                placeholderTextColor={colors.textMuted}
                testID="clew-search-input"
                style={{
                  minHeight: ui.minTouch,
                  borderRadius: radius.soft,
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surfaceElevated,
                  color: colors.text,
                  ...typography.body,
                  paddingHorizontal: spacing.sm,
                }}
              />
              {clewResults
                .filter((result) =>
                  `${result.label} ${result.snippet}`.toLowerCase().includes(clewQuery.toLowerCase()),
                )
                .map((result) => (
                  <View
                    key={result.id}
                    style={{
                      borderRadius: radius.soft,
                      borderWidth: ui.hairline,
                      borderColor: colors.separator,
                      backgroundColor: colors.surface,
                      padding: spacing.sm,
                      gap: spacing.xs,
                    }}
                  >
                    <Text selectable style={{ ...typography.body, color: colors.text }}>
                      {result.label}
                    </Text>
                    <Text selectable style={{ ...typography.code, color: colors.textMuted }}>
                      {result.snippet}
                    </Text>
                    <Pressable
                      onPress={() => onAddContext(`file: ${result.label}`)}
                      testID={`clew-add-context-${result.id}`}
                      style={({ pressed }) => ({
                        minHeight: ui.minTouch,
                        borderRadius: radius.soft,
                        borderWidth: ui.hairline,
                        borderColor: colors.separator,
                        backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
                        alignItems: 'center',
                        justifyContent: 'center',
                      })}
                    >
                      <Text selectable style={{ ...typography.meta, color: colors.text }}>
                        Add context
                      </Text>
                    </Pressable>
                  </View>
                ))}
            </>
          ) : null}

          {activeTab === toolTabs[2] ? (
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={{ ...typography.title, color: colors.text }}>
                Files
              </Text>
              {fileItems.map((file) => (
                <FileListItem key={file.id} file={file} />
              ))}
            </View>
          ) : null}

          {activeTab === toolTabs[3] ? (
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={{ ...typography.title, color: colors.text }}>
                Runs
              </Text>
              {runItems.map((run) => (
                <RunListItem key={run.id} run={run} />
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Animated.View>
  );
};
