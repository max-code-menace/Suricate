import { Tabs } from 'expo-router';
import { Text } from 'react-native';

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
