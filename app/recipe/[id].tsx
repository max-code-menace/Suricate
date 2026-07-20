import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/components/AppBackground';
import { GlassPanel } from '@/components/GlassPanel';
import { findRecipeById } from '@/data/findRecipe';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = findRecipeById(id);

  if (!recipe) {
    return (
      <AppBackground style={styles.notFound}>
        <Text style={styles.notFoundText}>Recette introuvable.</Text>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        <View style={styles.tagRow}>
          {recipe.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <GlassPanel strong style={styles.section}>
          <Text style={styles.sectionTitle}>Ingrédients</Text>
          {recipe.ingredients.map((ingredient) => (
            <Text key={ingredient} style={styles.listItem}>
              •  {ingredient}
            </Text>
          ))}
        </GlassPanel>

        <GlassPanel strong style={styles.section}>
          <Text style={styles.sectionTitle}>Préparation</Text>
          {recipe.steps.map((step, index) => (
            <Text key={step} style={styles.listItem}>
              {index + 1}.  {step}
            </Text>
          ))}
        </GlassPanel>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
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
  section: {
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  listItem: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
