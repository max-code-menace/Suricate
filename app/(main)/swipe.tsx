import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { FoodCard } from '@/components/FoodCard';
import { MatchOverlay } from '@/components/MatchOverlay';
import { ModeSwitch } from '@/components/ModeSwitch';
import { PersonCard } from '@/components/PersonCard';
import { SwipeDeck } from '@/components/SwipeDeck';
import { mockMeals } from '@/data/mockMeals';
import { mockProfiles } from '@/data/mockProfiles';
import { colors, spacing } from '@/theme/tokens';
import { useSwipeStore } from '@/store/useSwipeStore';

export default function SwipeScreen() {
  const router = useRouter();
  const mode = useSwipeStore((state) => state.mode);
  const setMode = useSwipeStore((state) => state.setMode);
  const seenPersonIds = useSwipeStore((state) => state.seenPersonIds);
  const seenMealIds = useSwipeStore((state) => state.seenMealIds);
  const swipePerson = useSwipeStore((state) => state.swipePerson);
  const swipeFood = useSwipeStore((state) => state.swipeFood);
  const lastMatch = useSwipeStore((state) => state.lastMatch);
  const clearLastMatch = useSwipeStore((state) => state.clearLastMatch);

  const remainingProfiles = useMemo(
    () => mockProfiles.filter((p) => !seenPersonIds.includes(p.id)),
    [seenPersonIds],
  );
  const remainingMeals = useMemo(
    () => mockMeals.filter((m) => !seenMealIds.includes(m.id)),
    [seenMealIds],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ModeSwitch mode={mode} onChange={setMode} />
      </View>

      <View style={styles.deckArea}>
        {mode === 'people' ? (
          <SwipeDeck
            items={remainingProfiles}
            keyExtractor={(profile) => profile.id}
            onSwipe={(profile, direction) => swipePerson(profile.id, direction)}
            renderCard={(profile) => (
              <PersonCard profile={profile} onPressDish={() => router.push(`/recipe/${profile.favoriteDish.id}`)} />
            )}
            emptyTitle="Plus personne à swiper !"
            emptySubtitle="Repasse plus tard, de nouveaux profils (et de nouveaux plats) arrivent bientôt."
          />
        ) : (
          <SwipeDeck
            items={remainingMeals}
            keyExtractor={(meal) => meal.id}
            onSwipe={(meal, direction) => swipeFood(meal.id, direction)}
            renderCard={(meal) => (
              <FoodCard recipe={meal} onPressDetails={() => router.push(`/recipe/${meal.id}`)} />
            )}
            emptyTitle="Plus d'idées de repas !"
            emptySubtitle="Va jeter un œil à tes envies dans l'onglet Profil."
          />
        )}
      </View>

      <MatchOverlay
        match={lastMatch}
        onClose={clearLastMatch}
        onSeeRecipe={() => {
          if (!lastMatch) return;
          const dishId = lastMatch.profile.favoriteDish.id;
          clearLastMatch();
          router.push(`/recipe/${dishId}`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  deckArea: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
