import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import { colors } from '@/theme/tokens';

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="swipe"
        options={{ title: 'Swipe', tabBarIcon: () => <TabIcon emoji="🔥" /> }}
      />
      <Tabs.Screen
        name="matches"
        options={{ title: 'Matches', tabBarIcon: () => <TabIcon emoji="💌" /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil', tabBarIcon: () => <TabIcon emoji="🙋" /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    backgroundColor: 'transparent',
  },
});
