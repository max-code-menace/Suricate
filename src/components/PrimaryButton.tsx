import React from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, disabled, variant = 'primary', style }: Props) {
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isGhost ? styles.ghostButton : styles.primaryButton,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, isGhost ? styles.ghostLabel : styles.primaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.body,
    fontWeight: '700',
  },
  primaryLabel: {
    color: colors.surface,
  },
  ghostLabel: {
    color: colors.primary,
  },
});
