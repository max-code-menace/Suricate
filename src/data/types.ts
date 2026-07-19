export type Recipe = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
};

export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatarEmoji: string;
  avatarColor: string;
  favoriteDish: Recipe;
  /** Mock-only: determines whether this profile "likes back" on a right swipe, so matches are demoable without a backend. */
  willMatch: boolean;
};

export type SwipeDirection = 'left' | 'right';

export type SwipeMode = 'people' | 'food';

export type MyProfile = {
  name: string;
  age: number;
  bio: string;
  avatarEmoji: string;
  avatarColor: string;
  favoriteDish: Recipe;
};

export type Match = {
  profile: Profile;
  matchedAt: string;
};
