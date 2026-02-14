import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FileListItem } from '@/components/file-list-item';
import { projectOptions } from '@/features/mock-data';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

export const ProjectsScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: ui.screenPadding,
        paddingBottom: insets.bottom + spacing.xl,
        gap: spacing.sm,
      }}
      testID="projects-screen"
    >
      <Text selectable style={{ ...typography.title, color: colors.text }}>
        Projects
      </Text>
      {projectOptions.map((project) => (
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
          <Text selectable style={{ ...typography.body, color: colors.text }}>
            {project.name}
          </Text>
          <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
            Updated {project.updatedAt}
          </Text>
        </View>
      ))}
      <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
        Docs
      </Text>
      <FileListItem file={{ id: 'doc-1', path: 'docs/ui-spec.md', changedAt: 'recent' }} />
    </ScrollView>
  );
};
