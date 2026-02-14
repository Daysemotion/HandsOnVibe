import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrawerListItem } from '@/components/drawer-list-item';
import { recentThreadsBySection } from '@/features/mock-data';
import type { DrawerSectionKey, RecentThread } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const drawerWidth = 310;

const sectionMeta: { key: DrawerSectionKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'previousWeek', label: 'Previous 7 days' },
];

type LeftDrawerProps = {
  visible: boolean;
  activeThreadId: string;
  onClose: () => void;
  onSelectThread: (thread: RecentThread) => void;
};

export const LeftDrawer = ({ visible, activeThreadId, onClose, onSelectThread }: LeftDrawerProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [query, setQuery] = useState('');
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return recentThreadsBySection;
    }

    return {
      today: recentThreadsBySection.today.filter((item) =>
        item.title.toLowerCase().includes(normalized),
      ),
      yesterday: recentThreadsBySection.yesterday.filter((item) =>
        item.title.toLowerCase().includes(normalized),
      ),
      previousWeek: recentThreadsBySection.previousWeek.filter((item) =>
        item.title.toLowerCase().includes(normalized),
      ),
    };
  }, [query]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: drawerWidth,
        borderRightWidth: ui.hairline,
        borderRightColor: colors.separator,
        backgroundColor: colors.surface,
        transform: [{ translateX }],
      }}
      testID="left-drawer"
    >
      <View
        style={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text selectable style={{ ...typography.title, color: colors.text }}>
            Recent
          </Text>
          <Pressable
            testID="drawer-close-button"
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

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor={colors.textMuted}
          testID="drawer-search"
          style={{
            minHeight: ui.minTouch,
            borderRadius: radius.soft,
            borderWidth: ui.hairline,
            borderColor: colors.separator,
            backgroundColor: colors.surfaceElevated,
            paddingHorizontal: spacing.sm,
            color: colors.text,
            ...typography.body,
          }}
        />

        <ScrollView
          style={{ flex: 1 }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          {sectionMeta.map(({ key, label }) => {
            const list = filteredSections[key];
            if (!list.length) {
              return null;
            }

            return (
              <View key={key} style={{ gap: spacing.xs }}>
                <Text selectable style={{ ...typography.meta, color: colors.textMuted }}>
                  {label}
                </Text>
                <View style={{ gap: spacing.xs }}>
                  {list.map((item) => (
                    <DrawerListItem
                      key={item.id}
                      item={item}
                      isActive={item.id === activeThreadId}
                      onPress={() => onSelectThread(item)}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <Pressable
          testID="drawer-settings"
          onPress={onClose}
          style={({ pressed }) => ({
            minHeight: ui.minTouch,
            borderRadius: radius.soft,
            borderWidth: ui.hairline,
            borderColor: colors.separator,
            backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
            paddingHorizontal: spacing.sm,
            justifyContent: 'center',
          })}
        >
          <Text selectable style={{ ...typography.body, color: colors.text }}>
            Settings
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};
