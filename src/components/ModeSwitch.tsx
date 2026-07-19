import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { SwipeMode } from '@/data/types';

type Props = {
  mode: SwipeMode;
  onChange: (mode: SwipeMode) => void;
};

const OPTIONS: { value: SwipeMode; label: string; emoji: string }[] = [
  { value: 'people', label: 'Personnes', emoji: '💘' },
  { value: 'food', label: 'Nourriture', emoji: '🍽️' },
];

export function ModeSwitch({ mode, onChange }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isActive = option.value === mode;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isActive && styles.optionActive]}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  optionActive: {
    backgroundColor: colors.primary,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.surface,
  },
});
