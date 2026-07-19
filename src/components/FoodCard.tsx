import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

        <Pressable onPress={onPressDetails} style={styles.recipeButton}>
          <Text style={styles.recipeButtonText}>Voir la recette</Text>
        </Pressable>
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  recipeButton: {
    marginTop: spacing.lg,
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  recipeButtonText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
});
