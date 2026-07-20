import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mockMeals } from '@/data/mockMeals';
import { mockProfiles } from '@/data/mockProfiles';
import type { Match, Recipe, SwipeMode } from '@/data/types';

type SwipeState = {
  mode: SwipeMode;
  seenPersonIds: string[];
  seenMealIds: string[];
  matches: Match[];
  cravings: Recipe[];
  lastMatch: Match | null;
  streakDays: number;
  lastActiveDate: string | null;
  setMode: (mode: SwipeMode) => void;
  swipePerson: (profileId: string, direction: 'left' | 'right') => void;
  swipeFood: (mealId: string, direction: 'left' | 'right') => void;
  clearLastMatch: () => void;
  resetDeck: () => void;
  registerActivity: () => void;
};

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

export const useSwipeStore = create<SwipeState>()(
  persist(
    (set, get) => ({
      mode: 'people',
      seenPersonIds: [],
      seenMealIds: [],
      matches: [],
      cravings: [],
      lastMatch: null,
      streakDays: 0,
      lastActiveDate: null,
      setMode: (mode) => set({ mode }),
      registerActivity: () => {
        const today = new Date().toISOString().slice(0, 10);
        const { lastActiveDate, streakDays } = get();

        if (lastActiveDate === today) return;

        const gap = lastActiveDate ? daysBetween(lastActiveDate, today) : null;
        const nextStreak = gap === 1 ? streakDays + 1 : 1;

        set({ lastActiveDate: today, streakDays: nextStreak });
      },
      swipePerson: (profileId, direction) => {
        const profile = mockProfiles.find((p) => p.id === profileId);
        const { seenPersonIds, matches } = get();
        const nextSeen = [...seenPersonIds, profileId];

        if (direction === 'right' && profile?.willMatch) {
          const match: Match = { profile, matchedAt: new Date().toISOString() };
          set({ seenPersonIds: nextSeen, matches: [...matches, match], lastMatch: match });
          return;
        }

        set({ seenPersonIds: nextSeen });
      },
      swipeFood: (mealId, direction) => {
        const meal = mockMeals.find((m) => m.id === mealId);
        const { seenMealIds, cravings } = get();
        const nextSeen = [...seenMealIds, mealId];

        if (direction === 'right' && meal) {
          set({ seenMealIds: nextSeen, cravings: [...cravings, meal] });
          return;
        }

        set({ seenMealIds: nextSeen });
      },
      clearLastMatch: () => set({ lastMatch: null }),
      resetDeck: () => set({ seenPersonIds: [], seenMealIds: [], matches: [], cravings: [], lastMatch: null }),
    }),
    {
      name: 'suricate/swipe',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
