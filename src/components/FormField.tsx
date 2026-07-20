import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { GlassPanel } from '@/components/GlassPanel';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = TextInputProps & {
  label: string;
};

export function FormField({ label, style, ...inputProps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <GlassPanel strong style={styles.panel}>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          {...inputProps}
        />
      </GlassPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  panel: {
    borderRadius: radius.md,
  },
  input: {
    ...typography.body,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
