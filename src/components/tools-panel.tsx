import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { FileListItem } from '@/components/file-list-item';
import { RunListItem } from '@/components/run-list-item';
import { TaskCard } from '@/components/task-card';
import { ToolPanelTabs } from '@/components/tool-panel-tabs';
import {
  clawRecentFiles,
  clawResults,
  fileItems,
  ralphPlanTasks,
  ralphSuggestions,
  runItems,
  toolTabs,
} from '@/features/mock-data';
import type { ClawResult, ToolTab } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const panelWidth = 348;

const badgeTone = {
  blue: { bg: '#E8F1FF', text: '#2563EB' },
  yellow: { bg: '#FFF6DD', text: '#CA8A04' },
  cyan: { bg: '#E6F9FB', text: '#0891B2' },
  slate: { bg: '#EEF2F7', text: '#64748B' },
  purple: { bg: '#F3E8FF', text: '#7C3AED' },
} as const;

type ToolsPanelProps = {
  visible: boolean;
  activeTab: ToolTab;
  onClose: () => void;
  onSelectTab: (tab: ToolTab) => void;
  onAddContext: (value: string) => void;
};

const ClawResultCard = ({
  result,
  onAddContext,
}: {
  result: ClawResult;
  onAddContext: (value: string) => void;
}) => {
  const { colors } = useAppTheme();
  const badge = badgeTone[result.badgeTone];

  return (
    <View
      style={{
        borderRadius: radius.soft,
        borderCurve: 'continuous',
        borderWidth: ui.hairline,
        borderColor: result.preview ? `${colors.accent}66` : colors.separator,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        opacity: result.faded ? 0.62 : 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          backgroundColor: result.preview ? `${colors.accent}0A` : colors.surface,
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: badge.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text selectable style={{ ...typography.meta, color: badge.text, fontWeight: '700' }}>
            {result.badge}
          </Text>
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
            {result.label}
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            {result.path}
          </Text>
        </View>
      </View>

      {result.preview?.length ? (
        <View
          style={{
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.sm,
            borderTopWidth: ui.hairline,
            borderTopColor: colors.separator,
            backgroundColor: colors.surfaceMuted,
            gap: 2,
          }}
        >
          {result.preview.map((line) => (
            <Text key={line} selectable style={{ ...typography.code, color: colors.text }}>
              {line}
            </Text>
          ))}
        </View>
      ) : (
        <View style={{ paddingHorizontal: spacing.sm, paddingBottom: spacing.xs }}>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            {result.snippet}
          </Text>
        </View>
      )}

      <View
        style={{
          borderTopWidth: ui.hairline,
          borderTopColor: colors.separator,
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          alignItems: 'flex-end',
          backgroundColor: colors.surface,
        }}
      >
        <Pressable
          onPress={() => onAddContext(`file: ${result.path}/${result.label}`)}
          testID={`claw-add-context-${result.id}`}
          style={({ pressed }) => ({
            minHeight: 30,
            borderRadius: radius.pill,
            borderWidth: ui.hairline,
            borderColor: `${colors.accent}66`,
            backgroundColor: pressed ? `${colors.accent}1F` : `${colors.accent}12`,
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          })}
        >
          <MaterialIcons name="add-circle-outline" size={13} color={colors.accent} />
          <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '700' }}>
            Add context
          </Text>
        </Pressable>
      </View>
    </View>
  );
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
  const [goal, setGoal] = useState('Implement user authentication');
  const [clawQuery, setClawQuery] = useState('');
  const translateX = useRef(new Animated.Value(panelWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : panelWidth,
      duration: 190,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  const filteredRecent = useMemo(
    () =>
      clawRecentFiles.filter((result) =>
        `${result.label} ${result.path}`.toLowerCase().includes(clawQuery.toLowerCase()),
      ),
    [clawQuery],
  );

  const filteredResults = useMemo(
    () =>
      clawResults.filter((result) =>
        `${result.label} ${result.path} ${result.snippet}`
          .toLowerCase()
          .includes(clawQuery.toLowerCase()),
      ),
    [clawQuery],
  );

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
          paddingTop: insets.top + spacing.xs,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
          flex: 1,
        }}
      >
        <View style={{ alignItems: 'center', paddingTop: spacing.xxs }}>
          <View
            style={{
              width: 44,
              height: 5,
              borderRadius: radius.pill,
              backgroundColor: colors.separator,
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text selectable style={{ ...typography.title, color: colors.text, fontWeight: '700' }}>
            {activeTab === 'claw' ? 'Claw Explorer' : activeTab === 'ralph' ? 'Ralph Planner' : 'Tools'}
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
              backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <MaterialIcons name="close" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <ToolPanelTabs activeTab={activeTab} onSelect={onSelectTab} />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: spacing.sm, paddingBottom: 128 }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === toolTabs[0] ? (
            <>
              <TextInput
                value={goal}
                onChangeText={setGoal}
                multiline
                testID="ralph-goal-input"
                placeholder="What is your goal today?"
                placeholderTextColor={colors.textMuted}
                style={{
                  borderRadius: radius.soft,
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surfaceMuted,
                  color: colors.text,
                  ...typography.body,
                  padding: spacing.sm,
                  minHeight: 72,
                }}
              />

              <View style={{ gap: spacing.xs }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                    Plan overview
                  </Text>
                  <Text selectable style={{ ...typography.meta, color: colors.accent, fontWeight: '700' }}>
                    {ralphPlanTasks.length} Tasks
                  </Text>
                </View>
                {ralphPlanTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </View>

              <View style={{ gap: spacing.xs }}>
                <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                  Suggestions
                </Text>
                {ralphSuggestions.map((suggestion) => (
                  <View
                    key={suggestion.id}
                    style={{
                      borderRadius: radius.soft,
                      borderCurve: 'continuous',
                      borderWidth: ui.hairline,
                      borderColor: colors.separator,
                      backgroundColor: colors.surface,
                      padding: spacing.sm,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: spacing.xs,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
                        {suggestion.title}
                      </Text>
                      <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
                        {suggestion.subtitle}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => onAddContext(`suggestion: ${suggestion.title}`)}
                      style={({ pressed }) => ({
                        minHeight: 30,
                        borderRadius: radius.pill,
                        borderWidth: ui.hairline,
                        borderColor: colors.separator,
                        backgroundColor: pressed ? colors.surfaceMuted : colors.surface,
                        justifyContent: 'center',
                        paddingHorizontal: spacing.sm,
                      })}
                    >
                      <Text selectable style={{ ...typography.meta, color: colors.text, fontWeight: '700' }}>
                        Add
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          {activeTab === toolTabs[1] ? (
            <>
              <TextInput
                value={clawQuery}
                onChangeText={setClawQuery}
                placeholder="Search files, symbols..."
                placeholderTextColor={colors.textMuted}
                testID="claw-search-input"
                style={{
                  minHeight: ui.minTouch,
                  borderRadius: radius.soft,
                  borderWidth: ui.hairline,
                  borderColor: colors.separator,
                  backgroundColor: colors.surfaceMuted,
                  color: colors.text,
                  ...typography.body,
                  paddingHorizontal: spacing.sm,
                }}
              />

              <View style={{ gap: spacing.xs }}>
                <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                  Recent files
                </Text>
                {filteredRecent.map((result) => (
                  <ClawResultCard key={result.id} result={result} onAddContext={onAddContext} />
                ))}
              </View>

              <View style={{ gap: spacing.xs }}>
                <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                  Search results
                </Text>
                {filteredResults.map((result) => (
                  <ClawResultCard key={result.id} result={result} onAddContext={onAddContext} />
                ))}
              </View>
            </>
          ) : null}

          {activeTab === toolTabs[2] ? (
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                Files
              </Text>
              {fileItems.map((file) => (
                <FileListItem key={file.id} file={file} />
              ))}
            </View>
          ) : null}

          {activeTab === toolTabs[3] ? (
            <View style={{ gap: spacing.xs }}>
              <Text selectable style={{ ...typography.meta, color: colors.textMuted, textTransform: 'uppercase' }}>
                Runs
              </Text>
              {runItems.map((run) => (
                <RunListItem key={run.id} run={run} />
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm,
          paddingBottom: insets.bottom + spacing.sm,
          backgroundColor: colors.surface,
          borderTopWidth: ui.hairline,
          borderTopColor: `${colors.separator}AA`,
        }}
      >
        {activeTab === 'claw' ? (
          <Pressable
            onPress={() => onAddContext('context package: claw')}
            style={({ pressed }) => ({
              minHeight: 50,
              borderRadius: radius.soft,
              borderCurve: 'continuous',
              backgroundColor: pressed ? colors.accentStrong : colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: spacing.xs,
            })}
          >
            <MaterialIcons name="add-circle-outline" size={16} color="#FFFFFF" />
            <Text selectable style={{ ...typography.body, color: '#FFFFFF', fontWeight: '700' }}>
              Add context
            </Text>
          </Pressable>
        ) : null}

        {activeTab === 'ralph' ? (
          <Pressable
            onPress={() => onAddContext('ralph plan')}
            testID="ralph-create-tasks"
            style={({ pressed }) => ({
              minHeight: 50,
              borderRadius: radius.soft,
              borderCurve: 'continuous',
              backgroundColor: pressed ? colors.accentStrong : colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: spacing.xs,
            })}
          >
            <MaterialIcons name="add-task" size={16} color="#FFFFFF" />
            <Text selectable style={{ ...typography.body, color: '#FFFFFF', fontWeight: '700' }}>
              Create Tasks
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};
