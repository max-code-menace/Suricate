import { useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/components/AppBackground';
import { FoodCard } from '@/components/FoodCard';
import { GlassPanel } from '@/components/GlassPanel';
import { MatchOverlay } from '@/components/MatchOverlay';
import { ModeSwitch } from '@/components/ModeSwitch';
import { PersonCard } from '@/components/PersonCard';
import { SwipeDeck } from '@/components/SwipeDeck';
import { mockMeals } from '@/data/mockMeals';
import { mockProfiles } from '@/data/mockProfiles';
import { colors, spacing, typography } from '@/theme/tokens';
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
  const streakDays = useSwipeStore((state) => state.streakDays);
  const registerActivity = useSwipeStore((state) => state.registerActivity);

  useEffect(() => {
    registerActivity();
  }, [registerActivity]);

  const remainingProfiles = useMemo(
    () => mockProfiles.filter((p) => !seenPersonIds.includes(p.id)),
    [seenPersonIds],
  );
  const remainingMeals = useMemo(
    () => mockMeals.filter((m) => !seenMealIds.includes(m.id)),
    [seenMealIds],
  );

  return (
    <AppBackground>
      <View style={styles.header}>
        <View style={styles.modeSwitchWrap}>
          <ModeSwitch mode={mode} onChange={setMode} />
        </View>
        {streakDays > 0 && (
          <GlassPanel style={styles.streak}>
            <Text style={styles.streakText}>🔥 {streakDays}</Text>
          </GlassPanel>
        )}
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
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  modeSwitchWrap: {
    flex: 1,
  },
  streak: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  streakText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  deckArea: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: 110,
  },
});
