import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type Props = {
  emoji: string;
  color: string;
  size?: number;
  style?: ViewStyle;
};

export function Avatar({ emoji, color, size = 96, style }: Props) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        style,
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
