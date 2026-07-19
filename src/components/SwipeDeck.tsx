import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SwipeCard } from '@/components/SwipeCard';
import { colors, spacing, typography } from '@/theme/tokens';
import type { SwipeDirection } from '@/data/types';

const VISIBLE_STACK_SIZE = 3;

type Props<T> = {
  items: T[];
  keyExtractor: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  onSwipe: (item: T, direction: SwipeDirection) => void;
  emptyTitle: string;
  emptySubtitle: string;
};

export function SwipeDeck<T>({
  items,
  keyExtractor,
  renderCard,
  onSwipe,
  emptyTitle,
  emptySubtitle,
}: Props<T>) {
  const visible = items.slice(0, VISIBLE_STACK_SIZE);

  if (visible.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
      </View>
    );
  }

  return (
    <View style={styles.deck}>
      {visible
        .map((item, index) => (
          <SwipeCard
            key={keyExtractor(item)}
            isTop={index === 0}
            stackIndex={index}
            onSwiped={(direction) => onSwipe(item, direction)}
          >
            {renderCard(item)}
          </SwipeCard>
        ))
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    width: '100%',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
