import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { Avatar } from '@/components/Avatar';
import { GlassPanel } from '@/components/GlassPanel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/tokens';
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
        <Animated.View entering={ZoomIn.springify().damping(11)} style={styles.cardWrap}>
          <GlassPanel strong style={styles.card}>
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

            <PrimaryButton label="Voir la recette" onPress={onSeeRecipe} style={styles.button} />
            <PrimaryButton label="Continuer à swiper" variant="ghost" onPress={onClose} style={styles.button} />
          </GlassPanel>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 25, 53, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  cardWrap: {
    width: '100%',
  },
  card: {
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
    marginTop: spacing.sm,
  },
});
