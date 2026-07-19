import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';

export default function LoginScreen() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim().length > 3 && password.trim().length > 0;

  const handleLogin = () => {
    if (!canSubmit) return;
    login(email.trim());
    router.replace('/(auth)/profile-setup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>🦆💘</Text>
        <Text style={styles.title}>Suricate</Text>
        <Text style={styles.subtitle}>Le swipe qui donne aussi faim.</Text>
      </View>

      <View style={styles.form}>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="toi@exemple.com"
        />
        <FormField
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <PrimaryButton label="Se connecter" onPress={handleLogin} disabled={!canSubmit} style={styles.submit} />

        <PrimaryButton
          label="Créer un compte"
          variant="ghost"
          onPress={() => router.push('/(auth)/signup')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 32,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  form: {
    width: '100%',
  },
  submit: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});
