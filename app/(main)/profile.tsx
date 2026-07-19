import { useRouter } from 'expo-router';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';
import { useSwipeStore } from '@/store/useSwipeStore';

export default function ProfileScreen() {
  const router = useRouter();
  const myProfile = useSessionStore((state) => state.myProfile);
  const logout = useSessionStore((state) => state.logout);
  const cravings = useSwipeStore((state) => state.cravings);
  const resetDeck = useSwipeStore((state) => state.resetDeck);

  if (!myProfile) return null;

  const handleLogout = () => {
    logout();
    resetDeck();
    router.replace('/(auth)/login');
  };

  const handleResetDemo = () => {
    Alert.alert('Recommencer la démo ?', 'Ça remet à zéro les swipes, matches et envies.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Recommencer', style: 'destructive', onPress: resetDeck },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar emoji={myProfile.avatarEmoji} color={myProfile.avatarColor} size={96} />
          <Text style={styles.name}>
            {myProfile.name}, {myProfile.age}
          </Text>
          {!!myProfile.bio && <Text style={styles.bio}>{myProfile.bio}</Text>}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Ton plat préféré</Text>
          <Text style={styles.dishTitle}>
            {myProfile.favoriteDish.emoji} {myProfile.favoriteDish.title}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tes envies ({cravings.length})</Text>
        {cravings.length === 0 ? (
          <Text style={styles.emptyText}>
            Passe en mode Nourriture et swipe à droite sur ce qui te fait envie.
          </Text>
        ) : (
          cravings.map((recipe) => (
            <Pressable
              key={recipe.id}
              style={styles.cravingRow}
              onPress={() => router.push(`/recipe/${recipe.id}`)}
            >
              <Text style={styles.cravingEmoji}>{recipe.emoji}</Text>
              <Text style={styles.cravingTitle}>{recipe.title}</Text>
            </Pressable>
          ))
        )}

        <PrimaryButton
          label="Recommencer la démo"
          variant="ghost"
          onPress={handleResetDemo}
          style={styles.resetButton}
        />
        <PrimaryButton label="Se déconnecter" variant="ghost" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  name: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.sm,
  },
  bio: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  cardLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  dishTitle: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  cravingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  cravingEmoji: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  cravingTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: spacing.xl,
  },
});
