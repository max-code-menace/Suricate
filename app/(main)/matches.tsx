import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/components/AppBackground';
import { Avatar } from '@/components/Avatar';
import { GlassPanel } from '@/components/GlassPanel';
import { colors, spacing, typography } from '@/theme/tokens';
import { useSwipeStore } from '@/store/useSwipeStore';
import type { Match } from '@/data/types';

export default function MatchesScreen() {
  const router = useRouter();
  const matches = useSwipeStore((state) => state.matches);

  const renderItem = ({ item }: { item: Match }) => (
    <Pressable onPress={() => router.push(`/recipe/${item.profile.favoriteDish.id}`)} style={styles.rowPressable}>
      <GlassPanel style={styles.row}>
        <Avatar emoji={item.profile.avatarEmoji} color={item.profile.avatarColor} size={56} />
        <View style={styles.rowInfo}>
          <Text style={styles.name}>{item.profile.name}</Text>
          <Text style={styles.dish}>
            {item.profile.favoriteDish.emoji} {item.profile.favoriteDish.title}
          </Text>
        </View>
      </GlassPanel>
    </Pressable>
  );

  return (
    <AppBackground>
      <Text style={styles.title}>Tes matches</Text>

      {matches.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Pas encore de match. Swipe à droite sur quelqu'un que tu aimes bien (ou dont tu aimes le plat).
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.profile.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 110,
  },
  rowPressable: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  rowInfo: {
    marginLeft: spacing.md,
  },
  name: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  dish: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
