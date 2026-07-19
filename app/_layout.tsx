import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';

export default function RootLayout() {
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
          <Stack.Screen
            name="recipe/[id]"
            options={{ presentation: 'modal', headerShown: true, title: 'Recette' }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
