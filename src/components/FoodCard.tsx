import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { Recipe } from '@/data/types';

type Props = {
  recipe: Recipe;
  onPressDetails: () => void;
};

export function FoodCard({ recipe, onPressDetails }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.emojiArea}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.tagRow}>
          {recipe.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton label="Voir la recette" onPress={onPressDetails} style={styles.recipeButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emojiArea: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 96,
  },
  info: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.title,
    fontSize: 24,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.glassStrong,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tagText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  recipeButton: {
    marginTop: spacing.lg,
    alignSelf: 'flex-start',
  },
});
