import { useRouter } from 'expo-router';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { useSwipeStore } from '@/store/useSwipeStore';
import type { Match } from '@/data/types';

export default function MatchesScreen() {
  const router = useRouter();
  const matches = useSwipeStore((state) => state.matches);

  const renderItem = ({ item }: { item: Match }) => (
    <Pressable
      style={styles.row}
      onPress={() => router.push(`/recipe/${item.profile.favoriteDish.id}`)}
    >
      <Avatar emoji={item.profile.avatarEmoji} color={item.profile.avatarColor} size={56} />
      <View style={styles.rowInfo}>
        <Text style={styles.name}>{item.profile.name}</Text>
        <Text style={styles.dish}>
          {item.profile.favoriteDish.emoji} {item.profile.favoriteDish.title}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.title,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
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
