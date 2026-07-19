import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

type Props = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function ColorPicker({ options, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {options.map((color) => (
        <Pressable
          key={color}
          onPress={() => onChange(color)}
          style={[styles.swatch, { backgroundColor: color }, value === color && styles.swatchActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchActive: {
    borderColor: colors.primary,
  },
});
