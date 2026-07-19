import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { Match } from '@/data/types';

type Props = {
  match: Match | null;
  onClose: () => void;
  onSeeRecipe: () => void;
};

export function MatchOverlay({ match, onClose, onSeeRecipe }: Props) {
  if (!match) return null;

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>C'est un match !</Text>
          <Avatar
            emoji={match.profile.avatarEmoji}
            color={match.profile.avatarColor}
            size={110}
            style={styles.avatar}
          />
          <Text style={styles.name}>{match.profile.name}</Text>
          <Text style={styles.subtitle}>
            Vous avez aussi un point commun : {match.profile.favoriteDish.title} {match.profile.favoriteDish.emoji}
          </Text>

          <Pressable style={[styles.button, styles.primaryButton]} onPress={onSeeRecipe}>
            <Text style={styles.primaryButtonText}>Voir la recette</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continuer à swiper</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 29, 29, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  avatar: {
    marginBottom: spacing.md,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.surface,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
