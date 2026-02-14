import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { DrawerListItem } from '@/components/drawer-list-item';
import { DSIconButton, DSSearchField, DSSectionLabel } from '@/design-system';
import { drawerLibraryItems, projectOptions, recentThreadsBySection } from '@/features/mock-data';
import type { RecentThread } from '@/features/types';
import { radius, spacing, typography, ui } from '@/theme/tokens';
import { useAppTheme } from '@/theme/use-app-theme';

const drawerWidth = 324;

const badgeTone = {
  JS: { bg: '#FFF0DE', text: '#EA580C' },
  GO: { bg: '#E6F0FF', text: '#2563EB' },
  PY: { bg: '#FFE7EC', text: '#E11D48' },
  DOC: { bg: '#EEF2F7', text: '#64748B' },
} as const;

const libraryTone = {
  purple: { bg: '#F3E8FF', text: '#7C3AED', icon: 'bookmark' as const },
  blue: { bg: '#E6F0FF', text: '#2563EB', icon: 'history' as const },
} as const;

type LeftDrawerProps = {
  visible: boolean;
  activeThreadId: string;
  onClose: () => void;
  onSelectThread: (thread: RecentThread) => void;
};

export const LeftDrawer = ({ visible, activeThreadId, onClose, onSelectThread }: LeftDrawerProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 190,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredThreads = useMemo(
    () =>
      Object.values(recentThreadsBySection)
        .flat()
        .filter((item) =>
          `${item.title} ${item.summary ?? ''}`.toLowerCase().includes(normalizedQuery),
        ),
    [normalizedQuery],
  );

  const filteredProjects = useMemo(
    () =>
      projectOptions.filter((item) =>
        `${item.name} ${item.stack ?? ''} ${item.updatedAt}`.toLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  const filteredLibrary = useMemo(
    () => drawerLibraryItems.filter((item) => item.title.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  const navItems = [
    { id: 'chat', label: 'Chat', icon: 'chat-bubble-outline' as const, href: '/(tabs)/chat' },
    { id: 'projects', label: 'Projects', icon: 'folder-open' as const, href: '/(tabs)/projects' },
    { id: 'runs', label: 'Runs', icon: 'play-circle-outline' as const, href: '/(tabs)/runs' },
  ];

  const safePush = (href: string) => {
    try {
      router.push(href as '/(tabs)/chat');
    } catch {
      // Jest renders this tree outside expo-router navigation context.
    }
  };

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
        backgroundColor: colors.bg,
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
          <Text selectable style={{ ...typography.title, color: colors.text, fontSize: 24, lineHeight: 30, fontWeight: '700' }}>
            Vibe
          </Text>
          <DSIconButton
            icon="settings"
            testID="drawer-settings"
            onPress={() => {
              onClose();
              safePush('/settings');
            }}
            iconSize={17}
            emphasis="muted"
          />
        </View>

        <DSSearchField
          value={query}
          onChangeText={setQuery}
          placeholder="Search threads, projects..."
          testID="drawer-search"
        />

        <ScrollView
          style={{ flex: 1 }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ gap: spacing.lg, paddingBottom: spacing.xxl }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: spacing.xs }}>
            <DSSectionLabel label="Workspace" />
            <View style={{ gap: spacing.xs }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      onClose();
                      safePush(item.href);
                    }}
                    style={({ pressed }) => ({
                      minHeight: 40,
                      borderRadius: radius.soft,
                      borderCurve: 'continuous',
                      borderWidth: ui.hairline,
                      borderColor: isActive ? `${colors.accent}66` : colors.separator,
                      backgroundColor: isActive || pressed ? `${colors.accent}12` : colors.surface,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: spacing.xs,
                      paddingHorizontal: spacing.sm,
                    })}
                  >
                    <MaterialIcons name={item.icon} size={16} color={isActive ? colors.accent : colors.textMuted} />
                    <Text selectable style={{ ...typography.meta, color: isActive ? colors.accent : colors.text, fontWeight: '700' }}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ gap: spacing.xs }}>
            <DSSectionLabel label="Recent Threads" />
            <View style={{ gap: spacing.xs }}>
              {filteredThreads.map((item) => (
                <DrawerListItem
                  key={item.id}
                  item={item}
                  isActive={item.id === activeThreadId}
                  onPress={() => {
                    onClose();
                    safePush('/(tabs)/chat');
                    onSelectThread(item);
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{ gap: spacing.xs }}>
            <DSSectionLabel label="Projects" />
            <View style={{ gap: spacing.sm }}>
              {filteredProjects.map((project) => {
                const badge = project.badge ?? 'DOC';
                const palette = badgeTone[badge as keyof typeof badgeTone] ?? badgeTone.DOC;

                return (
                  <View key={project.id} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                    <View
                      style={{
                        width: 34,
                        height: 34,
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
                    <MaterialIcons name="chevron-right" size={18} color={colors.textMuted} />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ gap: spacing.xs }}>
            <DSSectionLabel label="Library" />
            <View style={{ gap: spacing.sm }}>
              {filteredLibrary.map((item) => {
                const palette = libraryTone[item.tone];

                return (
                  <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                    <View
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: radius.pill,
                        backgroundColor: palette.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialIcons name={palette.icon} size={16} color={palette.text} />
                    </View>
                    <Text selectable style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>
                      {item.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          paddingHorizontal: spacing.md,
          paddingBottom: insets.bottom + spacing.sm,
          paddingTop: spacing.sm,
          backgroundColor: colors.bg,
          borderTopWidth: ui.hairline,
          borderTopColor: `${colors.separator}AA`,
        }}
      >
        <Pressable
          onPress={() => {
            onClose();
            safePush('/(tabs)/chat');
            onSelectThread(recentThreadsBySection.today[0]);
          }}
          style={({ pressed }) => ({
            minHeight: 52,
            borderRadius: radius.pill,
            borderCurve: 'continuous',
            backgroundColor: pressed ? '#0D1B3F' : '#111E44',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: spacing.xs,
          })}
        >
          <MaterialIcons name="add" size={16} color="#FFFFFF" />
          <Text selectable style={{ ...typography.body, color: '#FFFFFF', fontWeight: '700' }}>
            New Thread
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};
