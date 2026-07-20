import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius, shadow } from '@/theme/tokens';
import type { SwipeDirection } from '@/data/types';

function triggerSwipeHaptic(direction: SwipeDirection) {
  if (direction === 'right') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;

type Props = {
  children: React.ReactNode;
  onSwiped: (direction: SwipeDirection) => void;
  isTop: boolean;
  stackIndex: number;
};

export function SwipeCard({ children, onSwiped, isTop, stackIndex }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .enabled(isTop)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;

      if (shouldSwipeRight || shouldSwipeLeft) {
        const direction: SwipeDirection = shouldSwipeRight ? 'right' : 'left';
        translateX.value = withTiming(shouldSwipeRight ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5, {
          duration: 250,
        });
        translateY.value = withTiming(event.translationY, { duration: 250 });
        runOnJS(triggerSwipeHaptic)(direction);
        runOnJS(onSwiped)(direction);
        return;
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH, SCREEN_WIDTH], [-12, 12]);
    const stackScale = 1 - stackIndex * 0.04;
    const stackTranslateY = stackIndex * -10;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + stackTranslateY },
        { rotate: `${rotate}deg` },
        { scale: isTop ? 1 : stackScale },
      ],
    };
  });

  const likeStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  const nopeStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SWIPE_THRESHOLD], [0, 1]),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle]}>
        <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
        <Animated.View style={styles.glassOverlay} />
        {children}
        {isTop && (
          <>
            <Animated.View style={[styles.stamp, styles.likeStamp, likeStampStyle]}>
              <Animated.Text style={styles.stampText}>J'AIME</Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.stamp, styles.nopeStamp, nopeStampStyle]}>
              <Animated.Text style={styles.stampText}>PASSE</Animated.Text>
            </Animated.View>
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
    ...shadow.card,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.glassStrong,
  },
  stamp: {
    position: 'absolute',
    top: 32,
    borderWidth: 3,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  likeStamp: {
    left: 24,
    borderColor: colors.accent,
    transform: [{ rotate: '-18deg' }],
  },
  nopeStamp: {
    right: 24,
    borderColor: colors.danger,
    transform: [{ rotate: '18deg' }],
  },
  stampText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
});
