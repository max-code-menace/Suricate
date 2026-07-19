import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { Profile } from '@/data/types';

type Props = {
  profile: Profile;
  onPressDish: () => void;
};

export function PersonCard({ profile, onPressDish }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.photoArea, { backgroundColor: profile.avatarColor }]}>
        <Avatar emoji={profile.avatarEmoji} color={profile.avatarColor} size={140} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <Pressable onPress={onPressDish} style={styles.dishBadge}>
          <Text style={styles.dishEmoji}>{profile.favoriteDish.emoji}</Text>
          <View style={styles.dishTextArea}>
            <Text style={styles.dishLabel}>Plat préféré</Text>
            <Text style={styles.dishTitle} numberOfLines={1}>
              {profile.favoriteDish.title}
            </Text>
          </View>
          <Text style={styles.dishChevron}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoArea: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'flex-start',
  },
  name: {
    ...typography.title,
    color: colors.text,
  },
  bio: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  dishBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  dishEmoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  dishTextArea: {
    flex: 1,
  },
  dishLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  dishTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  dishChevron: {
    ...typography.heading,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
