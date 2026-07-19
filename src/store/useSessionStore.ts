import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { MyProfile } from '@/data/types';

type SessionStatus = 'guest' | 'onboarding' | 'ready';

type SessionState = {
  hasHydrated: boolean;
  status: SessionStatus;
  email: string | null;
  myProfile: MyProfile | null;
  login: (email: string) => void;
  completeProfile: (profile: MyProfile) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      status: 'guest',
      email: null,
      myProfile: null,
      login: (email) => set({ email, status: 'onboarding' }),
      completeProfile: (profile) => set({ myProfile: profile, status: 'ready' }),
      logout: () => set({ email: null, myProfile: null, status: 'guest' }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'suricate/session',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        status: state.status,
        email: state.email,
        myProfile: state.myProfile,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
