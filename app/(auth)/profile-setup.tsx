import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/components/AppBackground';
import { ChipPicker } from '@/components/ChipPicker';
import { ColorPicker } from '@/components/ColorPicker';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { AVATAR_COLORS, AVATAR_EMOJIS, DISH_EMOJIS } from '@/data/presets';
import { colors, spacing, typography } from '@/theme/tokens';
import { useSessionStore } from '@/store/useSessionStore';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const completeProfile = useSessionStore((state) => state.completeProfile);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState<string>(AVATAR_EMOJIS[0]);
  const [avatarColor, setAvatarColor] = useState<string>(AVATAR_COLORS[0]);

  const [dishTitle, setDishTitle] = useState('');
  const [dishEmoji, setDishEmoji] = useState<string>(DISH_EMOJIS[0]);
  const [dishDescription, setDishDescription] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');

  const parsedAge = Number.parseInt(age, 10);
  const canSubmit =
    name.trim().length > 0 &&
    Number.isInteger(parsedAge) &&
    parsedAge >= 18 &&
    dishTitle.trim().length > 0 &&
    ingredientsText.trim().length > 0 &&
    stepsText.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    completeProfile({
      name: name.trim(),
      age: parsedAge,
      bio: bio.trim(),
      avatarEmoji,
      avatarColor,
      favoriteDish: {
        id: `me-${Date.now()}`,
        title: dishTitle.trim(),
        emoji: dishEmoji,
        description: dishDescription.trim(),
        ingredients: ingredientsText.split('\n').map((line) => line.trim()).filter(Boolean),
        steps: stepsText.split('\n').map((line) => line.trim()).filter(Boolean),
        tags: [],
      },
    });

    router.replace('/(main)/swipe');
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ton profil</Text>
      <Text style={styles.subtitle}>
        Les autres verront ta photo... et surtout ton plat préféré.
      </Text>

      <FormField label="Prénom" value={name} onChangeText={setName} placeholder="Maxime" />
      <FormField
        label="Âge"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        placeholder="29"
      />
      <FormField
        label="Bio"
        value={bio}
        onChangeText={setBio}
        placeholder="Toujours partant pour tester une nouvelle table."
        multiline
      />

      <Text style={styles.sectionLabel}>Ton avatar</Text>
      <ChipPicker options={AVATAR_EMOJIS.map((e) => ({ value: e, label: e }))} value={avatarEmoji} onChange={setAvatarEmoji} />

      <Text style={styles.sectionLabel}>Couleur de fond</Text>
      <ColorPicker options={AVATAR_COLORS} value={avatarColor} onChange={setAvatarColor} />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Ton plat préféré</Text>
      <FormField
        label="Nom du plat"
        value={dishTitle}
        onChangeText={setDishTitle}
        placeholder="Canard laqué à la pékinoise"
      />

      <Text style={styles.sectionLabel}>Emoji du plat</Text>
      <ChipPicker options={DISH_EMOJIS.map((e) => ({ value: e, label: e }))} value={dishEmoji} onChange={setDishEmoji} />

      <FormField
        label="Description"
        value={dishDescription}
        onChangeText={setDishDescription}
        placeholder="Peau croustillante, servi avec crêpes fines et sauce hoisin."
        multiline
      />
      <FormField
        label="Ingrédients (un par ligne)"
        value={ingredientsText}
        onChangeText={setIngredientsText}
        placeholder={'1 canard entier\n2 c. à s. de miel\n...'}
        multiline
        style={styles.textarea}
      />
      <FormField
        label="Étapes de la recette (une par ligne)"
        value={stepsText}
        onChangeText={setStepsText}
        placeholder={'Ébouillanter puis sécher la peau...\nRôtir 30 min à 220°C...'}
        multiline
        style={styles.textarea}
      />

        <PrimaryButton
          label="Créer mon profil"
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={styles.submit}
        />
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
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
  sectionLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  submit: {
    marginTop: spacing.lg,
  },
});
