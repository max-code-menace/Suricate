import { Redirect } from 'expo-router';

import { useSessionStore } from '@/store/useSessionStore';

export default function Index() {
  const status = useSessionStore((state) => state.status);

  if (status === 'guest') return <Redirect href="/(auth)/login" />;
  if (status === 'onboarding') return <Redirect href="/(auth)/profile-setup" />;
  return <Redirect href="/(main)/swipe" />;
}
