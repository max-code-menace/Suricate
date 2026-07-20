import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/components/AppBackground';
import { Avatar } from '@/components/Avatar';
import { GlassPanel } from '@/components/GlassPanel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';
import { useSwipeStore } from '@/store/useSwipeStore';

export default function ProfileScreen() {
  const router = useRouter();
  const myProfile = useSessionStore((state) => state.myProfile);
  const logout = useSessionStore((state) => state.logout);
  const cravings = useSwipeStore((state) => state.cravings);
  const resetDeck = useSwipeStore((state) => state.resetDeck);
  const streakDays = useSwipeStore((state) => state.streakDays);

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
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar emoji={myProfile.avatarEmoji} color={myProfile.avatarColor} size={96} />
          <Text style={styles.name}>
            {myProfile.name}, {myProfile.age}
          </Text>
          {!!myProfile.bio && <Text style={styles.bio}>{myProfile.bio}</Text>}
          {streakDays > 0 && (
            <GlassPanel style={styles.streak}>
              <Text style={styles.streakText}>🔥 {streakDays} jour{streakDays > 1 ? 's' : ''} de suite</Text>
            </GlassPanel>
          )}
        </View>

        <GlassPanel strong style={styles.card}>
          <Text style={styles.cardLabel}>Ton plat préféré</Text>
          <Text style={styles.dishTitle}>
            {myProfile.favoriteDish.emoji} {myProfile.favoriteDish.title}
          </Text>
        </GlassPanel>

        <Text style={styles.sectionTitle}>Tes envies ({cravings.length})</Text>
        {cravings.length === 0 ? (
          <Text style={styles.emptyText}>
            Passe en mode Nourriture et swipe à droite sur ce qui te fait envie.
          </Text>
        ) : (
          cravings.map((recipe) => (
            <Pressable key={recipe.id} onPress={() => router.push(`/recipe/${recipe.id}`)} style={styles.cravingRowPressable}>
              <GlassPanel style={styles.cravingRow}>
                <Text style={styles.cravingEmoji}>{recipe.emoji}</Text>
                <Text style={styles.cravingTitle}>{recipe.title}</Text>
              </GlassPanel>
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
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 130,
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
  streak: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  streakText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
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
  cravingRowPressable: {
    marginBottom: spacing.sm,
  },
  cravingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
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
