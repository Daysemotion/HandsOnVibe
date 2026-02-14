import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import type { ToolTab } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const labels: Record<ToolTab, string> = {
  ralph: 'Ralph',
  claw: 'Claw',
  files: 'Files',
  runs: 'Runs',
};

const icons: Record<ToolTab, keyof typeof MaterialIcons.glyphMap> = {
  ralph: 'flag',
  claw: 'search',
  files: 'description',
  runs: 'play-circle-outline',
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
      {(Object.keys(labels) as ToolTab[]).map((tab) => {
        const isActive = activeTab === tab;

        return (
          <Pressable
            key={tab}
            testID={`tool-tab-${tab}`}
            onPress={() => onSelect(tab)}
            style={({ pressed }) => ({
              minHeight: 36,
              borderRadius: radius.pill,
              borderCurve: 'continuous',
              borderColor: isActive ? `${colors.accent}66` : colors.separator,
              borderWidth: ui.hairline,
              justifyContent: 'center',
              paddingHorizontal: spacing.sm,
              backgroundColor: isActive || pressed ? `${colors.accent}12` : colors.surface,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            })}
          >
            <MaterialIcons name={icons[tab]} size={14} color={isActive ? colors.accent : colors.textMuted} />
            <Text
              selectable
              style={{
                ...typography.meta,
                color: isActive ? colors.accent : colors.textMuted,
                fontWeight: isActive ? '700' : '600',
              }}
            >
              {labels[tab]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
