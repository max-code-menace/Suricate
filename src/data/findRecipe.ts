import { mockMeals } from '@/data/mockMeals';
import { mockProfiles } from '@/data/mockProfiles';
import type { Recipe } from '@/data/types';

export function findRecipeById(id: string): Recipe | undefined {
  const fromMeals = mockMeals.find((meal) => meal.id === id);
  if (fromMeals) return fromMeals;

  const fromProfiles = mockProfiles.find((profile) => profile.favoriteDish.id === id);
  return fromProfiles?.favoriteDish;
}
