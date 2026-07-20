import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, gradients } from '@/theme/tokens';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function AppBackground({ children, style }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.bubble, styles.bubbleOne]} />
        <View style={[styles.bubble, styles.bubbleTwo]} />
        <View style={[styles.bubble, styles.bubbleThree]} />
      </View>
      <SafeAreaView style={[styles.safe, style]}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safe: {
    flex: 1,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 999,
  },
  bubbleOne: {
    width: 240,
    height: 240,
    top: -70,
    left: -60,
    backgroundColor: colors.bubble1,
  },
  bubbleTwo: {
    width: 280,
    height: 280,
    top: 160,
    right: -110,
    backgroundColor: colors.bubble2,
  },
  bubbleThree: {
    width: 220,
    height: 220,
    bottom: -70,
    left: -50,
    backgroundColor: colors.bubble3,
  },
});
