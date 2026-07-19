import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';

export default function SignupScreen() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit =
    email.trim().length > 3 && password.trim().length > 0 && password === confirmPassword;

  const handleSignup = () => {
    if (!canSubmit) return;
    login(email.trim());
    router.replace('/(auth)/profile-setup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Encore une étape avant de renseigner ton plat préféré.</Text>

      <View style={styles.form}>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="toi@exemple.com"
        />
        <FormField label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
        <FormField
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="••••••••"
        />

        <PrimaryButton label="Créer mon compte" onPress={handleSignup} disabled={!canSubmit} style={styles.submit} />
        <PrimaryButton label="J'ai déjà un compte" variant="ghost" onPress={() => router.back()} />
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
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  submit: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
});
