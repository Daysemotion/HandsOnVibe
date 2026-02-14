import React from 'react';
import { Pressable, Text, View } from 'react-native';

import type { ToolTab } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const labels: Record<ToolTab, string> = {
  ralph: 'Ralph',
  clew: 'Clew',
  files: 'Files',
  runs: 'Runs',
};

export const ToolPanelTabs = ({
  activeTab,
  onSelect,
}: {
  activeTab: ToolTab;
  onSelect: (tab: ToolTab) => void;
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={{ flexDirection: 'row', gap: spacing.xs }} testID="tool-panel-tabs">
      {(Object.keys(labels) as ToolTab[]).map((tab) => (
        <Pressable
          key={tab}
          testID={`tool-tab-${tab}`}
          onPress={() => onSelect(tab)}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            borderColor: colors.separator,
            borderWidth: ui.hairline,
            justifyContent: 'center',
            paddingHorizontal: spacing.sm,
            backgroundColor:
              activeTab === tab
                ? colors.surfaceElevated
                : pressed
                  ? colors.surfaceElevated
                  : colors.surface,
          })}
        >
          <Text
            selectable
            style={{ ...typography.meta, color: activeTab === tab ? colors.text : colors.textMuted }}
          >
            {labels[tab]}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
