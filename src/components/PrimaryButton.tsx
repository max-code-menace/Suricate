import React from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GlassPanel } from '@/components/GlassPanel';
import { colors, gradients, radius, shadow, spacing, typography } from '@/theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, disabled, variant = 'primary', style }: Props) {
  const isGhost = variant === 'ghost';

  if (isGhost) {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={[disabled && styles.disabled, style]}>
        <GlassPanel style={styles.button}>
          <Text style={[styles.label, styles.ghostLabel]}>{label}</Text>
        </GlassPanel>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.shadowWrap, disabled && styles.disabled, style]}>
      <LinearGradient
        colors={gradients.primaryButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={[styles.label, styles.primaryLabel]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: radius.pill,
    ...shadow.soft,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.body,
    fontWeight: '700',
  },
  primaryLabel: {
    color: colors.textOnDark,
  },
  ghostLabel: {
    color: colors.primaryDark,
  },
});
