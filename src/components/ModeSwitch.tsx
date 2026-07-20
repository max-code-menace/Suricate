import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GlassPanel } from '@/components/GlassPanel';
import { colors, gradients, radius, spacing, typography } from '@/theme/tokens';
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
    <GlassPanel style={styles.container}>
      {OPTIONS.map((option) => {
        const isActive = option.value === mode;
        const content = (
          <>
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{option.label}</Text>
          </>
        );

        return (
          <Pressable key={option.value} onPress={() => onChange(option.value)} style={styles.optionWrap}>
            {isActive ? (
              <LinearGradient
                colors={gradients.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.option}
              >
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.option}>{content}</View>
            )}
          </Pressable>
        );
      })}
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
  },
  optionWrap: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    gap: spacing.xs,
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
    color: colors.textOnDark,
  },
});
